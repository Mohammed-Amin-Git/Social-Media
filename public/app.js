// Initialize canvas and 2d context for the background drawing effect
const canvas = document.querySelector("#background");
const ctx = canvas.getContext("2d");

// This makes sure that the canvas resizes when the window resizes
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.filter = "blur(6px)";
}

// // This function is responsible for "typing" something on the homepage "terminal"
// // It takes a sentence to write, an element to place the sentence in and a delay for typing
// function type_effect(sentence, element, delay, type_index) {
//     if(type_index < sentence.length) {
//         element.innerHTML = element.innerHTML + sentence[type_index];
//         type_index++;
//         setTimeout(() => {
//             type_effect(sentence, element, delay, type_index);
//         }, delay);
//     } else {
//         return true
//     }
// }

// // This is a function that builds on type_function and provides a <p> tag as element
// function terminal_message(sentence, delay) {
//     let element = document.createElement("p");
//     document.querySelector(".container").appendChild(element);

//     return type_effect(sentence, element, delay, 0);
// }

class Typer {
    constructor(output_container, start_delay, delta_delay) {
        this.output_container = output_container;
        this.start_delay = start_delay;
        this.delta_delay = delta_delay;
    }

    type_effect(txt, element, delay, type_index) {
        if(type_index < txt.length) {
            element.innerHTML = element.innerHTML + txt[type_index];
            type_index++;
            setTimeout(() => {
                this.type_effect(txt, element, delay, type_index);
            }, delay);
        }
    }

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
}

