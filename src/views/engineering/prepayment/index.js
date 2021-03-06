import React,{Component} from 'react';
import Tabs from '@c/tabs';

import List from './list';


class Index extends Component{


  componentDidMount(){
    let {tabs} = this.refs;

    window.uc.axios.post("/project/preTax")
    .then((data)=>{
      let last = data.data;

      if(last){
        last = last.map((item,i)=>{
          return {value:`${item.id}`,label:`${item.pretaxRate}`};
        })
      }

      tabs.add('预缴',{
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
