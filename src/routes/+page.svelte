<script lang="ts">
  import { onMount } from "svelte";
  import { fetchEpisodes, type Episode } from "../services/feedService";
  import { RadioGroup, RadioItem, ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
  import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-svelte";
  import { writable } from "svelte/store";

  const appVersion = import.meta.env.VITE_APP_VERSION;

  let episodes: Episode[] = [];
  let selectedEpisode: Episode | null = null;
  let audioSource = "https://stream.daskoimladja.com/proxy/daskomladja/stream";
  let isLiveRadio = true;
  let isPlaying = false;
  let volume = 1;
  let audio: HTMLAudioElement;
  let tabSet = 0;
  let currentTime = 0;
  let duration = 0;
  let errorMessage = writable("");
  let isMuted = false;

  // Pagination State
  let currentPage = 1;
  const episodesPerPage = 30;

  // Reactive variables for pagination
  $: totalPages = Math.ceil(episodes.length / episodesPerPage);
  $: paginatedEpisodes = episodes.slice((currentPage - 1) * episodesPerPage, currentPage * episodesPerPage);

  onMount(async () => {
    try {
      episodes = await fetchEpisodes();
      console.log("Episodes:", episodes);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      errorMessage.set("Unable to load episodes. Please try again later.");
    }
  });

  function selectEpisode(episode: Episode) {
    selectedEpisode = episode;
    audioSource = episode.url;
    isLiveRadio = false;
    isPlaying = false;
    tabSet = 1;
    currentTime = 0;
    duration = 0;
    if (audio) {
      audio.src = audioSource;
      audio.load();
    }
  }

  function selectLiveRadio() {
    selectedEpisode = null;
    audioSource = "https://stream.daskoimladja.com/proxy/daskomladja/stream";
    isLiveRadio = true;
    tabSet = 0;
    if (audio) {
      audio.src = audioSource;
      audio.load();
      if (isPlaying) {
        audio.play();
      }
    }
  }

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
    } else {
      if (isLiveRadio) {
        audio.src = "https://stream.daskoimladja.com/proxy/daskomladja/stream";
      } else if (selectedEpisode) {
        audio.src = selectedEpisode.url;
      }
      audio.load();
      audio.play();
    }
    isPlaying = !isPlaying;
  }

  function updateVolume() {
    audio.volume = volume;
    if (volume > 0 && isMuted) {
      isMuted = false;
      audio.muted = false;
    } else if (volume === 0 && !isMuted) {
      isMuted = true;
      audio.muted = true;
    }
  }

  function updateTime() {
    currentTime = audio.currentTime;
    duration = audio.duration;
  }

  function updateMetadata() {
    if (audio.duration) {
      duration = audio.duration;
    } else {
      duration = 0;
    }
  }

  function seek(e: Event) {
    const target = e.target as HTMLInputElement;
    audio.currentTime = Number(target.value);
  }

  function formatTime(time: number): string {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function skip(seconds: number) {
    audio.currentTime += seconds;
  }

  // Pagination Controls
  function goToNextPage() {
    if (currentPage < totalPages) {
      currentPage += 1;
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage -= 1;
    }
  }
</script>

<div class="container mx-auto p-4 space-y-4 bg-gradient-to from-primary-500">
  <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
    <RadioItem name="radio-group" value={0} bind:group={tabSet}>Radio uživo</RadioItem>
    <RadioItem name="radio-group" value={1} bind:group={tabSet}>Podkast</RadioItem>
    <RadioItem name="radio-group" value={2} bind:group={tabSet}>Podrška</RadioItem>
    <RadioItem name="radio-group" value={3} bind:group={tabSet}>Opcije</RadioItem>
  </RadioGroup>

  <!-- Content based on selection -->
  {#if tabSet === 0}
    <!-- Live Radio Panel -->
    <div class="card p-8 space-y-16 -space-x-4">
      <h4 class="h4">Radio uživo</h4>
      <div class="flex items-center space-x-4">
        <audio
          bind:this={audio}
          src={audioSource}
          on:ended={() => (isPlaying = false)}
          on:timeupdate={updateTime}
          on:loadedmetadata={updateMetadata}
        ></audio>
        <button on:click={togglePlay} class="btn variant-filled-primary" aria-label={isPlaying ? "Pause" : "Play"}>
          {#if isPlaying}
            <Pause size={16} />
          {:else}
            <Play size={16} />
          {/if}
        </button>
        <div class="flex items-center space-x-4">
          <button
            on:click={() => {
              isMuted = !isMuted;
              audio.muted = isMuted;
            }}
            class="btn-icon variant-soft-primary"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {#if isMuted}
              <VolumeX size={16} />
            {:else}
              <Volume2 size={16} />
            {/if}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            bind:value={volume}
            on:input={updateVolume}
            class="range bg-primary-500 w-32"
            aria-label="Volume control"
          />
        </div>
        <input type="range" min="0" max={duration} bind:value={currentTime} on:input={seek} class="range w-full" />
      </div>
      <div class="flex justify-between">
        <span></span>
        <span>{formatTime(currentTime)}</span>
      </div>
    </div>
  {:else if tabSet === 1}
    <!-- Podcast Episodes Panel -->
    <div class="card p-4 space-y-4">
      <h4 class="h4">Najnovije epizode</h4>
      <div class="h-64 overflow-y-auto">
        <ListBox>
          {#each paginatedEpisodes as episode}
            <ListBoxItem
              bind:group={selectedEpisode}
              name="episode"
              value={episode}
              class="episode-item {selectedEpisode?.id === episode.id ? 'active' : ''}"
              on:click={() => selectEpisode(episode)}
              on:keydown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectEpisode(episode);
                }
              }}
            >
              {episode.title}
            </ListBoxItem>
          {/each}
        </ListBox>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-between mt-4">
        <button
          on:click={goToPreviousPage}
          class="btn variant-soft-primary"
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          on:click={goToNextPage}
          class="btn variant-soft-primary"
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {#if selectedEpisode}
        <div class="flex flex-col items-center space-y-4 mt-4">
          <audio
            bind:this={audio}
            src={audioSource}
            on:ended={() => (isPlaying = false)}
            on:timeupdate={updateTime}
            on:loadedmetadata={updateMetadata}
          ></audio>
          <div class="flex items-center space-x-4 w-full">
            <button on:click={() => skip(-10)} class="btn-icon variant-soft-primary" aria-label="Skip Back 10 Seconds">
              <SkipBack size={16} />
            </button>
            <button
              on:click={togglePlay}
              class="btn-icon variant-filled-primary"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {#if isPlaying}
                <Pause size={16} />
              {:else}
                <Play size={16} />
              {/if}
            </button>
            <button
              on:click={() => skip(10)}
              class="btn-icon variant-soft-primary"
              aria-label="Skip Forward 10 Seconds"
            >
              <SkipForward size={16} />
            </button>
            <input type="range" min="0" max="1" step="0.05" bind:value={volume} on:input={updateVolume} class="range" />
          </div>
          <div class="w-full space-y-2">
            <input type="range" min="0" max={duration} bind:value={currentTime} on:input={seek} class="range w-full" />
            <div class="flex justify-between">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <p class="h5">{selectedEpisode.title}</p>
        </div>
      {/if}
    </div>
  {/if}
</div>
