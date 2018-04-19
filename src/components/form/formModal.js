import React,{Component} from 'react';
import { Modal,message } from 'antd';

import Form from "./index";



class FormModal extends Component{


  constructor(){
    super(...arguments);

    let { visible,submitUrl, confirmLoading,formItemLayout,tailFormItemLayout } = this.props;

    this.state = {
      visible,
      submitUrl,
      confirmLoading,
      formItemLayout,
      tailFormItemLayout
    }

  }

  //提交数据到地址
  ok = ()=>{
    var { form } = this.refs;
    form.doSubmit(values => {
      let _this = this;
      let { submitUrl } = _this.state;
      _this.setState({ confirmLoading: true }); //设置提交状态
      window.uc.axios.post(submitUrl, values)
        .then((data) => {
          message.info(data.msg);
          _this.setState({ visible: false, confirmLoading: false });
        })
        .catch(function(error) {
          _this.setState({ confirmLoading: false });
        });
    });
  }

  //设置表单显示
  show = (type)=>{
    this.setState({ visible: true });
  }
  //设置表单隐藏
  hide = ()=>{
    this.setState({visible:false})
  }

  //主动提交表单
  doSubmit =(fn)=>{
    var {form} = this.refs;
        form.c.doSubmit((values)=>{
          this.setState({confirmLoading:true})  //设置提交状态
          var _this = this; //this
          fn&&fn(values,function(callback){  //表单提交成功后回调函数,行参,调用是关闭页面
            _this.setState({visible:false,confirmLoading:false});
            callback&&callback(); //成功关闭后的回调函数
          })
        });
  }


  render(){
    let { visible, confirmLoading,formItemLayout,tailFormItemLayout} = this.state;
    let {url,data,title,width} = this.props;

    return(
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
          url={url}
          data={data}
          formItemLayout={formItemLayout}
          tailFormItemLayout={tailFormItemLayout}
          ref="form" />
      </Modal>
    )
  }
}

FormModal.defaultProps = {
  title: "标题",
  width: "520px",
  visible:false,  //可见性
  confirmLoading: false, //是否加载中
  url: "", //获取数据的地址
  submitUrl: "", //数据提交的地址
  data: [], //数据列表
  destroyOnClose: true, //关闭时是否删除内容
  formItemLayout:{
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    }
  },
  tailFormItemLayout:{
    wrapperCol:{
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      }
    }
  }
};

export default FormModal;
