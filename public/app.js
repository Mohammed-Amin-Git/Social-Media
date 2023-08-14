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
            let char = txt[type_index];
            element.innerHTML = element.innerHTML + char;
            type_index++;
            setTimeout(() => {
                this.type_effect(txt, element, delay, type_index);
            }, delay);
        }
    }

    // This function can bd used to actually write to the "terminal".
    write(txt, delay_per_char, delta=this.delta_delay, newline=true) {
        setTimeout(() => {
            let element = document.createElement("p");
            if(newline) {
                element.style.display = "block";
            } else {
                element.style.display = "inline";
            }
            this.output_container.appendChild(element);
            this.type_effect(txt, element, delay_per_char, 0);
        }, this.start_delay)
        this.start_delay += txt.length * delay_per_char + delta;
    }

    // This function can be used to create an input field on the terminal to receive user input.
    input(placeholder, width, height, submit, delta=this.delta_delay, newline=true) {
        let input = document.createElement("input");
        input.type = "text";
        input.className = "terminal-input";
        input.placeholder = placeholder;
        input.style.width = width.toString() + "px";
        input.style.height = height.toString() + "px";
        if(!newline) {
            input.style.display = "inline";
        }
        setTimeout(() => {
            this.output_container.appendChild(input);
            window.onkeydown = (e) => {
                if(e.keyCode == 13) {
                    submit(input)
                }
            }
        }, this.start_delay);
        this.start_delay += delta;
    }

    clearInput(input) {
        window.onkeydown = null;
        //input.style.animationName = "inputfadeout";
        //input.style.animationDuration = "1.5s";
        //input.style.opacity = 0;
        input.disabled = true;
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

    // When the user presses the menu button, the overlay menu gets displayed
    let overlay = document.querySelector("#overlay");
    document.querySelector("#menu").addEventListener("click", () => {
        overlay.style.display = "block";
        overlay.style.animationName = "overlay";
    });

    // When the user presses the menu button, the overlay menu gets hidden
    document.querySelector("#overlay-exit").addEventListener("click", () => {
        overlay.style.animationName = "downlay";
        setTimeout(() => {
            overlay.style.display = "none";
        }, 450);
    });

    let output_container = document.querySelector(".container");
    let typer = new Typer(output_container, 500, 1000);
    typer.write("$ Hello World!", 50);
    typer.write("$ Welcome to Social-Media", 50);
    typer.write("$ Do you have an account?", 50, delta=200);
    typer.input("Yes or no...", 150, 25, (input) => {
        typer.clearInput(input);
        typer.start_delay = 0;
        if(input.value.toLowerCase() == "yes") {
            typer.write("$ Would you like to go to the login page?", 50);
            typer.input("Yes or no...", 150, 25, (input) => {
                if(input.value.toLowerCase() == "yes") {
                    typer.clearInput(input);
                    typer.start_delay = 0;
                    typer.write("$ Traveling to /login", 25);
                    setTimeout(() => {location.href = "/login"}, 2000);
                } else {
                    typer.clearInput(input);
                    typer.start_delay = 0;
                    typer.write("$ Feel free to explorer the interactive website. Enjoy!");
                }
            });
        } else if(input.value.toLowerCase() == "no") {
            typer.write("$ Would you like to go to the register page?", 50);
            typer.input("Yes or no...", 150, 25, (input) => {
                if(input.value.toLowerCase() == "yes") {
                    typer.clearInput(input);
                    typer.start_delay = 0;
                    typer.write("$ Traveling to /register", 25);
                    setTimeout(() => {location.href = "/register"}, 2000);
                } else {
                    typer.clearInput(input);
                    typer.start_delay = 0;
                    typer.write("$ Feel free to explorer the interactive website. Enjoy!");
                }
            });
        } else {
            typer.write("$ I did not quite get that", 50);
            typer.write("Feel free to explorer the interactive website. Enjoy!", 50);
        }
    });
}

