#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    coresuite_shell::register(tauri::Builder::default())
        .run(tauri::generate_context!())
        .expect("error while running CoreSuite Explorer");
}
