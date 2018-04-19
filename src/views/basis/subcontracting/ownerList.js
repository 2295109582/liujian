import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import OwnerForm from './ownerForm';


import { Divider} from 'antd';


class List extends Component{

  constructor(){
    super(...arguments);
    let {data} = this.props;

    this.state = {
      search: [
        {
          type: "input",
          name: "id",
          label: "分包Id",
          visible:false,
          defaultValue:data.id
        },
        {
          type: "input",
          name: "teamName",
          label: "班组名称"
        }
      ],
      columns : [
        { title: "班组名称",dataIndex: "teamName"},
        { title: "班组类别", dataIndex: "teamSort"},
        { title: "班组负责人", dataIndex: "teamleader"},
        { title: "联系电话", dataIndex: "tel"},
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

  edit = (data) =>{
    console.log(data)
    this.props.add(`编辑${data.teamName}`,<OwnerForm data={this.props.data} params={{id:data.id}} paramsUrl="/team/detail" submitUrl="/team/update" />);
  }

  add = ()=>{
    this.props.add('新增班主信息',<OwnerForm submitUrl="/team/add" data={this.props.data} />);
  }


  render(){
    let {search,columns,toolbar} = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/team/show"
          deleteUrl="/team/delete"
          deleteKey="teamName"
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
