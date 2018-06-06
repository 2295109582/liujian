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
        { title: "收款日期", dataIndex: "recDate"},
        { title: "本次收款金额(元)", dataIndex: "recAmount"},
      ],
      url:"/receipt/show",
      name:"recAmount",
      data:[
        {
          type: "input",
          name: "proNo",
          label: "K3工程编码"
        },
        {
          type: "OwnerUnit",
          name:"ownerId",
          labelName: "ownerName",
          label: "业主单位名称"
        },
        {
          type: "Accounting",
          name:"proId",
          labelName: "proName",
          label: "工程名称"
        },
        {
          type: "datePicker",
          name: "beginDate",
          label: "起始收款日期"
        },
        {
          type: "datePicker",
          name: "endDate",
          label: "结束收款日期"
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
