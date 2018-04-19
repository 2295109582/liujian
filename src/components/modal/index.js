import React,{Component} from 'react';
import {Modal} from 'antd';

class AppModal extends Component{

  constructor(){
    super(...arguments);

    var {visible,title} = this.props;

    this.state={
      visible,
      title
    }
  }

  show=(title)=>{
    this.setState({
      title,
      visible: true,
    })
  }

  handleOk=(e)=>{
    let {onOk} = this.props;
    if(onOk()){
      this.handleCancel()
    }

  }

  handleCancel=(e)=>{
    this.setState({visible: false})
  }

  render(){
    var {title,visible} = this.state;
    var {width,destroyOnClose} = this.props;
    return(
      <Modal
        width={width}
        title={title}
        destroyOnClose={destroyOnClose}
        wrapClassName="vertical-center-modal"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        {this.props.children}
      </Modal>
    )
  }
}


AppModal.defaultProps = {
  width:"520px",
  destroyOnClose:true, //关闭时销毁内容
  visible:false,  //可见性
  title:null,  //标题
  onOk:()=>false  //返回true就关闭弹出层
}

export default AppModal;