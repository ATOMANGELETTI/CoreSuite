//! CLI helpers over `coresuite-core`. The binary lives in `main.rs`.

use coresuite_core::{ping, suite_name, version, PingResponse};

/// Run a ping through core and return the typed response.
pub fn run_ping(message: &str) -> PingResponse {
    ping(message)
}

/// Printable suite identity line.
pub fn identity_line() -> String {
    format!("{} {}", suite_name(), version())
}
