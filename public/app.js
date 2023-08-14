// This is the Typer class which can be used to simulate a type effect on the homepage
class Typer {
    // Gets the element to put the type effect in, a delay to start the typing and a delay to the next text.
    constructor(output_container, start_delay, delta_delay) {
        this.output_container = output_container;
        this.start_delay = start_delay;
        this.delta_delay = delta_delay;
    }

    // This function simulates the type effect using recursion and setTimeout
    type_effect(txt, element, delay, type_index) {
        if(type_index < txt.length) {
            element.innerHTML = element.innerHTML + txt[type_index];
            type_index++;
            setTimeout(() => {
                this.type_effect(txt, element, delay, type_index);
            }, delay);
        }
    }

    // This that function that you can use to actually write to the "terminal".
    write(txt, delay_per_char, newline=true) {
        let tag = "span";
        if(newline) {
            tag = "p";
        }
        setTimeout(() => {
            let element = document.createElement(tag);
            this.output_container.appendChild(element);
            this.type_effect(txt, element, delay_per_char, 0);
        }, this.start_delay)
        this.start_delay += txt.length * delay_per_char + this.delta_delay;
    }
}

// Initialize canvas and 2d context for the background drawing effect
const canvas = document.querySelector("#background");
const ctx = canvas.getContext("2d");

// This makes sure that the canvas resizes when the window resizes
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.filter = "blur(6px)";
}

window.onload = async () => {
    // Set canvas width and height to window width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // blur the background
    ctx.filter = "blur(6px)";

    // Draw rectangles to the mouse position
    canvas.addEventListener("mousemove", (e) => {
        ctx.fillStyle = "#35155D"
        ctx.fillRect(e.clientX, e.clientY, 50, 50);
    });    

    let output_container = document.querySelector(".container");
    let typer = new Typer(output_container, 500, 1000);
    typer.write("$ Hello World", 50);
    typer.write("$ Welcome to Social-Media", 50)

    let overlay = document.querySelector("#overlay");
    document.querySelector("#menu").addEventListener("click", () => {
        overlay.style.display = "block";
        overlay.style.animationName = "overlay";
    });

    document.querySelector("#overlay-exit").addEventListener("click", () => {
        overlay.style.animationName = "downlay";
        setTimeout(() => {
            overlay.style.display = "none";
        }, 450);
    });
}

