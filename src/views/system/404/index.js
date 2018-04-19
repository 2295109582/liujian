import React,{Component} from 'react';

import img404 from '@/common/img/404.svg';

class My404 extends Component{
  render(){
    return(
      <div className="errorPage">
        <img src={img404} alt='404' />
        <div style={{display:'inline-block'}}>
          <h1>404</h1>
          <p>抱歉，你访问的页面不存在</p>
        </div>
      </div>
    )
  }
}

export default My404;
