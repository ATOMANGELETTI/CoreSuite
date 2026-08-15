import { invoke } from "@tauri-apps/api/core";

import type { PingResponse, SuiteInfo } from "./types.ts";

export function ping(message: string): Promise<PingResponse> {
  return invoke<PingResponse>("ping", { message });
}

export function version(): Promise<string> {
  return invoke<string>("version");
}

export function suiteName(): Promise<string> {
  return invoke<string>("suite_name");
}

export function suiteInfo(): Promise<SuiteInfo> {
  return invoke<SuiteInfo>("suite_info");
}
