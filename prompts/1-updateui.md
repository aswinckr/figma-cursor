When i select a frame or group, I want to display the name of the selected element in the UI.

Then place a button in the UI that says "Copy to cursor"

When I click on the button I want two things to happen:

- I want the button text to change to "Copied!" and then change back to "Copy to cursor" after 2 seconds.
- I want you to copy all these details of the selected element to the clipboard:

```
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
    constraints: node.constraints,
    fills: node.fills,
    strokes: node.strokes,
    strokeWeight: node.strokeWeight,
    cornerRadius: node.cornerRadius,
    effects: node.effects,
    blendMode: node.blendMode,
    layoutAlign: node.layoutAlign,
    layoutGrow: node.layoutGrow,
    layoutMode: node.layoutMode,
    itemSpacing: node.itemSpacing,
    children: node.children ? node.children.map(getAllNodeDetails) : []
  };
}
```

--

LEARNINGS:

What worked:
These changes should resolve the issue:

1. We've replaced the navigator.clipboard API with a more traditional approach using a temporary textarea element and document.execCommand('copy').
2. The copyToClipboard function in App.tsx now handles the actual copying process.
   The controller.ts file remains largely the same, ensuring that it sends the correct data to the UI.
   This approach should work in the Figma plugin environment. If you're still experiencing issues, please let me know, and we can further investigate. It would be helpful if you could provide any error messages you see in the console or any specific behavior you're observing.
