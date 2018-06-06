import React,{Component} from 'react';
import Table from "@c/table";
import Search from "@c/search";


export default class User extends Component{

  constructor(props){
    super(props);

    this.state = {
      columns:[
        { title: "职位名称",dataIndex: "positionName"},
        { title: "上级职位名称", dataIndex: "leadName"},
        { title: "职位描述", dataIndex: "positionDescribe"}
      ],
      url:"/role/showPosition",
      name:"positionName",
      data:[
        {
          type: "input",
          name: "positionName",
          label: "职位名称"
        }
      ],
      formItemLayout:{
        labelCol: {xs: { span: 8 },sm: { span: 8 }},
        wrapperCol: {xs: { span: 8 },sm: { span: 16 }},
      },
      grid:{xs:24, sm:24, md:12, lg:12}
    }

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
          visibleLen={0}
          click={()=>this.refs.table.refresh()}
          ref="search"
        />
        <Table
           url={url}
           columns={columns}
           scroll={false}
           action={false}
           toolbar={{delete:false}}
           queryParams={()=>this.refs.search.getData()}
           size="small"
           ref="table"
         />
      </div>

    )
  }
}
