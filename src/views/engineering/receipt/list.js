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
      columns : [
        { title: "K3工程编码",dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "收款日期", dataIndex: "recDate"},
        { title: "本次收款金额(元)", dataIndex: "recAmount"},
        { title: "甲方扣款(元)", dataIndex: "deduction" },
        { title: "扣款原因", dataIndex: "reason" },
        { title: "业主单位名称", dataIndex: "ownerName" },
        { title: "工程造价(元)", dataIndex: "procost" },
        { title: "计税方式", dataIndex: "taxsetMode",dic:"taxset_mode" },
        { title: "内部单位", dataIndex: "area",dic:"area_sort" },
        { title: "累计已开票金额(元)", dataIndex: "saleinvSum" },
        { title: "累计收款金额(元)", dataIndex: "recSum" },
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
        },
        importReceipt:{
          visible: () => true,
          click:this.importReceipt
        },
        downloadCollectionTemplate:{
          visible: () => true,
          click:this.downloadCollectionTemplate
        }
      }
    }

  }

  importReceipt = ()=>{
    window.uc.importFiles("/import/receipt",()=>{
      this.refresh();
    });
  }

  downloadCollectionTemplate = ()=>{
    confirm({
      title: '是否确定下载工程收款模板',
      onOk:()=> {
        window.uc.download("/import/receiptModel");
      },
    });
  }

  swiper = ()=>{
    this.refresh();
  }



  view = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`查看${row.proNo}`,{
      view:View,
      props:{
        params:{id:row.id},
        paramsUrl:"/receipt/detail"
      }
    });
  }

  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    this.props.add(`编辑${row.proNo}`,{
      view:Form,
      props:{
        params:{id:row.id},
        paramsUrl:"/receipt/detail",
        submitUrl:"/receipt/update"
      }
    })
  }


  add = ()=>{
    this.props.add('新增工程收款',{
      view:Form,
      props:{
        submitUrl:"/receipt/add"
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
          url="/receipt/show"
          deleteUrl="/receipt/delete"
          deleteKey="proNo"
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
