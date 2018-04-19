import storageConfig from './storageConfig.js';
//const type = "local"; // local session   localStorage  sessionStorage  存储方式


let storage = {
  get:(key)=>{
    return JSON.parse(localStorage.getItem(key));
  },
  set:(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value));
  },
  remove:(key)=>{
    localStorage.removeItem(key);
  }
}

for(var attr in storageConfig){
  if(storage.get(attr) === null){ //如果本地没有数据，存入默认数据
    storage.set(attr,storageConfig[attr]);
  }
}


export default storage;
