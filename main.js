document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnRSA");
  if (btn) btn.addEventListener("click", generateRSAKey);
});
