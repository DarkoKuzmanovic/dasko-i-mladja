import { invoke } from "@tauri-apps/api/tauri";

export interface Episode {
  id: string; // Unique identifier for the episode
  title: string;
  url: string;
}

export async function fetchEpisodes(): Promise<Episode[]> {
  try {
    const xmlText = await invoke("fetch_feed");
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText as string, "text/xml");
    const items = xmlDoc.querySelectorAll("item");

    return Array.from(items).map((item, index) => ({
      id: `episode-${index + 1}`, // Generate unique ID
      title: item.querySelector("title")?.textContent?.trim() || `Episode ${index + 1}`,
      url: item.querySelector("enclosure")?.getAttribute("url") || "",
    })).filter(episode => episode.url !== ""); // Filter out episodes without URL
  } catch (error) {
    console.error("Error fetching or parsing feed:", error);
    throw error;
  }
}