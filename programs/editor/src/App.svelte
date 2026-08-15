<script lang="ts">
	import { Shell } from "@coresuite/shell-ui";
	import "@coresuite/shell-ui/styles";
</script>

<Shell title="Editor">
	{#snippet sidebarFooter()}
		<span>Editor</span>
	{/snippet}
	<div class="cs-placeholder">Open a file to start editing.</div>
</Shell>
