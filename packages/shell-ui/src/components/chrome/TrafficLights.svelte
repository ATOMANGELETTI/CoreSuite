<script lang="ts">
	import {
		closeWindow,
		minimizeWindow,
		toggleMaximizeWindow,
	} from "@coresuite/shell-bridge";

	async function onClose(): Promise<void> {
		try {
			await closeWindow();
		} catch {
			// Browser-only preview has no Tauri window.
		}
	}

	async function onMinimize(): Promise<void> {
		try {
			await minimizeWindow();
		} catch {
			// Browser-only preview has no Tauri window.
		}
	}

	async function onMaximize(): Promise<void> {
		try {
			await toggleMaximizeWindow();
		} catch {
			// Browser-only preview has no Tauri window.
		}
	}
</script>

<div class="cs-traffic">
	<button
		type="button"
		class="cs-traffic__light cs-traffic__light--close"
		aria-label="Close"
		onclick={onClose}
	></button>
	<button
		type="button"
		class="cs-traffic__light cs-traffic__light--minimize"
		aria-label="Minimize"
		onclick={onMinimize}
	></button>
	<button
		type="button"
		class="cs-traffic__light cs-traffic__light--maximize"
		aria-label="Maximize"
		onclick={onMaximize}
	></button>
</div>
