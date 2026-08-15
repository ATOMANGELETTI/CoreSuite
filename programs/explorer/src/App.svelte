<script lang="ts">
	import { Shell } from "@coresuite/shell-ui";
	import "@coresuite/shell-ui/styles";
</script>

<Shell title="Explorer">
	{#snippet sidebarFooter()}
		<span>Explorer</span>
	{/snippet}
	<div class="cs-placeholder">Select a folder to browse.</div>
</Shell>
