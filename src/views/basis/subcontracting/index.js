import React,{Component} from 'react';
import Tabs from '@c/tabs';

import List from './list';


class Index extends Component{


  componentDidMount(){
    let {tabs} = this.refs;
    tabs.add('专业分包列表',{
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
