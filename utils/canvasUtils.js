import { getRequiredHeightAndWidth } from "./treeUtils";
export const drawBinaryTreeOnCanvas = (canvas, root) => {
    const viewPortWidth = window.innerWidth;
    const viewPortHeight = window.innerHeight;

    // assigning whole view port area to canvas
    canvas.width = viewPortWidth;
    canvas.height = viewPortHeight;

    // For the tree display area we can provide a specific height 
    // and width
    const {
        requiredCanvasWidth,
        requiredCanvasHeight
    } = getRequiredHeightAndWidth(root);
    
}