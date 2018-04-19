import React,{Component} from 'react';
import { Breadcrumb } from 'antd';
import ViewsRouter from './viewsRouter';
import storage from '@/utils/storage';


// import nprogress from 'nprogress';
// import 'nprogress/nprogress.css';


class App extends Component{

  // shouldComponentUpdate(nextProps, nextState){
  //   //打开进度条
  //   nprogress.start();
  //   return true;
  // }
  //
  // componentWillUpdate(nextProps, nextState){
  //   //关闭进度条
  //   nprogress.done();
  // }



  render(){
    let path = storage.get("breadcrumb") || ["首页"];
    return(
      <div className="pageWrap" ref="pageWrap">
       <div className="pageBj">
         <Breadcrumb style={{marginBottom:20}}>
           {path.map((item,i)=>{
             return <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
           })}
         </Breadcrumb>
         <ViewsRouter />
       </div>
     </div>
    )
  }
}

export default App;
