// @flow
import React, { useState } from 'react';
import styles from './Home.css';

const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const keyboard = require('node-key-sender');

const type = {
  name: 'type',
  execute(text) {
    // TODO: must be executed when someone says:
    // use symbols
    keyboard.sendText(
      text
        .replace('open bracket', '{') // this is [ (bug of node-key-sender)
        .replace('open brace', '[') // this is {
        .replace('two points', ':')
        .replace('quote', "'")
    );
  }
};

const commandsFor = commands =>
  commands.split(',').map(x => ({
    name: x,
    // eslint-disable-next-line no-unused-vars
    execute(text) {
      keyboard.sendKey(x);
    }
  }));

const commands = [
  {
    name: 'delete',
    // eslint-disable-next-line no-unused-vars
    execute(text) {
      keyboard.sendKey('back_space');
    }
  },
  {
    name: 'copy',
    // eslint-disable-next-line no-unused-vars
    execute(text) {
      keyboard.sendCombination(['control', 'c']);
    }
  },

  {
    name: 'paste',
    // eslint-disable-next-line no-unused-vars
    execute(text) {
      keyboard.sendCombination(['control', 'v']);
    }
  },
  ...commandsFor('enter,up,down,right,left'),
  {
    name: 'select',
    // eslint-disable-next-line no-unused-vars
    execute(text) {
      keyboard.sendCombination(['control', 'shift', 'left']);
    }
  },
  type
];

const interpreter = {
  interpret(text) {
    const command = commands.find(x => text.startsWith(x.name));
    if (command) {
      const position = command.name.length + 1;
      const args = text.length > position ? text.substring(position) : '';
      command.execute(args);
    } else {
      type.execute(text);
    }
  }
};

const microphoneRecord = () => {
  const client = new speech.SpeechClient();

  const encoding = 'LINEAR16'; // Encoding of the audio file, e.g. LINEAR16';
  const sampleRateHertz = 16000;
  const languageCode = 'en-US'; // 'BCP-47 language code, e.g. en-US';

  const request = {
    config: {
      encoding,
      sampleRateHertz,
      languageCode
    },
    interimResults: false // If you want interim results, set this to true
  };

  const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
      const text = data.results[0].alternatives[0].transcript
        .trim()
        .toLowerCase();
      process.stdout.write(`Transcription: '${text}'\n`);
      interpreter.interpret(text);
    });

  record
    .start({
      sampleRateHertz,
      threshold: 0,
      // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
      verbose: false,
      recordProgram: 'rec', // Try also "arecord" or "sox"
      silence: '10.0'
    })
    .on('error', console.error)
    .pipe(recognizeStream);
};

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className={styles.container} data-tid="container">
      <h2>ElectroKiwi</h2>
      <button
        type="button"
        onClick={() => {
          setIsRecording(!isRecording);
          microphoneRecord();
        }}
      >
        {isRecording ? 'On' : 'Off'}
      </button>
    </div>
  );
};

export default Home;
