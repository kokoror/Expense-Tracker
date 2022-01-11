//root file, includes <App />

import React from 'react';
import ReactDOM from 'react-dom';
import {SpeechProvider} from '@speechly/react-client' // include speechly context and add it to our app

import {Provider} from './context/context'; //Wrap app with this context provider
import App from './App';
import './index.css';

ReactDOM.render(
    <SpeechProvider appId="1073a965-d11d-4816-8d0a-76dae55daa52" language="en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>, 
    document.getElementById('root'));
