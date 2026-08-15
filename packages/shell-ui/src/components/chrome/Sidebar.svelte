<script lang="ts">
	import Folder from "@lucide/svelte/icons/folder";
	import Search from "@lucide/svelte/icons/search";
	import Settings from "@lucide/svelte/icons/settings";
	import type { Snippet } from "svelte";

	let {
		header,
		toolbar,
		tree,
		footer,
		children,
	}: {
		header?: Snippet;
		toolbar?: Snippet;
		tree?: Snippet;
		footer?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<aside class="cs-sidebar">
	<div class="cs-sidebar__header">
		{#if header}
			{@render header()}
		{:else}
			<Folder size={14} strokeWidth={1.5} />
			<span>Workspace</span>
		{/if}
	</div>
	<div class="cs-sidebar__toolbar">
		{#if toolbar}
			{@render toolbar()}
		{:else}
			<button type="button" class="cs-icon-btn" aria-label="Search">
				<Search size={14} strokeWidth={1.5} />
			</button>
			<button type="button" class="cs-icon-btn" aria-label="Settings">
				<Settings size={14} strokeWidth={1.5} />
			</button>
		{/if}
	</div>
	<div class="cs-sidebar__tree">
		{#if tree}
			{@render tree()}
		{:else if children}
			{@render children()}
		{:else}
			<div class="cs-tree-row cs-tree-row--active">
				<Folder size={14} strokeWidth={1.5} />
				<span>Project</span>
			</div>
		{/if}
	</div>
	<div class="cs-sidebar__footer">
		{#if footer}
			{@render footer()}
		{:else}
			<span>Explorer</span>
		{/if}
	</div>
</aside>
