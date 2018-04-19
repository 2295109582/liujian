import React,{Component} from 'react';

import {Row,Col,Spin,Button} from 'antd';

class FormView extends Component{

  constructor(){
    super(...arguments);

    let {params,paramsUrl,loading,dataList} = this.props;

    this.state = {
      params,
      paramsUrl,
      loading,
      dataList
    }

  }

  componentDidMount(){
    this.refresh();
  }


  dataTolist = (result)=>{
    let {data} = this.props; //根据data渲染数据
    let dataList = [];



    for(var i=0;i<data.length;i++){
      console.log(data[i])
      dataList.push({
        label:data[i]["label"],
        value:(result[data[i]["name"]] || "--")
      })
    }

//     let data2 = [
//       {label: "用户编号",value:"15566399"},
//       {label: "用户名称",value:"阿凡达"},
//       {label: "用水地址",value:"仓山区"},
//       {label: "水费年月",value:"2018-10-10"},
//       {label: "用户角色",value:"部门管理员，收费员"},
//       {label: "是否允许登录",value:"是"},
//       {label: "备注",value:`详解springmvc 接收json对象的两种方式
// 原生js编写基于面向对象的分页组件`},
//       {label: "电话号码",value:"188-8888-8888"},
//       {label: "身份证号码",value:"51303019991010"}
//     ]



    return dataList;

  }

  refresh = ()=>{
    let {params,paramsUrl} = this.state;
    if(params["id"]){
      this.load();
      window.uc.axios.post(paramsUrl, params)
      .then((result) => {
        this.setState({dataList:this.dataTolist(result.data)});
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


  createList = ()=>{
    let {dataList} = this.state;

    let list = dataList.map&&dataList.map((item,i)=>{
      return (
        <Col span={10} key={i} offset={1} style={{minHeight:64}}>
          <Row>
            <Col span={8} className="ant-form-item-label">
              <label title={item.label}>{item.label}</label>
            </Col>
            <Col span={16} style={{ paddingTop: 10}}>{item.value===""?"--":item.value}</Col>
          </Row>
        </Col>
      )
    })

    return list;

  }

  render(){
    let {params,paramsUrl,loading} = this.state;
    let list = this.createList();
    return(
      <Spin spinning={loading}>
        <div>
          <Row gutter={50}>
            {list}
            {loading?null:(
              <Col span={20} offset={4}>
                <Button icon="reload" type="primary" onClick={this.refresh}>刷新</Button>
              </Col>
            )}
          </Row>
        </div>
      </Spin>
    )
  }
}

FormView.defaultProps = {
  params:{}, //查询条件
  paramsUrl:"", //查询地址
  loading:true,  //获取状态
  data:[],  //数据
  dataList:[], //渲染的数据列表
  formItemLayout:{
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    }
  }
}


export default FormView;
