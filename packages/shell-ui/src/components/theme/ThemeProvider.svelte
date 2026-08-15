<script lang="ts">
	import { setContext, type Snippet } from "svelte";

	let { children }: { children?: Snippet } = $props();

	setContext("coresuite-theme", "nord");
</script>

<div class="contents" data-theme="nord">
	{@render children?.()}
</div>
