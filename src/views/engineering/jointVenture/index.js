import React,{Component} from 'react';
import Tabs from '@c/tabs';

import List from './list';
import ConfirmPayment from './confirmPayment';


class Index extends Component{


  componentDidMount(){
    let {tabs} = this.refs;

    tabs.add('待确认付款记录列表',{
      view:ConfirmPayment
    },false)



    tabs.add('联营项目',{
      view:List
    },false);



  }

  render(){

    return(
      <Tabs ref="tabs" />
    )
  }
}



export default Index;
