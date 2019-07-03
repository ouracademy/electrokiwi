# ElectroKiwi

This application uses electron-react-boilerplate.
See more [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Install

Install the dependencies with **yarn** (only that package manager).

```bash
$ yarn
$ sudo apt-get install sox libsox-fmt-all
```

And sox for linux (see more in https://cloud.google.com/speech-to-text/docs/streaming-recognize?hl=es#speech-streaming-mic-recognize-nodejs)

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```
