import React,{Component} from 'react';
import Tabs from '@c/tabs';

import List from './list';


class Index extends Component{


  componentDidMount(){
    let {tabs} = this.refs;
    tabs.add('工程收款列表',{
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
