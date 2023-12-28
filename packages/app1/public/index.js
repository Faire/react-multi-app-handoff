// Generated listeners for each "app" change
window.addEventListener("SWITCH_TO_APP_123", () => {
  main_123();
});
window.addEventListener("SWITCH_TO_APP_456", () => {
  main_456();
});

// Start main for the current app when DOM content has loaded
document.addEventListener("DOMContentLoaded", () => {
  main_123();
});
