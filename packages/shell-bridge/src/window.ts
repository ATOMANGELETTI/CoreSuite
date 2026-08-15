import { getCurrentWindow } from "@tauri-apps/api/window";

export function closeWindow(): Promise<void> {
  return getCurrentWindow().close();
}

export function minimizeWindow(): Promise<void> {
  return getCurrentWindow().minimize();
}

export function toggleMaximizeWindow(): Promise<void> {
  return getCurrentWindow().toggleMaximize();
}

export function startDragging(): Promise<void> {
  return getCurrentWindow().startDragging();
}
