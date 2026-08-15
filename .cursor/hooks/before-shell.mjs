import path from "node:path";
import { runHook } from "./lib.mjs";

const PROTECTED_PUSH_REFS = new Set(["main", "master"]);

runHook((input) => {
  const command = typeof input?.command === "string" ? input.command : "";
  const cwd = typeof input?.cwd === "string" && input.cwd ? input.cwd : process.cwd();
  const repoRoot = process.cwd();
  const reason = denyReason(command, cwd, repoRoot);
  if (reason) return { permission: "deny", message: reason };
  return { permission: "allow" };
});

function denyReason(command, cwd, repoRoot) {
  for (const segment of splitCommandChain(command)) {
    const tokens = tokenize(segment);
    const argv = stripLaunchPrefix(tokens);
    if (argv.length === 0) continue;

    if (isRecursiveDeleteOfRepoRoot(argv, cwd, repoRoot)) {
      return "Blocked: recursive delete of the repository root (or a parent of it).";
    }
    if (isGitHardResetWholeTree(argv)) {
      return "Blocked: git reset --hard of the whole work tree.";
    }
    if (isGitCheckoutWholeTree(argv)) {
      return "Blocked: git checkout -- of the whole work tree.";
    }
    if (isForcePushToDefaultBranch(argv)) {
      return "Blocked: git push --force to main/master.";
    }
  }
  return null;
}

function splitCommandChain(command) {
  const parts = [];
  let current = "";
  let quote = null;
  for (let i = 0; i < command.length; i += 1) {
    const ch = command[i];
    if (quote) {
      current += ch;
      if (ch === quote && command[i - 1] !== "\\") quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
      continue;
    }
    if (ch === "\n" || ch === ";") {
      parts.push(current);
      current = "";
      continue;
    }
    if (ch === "&" && command[i + 1] === "&") {
      parts.push(current);
      current = "";
      i += 1;
      continue;
    }
    if (ch === "|" && command[i + 1] === "|") {
      parts.push(current);
      current = "";
      i += 1;
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current);
  return parts.map((part) => part.trim()).filter(Boolean);
}

function tokenize(command) {
  const tokens = [];
  let current = "";
  let quote = null;
  for (let i = 0; i < command.length; i += 1) {
    const ch = command[i];
    if (quote) {
      if (ch === quote) {
        quote = null;
        continue;
      }
      current += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (/\s/.test(ch)) {
      if (current) tokens.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  if (current) tokens.push(current);
  return tokens;
}

function stripLaunchPrefix(tokens) {
  let i = 0;
  while (i < tokens.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(tokens[i])) i += 1;
  if (tokens[i] === "env") {
    i += 1;
    while (i < tokens.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(tokens[i])) i += 1;
  }
  if (tokens[i] === "sudo") {
    i += 1;
    while (i < tokens.length && tokens[i].startsWith("-")) {
      if (tokens[i] === "-u" || tokens[i] === "--user") i += 2;
      else i += 1;
    }
  }
  if (tokens[i] === "&") i += 1;
  return tokens.slice(i);
}

function commandName(token) {
  return path.basename(token ?? "").replace(/\.exe$/i, "").toLowerCase();
}

function isRecursiveDeleteOfRepoRoot(argv, cwd, repoRoot) {
  const name = commandName(argv[0]);
  const rest = argv.slice(1);
  const unixRm = name === "rm";
  const psRemove = name === "remove-item" || name === "ri";
  const cmdRmdir = name === "rmdir" || name === "rd";
  const psAlias = name === "del" || name === "erase";
  if (!unixRm && !psRemove && !cmdRmdir && !psAlias) return false;

  let recursive = false;
  const targets = [];

  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (token === "--") {
      targets.push(...rest.slice(i + 1));
      break;
    }
    if (cmdRmdir && /^\/[sS]$/.test(token)) {
      recursive = true;
      continue;
    }
    if (cmdRmdir && /^\/[qQ]$/.test(token)) continue;
    if (token.startsWith("-") && token !== "-") {
      if (/^--recursive$/i.test(token) || /^-Recurse$/i.test(token)) recursive = true;
      else if (/^-[A-Za-z]*[rR][A-Za-z]*$/.test(token)) recursive = true;
      if (/^-(Path|LiteralPath|lp)$/i.test(token) && rest[i + 1]) {
        targets.push(rest[i + 1]);
        i += 1;
      }
      continue;
    }
    targets.push(token);
  }

  if (!recursive) return false;
  return targets.some((target) => isRepoDestroyingDeleteTarget(target, cwd, repoRoot));
}

function isRepoDestroyingDeleteTarget(target, cwd, repoRoot) {
  const expanded = expandCwdShorthand(unquote(target), cwd);
  if (isAllGlob(expanded)) {
    return isSameOrAncestorPath(cwd, repoRoot);
  }
  return isSameOrAncestorPath(path.resolve(cwd, expanded), repoRoot);
}

function expandCwdShorthand(target, cwd) {
  if (
    target === "$PWD" ||
    target === "${PWD}" ||
    target === "$(pwd)" ||
    /^\$PWD(\.Path)?$/i.test(target)
  ) {
    return cwd;
  }
  return target;
}

function isAllGlob(target) {
  return target === "*" || target === "./*" || target === ".\\*";
}

function isSameOrAncestorPath(candidate, repoRoot) {
  const resolved = normalizePath(candidate);
  const repo = normalizePath(repoRoot);
  if (resolved === repo) return true;
  const root = normalizePath(path.parse(resolved).root);
  if (resolved === root) return true;
  const prefix = resolved.endsWith(path.sep) ? resolved : `${resolved}${path.sep}`;
  return repo.startsWith(prefix);
}

function normalizePath(value) {
  const resolved = path.resolve(value);
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function gitArgv(argv) {
  if (commandName(argv[0]) !== "git") return null;
  let i = 1;
  while (i < argv.length) {
    const token = argv[i];
    if (token === "--") {
      i += 1;
      break;
    }
    if (token === "-C" || token === "-c") {
      i += 2;
      continue;
    }
    if (
      token.startsWith("--git-dir") ||
      token.startsWith("--work-tree") ||
      token.startsWith("--namespace") ||
      token.startsWith("-c")
    ) {
      i += token.includes("=") ? 1 : 2;
      continue;
    }
    if (
      token === "--bare" ||
      token === "--no-pager" ||
      token === "--paginate" ||
      token === "--no-replace-objects" ||
      token === "--literal-pathspecs"
    ) {
      i += 1;
      continue;
    }
    break;
  }
  if (i >= argv.length) return null;
  return { subcommand: argv[i], args: argv.slice(i + 1) };
}

function isGitHardResetWholeTree(argv) {
  const git = gitArgv(argv);
  if (!git || git.subcommand !== "reset") return false;
  if (!hasFlag(git.args, "hard")) return false;
  return pathspecsAreWholeTree(resetPathspecs(git.args));
}

function resetPathspecs(args) {
  const dd = args.indexOf("--");
  if (dd !== -1) return args.slice(dd + 1);
  return [];
}

function isGitCheckoutWholeTree(argv) {
  const git = gitArgv(argv);
  if (!git || git.subcommand !== "checkout") return false;
  const dd = git.args.indexOf("--");
  if (dd !== -1) return pathspecsAreWholeTree(git.args.slice(dd + 1));
  const pathspecs = git.args.filter((token) => !token.startsWith("-"));
  return pathspecs.length > 0 && pathspecsAreWholeTree(pathspecs);
}

function pathspecsAreWholeTree(pathspecs) {
  if (pathspecs.length === 0) return true;
  return pathspecs.some((spec) => {
    const value = unquote(spec);
    return value === "." || value === "./" || value === ".\\" || value === path.sep;
  });
}

function isForcePushToDefaultBranch(argv) {
  const git = gitArgv(argv);
  if (!git || git.subcommand !== "push") return false;
  if (!isForcePush(git.args)) return false;
  return pushDestinations(git.args).some((ref) => PROTECTED_PUSH_REFS.has(ref));
}

function isForcePush(args) {
  return args.some((token) => {
    if (token === "-f" || token === "--force") return true;
    if (token === "--force-with-lease" || token.startsWith("--force-with-lease=")) return true;
    if (token === "--force-if-includes") return true;
    return false;
  });
}

function hasFlag(args, name) {
  return args.some((token) => token === `--${name}` || token === `-${name}`);
}

function pushDestinations(args) {
  const positionals = [];
  for (let i = 0; i < args.length; i += 1) {
    const token = args[i];
    if (token === "--") {
      positionals.push(...args.slice(i + 1));
      break;
    }
    if (token.startsWith("-")) {
      if (!token.includes("=") && args[i + 1] && !args[i + 1].startsWith("-")) {
        if (/^-(u|-set-upstream|-repo|-receive-pack|-exec|-signed)$/.test(token)) i += 1;
      }
      continue;
    }
    positionals.push(token);
  }
  const refspecs = positionals.length <= 1 ? positionals : positionals.slice(1);
  return refspecs.map(destinationRef).filter(Boolean);
}

function destinationRef(refspec) {
  let value = unquote(refspec).replace(/^\+/, "");
  if (value.includes(":")) value = value.slice(value.lastIndexOf(":") + 1);
  value = value.replace(/^refs\/heads\//, "");
  return value;
}
