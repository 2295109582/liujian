import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Form from './form';
import View from './view';





class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type: "input",
          name: "subunitName",
          label: "分包单位名称"
        },
        {
          type: "input",
          name: "taxaddress",
          label: "纳税人地址"
        },
        {
          type: "input",
          name: "taxno",
          label: "纳税人识别号"
        },
      ],
      columns : [
        { title: "分包单位名称",dataIndex: "subunitName"},
        { title: "纳税人地址", dataIndex: "taxaddress"},
        { title: "纳税人识别号", dataIndex: "taxno"},
        { title: "电话", dataIndex: "tel"},
        { title: "开户行", dataIndex: "bankId",dic:"bank_code" },
        { title: "银行账号", dataIndex: "bankaccount" },
        { title: "备注信息", dataIndex: "remarks" }
      ],
      toolbar : {
        add:{
          visible: () => true,
          click:this.add
        },
        edit:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.edit
        },
        view:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.view
        }
      }
    }

  }


  swiper = ()=>{
    this.refresh();
  }

  view = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`查看${row.subunitName}`,{
      view:View,
      props:{
        params:{id:row.id},
        paramsUrl:"/subunit/detail"
      }
    });
  }

  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    this.props.add(`编辑${row.subunitName}`,{
      view:Form,
      props:{
        params:{id:row.id},
        paramsUrl:"/subunit/detail",
        submitUrl:"/subunit/update"
      }
    });
  }

  add = ()=>{
    this.props.add('新增专业分包',{
      view:Form,
      props:{
        submitUrl:"/subunit/add"
      }
    });
  }


  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns,toolbar} = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/subunit/show"
          deleteUrl="/subunit/delete"
          deleteKey="subunitName"
          columns={columns}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
      </div>
    )
  }
}



export default List;
