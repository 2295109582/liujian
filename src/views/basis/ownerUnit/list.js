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
          name: "ownerCode",
          label: "K3业主单位编码"
        },
        // {
        //   type: "User",
        //   name: "ownerCode",
        //   label: "付款单位"
        // },
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
        { title: "开户行", dataIndex: "openBank" },
        { title: "银行账号", dataIndex: "bankAccount" }
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
    this.props.add(`查看${data.ownerCode}`,{
      view:View,
      props:{
        params:{id:data.id},
        paramsUrl:"/owner/detail"
      }
    });
  }

  edit = (data) =>{
    this.props.add(`编辑${data.ownerCode}`,{
      view:Form,
      props:{
        params:{id:data.id},
        paramsUrl:"/owner/detail",
        submitUrl:"/owner/update",
        refresh:this.refresh
      }
    })
  }


  add = ()=>{
    this.props.add('新增业主单位',{
      view:Form,
      props:{
        submitUrl:"/owner/add",
        refresh:this.refresh
      }
    })
  }


  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns,action,toolbar} = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/owner/show"
          deleteUrl="/owner/delete"
          deleteKey="ownerCode"
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
