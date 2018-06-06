import React,{Component} from 'react';
import {Form as AppForm,Input,Checkbox,Radio,DatePicker,Select,Icon,Button,message,Row,Col,Divider,Modal,Spin} from 'antd';
import Query from '@c/query';
import moment from 'moment';
import './index.css';

const FormItem = AppForm.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const { MonthPicker } = DatePicker;
//form表单布局
class NormalForm extends Component {


  constructor(){
    super(...arguments);

    let {formItemLayout,tailFormItemLayout} = this.props;

    this.state = {
      formItemLayout,
      tailFormItemLayout,
      formClearData:window.uc.storage.get("formClearData"),  //提交后是否清空表单
      formSubmitPrompt:window.uc.storage.get("formSubmitPrompt"),  //提交时的确认
      formVisible:window.uc.storage.get("formVisible") //隐藏的表单
    }

  }

  componentDidMount(){
    this.setData(()=>this.defaultValue());
  }


  defaultValue = ()=>{
    let {data,hideData} = this.props;
    let currentData = [...data,...hideData];
    let values = {};
    currentData.forEach((item,i)=>{
      if(item.defaultValue!==undefined){
        values[item.name] = item.defaultValue;
      }
    })
    this.setFieldsValue(values);
  }

  setData = (fn)=>{
    let {params,paramsUrl,setCallback} = this.props;
    if(params["id"]){
      this.load();
      window.uc.axios.post(paramsUrl, params)
      .then((data) => {
        if(data.status === 200){
          let list = data.data;
          setCallback&&setCallback(list);
          this.props.setTableData(list);
          this.setFieldsValue(list);
          fn&&fn();
        }
        this.unload();
      })
    }else{
      this.props.setTableData();
      fn&&fn();
    }
  }

  load = ()=>{
    this.props.load();
  }

  unload = ()=>{
    this.props.unload();
  }

  deleteNull = (data)=>{
    let result = {...data};
    for(var attr in result){
      if(result[attr] === null){
        delete result[attr];
      }
      if(result[attr] !== undefined && result[attr].constructor === Array){
        delete result[attr];
      }
      if(typeof result[attr] === "number"){
        result[attr] = result[attr].toString();
      }
    }
    return result;
  }




  setFieldsValue = (values)=>{ //设置值
    let { form } = this.props;

    let { data,hideData } = this.props;
    let allData = [...data,...hideData];

    allData.forEach((item,i)=>{
      if(item.type === "datePicker" && values[item["name"]]){
        values[item["name"]] = moment(values[item["name"]], 'YYYY-MM-DD');
      }

      if(item.type === "monthPicker" && values[item["name"]]){
        values[item["name"]] = moment(values[item["name"]], 'YYYY-MM');
      }

    });

    let result = this.deleteNull(values);
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
    let {formItemLayout} = this.state;
    let {span} = this.props;
    var list = data.map((item,index)=>{  //根据传进来的数据进行遍历渲染不同的组件
      var formItemCom;  //组件变量
      let isreadonly = {};
      if(item.readonly === true){
        isreadonly.isreadonly = "true";
      }
      switch (item.type) {
        case "input":   //输入框
          formItemCom =  (<Input readOnly={item.readonly} {...isreadonly} onChange={item.change} placeholder={item.placeholder} prefix={item.icon&&<Icon type={item.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size={item.size} />) ;
          break;
        case "amount":   //金额框
          formItemCom =  (<Input readOnly={item.readonly} {...isreadonly} onChange={item.change} placeholder={item.placeholder} prefix={item.icon&&<Icon type={item.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size={item.size} />) ;
          break;
        case "negativeAmount":   //金额框,可以输入负数
          formItemCom =  (<Input readOnly={item.readonly} {...isreadonly} onChange={item.change} placeholder={item.placeholder} prefix={item.icon&&<Icon type={item.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size={item.size} />) ;
          break;
        case "datePicker":   //日期
          formItemCom =  (<DatePicker format={item.moment} style={{width:'100%'}} {...isreadonly} disabled={item.readonly} />) ;
          break;
        case "monthPicker":  //日期  选择月
          formItemCom =  (<MonthPicker style={{width:'100%'}} {...isreadonly} disabled={item.readonly} />) ;
          break;
        case "select":   //选择框
          let selectData = item.options || window.uc.dic(item.dic);
          let options = selectData.map((optionsItem,optionsi)=>{
              return <Select.Option key={optionsi} value={optionsItem.value}>{optionsItem.label}</Select.Option>
          })
          formItemCom =  (<Select style={{width:'100%'}} disabled={item.readonly} onChange={item.change}>{options}</Select>) ;
          break;
        case "textarea":  //文本框
          formItemCom =  (<TextArea readOnly={item.readonly}  placeholder={item.placeholder} autosize={{ minRows: 4, maxRows: 6 }}  />) ;
          break;
        case "check":  //复选框
          formItemCom =  (<CheckboxGroup readOnly={item.readonly} className="clearfix" options={item.options} />) ;
          break;
        case "radio":  //单选框
          let radioData = window.uc.dic(item.dic);
          formItemCom =  (<RadioGroup readOnly={item.readonly} options={radioData} />) ;
          break;
        default:
          formItemCom = "queryComponent";  //不是就定义成查询组件；
      }
      //条件验证
      let defaultRules = [];
      if(item.type === "textarea"){
        defaultRules = [{max:255,message: "不能超过255个字符"}];
      }else if(item.type === "input"){
        defaultRules = [{max:30,message: "不能超过30个字符"}]; //{pattern:/^[a-zA-Z0-9-+*/=@""''^&,()$#%!\\.“”￥（）、，！。_\u4e00-\u9fa5]+$/,message:"不能含有特殊字符！"}
      }else if(item.type === "amount"){
        defaultRules = [{max:30,message: "不能超过30个字符"},{pattern:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,message:"任意正整小数(小数位不超过2位)！"}];
      }else if(item.type === "negativeAmount"){
        defaultRules = [{max:30,message: "不能超过30个字符"},{pattern:/(^(-)?[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,message:"任意正负小数(小数位不超过2位)！"}];
      }
      let r = item.rules || [];
      r.forEach((ritem,i)=>{
        if(ritem.required){
          r[i].message = `${item.label}是必须！`;
        }
      })

      let rules = [...r,...defaultRules];


      if(formItemCom === "queryComponent"){
        return (
          <Col span={span} key={index} offset={1} style={{minHeight:64,display:(item.visible===false?'none':'block')}}>
            <Query
              getFieldDecorator={getFieldDecorator}
              setFieldsValue={this.setFieldsValue}
              formItemLayout={formItemLayout}
              callback={item.callback}
              readonly={item.readonly}
              params={item.params}
              type={item.type} //组件类型
              label={item.label}  //提示名
              labelName={item.labelName}  //显示的名字name
              name={item.name}
              rules={rules}
             />
          </Col>
        )
      }

      return (               //返回每一项表单,设置验证规则,都是父级传进来
        <Col span={span} key={index} offset={1} style={{minHeight:64,display:(item.visible===false?'none':'block')}}>
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
    let { data,hideData} = this.props; //获取传进来的数据
    let { formVisible} = this.state;
    return (
      <div>
        <AppForm>
          <Row gutter={50}>
            {this.createList(data)}
            {hideData.length>0?(
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
          </Row>
        </AppForm>
      </div>
    );
  }
}
//包装过的带有验证的form表单
const WrappedNormalForm = AppForm.create()(NormalForm);



class Form extends Component{


  constructor(){
    super(...arguments);

    let {submitLoading,loading,tableList} = this.props;

    this.tables = {};

    this.state = {
      submitLoading,
      loading,
      tableList,
      table:null
    }

  }

  // componentDidMount(){
  //   this.setTableData();
  // }

  saveTableData = (key,value)=>{   //保存表格数据
    this.tables[key] = [...value];
  }

  setTableData = (data)=>{  //表格数据回填
    if(data){
      let tableList = [...this.state.tableList];
      tableList.forEach((item,i)=>{
        tableList[i]["dataSource"] = data[item['name']]
      });
      this.setState({
        tableList
      },()=>{
        this.setTableList();
      })
    }else{
      this.setTableList();
    }
  }

  setTableList = ()=>{    //生成表格
    let tableList = [...this.state.tableList];
    tableList = tableList.map((item,i)=>{
      let Table = item.view;
      return <Table {...item.props} ref={el=>this[item.name] = el} dataSource={item.dataSource} name={`${item.name}s`} saveTableData={this.saveTableData} key={i} />
    });

    this.setState({
      table:tableList
    })

  }

  btnLoad = ()=>{
    this.setState({submitLoading:true})
  }

  btnUnload = ()=>{
    this.setState({submitLoading:false})
  }

  load = ()=>{
    this.setState({loading:true})
  }

  unload = ()=>{
    this.setState({loading:false})
  }


  deleteNull = (data)=>{
    let result = {...data};
    for(var attr in result){
      if(result[attr] === null){
        delete result[attr];
      }
      if(result[attr] !== undefined && result[attr].constructor === Array){
        delete result[attr];
      }
      if(typeof result[attr] === "number"){
        result[attr] = result[attr].toString();
      }
    }
    return result;
  }

  setFieldsValue = (values={})=>{ //设置值
    let { form } = this.refs;
    let { data,hideData } = this.props;
    let allData = [...data,...hideData];

    allData.forEach((item,i)=>{

      if(item.type === "datePicker" && values[item["name"]]){
        values[item["name"]] = moment(values[item["name"]], 'YYYY-MM-DD');
      }
      if(item.type === "monthPicker" && values[item["name"]]){
        values[item["name"]] = moment(values[item["name"]], 'YYYY-MM');
      }
    });
    let list = this.deleteNull(values);
    form.setFieldsValue(list);
  }

  confirm = (fn)=>{
    Modal.confirm({
      title: "确定提交吗？",
      okText: '确定',
      cancelText: '取消',
      onOk() {
        fn&&fn();
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

    let {submitUrl,params,submitCallback,refresh} = this.props;

    let { tables } = this;

    let newTables = Object.assign({},tables);




    // for(var attr in newTables){
    //   newTables[attr].forEach((item,i)=>{
    //       delete newTables[attr][i].key;
    //   });
    // }

    let data = {...values,...newTables};
    if(params["id"]){
      data = {...params,...data}
    }

    for(var attr in data){
      if(data[attr] === undefined){
        delete data[attr];
      };
      if(data[attr] !== undefined && data[attr].constructor === Array){
        data[attr] = JSON.stringify(data[attr]);
      }

    }

    this.btnLoad();
    window.uc.axios.post(submitUrl, data)
    .then((data) => {
      if(data.status === 200){
        let formClearData = window.uc.storage.get("formClearData");   //表单添加后清空数据
        if(data&&formClearData){ this.resetFields(); };
        message.info(data.msg);
        submitCallback();
        refresh();
      }
      this.btnUnload();
    })
    .catch(()=>{
      this.btnUnload();
    })
  }


  //主动提交表单
  doSubmit =(fn)=>{
    var {form} = this.refs;
    form.validateFields((err, fieldsValue) => {
        if (err) {return err}; //如果有错误就阻止提交

        let { data,hideData } = this.props;
        let allData = [...data,...hideData];


        allData.forEach((item,i)=>{
          if(item.type === "datePicker" && fieldsValue[item["name"]]){
            fieldsValue[item["name"]] =  fieldsValue[item["name"]].format('YYYY-MM-DD');
          }

          if(item.type === "monthPicker" && fieldsValue[item["name"]]){
            fieldsValue[item["name"]] = fieldsValue[item["name"]].format('YYYY-MM');
          }

        });
        fn&&fn(fieldsValue);
    });
  }

  getData = ()=>{
    let value;
    this.doSubmit((values)=>{
      value = values;
    });
    return value;
  }


  resetFields = ()=>{  //表单重置
    let { form } = this.refs;
    let { tableList } = this.state;
    for(var i=0;i<tableList.length;i++){
      this[tableList[i]["name"]].removeData();
    }
    form.resetFields();
  }



  render(){
    let {submitLoading,loading,table} = this.state;
    let { data, callback,hideData,formItemLayout,tailFormItemLayout,params,paramsUrl,subunitBtn,span,setCallback} = this.props;
    return(
      <div style={{padding:(subunitBtn===true?'30px 0':'0')}}>
        <Spin spinning={loading}>
          <WrappedNormalForm
            ref="form"
            setTableData={this.setTableData}
            load={this.load}
            unload={this.unload}
            span={span}
            save={this.save}
            data={data}
            params={params}
            paramsUrl={paramsUrl}
            hideData={hideData}
            callback={callback}
            setCallback={setCallback}
            formItemLayout={formItemLayout}
            tailFormItemLayout={tailFormItemLayout}
            />
            <Row gutter={50}>
              <Col span={18} offset={4}>
                {table}
              </Col>
              {subunitBtn===true?(
                <Col span={18} offset={4} style={{marginTop:24,textAlign:'right'}}>
                  <Button type="primary" icon="check-circle-o" onClick={this.save} loading={submitLoading}>提交</Button>
                </Col>
              ):null}
            </Row>
        </Spin>
      </div>
    )
  }
}


//<Checkbox onChange={()=>{this.setCheck("formSubmitPrompt")}} checked={formSubmitPrompt}>提交确认</Checkbox>
//<Checkbox onChange={()=>{this.setCheck("formClearData")}} checked={formClearData}>提交后清空表单数据</Checkbox>


Form.defaultProps = {
  url: "", //服务器获取参数的地址
  data: [],  //自己写进去的数据
  hideData:[],  //默认隐藏的数据
  subunitBtn:true,
  params:{}, //查询条件
  paramsUrl:"", //查询地址
  submitUrl: "", //数据提交的地址
  loading:false, //加载状态
  submitLoading:false,  //提交状态
  tableList:[], //内嵌的表格
  submitCallback:()=>{}, //提交后的回调函数
  setCallback:()=>{},  //网络获取数据后的回调函数
  refresh:()=>{}, //执行父级传入的刷新方法
  span:10, //24/10
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
  callback: () => {}
};

export default Form;
