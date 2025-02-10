// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn main() {
    #[allow(unused_imports)]
    use tauri::Manager;

    tauri::Builder::default()
        .plugin(tauri_plugin_context_menu::init())
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                if event.window().label() == "main" {
                    #[cfg(target_os = "windows")]
                    {
                        event.window().hide().unwrap();
                        api.prevent_close();
                    }
                    #[cfg(target_os = "macos")]
                    {
                        #[allow(unused_unsafe)]
                        unsafe {
                            api.prevent_close();
                            tauri::AppHandle::hide(&event.window().app_handle()).unwrap()
                        }
                    }
                    #[cfg(target_os = "linux")]
                    {
                        event.window().hide().unwrap();
                        api.prevent_close();
                    }
                }
            }
            _ => {}
        })
        .setup(|_app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                _app.get_window("main").unwrap();
                // window.open_devtools();
                // window.close_devtools();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
