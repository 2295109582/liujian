import React,{Component} from 'react';
import Table from "@c/table";
import Search from "@c/search";


export default class User extends Component{

  constructor(props){
    super(props);

    this.state = {
      columns:[
        { title: '分包公司名称', dataIndex: 'subunitName'},
        { title: '班组名称', dataIndex: 'teamName'},
        { title: '班组类别', dataIndex: 'teamSort',dic:"team_sort"},
        { title: '班组负责人', dataIndex: 'teamleader'},
        { title: '联系电话', dataIndex: 'teamTel'}
      ],
      url:"/payment/teamList",
      name:"teamName",
      data:[
        {
          type:"Subcontracting",
          name:"subunitId",
          labelName:"subunitName",
          label:"分包公司名称"
        },
        {
          type:"input",
          name:"teamName",
          label:"班组名称"
        },
        {
          type:"input",
          name:"teamleader",
          label:"班组负责人"
        },
        {
          type:"input",
          name:"teamTel",
          label:"联系电话"
        },
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
