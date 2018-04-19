import axios from 'axios';
import storage from './storage.js';
import appConfig from '@/appConfig.json';
import createBrowserHistory from 'history/createBrowserHistory';

import './axios.js';  //引入axios配置



((window,document)=>{

  //console.time("全局方法绑定")

  const uc = (()=>{

    let customHistory = createBrowserHistory();  //路由


    return {
      axios,
      storage,
      appConfig,
      goBack:customHistory.goBack
    }
  })();



  window.uc = uc;
  Object.defineProperty(window,"uc",{
      writable:false,
      enumerable:false,
      configurable:false
  });

  //console.timeEnd("全局方法绑定")

})(window,document);
