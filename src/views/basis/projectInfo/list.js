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
        {
          type: "input",
          name: "ownerName",
          label: "工程名称"
        },
        {
          type: "input",
          name: "taxpayerSite",
          label: "业主单位"
        },
      ],
      columns : [
        { title: "K3业主单位编码",dataIndex: "ownerCode"},
        { title: "工程名称", dataIndex: "ownerName"},
        { title: "业主单位", dataIndex: "taxpayerSite"},
        { title: "工程性质", dataIndex: "taxpayerNum"},
        { title: "内部单位", dataIndex: "tel" },
        { title: "是否鼓楼申报", dataIndex: "isgulou"},
        { title: "工程造价(元)", dataIndex: "procost"},
        { title: "实际管理费率(%)", dataIndex: "manRate"},
        { title: "合同预留款率", dataIndex: "reserveRate" },
        { title: "预征率(%)", dataIndex: "pretaxRate" }
      ],
      action:{
        edit:this.edit,
        view:this.view
      },
      toolbar : {
        add:{
          visible: () => true,
          click:this.add
        },
        export:{
          visible: (selectedRowKeys) => selectedRowKeys.length > 0,
          click:this.export
        },
        exportAll:{
          visible: () => true,
          click:this.exportAll
        }
      }
    }

  }

  export = ()=>{
    console.log("导出")
  }

  exportAll = ()=>{
    console.log("全部导出")
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
        submitUrl:"/owner/update"
      }
    });
  }

  add = ()=>{
    this.props.add('新增工程基本信息',{
      view:Form,
      props:{
        submitUrl:"/owner/add"
      }
    });
  }

  render(){
    let {search,columns,toolbar,action} = this.state;

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
