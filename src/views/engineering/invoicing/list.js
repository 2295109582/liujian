import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Form from './form';
import View from './view';

import Print from './print';

import BillingConfirmation from './billingConfirmation';
import { Modal} from 'antd';
const confirm = Modal.confirm;
class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
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
          type: "select",
          dic:"inv_status",
          name: "invstatus",
          label: "状态"
        },
        {
          type: "select",
          dic:"inv_type",
          name: "invType",
          label: "发票类型"
        },
      ],
      columns : [
        { title: "业主单位",dataIndex: "ownerName"},
        { title: "开票申请日期", dataIndex: "appDate"},
        { title: "申请部门", dataIndex: "appDepartment"},
        { title: "状态", dataIndex: "invstatus",dic:"inv_status"},
        { title: "K3工程编码", dataIndex: "proNo" },
        { title: "工程名称", dataIndex: "proName" },
        { title: "发票类型", dataIndex: "invType",dic:"inv_type" },
        { title: "本次申请开票金额", dataIndex: "invAmount" },
        { title: "税率(%)", dataIndex: "taxRate"},
        { title: "不含税金额(元)", dataIndex: "notaxAmount" },
        { title: "税额(元)", dataIndex: "taxAmount" },
        { title: "计税方式", dataIndex: "taxMode",dic:"taxset_mode" },
        { title: "累计销项(元)", dataIndex: "salestaxSum" },
        { title: "累计进项(元)", dataIndex: "inputtaxSum" },
        { title: "累计预缴(元)", dataIndex: "pretaxSum" },
        { title: "应交增值税(元)", dataIndex: "vat" },
        { title: "税负率", dataIndex: "taxbearingRate" },
      ],
      toolbar : {
        application:{
          text:"开票申请",
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
        invConfirm:{
          text:"开票确认",
          visible: (selectedRowKeys,selectedRows) => selectedRows.length === 1,
          click:this.confirmation
        },
        printInvoicing:{
          text:"打印开票申请单",
          visible: (selectedRowKeys,selectedRows) => selectedRows.length === 1,
          click:this.print
        },
        importInvoice:{
          visible: () => true,
          click:this.importInvoice
        },
        downloadInvoiceTemplate:{
          visible: () => true,
          click:this.downloadInvoiceTemplate
        }
      }
    }

  }

  importInvoice = ()=>{
    window.uc.importFiles("/import/invoiced",()=>{
      this.refresh();
    });
    //导入工程收款
  }

  downloadInvoiceTemplate = ()=>{
    confirm({
      title: '是否确定下载工程开票模板',
      onOk:()=> {
        window.uc.download("/import/invoicedModel");
      },
    });
  }


  swiper = ()=>{
    this.refresh();
  }

  confirmation = (selectedRowKeys,selectedRows, allData)=> {
    let row = selectedRows[0];

    this.props.add(`发票确认`,{
      view:BillingConfirmation,
      props:{
        params:{id:row.id},
        paramsUrl:"/invoiceApp/detail",
        submitUrl:"/invoiceApp/confirm"
      }
    });

  }

  print = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`打印申请单(${row.ownerName})`,{
      view:Print,
      props:{
        params:{id:row.id}
      }
    });
  }

  view = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`查看${row.ownerName}`,{
      view:View,
      props:{
        params:{id:row.id},
        paramsUrl:"/invoiceApp/detail",
        isInvstatus:(row.invstatus==="1"?true:false)
      }
    });
  }

  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    this.props.add(`编辑${row.ownerName}`,{
      view:Form,
      props:{
        params:{id:row.id},
        paramsUrl:"/invoiceApp/detail",
        submitUrl:"/invoiceApp/update",
        isInvstatus:(row.invstatus==="1"?true:false)
      }
    })
  }


  add = ()=>{
    this.props.add('开票申请',{
      view:Form,
      props:{
        submitUrl:"/invoiceApp/add"
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
          url="/invoiceApp/show"
          deleteUrl="/invoiceApp/delete"
          deleteKey="ownerName"
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
