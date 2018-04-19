import React,{Component} from 'react';
import {Form,Input,DatePicker,Select,Icon,Row,Col,Button} from 'antd';
import Query from '@c/query';
const FormItem = Form.Item;
const Search = Input.Search;

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


  handleSubmit = (e) => {
    let {handleSubmit} = this.props;
    handleSubmit(e);
    e.preventDefault();
  }

  createList = ()=>{
      let { getFieldDecorator } = this.props.form; //表单验证方法
      let { dis } = this.state;
      let { data,formItemLayout, grid } = this.props; //获取传进来的数据

      let list = data.map((item,index)=>{  //根据传进来的数据进行遍历渲染不同的组件
        let formItemCom;  //组件变量
        switch (item.type) {
          case "input":  //输入框 默认项
            formItemCom =  (<Input placeholder='请输入' prefix={item.icon&&<Icon type={item.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size={item.size} />) ;
            break;
          case "datePicker":   //日期
            formItemCom =  (<DatePicker format={item.moment} style={{width:'100%'}} />) ;
            break;
          case "select":   //选择框
            let options = item.options.map((optionsItem,optionsi)=>{
                return <Select.Option key={optionsi}  value={optionsItem.value}>{optionsItem.label}</Select.Option>
            })
            formItemCom =  (<Select placeholder="请选择" style={{width:'100%'}}>{options}</Select>) ;
            break;
          default:
            formItemCom =  (<Search placeholder="请选择或输入" enterButton onSearch={(value) => {this.refs.query.show(item.label,item.type,item.name)}}  style={{ width: '100%' }}  />) ;
        }


        return (               //返回每一项表单,设置验证规则,都是父级传进来
          <FormItem key={index} {...formItemLayout} label={item.label}>
            {getFieldDecorator(item.name)(formItemCom)}
          </FormItem>
        )
      });


      let layoutList = [];  //列表集合,布局部分

      for(var i=0;i<list.length;i++){
        layoutList.push(
          <Col key={i} {...grid} style={{display:(i>1?dis:null)}}>
            {list[i]}
          </Col>
        )
      }

    return layoutList;

  }




  render() {
    //如果不在这个方法里面写渲染列表,则更改数据较为麻烦,输入框内容不会被改变
    let { dis } = this.state;
    let { data,search,reset, grid,setFieldsValue } = this.props; //获取传进来的数据

    return (
      <div>
        <Form className='form' layout={'horizontal'} onSubmit={this.handleSubmit}>
          <Row gutter={48}>
            {this.createList()}
            <Col {...grid}>
              <div style={{paddingTop:5,marginBottom:24}}>
                <Button onClick={search} type="primary" style={{marginRight:8}}>查询</Button>
                <Button onClick={reset} style={{marginRight:8}}>重置</Button>
                {data.length>2?(
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
        <Query ref="query" setFieldsValue={setFieldsValue} />
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


  //设置值
  setFieldsValue = (valuse)=>{
    var {form} = this.refs;
    form.setFieldsValue(valuse);
  }

  //主动提交表单
  doSubmit =(fn)=>{
    var {form} = this.refs;
    form.validateFields((err, values) => {
        if (err) {return err}; //如果有错误就阻止提交
        fn&&fn(values);
    });
  }

  render(){
    let {data,formItemLayout,grid} = this.props;


    return(
      <div className="searchWrap">
        <WrappedNormalForm
          data={data}
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
