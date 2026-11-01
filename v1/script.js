const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeIcon = themeToggle.querySelector("span");
let fontScale = 16;

function updateThemeLabel() {
    const isDark = body.classList.contains("dark");
    themeLabel.textContent = isDark ? "Light" : "Dark";
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    updateThemeLabel();
});

document.querySelector("#font-increase").addEventListener("click", () => {
    fontScale = Math.min(fontScale + 1, 21);
    root.style.setProperty("--body-size", `${fontScale}px`);
});

document.querySelector("#font-decrease").addEventListener("click", () => {
    fontScale = Math.max(fontScale - 1, 14);
    root.style.setProperty("--body-size", `${fontScale}px`);
});

