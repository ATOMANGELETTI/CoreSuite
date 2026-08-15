<script lang="ts">
	import GitBranch from "@lucide/svelte/icons/git-branch";
	import Zap from "@lucide/svelte/icons/zap";
	import type { Snippet } from "svelte";

	let {
		left,
		right,
		children,
	}: {
		left?: Snippet;
		right?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<footer class="cs-statusbar">
	{#if children}
		{@render children()}
	{:else}
		<div class="cs-statusbar__cluster">
			{#if left}
				{@render left()}
			{:else}
				<span class="cs-statusbar__item">
					<GitBranch size={12} strokeWidth={1.5} />
					main
				</span>
				<span class="cs-statusbar__item">Ready</span>
			{/if}
		</div>
		<div class="cs-statusbar__cluster">
			{#if right}
				{@render right()}
			{:else}
				<span class="cs-statusbar__item">Ln 1, Col 1</span>
				<span class="cs-statusbar__item">UTF-8</span>
				<span class="cs-statusbar__item">Spaces: 2</span>
				<span class="cs-statusbar__item">
					<Zap size={12} strokeWidth={1.5} />
					CoreSuite
				</span>
			{/if}
		</div>
	{/if}
</footer>
