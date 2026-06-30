const video = document.querySelector("#mainVideo");
const toggleMute = document.querySelector("#toggleMute");
const config = window.siteConfig || {};

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

  if (config.videoSrc) {
    video.src = config.videoSrc;
  }
}

function blockSaveShortcuts(event) {
  const key = event.key.toLowerCase();
  if ((event.metaKey || event.ctrlKey) && key === "s") {
    event.preventDefault();
  }
}

function syncMuteButton() {
  const isMuted = video.muted;
  toggleMute.textContent = isMuted ? "音声 ON" : "音声 OFF";
  toggleMute.setAttribute("aria-pressed", String(!isMuted));
}

toggleMute.addEventListener("click", async () => {
  video.muted = !video.muted;
  syncMuteButton();

  if (!video.paused) {
    return;
  }

  try {
    await video.play();
  } catch {
    video.controls = true;
  }
});

applyConfig();
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", blockSaveShortcuts);
video.addEventListener("contextmenu", (event) => event.preventDefault());
video.addEventListener("volumechange", syncMuteButton);
syncMuteButton();
