import { getHeight } from "../Tree/tree.js";

export const DEFAULT_CONFIG = {
    radius: 20,
    nodeWidthSpacing: 25,
    nodeHeightSpacing: 100, // lineHeight
    fontSize: 10
}

export const parseInput = (inputArr) => {
 let parsedInput = inputArr.trim();
 let nodes = parsedInput.split(",");
 return nodes;
}
export function getRequiredHeightAndWidth(root) {
    const heightOfTree = getHeight(root);
    // Maximum leaf nodes=2^h
    // h is height of the tree, height of the tree is the number
    // of edges on longest path from root to leaf
    // as seen  in getHeight method
    // so if height is 2 then levels become 0 1 and 2, with root being at 0th level
    // On any level we find number of nodes as 2^i for leaf nodes i = height , so 2^height
    // 2^2 = 4
    const maxLeafNodes = Math.pow(2, heightOfTree);
    const requiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;
    const requiredCanvasWidth = maxLeafNodes * DEFAULT_CONFIG.nodeWidthSpacing;
    return {
        requiredCanvasWidth,
        requiredCanvasHeight
    }
}