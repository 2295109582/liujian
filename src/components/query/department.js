import React,{Component} from 'react';
import Table from "@c/table";
import Search from "@c/search";


export default class User extends Component{

  constructor(props){
    super(props);

    this.state = {
      columns:[
        { title: "部门名称 ", dataIndex: "departmentName"},
        { title: "部门简称", dataIndex: "shortName"},
        { title: "部门描述", dataIndex: "description"},
        { title: "部门邮箱", dataIndex: "officeEmail"},
      ],
      url:"/department/show",
      name:"departmentName",
      data:[
        {
          type: "input",
          name: "departmentName",
          label: "部门名称"
        },
        {
          type: "input",
          name: "shortName",
          label: "部门简称"
        },
        {
          type: "input",
          name: "officeTel",
          label: "部门联系电话"
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
           toolbar={{delete:false}}
           columns={columns}
           scroll={false}
           action={false}
           queryParams={()=>this.refs.search.getData()}
           size="small"
           ref="table"
         />
      </div>

    )
  }
}
