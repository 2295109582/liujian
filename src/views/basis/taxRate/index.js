import React,{Component} from 'react';
import Tabs from '@c/tabs';

import SalesTax from './salesTax';   //销项税
import InputTax from './inputTax';   //进项税
import PreTax from './preTax';   //预征率

class Index extends Component{


  componentDidMount(){
    let {tabs} = this.refs;
    tabs.add('销项税率设置',{
      view:SalesTax
    },false);
    tabs.add('进项税率设置',{
      view:InputTax
    },false)
    tabs.add('预征率设置',{
      view:PreTax
    },false)
  }

  render(){

    return(
      <Tabs ref="tabs" />
    )
  }
}



export default Index;
