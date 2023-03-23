interface INode {
  val: number;
  children?: INode[];
}
/**
 * 遍历DOM tree
 */
function visitNode(n: INode) {
  console.info('node:', n.val);
}

/**
 * 深度优先遍历
 */
function depthFirstTraverse(root: INode) {
  visitNode(root);
  const children = root.children;
  if (children?.length) {
    children.forEach((child) => depthFirstTraverse(child));
  }
}

/**
 * 广度优先遍历
 */
function breadthFirstTraverse(root: INode) {
  const queue: INode[] = [];
  // 根节点入队
  queue.push(root);
  while (queue.length > 0) {
    const curNode = queue.shift();
    if (curNode == null) break;
    visitNode(curNode);
    // 子节点入队
    curNode.children?.forEach((child) => queue.push(child));
  }
}
const data: INode = {
  val: 1,
  children: [
    { val: 2, children: [{ val: 4, children: [{ val: 5 }] }] },
    { val: 3, children: [{ val: 6 }] },
  ],
};
console.group('深度优先遍历：');
depthFirstTraverse(data);
console.groupEnd();

console.group('广度优先遍历：');
breadthFirstTraverse(data);
console.groupEnd();
