// Set initial window size to 400x600 pixels
figma.showUI(__html__, { width: 400, height: 600 });

function getAllNodeDetails(node: SceneNode) {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
    relativeTransform: node.relativeTransform,
    constraints: 'constraints' in node ? node.constraints : undefined,
    fills: 'fills' in node ? node.fills : undefined,
    strokes: 'strokes' in node ? node.strokes : undefined,
    strokeWeight: 'strokeWeight' in node ? node.strokeWeight : undefined,
    cornerRadius: 'cornerRadius' in node ? node.cornerRadius : undefined,
    effects: 'effects' in node ? node.effects : undefined,
    blendMode: 'blendMode' in node ? node.blendMode : undefined,
    layoutAlign: 'layoutAlign' in node ? node.layoutAlign : undefined,
    layoutGrow: 'layoutGrow' in node ? node.layoutGrow : undefined,
    layoutMode: 'layoutMode' in node ? node.layoutMode : undefined,
    itemSpacing: 'itemSpacing' in node ? node.itemSpacing : undefined,
    children: 'children' in node ? node.children.map(getAllNodeDetails) : [],
  };
}

figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 1 && (selection[0].type === 'FRAME' || selection[0].type === 'GROUP')) {
    figma.ui.postMessage({
      type: 'selection-change',
      name: selection[0].name,
    });
  } else {
    figma.ui.postMessage({
      type: 'selection-change',
      name: null,
    });
  }
});

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rectangles') {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    });
  } else if (msg.type === 'copy-to-clipboard') {
    const selection = figma.currentPage.selection;
    if (selection.length === 1 && (selection[0].type === 'FRAME' || selection[0].type === 'GROUP')) {
      const nodeDetails = getAllNodeDetails(selection[0]);
      figma.ui.postMessage({
        type: 'clipboard-data',
        data: JSON.stringify(nodeDetails, null, 2),
      });
    } else {
      figma.ui.postMessage({
        type: 'clipboard-data',
        data: null,
      });
    }
  }
};
