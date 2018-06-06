import React,{Component} from 'react';
import Tabs from '@c/tabs';

import SalesTax from './salesTax';   //销项税
import InputTax from './inputTax';   //进项税
import PreTax from './preTax';   //预征率
import BuildingTax from './buildingTax'; //城建税
import TeachingTax from './teachingTax'; //教附税

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
    tabs.add('城建税率设置',{
      view:BuildingTax
    },false)
    tabs.add('教附税率设置',{
      view:TeachingTax
    },false)
  }

  render(){

    return(
      <Tabs ref="tabs" />
    )
  }
}



export default Index;
