// Initialize canvas and 2d context for the background drawing effect
const canvas = document.querySelector("#background");
const ctx = canvas.getContext("2d");

// This makes sure that the canvas resizes when the window resizes and blurs the background again
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.filter = "blur(6px)";
}

window.onload = () => {
    // Set canvas width and height to window width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Blur background
    ctx.filter = "blur(6px)";

    // Draw rectangles to the mouse position
    canvas.addEventListener("mousemove", (e) => {
        ctx.fillStyle = "#35155D"
        ctx.fillRect(e.clientX, e.clientY, 50, 50);
    });
}