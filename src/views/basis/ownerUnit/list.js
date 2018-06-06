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
          name: "ownerCode",
          label: "K3业主单位编码"
        },
        {
          type: "input",
          name: "ownerName",
          label: "业主单位名称"
        },
        {
          type: "input",
          name: "taxpayerSite",
          label: "纳税人地址"
        },
      ],
      columns : [
        {title: "K3业主单位编码",dataIndex: "ownerCode"},
        { title: "业主单位名称", dataIndex: "ownerName"},
        { title: "纳税人地址", dataIndex: "taxpayerSite"},
        { title: "纳税人识别号", dataIndex: "taxpayerNum"},
        { title: "电话", dataIndex: "tel" },
        { title: "开户行", dataIndex: "openBank",dic:"bank_code" },
        { title: "银行账号", dataIndex: "bankAccount" }
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

  view =  (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    this.props.add(`查看${row.ownerCode}`,{
      view:View,
      props:{
        params:{id:row.id},
        paramsUrl:"/owner/detail"
      }
    });
  }

  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    this.props.add(`编辑${row.ownerCode}`,{
      view:Form,
      props:{
        params:{id:row.id},
        paramsUrl:"/owner/detail",
        submitUrl:"/owner/update",
      }
    })
  }


  add = ()=>{
    this.props.add('新增业主单位',{
      view:Form,
      props:{
        submitUrl:"/owner/add"
      }
    })
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
          url="/owner/show"
          deleteUrl="/owner/delete"
          deleteKey="ownerCode"
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
