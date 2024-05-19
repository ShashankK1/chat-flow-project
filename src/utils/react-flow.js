export function checkForConnectedNodes(nodes, edges) {
    const allIds = nodes.map((node) => node.id);
    const allEdges = edges.map((edge) => edge.source);
    let count = 0;
    for (let i = 0; i < allIds.length; i++) {
        if (!allEdges.includes(allIds[i])) count++;
    }
    if (count >= 2) {
        return false;
    }
    return true;
}
