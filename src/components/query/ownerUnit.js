import React,{Component} from 'react';
import Table from "@c/table";
import Search from "@c/search";


export default class User extends Component{

  constructor(props){
    super(props);

    this.state = {
      columns:[
        { title: 'K3业主单位编码', dataIndex: 'ownerCode'},
        { title: '业主单位名称', dataIndex: 'ownerName'},
        { title: '纳税人地址', dataIndex: 'taxpayerSite'},
        { title: '纳税人识别号', dataIndex: 'taxpayerNum'}
      ],
      url:"/owner/show",
      name:"ownerName",
      data:[
        {
          type:"input",
          name:"ownerCode",
          label:"K3业主单位编码:"
        },
        {
          type:"input",
          name:"ownerName",
          label:"业主单位名称:"
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
