<script lang="ts">
	import type { Snippet } from "svelte";

	import TrafficLights from "./TrafficLights.svelte";

	let {
		title,
		leading,
	}: {
		title: string;
		leading?: Snippet;
	} = $props();
</script>

<header class="cs-titlebar" data-tauri-drag-region>
	<div class="relative z-10 flex items-center">
		{#if leading}
			{@render leading()}
		{:else}
			<TrafficLights />
		{/if}
	</div>
	<div class="cs-titlebar__title">{title}</div>
</header>
