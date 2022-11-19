import { useState, useEffect } from 'react';

const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
            if (result[key] === undefined) {
                reject();
            } else {
                resolve(result[key]);
            }
        });
    });
};

// This hook receives two parameters:
// storageKey: This is the name of our storage that gets used when we retrieve/save our persistent data.
// initialState: This is our default value, but only if the store doesn't exist, otherwise it gets overwritten by the store.
export default () => {
    const [allstate, setAllState] = useState({
        showSettings: false,
        workMinutes: 45,
        breakMinutes: 15
    });

    useEffect(() => {
        const fetchData = async () => {
            let data = Object.keys(allstate);
            let initial = {};
            data.map((key) => {
                let keyvalue = readLocalStorage(key).then((res) => {
                    initial[key] = res;
                }).catch((err) => {
                    console.log(err);
                });

            })
            console.log(initial);
            setAllState({ ...allstate, ...initial });
            console.log(allstate);

        }

        fetchData();
    }, []);

    // Create a replacement method that will set the state like normal, but that also saves the new state into the store.
    const setState = (newState) => {
        
        browserStorage.set(storageKey, newState);
        setInternalState(newState);
    };

    return [allstate, setAllState];
};