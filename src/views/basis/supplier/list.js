import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Form from './form';
import View from './view';


import { Divider} from 'antd';


class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type: "input",
          name: "supplierNo",
          label: "K3供应商编码"
        },
        {
          type: "input",
          name: "supplierName",
          label: "供应商单位名称"
        },
        {
          type: "input",
          name: "taxaddress",
          label: "纳税人地址"
        },
      ],
      columns : [
        { title: "K3供应商编码",dataIndex: "supplierNo"},
        { title: "供应商单位名称", dataIndex: "supplierName"},
        { title: "纳税人地址", dataIndex: "taxaddress"},
        { title: "纳税人识别号", dataIndex: "taxno"},
        { title: "电话", dataIndex: "tel" },
        { title: "开户行", dataIndex: "bankId" },
        { title: "银行账号", dataIndex: "bankaccount" }
      ],
      action:{
        edit:this.edit,
        view:this.view
      },
      toolbar : {
        add:{
          visible: () => true,
          click:this.add
        }
      }
    }

  }

  view = (data)=>{
    this.props.add(`查看${data.supplierNo}`,{
      view:View,
      props:{
        params:{id:data.id},
        paramsUrl:"/supplier/detail"
      }
    });
  }

  edit = (data) =>{
    this.props.add(`编辑${data.supplierNo}`,{
      view:Form,
      props:{
        params:{id:data.id},
        paramsUrl:"/supplier/detail",
        submitUrl:"/supplier/update",
        refresh:this.refresh
      }
    });
  }

  add = ()=>{
    this.props.add('新增供应商',{
      view:Form,
      props:{
        submitUrl:"/supplier/add",
        refresh:this.refresh
      }
    });
  }

  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns,toolbar,action} = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/supplier/show"
          deleteUrl="/supplier/delete"
          deleteKey="supplierNo"
          columns={columns}
          action={action}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
      </div>
    )
  }
}



export default List;
