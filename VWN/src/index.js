import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './JS/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
