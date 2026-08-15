import { stdin, stdout } from "node:process";

/**
 * Read one JSON object from stdin. Throws if the payload is not valid JSON.
 */
export async function readStdinJson() {
  const chunks = [];
  for await (const chunk of stdin) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw);
}

export function writeJson(value) {
  stdout.write(`${JSON.stringify(value)}\n`);
}

export function allow() {
  writeJson({ permission: "allow" });
}

export function deny(message) {
  writeJson({
    permission: "deny",
    user_message: message,
    agent_message: message,
  });
}

/**
 * Fail-open wrapper: invalid JSON, crashes, or a non-deny result all allow.
 */
export async function runHook(handler) {
  try {
    const input = await readStdinJson();
    const result = await handler(input);
    if (result && result.permission === "deny") {
      deny(result.message ?? "Command blocked by hook.");
      return;
    }
    allow();
  } catch {
    allow();
  }
}
