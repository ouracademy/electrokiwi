# ElectroKiwi

This application uses electron-react-boilerplate.
See more [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Install

Install the dependencies with **yarn** (only that package manager).
But before install you need to install some stuff for speech recognition (see more in https://cloud.google.com/speech-to-text/docs/streaming-recognize?hl=es#speech-streaming-mic-recognize-nodejs), as well ass for Robot.js (see more in http://robotjs.io/docs/building)

For example in ubuntu, you install it using the following commands

```bash
$ sudo apt-get install sox libsox-fmt-all # for speech
$ sudo apt-get install libxtst-dev libpng++-dev # for robotjs
$ yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ export GOOGLE_APPLICATION_CREDENTIALS=service-account-file.json
$ yarn dev
```

Note that we have a service-account-file.json in the root of our workspace, this file
is where you put all your credentials for google speech recognition.

## Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```
