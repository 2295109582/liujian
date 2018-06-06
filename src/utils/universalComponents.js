import axios from 'axios';
import storage from './storage.js';
import appConfig from '@/appConfig.json';
import createBrowserHistory from 'history/createBrowserHistory';

import { message } from 'antd';

import './axios.js';  //引入axios配置



((window,document)=>{

  //console.time("全局方法绑定")

  const uc = (()=>{

    let customHistory = createBrowserHistory();  //路由



    let pre = (()=>{
      return ()=>{
        let userInfo = storage.get('userInfo');
        let permission = userInfo.permission || [];

        let pre = [];
        permission.forEach((item,i)=>{
          let data = item.permission;
          data = data.split(",");
          pre = pre.concat(data);
        })
        pre = Array.from(new Set(pre));
        return pre;
      }
    })();


    function dic(key){
      let dicData = storage.get('dic');
      let data = dicData[key] || [];
      let list = data.map((item,i)=>{
        return {value:item.code,label:item.name};
      })
      return list;
    }

    const download = (function(){
      var form = document.createElement("form");
          form.setAttribute("method","post");
          return function(url,data){
            document.body.appendChild(form);
            var temp = document.createDocumentFragment();
            if(data){
              for(var attr in data){
                let input = document.createElement("input");
                input.name = attr;
                input.value = data[attr];
                temp.appendChild(input);
              }
            }
            form.appendChild(temp);
            form.setAttribute("action",`/liujian${url}`);
            //form.setAttribute("action",url);
            form.submit();
            document.body.removeChild(form);
          }
    })();

    const importFiles = (function(){
      var input = document.createElement("input");
      let submit;
      let hide;
          input.setAttribute("type","file");
          input.setAttribute("accept",".XLS,.xlsx");

          input.addEventListener("change",(e)=>{
            let { files } = input;
            submit(files[0]);
          })

          return function(url,callback){
            input.click();
            submit = (file)=>{
              hide = message.loading('正在导入中...', 0);    
              axios.post(url,{
                myFile:file
              }).then((data)=>{
                if(data.status === 200){
                  message.info(data.msg);
                  callback&&callback();
                }
                hide();
                input.value = null;
              }).catch(()=>{
                hide();
                input.value = null;
              })

            }
            //form.setAttribute("action",`/liujian${url}`);

          }
    })();


    function getDic(dictype,value){
      let dicarr = dic(dictype);
      for(var i=0;i<dicarr.length;i++){
        if(dicarr[i].value === value){
          return dicarr[i].label
        }
      };
      return value;
    }


    return {
      axios,
      storage,
      appConfig,
      dic,
      getDic,
      download,
      importFiles,
      customHistory:createBrowserHistory,
      goBack:customHistory.goBack,
      pre
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
