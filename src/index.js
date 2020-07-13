import React from 'react'
import ReactDOM from 'react-dom'
import './css/custom.css'
import * as serviceWorker from './serviceWorker'
import Root from './router/Root'

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
