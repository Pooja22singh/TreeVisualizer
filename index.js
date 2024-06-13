import { constructBinaryTree } from "./Tree/tree.js";
import { drawBinaryTreeOnCanvas } from "./utils/canvasUtils.js";
import { parseInput } from "./utils/treeUtils.js";


const init = () => {
    const textarea = document.querySelector('.nodes');
    let currInput = "";
    textarea.focus();
    const applyBtn = document.querySelector('.applyBtn');
    const clearBtn = document.querySelector('.clearBtn');
    const canvas = document.querySelector("canvas");

    const clearCanvas = () => {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const drawTree = (value) => {
        if (value == "null") {
            alert("Enter valid input");
            return;
        }
        clearCanvas();
        const root = constructBinaryTree(parseInput(value));
        drawBinaryTreeOnCanvas(canvas, root);
    }

    const bindEventListeners = () => {
        applyBtn.addEventListener('click', () => {
            currInput = textarea.value.trim();
            if (!currInput) return;
            drawTree(currInput);
        });

        clearBtn.addEventListener('click', () => {
            textarea.value = '';
            clearCanvas();
        });
        window.addEventListener('resize', () => { if (!currInput) return; drawTree(currInput) })
    }
    bindEventListeners();
}

init();