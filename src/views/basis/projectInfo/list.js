import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Form from './form';
import View from './view';


import { Modal} from 'antd';
const confirm = Modal.confirm;

class List extends Component{

  constructor(){
    super(...arguments);


    this.state = {
      search: [
        {
          type: "input",
          name: "proNo",
          label: "K3业主单位编码"
        },
        {
          type: "input",
          name: "proName",
          label: "工程名称"
        },
        {
          type: "input",
          name: "ownerName",
          label: "业主单位"
        },
      ],
      columns : [
        { title: "K3工程编码",dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "业主单位名称", dataIndex: "ownerName"},
        { title: "工程性质", dataIndex: "pronature",dic:"pronature_type"},
        { title: "内部单位", dataIndex: "area",dic:"area_sort" },
        { title: "是否鼓楼申报", dataIndex: "isgulou",dic:"isgulou_flag"},
        { title: "工程造价(元)", dataIndex: "procost"},
        { title: "实际管理费率(%)", dataIndex: "manRate"},
        { title: "合同预留款率", dataIndex: "reserveRate" },
        { title: "预征率(%)", dataIndex: "pretaxRate",render:(text)=>{
          let {preTax} = this.props;
          for(var i=0;i<preTax.length;i++){
            if(`${text}` === preTax[i].value){
              return preTax[i].label;
            }
          }
          return text;
        } }
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
        edit:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.edit
        },
        view:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.view
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

  export = (selectedRowKeys,selectedRows, allData)=>{

    let ids = selectedRows.map((item,i)=>{
      return item.id;
    })

    confirm({
      title: '是否确定导出',
      onOk:()=> {
        window.uc.download(`/project/export`,{
          ids:ids.toString()
        });
      },
    });

  }


  swiper = ()=>{
    this.refresh();
  }

  exportAll = ()=>{
    confirm({
      title: '是否确定全部导出',
      onOk:()=> {
        window.uc.download("/project/export");
      },
    });
  }

  view = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`查看${row.proNo}`,{
      view:View,
      props:{
        params:{id:row.id},
        paramsUrl:"/project/detail",
        preTax:this.props.preTax
      }
    });
  }

  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    this.props.add(`编辑${row.proNo}`,{
      view:Form,
      props:{
        params:{id:row.id},
        paramsUrl:"/project/detail",
        submitUrl:"/project/update",
        preTax:this.props.preTax
      }
    });
  }

  add = ()=>{
    this.props.add('新增工程基本信息',{
      view:Form,
      props:{
        submitUrl:"/project/add",
        preTax:this.props.preTax
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
          url="/project/show"
          deleteUrl="/project/delete"
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
