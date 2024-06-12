function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

export const getHeight = (root) => {
    if (root == null)
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
        if (arr[i] != null && arr[i] != "") {
            const leftChild = new TreeNode(arr[i]);
            currentParent.left = leftChild
            queue.push(leftChild);
        }
        i++;
        if (i < arr.length && arr[i] != null && arr[i] != "") {
            const rightChild = new TreeNode(arr[i]);
            currentParent.right = rightChild
            queue.push(rightChild);
        }
        i++;
    }
    return root;
}
