import React,{Component} from 'react';
import { Modal,message } from 'antd';

import Form from "./index";



class FormModal extends Component{


  constructor(){
    super(...arguments);

    let {data, visible,submitUrl,title, confirmLoading,formItemLayout,tailFormItemLayout } = this.props;


    this.state = {
      data,
      visible,
      title,
      submitUrl,
      confirmLoading,
      formItemLayout,
      tailFormItemLayout,
      view:false
    }

  }

  //设置表单显示
  show = (info={},fn)=>{
    this.setState({
      visible: true,
      title:info.title
     },()=>{
      fn&&fn();
    });
  }
  //设置表单隐藏
  hide = ()=>{
    this.setState({visible:false})
  }

  //提交数据到地址
  ok = ()=>{
    let { form } = this.refs;
    let { view } = this.state;
    if(view === true){
      this.setState({ visible: false});
      return;
    }
    form.doSubmit(values => {
      let { submitUrl } = this.state;
      if(!submitUrl){
        this.props.ok(values);
        this.hide();
        return;
      };

      let {form} = this.refs;
      let data = form.getData();
      if(data.id !== undefined){
        submitUrl = this.props.updateUrl;
      }
      this.setState({ confirmLoading: true }); //设置提交状态
      window.uc.axios.post(submitUrl, values)
        .then((data) => {
          message.info(data.msg);
          this.setState({ visible: false, confirmLoading: false });
          this.props.submitCallback();
        })
        .catch((error)=> {
          this.setState({ confirmLoading: false });
        });
    });
  }


  deleteNull = (data)=>{
    let result = {...data};
    for(var attr in result){
      if(result[attr] === null){
        delete result[attr];
      }
      if(typeof result[attr] === "object"){
        delete result[attr];
      }
      if(typeof result[attr] === "number"){
        result[attr] = result[attr].toString();
      }
    }
    return result;
  }


  setData = (info={},values,view) => {
    this.show(info,()=>{
      setTimeout(()=>{
        let {form} = this.refs;
        let list = this.deleteNull(values);
        if(view === true){
          let data = [...this.state.data];
          data.forEach((item,i)=>{
            data[i].readonly = true;
          })
          this.setState({data,view})
        }else{
          this.setState({view:false})
        }

        form&&form.setFieldsValue(list);
      },100)

    });
  }



  //主动提交表单
  doSubmit =(fn)=>{
    var {form} = this.refs;
        form.doSubmit((values)=>{
          this.setState({confirmLoading:true})  //设置提交状态
          var _this = this; //this
          fn&&fn(values,function(callback){  //表单提交成功后回调函数,行参,调用是关闭页面
            _this.setState({visible:false,confirmLoading:false});
            callback&&callback(); //成功关闭后的回调函数
          })
        });
  }


  render(){
    let { visible, confirmLoading,formItemLayout,tailFormItemLayout,title} = this.state;
    let {data,width} = this.state;

    data.push({
      type: "input",
      name: "key",
      label: "key",
      readonly:true,
      visible:false
    })

    return(
      <div>
        <Modal
          title={title}
          width={width}
          destroyOnClose={true}
          wrapClassName="vertical-center-modal"
          visible={visible}
          onOk={this.ok}
          confirmLoading={confirmLoading}
          onCancel={this.hide}
        >
          <Form
            data={data}
            span={20}
            subunitBtn={false}
            formItemLayout={formItemLayout}
            tailFormItemLayout={tailFormItemLayout}
            ref="form" />
        </Modal>

      </div>

    )
  }
}

FormModal.defaultProps = {
  title: "标题",
  width: "520px",
  visible:false,  //可见性
  confirmLoading: false, //是否加载中
  submitUrl: "", //数据提交的地址
  updateUrl:"", //更新的接口
  submitCallback:()=>{}, //提交后的回调函数
  data: [], //数据列表
  ok:()=>{}, //点击确定执行的事件
  destroyOnClose: true, //关闭时是否删除内容
  formItemLayout:{
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    }
  },
  tailFormItemLayout:{
    wrapperCol:{
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 24,
        offset: 0,
      }
    }
  }
};

export default FormModal;
