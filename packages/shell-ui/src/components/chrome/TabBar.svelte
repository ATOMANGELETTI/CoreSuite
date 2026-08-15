<script lang="ts">
	import type { Snippet } from "svelte";

	import type { ShellTab } from "./tab.ts";

	let {
		tabs = [
			{ id: "welcome", label: "Welcome", active: true },
			{ id: "untitled", label: "Untitled" },
		],
		children,
	}: {
		tabs?: ShellTab[];
		children?: Snippet;
	} = $props();
</script>

<div class="cs-tabbar" role="tablist" aria-label="Open tabs">
	{#if children}
		{@render children()}
	{:else}
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				class={["cs-tab", tab.active && "cs-tab--active"]}
				role="tab"
				aria-selected={tab.active === true}
			>
				{tab.label}
			</button>
		{/each}
	{/if}
</div>
