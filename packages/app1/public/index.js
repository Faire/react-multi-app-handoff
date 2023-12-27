window.addEventListener("APP_LOAD_123", () => {
  console.log("Loading app 1 from index.js");
  main_123();
});
window.addEventListener("APP_LOAD_456", () => {
  console.log("Loading app 2 from index.js");
  main_456();
});

window.setTimeout(() => {
  main_123();
}, 10);
