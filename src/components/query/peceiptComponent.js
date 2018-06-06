import React,{Component} from 'react';
import Table from "@c/table";
import Search from "@c/search";


export default class User extends Component{

  constructor(props){
    super(props);

    this.state = {
      columns:[
        { title: 'K3工程编码', dataIndex: 'proNo'},
        { title: '工程名称', dataIndex: 'proName'},
        { title: '业主单位名称', dataIndex: 'ownerName'},
        { title: '内部单位', dataIndex: 'area',dic:"area_sort"},
        // { title: '工程造价', dataIndex: 'procost'},
        // { title: '计税方式', dataIndex: 'taxsetMode'},
        // { title: '累计已开票金额(元)', dataIndex: 'invAmount'},
        // { title: '累计收款金额(元)', dataIndex: 'recAmount'}
      ],
      url:"/receipt/proDetail",
      name:"proName",
      data:[
        {
          type:"input",
          name:"proNo",
          label:"K3工程编码"
        },
        {
          type:"input",
          name:"proName",
          label:"工程名称"
        },
        {
          type:"input",
          name:"ownerName",
          label:"业主单位"
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
           toolbar={{delete:false}}
           action={false}
           queryParams={()=>this.refs.search.getData()}
           size="small"
           ref="table"
         />
      </div>

    )
  }
}
