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
        {
          title: "K3业主单位编码",dataIndex: "ownerCode",
          render: (text, row) => (
            <a onClick={() => this.view(row)}>
              {text}
            </a>
          )
        },
        { title: "业主单位名称", dataIndex: "ownerName"},
        { title: "纳税人地址", dataIndex: "taxpayerSite"},
        { title: "纳税人识别号", dataIndex: "taxpayerNum"},
        { title: "电话", dataIndex: "tel" },
        { title: "开户行", dataIndex: "openBank" },
        { title: "银行账号", dataIndex: "bankAccount" },
        { title: "操作", dataIndex: "action", render: (text, row) => (
          <div>
            <a onClick={()=>this.edit(row)}>编辑</a>
              <Divider type="vertical" />
            <a onClick={()=>this.refs.table.delete(row)}>删除</a>
          </div>
        ) },
      ],
      toolbar : [
        {
          icon: "plus",
          text: "新增",
          visible: () => true,
          click:this.add
        },
        {
          icon: "delete",
          text: "删除",
          visible: (selectedRowKeys) => selectedRowKeys.length > 0,
          click: () => this.refs.table.delete()
        }
      ]
    }

  }

  view = (data)=>{
    this.props.add(`查看${data.ownerCode}`,<View params={{id:data.id}}  paramsUrl="/owner/detail"  />);
  }

  edit = (data) =>{
    this.props.add(`编辑${data.ownerCode}`,<Form params={{id:data.id}} paramsUrl="/owner/detail" submitUrl="/owner/update" />);
  }

  add = ()=>{
    this.props.add('新增业主单位',<Form submitUrl="/owner/add" />);
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
