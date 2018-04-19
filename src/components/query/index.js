import React,{Component} from 'react';
import {Spin} from 'antd';
import Modal from "@c/modal";

import * as async from './asyncComponent';

export default class Query extends Component{

  constructor(props){
    super(props);

    this.state = {
      Comp:null,  //动态加载的组件
      name:null   //设置值的key
    }

  }

  setFieldsValue = ()=>{  //调用组件的setValue方法
    //let {setFieldsValue} = this.props;
    let {name} = this.state;
    let {comp} = this.refs;
    return comp.c.setValue&&comp.c.setValue(name);

  }

  show = (title,type,name)=>{  //显示这个组件
    let {modal} = this.refs;
    this.setState({
      Comp:async[type],
      name
    })
    modal.show(`请选择${title}`);
  }

  render(){

    let {Comp} = this.state;

    return(
      <Modal ref="modal" onOk={this.setFieldsValue} width="800px">
        {Comp===null?<Spin className='loadCentered' />:<Comp ref="comp" setFieldsValue={this.props.setFieldsValue} />}
      </Modal>
    )
  }
}
