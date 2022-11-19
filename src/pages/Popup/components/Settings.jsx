import ReactSlider from 'react-slider';
import React from 'react';
import './slider.css';
import SettingsContext from './SettingsContext';
import { useContext } from 'react';
import BackButton from './BackButton';

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  const setTime = () => {
    chrome.storage.local.set(
      {
        isRunning: 'Yes its',
      },
      () => {
        console.log('Values setuped');
      }
    );

    chrome.storage.sync.get(['isRunning'], (res) => {
      console.log(res);
    });
  };
  return (
    <div style={{ textAlign: 'left' }}>
      <label>work: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => {
          settingsInfo.setBreakMinutes(newValue);
          console.log('Set values');
          setTime();
        }}
        min={1}
        max={120}
      />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;
