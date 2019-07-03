// @flow
import React, { useState } from 'react';
import styles from './Home.css';

const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');

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
    .on('data', data =>
      process.stdout.write(
        data.results[0] && data.results[0].alternatives[0]
          ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
          : `\n\nReached transcription time limit, press Ctrl+C\n`
      )
    );

  // Start recording and send the microphone input to the Speech API
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

  console.log('Listening, press Ctrl+C to stop.');
};

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className={styles.container} data-tid="container">
      <h2>ElectroKiwi</h2>
      <button
        type="button"
        onClick={() => {
          setIsRecording(false);
          microphoneRecord(isRecording);
        }}
      >
        {isRecording ? 'On' : 'Off'}
      </button>
    </div>
  );
};

export default Home;
