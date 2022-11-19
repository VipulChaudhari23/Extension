import React, { useEffect } from 'react';
import './App.css';
import Timer from './Timer';
import Settings from './Settings';
import { useState } from 'react';
import SettingsContext from './SettingsContext';
import usePersistState from './usePersistent';
function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  const [allstate, setAllState] = usePersistState();
  console.log(allstate, setAllState);
  useEffect(() => {
    chrome.storage.local.set(
      {
        timeOption: 'ff',
        timer: 'sdmi',
      },
      () => {}
    );
    return () => {
      chrome.storage.local.get(['timer', 'timeOption'], (res) => {
        console.log(res);
      });
    };
  });
  return (
    <main>
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}
      >
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
