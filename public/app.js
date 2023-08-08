const canvas = document.querySelector("#background");
const ctx = canvas.getContext("2d");

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.filter = "blur(6px)";
}

window.onload = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.filter = "blur(6px)";

    canvas.addEventListener("mousemove", (e) => {
        ctx.fillStyle = "#35155D"
        ctx.fillRect(e.clientX, e.clientY, 50, 50);
    });
}