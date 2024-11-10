
<img width="1482" alt="Figma Cursor" src="https://github.com/user-attachments/assets/795d12b2-ada4-4df2-970d-7c977d603fa3">

You can access the plugin directly from the Figma community - [Link to plugin](https://www.figma.com/community/plugin/1434599500152464568/figma-to-cursor)

# Figma To Cursor Plugin

This plugin allows you to copy all the properties of any group or frame and its child layers in Figma, enabling easy recreation in code using Cursor.

## Installation

1. Download this project.
2. Open Figma and navigate to `Plugins` -> `Development` -> `Import plugin from manifest...`
3. Choose the `manifest.json` file from this project directory.

## Usage

1. Select a frame or group in Figma (ensure it's not a component; detach if necessary).
2. Run the plugin and click "Copy to Clipboard".
3. In Cursor, use the "design this" command and specify the desired positioning.
4. Paste the copied properties.

## Development

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.

## Build Commands

### For Development

- `yarn build:watch`: Starts webpack in watch mode for development.

### For Production

- `yarn build`: Builds the plugin for production.

## Tooling

This project uses:

- React + Webpack
- TypeScript
- Prettier precommit hook

## Quickstart for Developers

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).
