import React,{Component} from 'react';
import Tabs from '@c/tabs';

import List from './list';


class Index extends Component{


  componentDidMount(){
    let {tabs} = this.refs;

    window.uc.axios.post("/project/entrTaxrate")
    .then((data)=>{
      let last = data.data;


      if(last){
        last = last.map((item,i)=>{
          return {value:`${item.taxrate}`,label:`${item.taxrate}`};
        })
      }

      tabs.add('工程进项',{
        view:List,
        props:{
          preTax:last
        }
      },false)
    })


  }


  render(){

    return(
      <Tabs ref="tabs" />
    )
  }
}



export default Index;
