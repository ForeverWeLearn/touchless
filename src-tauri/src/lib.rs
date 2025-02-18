// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use mouce::{Mouse, MouseActions};

#[tauri::command]
fn move_mouse(pos: &str) {
    let mouse = Mouse::new();
    let coord: Vec<usize> = pos
        .split_whitespace()
        .map(|s| s.parse().expect("Failed to parse number"))
        .collect();

    let _ = mouse.move_to(coord[0].try_into().unwrap(), coord[1].try_into().unwrap());
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![move_mouse])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
