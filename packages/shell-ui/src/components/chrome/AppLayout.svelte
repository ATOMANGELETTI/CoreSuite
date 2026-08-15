<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		titlebar,
		sidebar,
		tabs,
		status,
		children,
	}: {
		titlebar?: Snippet;
		sidebar?: Snippet;
		tabs?: Snippet;
		status?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<div class="cs-shell">
	{@render titlebar?.()}
	<div class="cs-body">
		{@render sidebar?.()}
		<div class="cs-main">
			{@render tabs?.()}
			<div class="cs-workspace">
				{@render children?.()}
			</div>
		</div>
	</div>
	{@render status?.()}
</div>
