import React,{Component,Fragment} from 'react';
import {message} from 'antd';
import Modal from "@c/modal";
import {Form as AppForm,Input} from 'antd';
import * as async from './asyncComponent';

const FormItem = AppForm.Item;
const Search = Input.Search;


class Query extends Component{

  onFocus = (e)=>{
    let target = e.target;
    target.blur();
    let { modal } = this.refs;
    let { label } = this.props;
    modal.show(`请选择${label}`);
  }


  setFieldsValue = ()=>{
    let { setFieldsValue,name,labelName,callback } = this.props;
    let { queryComponent } = this.refs;
    let data = queryComponent.c.getSelections();
    let nameValue =  queryComponent.c.state.name;


    if(data.length !== 1){
        message.warning('请选择一条数据!');
        return false;
      }

      let value = data[0];
      callback&&callback(value);
      setFieldsValue({
        [name]:value.id,
        [labelName]:value[nameValue]
      })

    return true;
  }

  render(){
    let {getFieldDecorator,formItemLayout,label,labelName,name,rules,type,readonly,params} = this.props;

    let QueryComponent = async[type];

    return(
      <Fragment>
        <FormItem  {...formItemLayout} label={label}>
          {getFieldDecorator(labelName, {rules})(
            <Search
              placeholder={`请选择${label}`}
              readOnly={true}
              disabled={readonly}
              onFocus={this.onFocus}
              onSearch={value => console.log(value)}
              style={{ width: "100%" }}
            />
          )}
        </FormItem>
        <FormItem  {...formItemLayout} style={{display:'none'}}>
          {getFieldDecorator(name, {rules})(
            <Input />
          )}
        </FormItem>
        <Modal ref="modal" width="800px" onOk={this.setFieldsValue}>
          <QueryComponent ref="queryComponent" params={params} />
        </Modal>
      </Fragment>
    )
  }
}

Query.defaultProps = {
  setFieldsValue:()=>{}, //设置值
  formItemLayout:{}, //布局
  label:"", //提示名
  labelName:"",  //显示的名字name
  labelValue:"",   //显示的名字值
  name:"", //隐藏域的值
  rules:[], //验证规则
}

export default Query;
