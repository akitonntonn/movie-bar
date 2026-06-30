const toggleMute = document.querySelector("#toggleMute");
const config = window.siteConfig || {};

let player;
let isPlayerReady = false;

function applyConfig() {
  if (config.pageTitle) {
    document.title = config.pageTitle;
  }

  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.dataset.config;
    if (config[key]) {
      element.textContent = config[key];
    }
  });
}

function blockSaveShortcuts(event) {
  const key = event.key.toLowerCase();
  if ((event.metaKey || event.ctrlKey) && key === "s") {
    event.preventDefault();
  }
}

function syncMuteButton() {
  if (!player || !isPlayerReady) return;

  const isMuted = player.isMuted();
  toggleMute.textContent = isMuted ? "音声 ON" : "音声 OFF";
  toggleMute.setAttribute("aria-pressed", String(!isMuted));
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtubePlayer", {
    videoId: "oO5D7lVAHw8",
    playerVars: {
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
    },
    events: {
      onReady: function () {
        isPlayerReady = true;
        player.mute();
        syncMuteButton();
      },
      onStateChange: function () {
        syncMuteButton();
      },
    },
  });
}

toggleMute.addEventListener("click", () => {
  if (!player || !isPlayerReady) return;

  if (player.isMuted()) {
    player.unMute();
    player.setVolume(100);
  } else {
    player.mute();
  }

  syncMuteButton();
});

applyConfig();
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", blockSaveShortcuts);

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";

const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
