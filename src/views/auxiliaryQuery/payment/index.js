import React,{Component} from 'react';
import Tabs from '@c/tabs';

import List from './list';


class Index extends Component{


  componentDidMount(){
    let {tabs} = this.refs;
    tabs.add('付款记录列表',{
      view:List
    },false)
  }

  render(){

    return(
      <Tabs ref="tabs" />
    )
  }
}



export default Index;
