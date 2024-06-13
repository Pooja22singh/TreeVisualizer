import { DEFAULT_CONFIG, getRequiredHeightAndWidth } from "./treeUtils.js";


const drawCircle = (val, canvas, xPos, yPos) => {
    const context = canvas.getContext("2d");

    // Draw circle
    context.beginPath();
    // startangle and endangle needs to be in radian
    // 2pi is in radians itself and in degress it evaluates to
    // 360 degrees so we need a full circle, for any other arc
    // shape adjust the radian values accordingly
    context.arc(xPos, yPos, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.fillStyle = "lightsalmon";
    context.fill();

    // Draw border
    context.beginPath()
    context.arc(xPos, yPos, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.strokeStyle = "brown";
    context.stroke();
    // Now adds nodes value at the centre

    context.font = `${DEFAULT_CONFIG.fontSize}px sans-serif`;
    context.fillStyle = "brown";
    context.textAlign = "center";
    context.fillText(val, xPos, yPos + Math.floor(DEFAULT_CONFIG.fontSize / 2));
}
const connectEdges = (canvasElement, xCoordinates, yCoordinates) => {
    const { x1:xStart, x2:xEnd } = xCoordinates;
    const { y1:yStart, y2:yEnd } = yCoordinates;

    const xHalf = (xStart + xEnd) / 2;
    const yHalf = (yStart + yEnd) / 2;

    const start = { x: xStart, y: yStart };
    const cpoint1 = { x: xHalf, y: yHalf };
    const cpoint2 = { x: xEnd, y: yHalf };
    const end = { x: xEnd, y: yEnd };

    // Draw curve
    const context = canvasElement.getContext('2d');
    context.beginPath();
    context.strokeStyle = 'brown';
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(cpoint1.x, cpoint1.y, cpoint2.x, cpoint2.y, end.x, end.y);

    // context.lineTo(end.x, end.y);
    context.stroke();
}
const createNodes = (root, canvas, horizontalConfig, currentLevel) => {
    // This position is of the start and end of the horizontal width 
    // of the section of canvas chosen for drawing tree
    const { x1, x2 } = horizontalConfig;
    // now exact position of x and y for the node
    const xPos = Math.floor((x1 + x2) / 2);
    const yPos = currentLevel * DEFAULT_CONFIG.nodeHeightSpacing;
    drawCircle(root.val, canvas, xPos, yPos); // drawing the root
    //Drawing left node
    if (root.left != null) {
        const leftHorizontalConfig = { x1, x2: xPos };
        createNodes(root.left, canvas, leftHorizontalConfig, currentLevel + 1);
        connectEdges(canvas,
            {
                x1: xPos,
                x2: (x1 + xPos) / 2
            },
            {
                y1: yPos + DEFAULT_CONFIG.radius,
                y2: ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
            }
        );
    }
    if (root.right != null) {
        const rightNodeHorizontalConfig = { x1: xPos, x2 };
        createNodes(root.right, canvas, rightNodeHorizontalConfig, currentLevel + 1);
        connectEdges(canvas,
            {
                x1: xPos,
                x2: (xPos + x2) / 2
            },
            {
                y1: yPos + DEFAULT_CONFIG.radius,
                y2: ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
            }
        );
    }
}

export const drawBinaryTreeOnCanvas = (canvas, root) => {
    const viewPortWidth = window.innerWidth;
    const viewPortHeight = window.innerHeight;

    // assigning whole view port area to canvas
    canvas.width = viewPortWidth;
    canvas.height = viewPortHeight - 200;

    // For the tree display area we can provide a specific height 
    // and width
    const {
        requiredCanvasWidth,
    } = getRequiredHeightAndWidth(root);

    // Now we have the width and height of the designated area
    // of the canvas where we draw the tree
    // We want to optimise teh space and start at the centre of the 
    // area for the root node and then the leaf nodes can expand
    // to cover the width
    // We goth the width and height required for the tree Area in canvas
    // but we want to calculate x coordinates x1 and x2 

    const x1 = Math.floor(viewPortWidth / 2) - Math.floor(requiredCanvasWidth / 2);
    const x2 = Math.floor(viewPortWidth / 2) + Math.floor(requiredCanvasWidth / 2);

    const horizontalConfig = { x1, x2 };

    //This method recursively draws all the nodes
    // calcualtes x and y for the nodes
    // then draws the nodes on the canvas with their value radius width and height
    createNodes(root, canvas, horizontalConfig, 1);
}

