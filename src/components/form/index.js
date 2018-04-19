import React,{Component} from 'react';
import {Form,Input,Checkbox,Radio,DatePicker,Select,Icon,Button,message,Row,Col,Divider,Modal,Spin} from 'antd';

import './index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

//form表单布局
class NormalForm extends Component {


  constructor(){
    super(...arguments);

    let {data,hideData,formItemLayout,tailFormItemLayout,formItemLayout2,tailFormItemLayout2} = this.props;

    this.state = {
      data,
      hideData,
      formItemLayout,
      tailFormItemLayout,
      formItemLayout2,
      tailFormItemLayout2,
      formClearData:window.uc.storage.get("formClearData"),  //提交后是否清空表单
      formSubmitPrompt:window.uc.storage.get("formSubmitPrompt"),  //提交时的确认
      formVisible:window.uc.storage.get("formVisible"), //隐藏的表单
      loading:false
    }

  //  this.list = this.createList(data);
  //  this.hideList = this.createList(hideData);
  }

  componentDidMount(){
    let {params,paramsUrl} = this.props;
    if(params["id"]){
      this.load();
      window.uc.axios.post(paramsUrl, params)
      .then((data) => {
        this.setFieldsValue(data.data);
        this.unload();
      })
    }

  }

  load = ()=>{
    this.setState({loading:true})
  }

  unload = ()=>{
    this.setState({loading:false})
  }

  nullToUndefined = (data)=>{
    let result = {...data};
    for(var attr in result){
      if(result[attr] === null){
        result[attr] = undefined;
      }
    }
    return result;
  }

  setFieldsValue = (values)=>{ //设置值
    let { form } = this.props;
    let result = this.nullToUndefined(values);
    form.setFieldsValue(result);
  }

  setCheck = (attr)=>{  //勾选设置，保存到本地
    this.setState({
      [attr]:!this.state[attr]
    },()=>{
      window.uc.storage.set([attr],this.state[attr]);
    })
  }

  createList = (data) =>{   //创建列表

    let { getFieldDecorator } = this.props.form; //表单验证方法
    let {formItemLayout,tailFormItemLayout,formItemLayout2,tailFormItemLayout2} = this.state;
    var list = data.map((item,index)=>{  //根据传进来的数据进行遍历渲染不同的组件
      var formItemCom;  //组件变量
      var readOnly;
      if(item.readOnly === "true"){readOnly = true;}

      switch (item.type) {
        case "datePicker":   //日期
          formItemCom =  (<DatePicker format={item.moment} style={{width:'100%'}} />) ;
          break;
        case "select":   //选择框
          let options = item.options.map((optionsItem,optionsi)=>{
              return <Select.Option key={optionsi} value={optionsItem.value}>{optionsItem.label}</Select.Option>
          })
          formItemCom =  (<Select style={{width:'100%'}}>{options}</Select>) ;
          break;
        case "textarea":  //文本框
          formItemCom =  (<TextArea readOnly={readOnly} placeholder="写点什么吧!" autosize={{ minRows: 4, maxRows: 6 }}  />) ;
          break;
        case "check":  //复选框
          formItemCom =  (<CheckboxGroup readOnly={readOnly} className="clearfix" options={item.options} />) ;
          break;
        case "radio":  //单选框
          formItemCom =  (<RadioGroup readOnly={readOnly} options={item.options} />) ;
          break;
        default:
          formItemCom =  (<Input placeholder={item.placeholder} prefix={item.icon&&<Icon type={item.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size={item.size} readOnly={readOnly} />) ;
      }
      //条件验证
      let defaultRules = [];
      if(item.type === "textarea"){
        defaultRules = [{max:255,message: "不能超过255个字符"}];
      }else if(item.type === undefined || item.type === "input"){
        defaultRules = [{max:18,message: "不能超过18个字符"}];
      }
      let r = item.rules || [];
      r.forEach((ritem,i)=>{
        if(ritem.required){
          r[i].message = `${item.label}是必须！`;
        }
      })
      let rules = [...r,...defaultRules]

      return (               //返回每一项表单,设置验证规则,都是父级传进来
        <Col span={10} key={index} offset={1} style={{minHeight:64}}>
          <FormItem  {...formItemLayout} label={item.label}>
            {getFieldDecorator(item.name, {rules})(formItemCom)}
          </FormItem>
        </Col>
      )
    });

    return list;

  }




  render() {
    //如果不在这个方法里面写渲染列表,则更改数据较为麻烦,输入框内容不会被改变
    let { data,hideData ,formClearData,formSubmitPrompt,formVisible,loading} = this.state; //获取传进来的数据

    return (
      <Spin spinning={loading}>
        <div style={{padding:'30px 0'}}>
          <Form>
            <Row gutter={50}>
              {this.createList(data)}
              {hideData.length>1?(
                <Col span={18} offset={4}>
                  <Divider>
                    <a onClick={()=>{this.setCheck("formVisible")}}>
                      {formVisible?<div>收起<Icon type="up" /></div>:<div>更多信息<Icon type="down" /></div>}
                    </a>
                  </Divider>
                </Col>
              ):null}
              <Col span={24}  style={{display:(formVisible===true?'block':'none')}}>
                <Row gutter={50}>
                  {this.createList(hideData)}
                </Row>
              </Col>
              <Col span={10} offset={4} style={{marginTop:20}}>
                <Button type="primary" icon="check-circle-o" onClick={this.props.save} style={{marginRight:24}} loading={this.props.submitLoading}>提交</Button>
                <div style={{marginTop:30}}>
                  <Checkbox onChange={()=>{this.setCheck("formSubmitPrompt")}} checked={formSubmitPrompt}>提交确认</Checkbox>
                  <Checkbox onChange={()=>{this.setCheck("formClearData")}} checked={formClearData}>提交后清空表单数据</Checkbox>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Spin>
    );
  }
}
//包装过的带有验证的form表单
const WrappedNormalForm = Form.create()(NormalForm);

class AppForm extends Component{


  constructor(){
    super(...arguments);

    let {submitLoading} = this.props;
    this.state = {
      submitLoading
    }

  }

  load = ()=>{
    this.setState({submitLoading:true})
  }

  unload = ()=>{
    this.setState({submitLoading:false})
  }


  confirm = (fn)=>{
    Modal.confirm({
      title: "确定提交吗？",
      okText: '确定',
      cancelText: '取消',
      onOk() {
        fn&&fn();
        // return new Promise((resolve, reject) => {
        //   fn(resolve);
        // });
      }
    });
  }



  save = ()=>{
    this.doSubmit((values)=>{
      let formSubmitPrompt = window.uc.storage.get("formSubmitPrompt");
      if(formSubmitPrompt){
        this.confirm(()=>{
          this.savefn(values);
        });
      }else{
        this.savefn(values);
      }
    });

  }

  savefn = (values)=>{
    let {submitUrl,params} = this.props;
    let data = {...values};
    if(params["id"]){
      data = {...params,...data}
    }
    this.load();
    window.uc.axios.post(submitUrl, data)
    .then((data) => {
      let formClearData = window.uc.storage.get("formClearData");   //表单添加后清空数据
      if(formClearData){ this.resetFields(); };
      this.unload();
      message.info(data.msg);
    })
  }


  //主动提交表单
  doSubmit =(fn)=>{
    var {form} = this.refs;
    form.validateFields((err, values) => {
        if (err) {return err}; //如果有错误就阻止提交
        fn&&fn(values);
    });
  }

  resetFields = ()=>{  //表单重置
    var {form} = this.refs;
    form.resetFields();
  }



  render(){
    let {submitLoading} = this.state;
    let { url, data, callback,hideData,formItemLayout,tailFormItemLayout,formItemLayout2,tailFormItemLayout2,params,paramsUrl} = this.props;
    return(
      <div>
        <WrappedNormalForm
          ref="form"
          setIscarryOn={this.setIscarryOn}
          url={url}
          save={this.save}
          data={data}
          params={params}
          paramsUrl={paramsUrl}
          hideData={hideData}
          callback={callback}
          formItemLayout={formItemLayout}
          formItemLayout2={formItemLayout2}
          tailFormItemLayout2={tailFormItemLayout2}
          tailFormItemLayout={tailFormItemLayout}
          submitLoading={submitLoading}
          />
      </div>
    )
  }
}

AppForm.defaultProps = {
  url: "", //服务器获取参数的地址
  data: [],  //自己写进去的数据
  hideData:[],  //默认隐藏的数据
  params:{}, //查询条件
  paramsUrl:"", //查询地址
  submitUrl: "", //数据提交的地址
  submitLoading:false,  //提交状态
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
        span: 16,
        offset: 8,
      }
    }
  },
  formItemLayout2:{
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    }
  },
  tailFormItemLayout2:{
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
  },
  callback: () => {}
};

export default AppForm;
