function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

export const getHeight = (root) => {
    if (root == null || root == "null")
        return 0;
    const lh = getHeight(root.left);
    const rh = getHeight(root.right);
    return 1 + Math.max(lh, rh);
}

export const constructBinaryTree = (arr) => {
    if (!arr.length)
        return null;
    const root = new TreeNode(arr[0]);
    //Queue has instances of TreeNode
    const queue = [root];
    let i = 1;
    while (i < arr.length) {
        const currentParent = queue.shift();
        let val = arr[i].trim();
        if (val !== "null" && val !== "") {
            const leftChild = new TreeNode(val);
            if(currentParent)
            currentParent.left = leftChild
            currentParent && queue.push(leftChild);
        }
        i++;
        val = arr[i]?.trim() || "";
        if (i < arr.length && val != "null" && val != "") {
            const rightChild = new TreeNode(val);
            if(currentParent)
            currentParent.right = rightChild
            currentParent && queue.push(rightChild);
        }
        i++;
        }
    return root;
}