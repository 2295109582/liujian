import React,{Component} from 'react';
import Table from "@c/table";
import Search from "@c/search";


export default class User extends Component{

  constructor(props){
    super(props);

    this.state = {
      columns:[
        { title: "K3工程编码",dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "业主单位", dataIndex: "ownerName"},
        { title: "工程性质", dataIndex: "pronature",dic:"pronature_type"},
      ],
      url:"/project/show",
      name:"proName",
      data:[
        {
          type: "input",
          name: "proNo",
          label: "K3工程编码"
        },
        {
          type: "input",
          name: "proName",
          label: "工程名称"
        },
        {
          type: "input",
          name: "ownerName",
          label: "业主单位"
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
