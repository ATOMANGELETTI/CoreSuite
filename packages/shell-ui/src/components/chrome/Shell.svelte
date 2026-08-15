<script lang="ts">
	import type { Snippet } from "svelte";

	import ThemeProvider from "../theme/ThemeProvider.svelte";
	import AppLayout from "./AppLayout.svelte";
	import Sidebar from "./Sidebar.svelte";
	import StatusBar from "./StatusBar.svelte";
	import TabBar from "./TabBar.svelte";
	import Titlebar from "./Titlebar.svelte";
	import type { ShellTab } from "./tab.ts";

	let {
		title,
		tabs,
		sidebar: customSidebar,
		sidebarHeader,
		sidebarToolbar,
		sidebarTree,
		sidebarFooter,
		tabbar,
		status: customStatus,
		statusLeft,
		statusRight,
		children,
	}: {
		title: string;
		tabs?: ShellTab[];
		sidebar?: Snippet;
		sidebarHeader?: Snippet;
		sidebarToolbar?: Snippet;
		sidebarTree?: Snippet;
		sidebarFooter?: Snippet;
		tabbar?: Snippet;
		status?: Snippet;
		statusLeft?: Snippet;
		statusRight?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<ThemeProvider>
	<AppLayout>
		{#snippet titlebar()}
			<Titlebar {title} />
		{/snippet}
		{#snippet sidebar()}
			{#if customSidebar}
				{@render customSidebar()}
			{:else}
				<Sidebar
					header={sidebarHeader}
					toolbar={sidebarToolbar}
					tree={sidebarTree}
					footer={sidebarFooter}
				/>
			{/if}
		{/snippet}
		{#snippet tabs()}
			{#if tabbar}
				{@render tabbar()}
			{:else}
				<TabBar {tabs} />
			{/if}
		{/snippet}
		{#snippet status()}
			{#if customStatus}
				{@render customStatus()}
			{:else}
				<StatusBar left={statusLeft} right={statusRight} />
			{/if}
		{/snippet}
		{@render children?.()}
	</AppLayout>
</ThemeProvider>
