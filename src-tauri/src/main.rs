use tauri::Manager;
use reqwest;

// Define the `fetch_feed` command
#[tauri::command]
async fn fetch_feed() -> Result<String, String> {
    let client = reqwest::Client::new();
    let res = client
        .get("https://podcast.daskoimladja.com/feed.xml")
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let body = res.text().await.map_err(|e| e.to_string())?;
    Ok(body)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        // Register both `fetch_feed` and `get_now_playing` commands
        .invoke_handler(tauri::generate_handler![fetch_feed])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
