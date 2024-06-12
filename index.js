import { constructBinaryTree } from "./Tree";
import { drawBinaryTreeOnCanvas } from "./utils/canvasUtils";
import { parseInput } from "./utils/treeUtils";


const init = () => {
    const textarea = document.querySelector('.nodes');
    const currInput = textarea.value;
    const applyBtn = document.querySelector('.applyBtn');
    const clearBtn = document.querySelector('.clearBtn');
    const canvas = document.querySelector("canvas");
    const bindEventListeners = () => {
        applyBtn.addEventListener('click', () => {
            if (currInput) return;
            init(currInput);
        });

        clearBtn.addEventListener('click', () => {
            textarea.value = '';
            clearCanvas();
        });
    }
    const redraw = (value) => {
        clearCanvas();
        const root = constructBinaryTree(parseInput(value));
        drawBinaryTreeOnCanvas(canvas, root);
    }
    window.addEventListener('resize', () => redraw(currInput))
    bindEventListeners();
}

init();