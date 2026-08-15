//! App IPC commands over `coresuite-core`.
//!
//! Registered by the host via `register`. These are not window min/max/close
//! commands — those stay on the JS window API.

use coresuite_core::{
    ping as core_ping, suite_name as core_suite_name, version as core_version, PingResponse,
    SuiteInfo,
};

#[tauri::command]
pub fn ping(message: String) -> Result<PingResponse, String> {
    Ok(core_ping(&message))
}

#[tauri::command]
pub fn version() -> Result<String, String> {
    Ok(core_version().to_owned())
}

#[tauri::command]
pub fn suite_name() -> Result<String, String> {
    Ok(core_suite_name().to_owned())
}

#[tauri::command]
pub fn suite_info() -> Result<SuiteInfo, String> {
    Ok(SuiteInfo::current())
}
