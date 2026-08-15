//! Shared window/shell library. This crate is not an application.
//!
//! Window min/max/close stay on the JS window API (`packages/shell-bridge`).
//! This plugin only applies undecorated defaults to host windows.

mod commands;

use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

pub use commands::{ping, suite_info, suite_name, version};

const PLUGIN_NAME: &str = "coresuite-shell";

/// Initialize the `coresuite-shell` plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new(PLUGIN_NAME)
        .setup(|app, _api| {
            for window in app.webview_windows().values() {
                window.set_decorations(false).map_err(|err| err.to_string())?;
            }
            Ok(())
        })
        .build()
}

/// Attach the shell plugin and core IPC commands to a host builder.
pub fn register<R: Runtime>(builder: tauri::Builder<R>) -> tauri::Builder<R> {
    builder.plugin(init()).invoke_handler(tauri::generate_handler![
        ping,
        version,
        suite_name,
        suite_info
    ])
}
