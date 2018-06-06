import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';


import SubcontractPayment from './subcontractPayment';
import MaterialCollar from './materialCollar';
import Reimbursement from './reimbursement';
import Other from './other';

import Print from './print';
import PrintMaterialCollar from './printMaterialCollar';
import PrintNonMaterialCollar from './printNonMaterialCollar';
import PrintReimbursement from './printReimbursement';


import ViewSubcontractPayment from './viewSubcontractPayment';
import ViewMaterialCollar from './viewMaterialCollar';
import ViewReimbursement from './viewReimbursement';


class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type: "select",
          dic:"self_type",
          name:"selfType",
          label: "付款类型"
        },
        {
          type: "input",
          name:"proNo",
          label: "K3工程编码"
        },
        {
          type: "input",
          name: "proName",
          label: "工程名称"
        },
        {
          type: "datePicker",
          name: "beginDate",
          label: "起始申请日期"
        },
        {
          type: "datePicker",
          name: "endDate",
          label: "结束申请日期"
        }
      ],
      columns : [
        { title:"付款类型",dataIndex:"selfType",dic:"self_type"},
        { title: "编号",dataIndex: "appNo"},
        { title: "K3工程编码", dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "申请日期", dataIndex: "appDate"},
        { title: "申请付款金额(元)", dataIndex: "appPay" },
        { title: "分包合同名称", dataIndex: "contractName" },
        { title: "合同金额(元)", dataIndex: "contractAmount" },
        { title: "本期完成量", dataIndex: "thisAccom" },
        { title: "累计完成量", dataIndex: "allAccom" },
        { title: "累计应付工程款(元)", dataIndex: "alldueSum" },
        { title: "累计已付工程款(元)", dataIndex: "allpaidSum" },
        { title: "付款单位", dataIndex: "companyName" },
        { title: "开户行", dataIndex: "bankId",dic:"bank_code" },
        { title: "银行账号", dataIndex: "bankNo" },
        { title: "实际付款日期", dataIndex: "payDate" },
        { title: "实际付款金额(元)", dataIndex: "payNum" }
      ],
      action:{
        edit:this.edit,
        view:this.view,
        delete:false
      },
      toolbar : {
        delete:{
          visible: () => false,
        },
        edit:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.edit
        },
        view:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.view
        },
        subcontractPayment:{
          text:"分项分包付款",
          visible: () => true,
          click:this.subcontractPayment
        },
        printSubcontractPayment:{
          text:"打印分项分包付款审批单",
          visible: (selectedRowKeys,selectedRows) => selectedRowKeys.length === 1&&selectedRows[0].selfType === "101",
          click:this.printSubcontractPayment
        },
        materialCollar:{
          text:"材料类领用支票申请",
          visible: () => true,
          click:this.materialCollar
        },
        printMaterialCollar:{
          text:"打印材料类领用支票申请",
          visible: (selectedRowKeys,selectedRows) => selectedRowKeys.length === 1&&selectedRows[0].selfType === "102",
          click:this.printMaterialCollar
        },
        nonMaterialCollar:{
          text:"非材料类领用支票申请",
          visible: () => true,
          click:this.nonMaterialCollar
        },
        printNonMaterialCollar:{
          text:"打印非材料类领用支票申请",
          visible: (selectedRowKeys,selectedRows) => selectedRowKeys.length === 1&&selectedRows[0].selfType === "103",
          click:this.printNonMaterialCollar
        },
        reimbursement:{
          text:"现金报销申请",
          visible: () => true,
          click:this.reimbursement
        },
        printReimbursement:{
          text:"打印现金报销申请",
          visible: (selectedRowKeys,selectedRows) => selectedRowKeys.length === 1&&selectedRows[0].selfType === "104",
          click:this.printReimbursement
        },
        other:{
          text:"其他工程付款",
          visible: () => true,
          click:this.other
        },
      }
    }

  }

  swiper = ()=>{
    this.refresh();
  }

  view = (selectedRowKeys,selectedRows, allData)=>{
    let data = selectedRows[0];
    let _this = this;
    function openView(component){
      _this.props.add(`查看${data.appNo}`,{
        view:component,
        props:{
          params:{id:data.id},
          paramsUrl:"/payment/showSelf"
        }
      });
    }
    if(data.selfType === "101"){ //分项分包付款
      openView(ViewSubcontractPayment);
    }else if(data.selfType === "102" || data.selfType === "103"){
      openView(ViewMaterialCollar);
    }else if(data.selfType === "104"){
      openView(ViewReimbursement);
    }
  }

  edit = (selectedRowKeys,selectedRows, allData) =>{
    let data = selectedRows[0];
    let _this = this;
    function openView(component){
      _this.props.add(`编辑${data.appNo}`,{
        view:component,
        props:{
          params:{id:data.id},
          paramsUrl:"/payment/showSelf",
          submitUrl:"/payment/updateSelf"
        }
      })
    }

    if(data.selfType === "101"){ //分项分包付款
      openView(SubcontractPayment);
    }else if(data.selfType === "102" || data.selfType === "103"){
      openView(MaterialCollar);
    }else if(data.selfType === "104"){
      openView(Reimbursement);
    }



  }


  subcontractPayment = ()=>{ //分包付款
    this.props.add(`分项分包付款申请`,{
      view:SubcontractPayment,
      props:{
        submitUrl:"/payment/addSub"
      }
    });
  }

  printSubcontractPayment = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`打印分项分包付款审批单`,{
      view:Print,
      props:{
        params:{
          id:row.id
        }
      }
    });
  }

  materialCollar = ()=>{ //材料类领用支票申请
    this.props.add(`材料类领用支票申请`,{
      view:MaterialCollar,
      props:{
        submitUrl:"/payment/addMaterial"
      }
    });
  }

  printMaterialCollar = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`打印材料类领用支票申请`,{
      view:PrintMaterialCollar,
      props:{
        params:{
          id:row.id
        }
      }
    });
  }


  nonMaterialCollar = ()=>{ //非材料类领用支票申请
    this.props.add(`非材料类领用支票申请`,{
      view:MaterialCollar,
      props:{
        submitUrl:"/payment/addNonMaterial"
      }
    });
  }

  printNonMaterialCollar = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`打印非材料类领用支票申请`,{
      view:PrintNonMaterialCollar,
      props:{
        params:{
          id:row.id
        }
      }
    });
  }


  reimbursement = ()=>{  //现金报销申请
    this.props.add(`现金报销申请`,{
      view:Reimbursement,
      props:{
        submitUrl:"/payment/addCash"
      }
    });
  }

  printReimbursement = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`打印现金报销申请`,{
      view:PrintReimbursement,
      props:{
        params:{
          id:row.id
        }
      }
    });
  }

  other = (selectedRowKeys,selectedRows, allData)=>{  //其他工程付款
    let row = selectedRows[0];
    this.props.add(`其他工程付款记录`,{
      view:Other,
      props:{
        submitUrl:"/payment/addProPay",
        row:row
      }
    });
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
          url="/payment/selfList"
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
