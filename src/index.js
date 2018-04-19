import React from 'react';
import ReactDOM from 'react-dom';
import '@/utils/universalComponents.js';
import '@/common/style/app.css';
import registerServiceWorker from './registerServiceWorker';
import App from '@/system/app.js';
import { BrowserRouter} from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter forceRefresh={false}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
