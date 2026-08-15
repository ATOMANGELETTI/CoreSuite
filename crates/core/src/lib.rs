//! Shared types, IPC payloads, and FFI for CoreSuite.
//!
//! Library paths return structured values. Callers that cross the webview
//! boundary must map errors instead of unwrapping.

use serde::{Deserialize, Serialize};

/// Current crate version from Cargo.
pub fn version() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

/// Suite display name shared by CLI and GUI hosts.
pub fn suite_name() -> &'static str {
    "CoreSuite"
}

/// Echo `message` back as a typed IPC payload.
pub fn ping(message: &str) -> PingResponse {
    PingResponse {
        message: message.to_owned(),
    }
}

/// Request body for the `ping` command.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PingRequest {
    pub message: String,
}

/// Response body for the `ping` command.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PingResponse {
    pub message: String,
}

/// Identity payload shared over IPC.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SuiteInfo {
    pub name: String,
    pub version: String,
}

impl SuiteInfo {
    pub fn current() -> Self {
        Self {
            name: suite_name().to_owned(),
            version: version().to_owned(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn ping_echoes_message() {
        let response = ping("hello");
        assert_eq!(response.message, "hello");
    }

    #[test]
    fn suite_info_uses_shared_name() {
        let info = SuiteInfo::current();
        assert_eq!(info.name, "CoreSuite");
        assert_eq!(info.version, version());
    }
}
