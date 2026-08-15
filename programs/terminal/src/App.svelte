<script lang="ts">
	import { Shell } from "@coresuite/shell-ui";
	import "@coresuite/shell-ui/styles";
</script>

<Shell title="Terminal">
	{#snippet sidebarFooter()}
		<span>Terminal</span>
	{/snippet}
	<div class="cs-placeholder">No session attached.</div>
</Shell>
