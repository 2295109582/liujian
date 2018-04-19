import React,{Component} from 'react';
import Tabs from '@c/tabs';

import List from './list';


class Index extends Component{

  add = (title,content)=>{
    let {tabs} = this.refs;
    tabs.add(title,content);
  }

  render(){

    return(
      <Tabs ref="tabs" panes={[
        { title: '业主单位列表', content: <List add={this.add} />,closable: false }
      ]}  />
    )
  }
}



export default Index;
