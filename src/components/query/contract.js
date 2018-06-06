import React,{Component} from 'react';
import Table from "@c/table";
import Search from "@c/search";


export default class User extends Component{

  constructor(props){
    super(props);

    this.state = {
      columns:[
        { title: "分包单位名称",dataIndex: "subName"},
        { title: "分包合同名称", dataIndex: "contractName"},
        { title: "合同金额 ", dataIndex: "contractAmount"}
      ],
      url:"/payment/showSubContract",
      name:"contractName",
      data:[
        {
          type: "input",
          name: "subName",
          label: "分包单位名称"
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
           toolbar={{delete:false}}
           scroll={false}
           action={false}
           queryParams={()=>{
               let data = this.refs.search.getData();
               data = {...data,...this.props.params};
               return data;
           }}
           size="small"
           ref="table"
         />
      </div>

    )
  }
}
