// Initialize canvas and 2d context for the background drawing effect
const canvas = document.querySelector("#background");
const ctx = canvas.getContext("2d");

// This makes sure that the canvas resizes when the window resizes
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.filter = "blur(6px)";
}

// This function is responsible for "typing" something on the homepage "terminal"
// It takes a sentence to write, an element to place the sentence in and a delay for typing
let type_index = 0;
function type_effect(sentence, element, delay) {
    if(type_index < sentence.length) {
        element.innerHTML = element.innerHTML + sentence[type_index];
        type_index++;
        setTimeout(() => {
            type_effect(sentence, element, delay);
        }, delay);
    } else {
        type_index = 0; 
    }
}

// This is a function that builds on type_function and provides a <p> tag as element
function terminal_message(sentence, delay) {
    let element = document.createElement("p");
    document.querySelector(".container").appendChild(element);

    return type_effect(sentence, element, delay);
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

    
}