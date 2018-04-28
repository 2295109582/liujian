import axios from 'axios';
import { message } from 'antd';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let condition = {...config.data};
  let formData = new FormData();
  for(var attr in condition){
    if(condition[attr]!==undefined){
      formData.append(attr,condition[attr]);
    }
  }

  let token = window.uc.storage.get("userInfo")["token"];
  config.headers['Content-type'] = 'application/x-www-form-urlencoded';
  //config.url = `/liujian${config.url}?token=${token}`;
  config.url = `${config.url}?token=${token}`;
  config.data = formData;
  return config;
}, function (error) {
  // 对请求错误做些什么
  message.error("请求错误！");
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.status === 200){
      if(response.data.status === 200){
        return response.data;
      }else{
        message.error(response.data.msg);
      }
    };
    //message.error("响应数据出错！");
  },
  function (err) {
    // 对响应错误做点什么
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)' ; break;
            case 401: err.message = '未授权，请重新登录(401)'; break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    }else{
        err.message = '连接服务器失败!'
    }
    message.error(err.message);
    return Promise.reject(err);
});
