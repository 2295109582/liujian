import React,{Component} from 'react';
import {message } from 'antd';
import Table from "@c/table";
import Search from "@c/search";


export default class User extends Component{

  constructor(props){
    super(props);

    this.state = {
      columns:[
        { title: 'K3业主单位编码', dataIndex: 'ownerCode'},
        { title: '业主单位名称', dataIndex: 'ownerName'},
      ],
      url:"/owner/show",
      data:[
        {
          type:"input",
          name:"ownerCode",
          label:"K3业主单位编码:"
        },
      ],
      formItemLayout:{
        labelCol: {xs: { span: 8 },sm: { span: 8 }},
        wrapperCol: {xs: { span: 8 },sm: { span: 16 }},
      },
      grid:{xs:24, sm:24, md:12, lg:12}
    }

  }

  setValue = (name)=>{  //调用设置值
    let {setFieldsValue} = this.props;
    let data = this.getSelections();

    if(data.length>1){
      message.warning('请选择一条数据!');
      return false;
    }
    let value = {
      [name]:data[0][name]
    };

    setFieldsValue&&setFieldsValue(value);
    return true;
  }



  getSelections = ()=>{  //获取table选中项
    let {table} = this.refs;
    return table.getSelections();
  }

  render(){

    let {data,formItemLayout,grid,columns,url} = this.state;

    return(
      <div>
        <Search
          data={data}
          formItemLayout={formItemLayout}
          grid={grid}
          click={()=>this.refs.table.refresh()}
          ref="search"
        />
        <Table
           url={url}
           columns={columns}
           queryParams={()=>this.refs.search.getData()}
           size="small"
           ref="table"
         />
      </div>

    )
  }
}
