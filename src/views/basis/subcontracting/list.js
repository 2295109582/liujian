import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Form from './form';
import View from './view';
import OwnerList from './ownerList';


import { Divider} from 'antd';


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
        {
          title: "分包单位名称",dataIndex: "subunitName",
          render: (text, row) => (
            <a onClick={() => this.view(row)}>
              {text}
            </a>
          )
        },
        { title: "纳税人地址", dataIndex: "taxaddress"},
        { title: "纳税人识别号", dataIndex: "taxno"},
        { title: "电话", dataIndex: "tel"},
        { title: "开户行", dataIndex: "bankId" },
        { title: "银行账号", dataIndex: "bankaccount" },
        { title: "备注信息", dataIndex: "remarks" },
        { title: "操作", dataIndex: "action", render: (text, row) => (
          <div>
            <a onClick={()=>this.edit(row)}>编辑</a>
              <Divider type="vertical" />
            <a onClick={()=>this.addOwner(row)}>班主信息</a>
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
    this.props.add(`查看${data.subunitName}`,<View params={{id:data.id}}  paramsUrl="/subunit/detail"  />);
  }

  edit = (data) =>{
    this.props.add(`编辑${data.subunitName}`,<Form params={{id:data.id}} paramsUrl="/subunit/detail" submitUrl="/subunit/update" />);
  }

  add = ()=>{
    this.props.add('新增专业分包',<Form submitUrl="/subunit/add" />);
  }

  addOwner = (data)=>{
    this.props.add(`${data.subunitName}班主信息`,<OwnerList add={this.props.add} data={data} />);
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
