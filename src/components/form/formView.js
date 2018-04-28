import React,{Component} from 'react';

import {Row,Col,Spin,Button} from 'antd';

class FormView extends Component{

  constructor(){
    super(...arguments);

    let {params,paramsUrl,loading,dataList,tableList} = this.props;


    this.state = {
      params,
      paramsUrl,
      loading,
      dataList,
      tableList,
      table:null
    }

  }

  componentDidMount(){
    this.refresh();
  }


  dataTolist = (result)=>{
    let {data} = this.props; //根据data渲染数据
    let dataList = [];
    for(var i=0;i<data.length;i++){
      dataList.push({
        label:data[i]["label"],
        value:(result[data[i]["name"]] || "--")
      })
    }
    return dataList;
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
      return <Table {...item.props} dataSource={item.dataSource} toolbar={false} action={false} check={false} key={i} />
    });

    this.setState({
      table:null
    },()=>{
      setTimeout(()=>{
        this.setState({table:tableList})
      })
    })

  }

  refresh = ()=>{
    let {params,paramsUrl} = this.state;
    if(params["id"]){
      this.load();
      window.uc.axios.post(paramsUrl, params)
      .then((result) => {
        let list = result.data;
        this.setTableData(list);
        this.setState({dataList:this.dataTolist(list)});
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
    let {loading,table} = this.state;
    let list = this.createList();
    return(
      <Spin spinning={loading}>
        <div>
          <Row gutter={50}>
            {list}
            {table === null?null:(
              <Col span={20} offset={4}>
                {table}
              </Col>
            )}
            {loading?null:(
              <Col span={20} offset={4}>
                <Button icon="reload" type="primary" onClick={this.refresh} style={{marginTop:24}}>刷新</Button>
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
  tableList:[], //表格数据
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
