import React,{Component} from 'react';
import Tabs from '@c/tabs';


import PaymentRecord from './paymentRecord';
class Index extends Component{


  componentDidMount(){
    let {tabs} = this.refs;

    tabs.add('已确认付款记录列表',{
      view:PaymentRecord
    },false)

  }

  render(){

    return(
      <Tabs ref="tabs" />
    )
  }
}



export default Index;
