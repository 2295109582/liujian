import React,{Component} from 'react';
import {Form,Input,DatePicker,Select,Icon,Row,Col,Button} from 'antd';
import Query from '@c/query';
const FormItem = Form.Item;
const { MonthPicker } = DatePicker;
//form表单布局
class NormalForm extends Component {


  constructor(){
    super(...arguments);

    this.state = {
      dis:'none'
    }

  }

  toggleForm = ()=>{
    let {dis} = this.state;
    this.setState({
      dis:(dis==='none'?'block':'none')
    })
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
    }
    return result;
  }

  setFieldsValue = (values)=>{ //设置值
    let { form } = this.props;
    let result = this.deleteNull(values);
    form.setFieldsValue(result);
  }

  handleSubmit = (e) => {
    let {handleSubmit} = this.props;
    handleSubmit(e);
    e.preventDefault();
  }


  createData = (newData,visible)=>{
    let { getFieldDecorator } = this.props.form; //表单验证方法
    let { dis } = this.state;
    let { formItemLayout, grid,visibleLen } = this.props; //获取传进来的数据

    let list = newData.map((item,index)=>{  //根据传进来的数据进行遍历渲染不同的组件
      let formItemCom;  //组件变量
      switch (item.type) {
        case "input":  //输入框 默认项
          formItemCom =  (<Input placeholder='请输入'  prefix={item.icon&&<Icon type={item.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size={item.size} />) ;
          break;
        case "datePicker":   //日期
          formItemCom =  (<DatePicker  style={{width:'100%'}} placeholder={item.placeholder} />) ;
          break;
        case "monthPicker":  //日期  选择月
          formItemCom =  (<MonthPicker  style={{width:'100%'}} placeholder={item.placeholder} />) ;
          break;
        case "select":   //选择框
          let selectData = item.options || window.uc.dic(item.dic);
          let options = selectData.map((optionsItem,optionsi)=>{
              return <Select.Option key={optionsi}  value={optionsItem.value}>{optionsItem.label}</Select.Option>
          })
          formItemCom =  (<Select placeholder="请选择" onChange={item.change} style={{width:'100%'}}>{options}</Select>) ;
          break;
        default:
          formItemCom = "queryComponent";  //不是就定义成查询组件；
      }

      let rules = [];

        //rules.push({pattern:/^[a-zA-Z0-9-+*/=@""''^&,()$#%!\\.“”￥（）、，！。_\u4e00-\u9fa5]+$/,message:"不能含有特殊字符！"});

      if(formItemCom === "queryComponent"){
        return (
          <Col {...grid} key={index}  style={{display:(visible || index>visibleLen?dis:null),minHeight:64}}>
            <Query
              getFieldDecorator={getFieldDecorator}
              setFieldsValue={this.setFieldsValue}
              formItemLayout={formItemLayout}
              readonly={item.readonly}
              type={item.type} //组件类型
              label={item.label}  //提示名
              labelName={item.labelName}  //显示的名字name
              labelValue={item.labelValue}   //显示的名字值
              name={item.name}
              rules={rules}
             />
          </Col>
        )
      }


      return (               //返回每一项表单,设置验证规则,都是父级传进来
        <Col key={index} {...grid} style={{display:(visible || index>visibleLen?dis:null),minHeight:64}}>
          <FormItem {...formItemLayout} label={item.label}>
            {getFieldDecorator(item.name,{rules})(formItemCom)}
          </FormItem>
        </Col>
      )
    });


    return list;
  }

  createList = ()=>{
      let { data } = this.props; //获取传进来的数据
      let newData = [];
          data.forEach((item,i)=>{
            if(item.visible || item.visible === undefined){
              newData.push(item);
            }
          })
      return this.createData(newData);

  }

  createVisibleLit = ()=>{
    let { data } = this.props; //获取传进来的数据
    let newData = [];
        data.forEach((item,i)=>{
          if(item.visible === false){
            newData.push(item);
          }
        })
    return this.createData(newData,'none');
  }



  render() {
    //如果不在这个方法里面写渲染列表,则更改数据较为麻烦,输入框内容不会被改变
    let { dis } = this.state;
    let { data,search,reset, grid,visibleLen } = this.props; //获取传进来的数据

    return (
      <div>
        <Form className='form' layout={'horizontal'} onSubmit={this.handleSubmit}>
          <Row gutter={48}>
            {this.createVisibleLit()}
            {this.createList()}
            <Col {...grid}>
              <div style={{paddingTop:5,marginBottom:24}}>
                <Button onClick={search} type="primary" style={{marginRight:8}}>查询</Button>
                <Button onClick={reset} style={{marginRight:8}}>重置</Button>
              {data.length>visibleLen&&data.length>=2?(
                  <a style={{ marginRight: 8 }} onClick={this.toggleForm}>
                      {dis==='none'?'展开':'收起'}
                       <Icon type={dis==='none'?'down':'up'} />
                  </a>
                ):null}
              </div>
            </Col>
          </Row>
          <Button htmlType="submit" style={{display:'none'}}></Button>
        </Form>
      </div>

    );
  }
}
//包装过的带有验证的form表单
const WrappedNormalForm = Form.create()(NormalForm);

class AppSearch extends Component{

  search=()=>{
    let {search,click} = this.props;
    search(this.getData());
    click();
  }

  reset = ()=>{
    let {reset,click} = this.props;
    reset(this.getResetData());
    click();
  }

  handleSubmit = (e)=>{
    this.search();
  }

  getData=()=>{ //返回搜索数据
    let val;
    this.doSubmit((values)=>{val = values})
    return val;
  }

  getResetData=()=>{ //返回重置数据
    var {form} = this.refs;
        form.resetFields();
    let val;
        this.doSubmit((values)=>{val = values})
    return val;
  }

  deleteNull = (data)=>{
    let result = {...data};
    for(var attr in result){
      if(result[attr] === null){
        delete result[attr];
      }
    }
    return result;
  }

  componentDidMount(){
    this.defaultValue();
  }

  defaultValue = ()=>{
    let {data} = this.props;
    let currentData = [...data];
    let values = {};
    currentData.forEach((item,i)=>{
      if(item.defaultValue!==undefined){
        values[item.name] = item.defaultValue;
      }
    })
    this.setFieldsValue(values);
  }


  setFieldsValue = (values)=>{ //设置值
    let { form } = this.refs;
    let result = this.deleteNull(values);
    form.setFieldsValue(result);
  }

  //主动提交表单
  doSubmit =(fn)=>{
    var {form} = this.refs;

    form.validateFields((err, fieldsValue) => {
        if (err) {return err}; //如果有错误就阻止提交

        let {data} = this.props;

        data.forEach((item,i)=>{
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

  getDataLen = ()=>{
    let { data } = this.props; //获取传进来的数据
    let len = 0;
    data.forEach((item,i)=>{
      if(!(item.visible === false)){
        len++;
      }
    })
    return len;
  }

  render(){
    let {data,formItemLayout,grid,visibleLen} = this.props;
    return(
      <div className="searchWrap" style={{display:(this.getDataLen() === 0?'none':'block')}}>
        <WrappedNormalForm
          data={data}
          visibleLen={visibleLen}
          handleSubmit={this.handleSubmit}
          search={this.search}
          reset={this.reset}
          setFieldsValue={this.setFieldsValue}
          formItemLayout={formItemLayout}
          grid={grid}
          ref="form"
        />
      </div>
    )
  }
}

AppSearch.defaultProps = {
  search:()=>{},  //点击搜索执行的事件
  reset:()=>{},  //点击重置执行的事件
  click:()=>{}, //点击搜索和重置都执行的事件
  initvisible:2, //初始可见两项
  visibleLen:1, //可见的默认项
  visible:false, //初始展开两项
  url:"",  //获取数据的地址
  data:[],  //自己定义的参数
  formItemLayout:{
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  },
  grid:{xs:24, sm:12, md:12, lg:8}
};


export default AppSearch;
