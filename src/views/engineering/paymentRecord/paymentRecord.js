import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';


import { Modal} from 'antd';
const confirm = Modal.confirm;

class List extends Component{



  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type: "input",
          name:"proNo",
          label: "K3工程编码"
        },
        {
          type: "input",
          name: "proName",
          label: "工程项目名称"
        },
        {
          type: "monthPicker",
          name: "beginDate",
          label: "申请开始时间"
        },
        {
          type: "monthPicker",
          name: "endDate",
          label: "申请结束时间"
        },
        {
          type: "input",
          name: "applyPay",
          label: "申请付款金额(元)"
        }
      ],
      columns : [
        { title: "工程性质",dataIndex: "pronature",dic:"pronature_type"},
        { title: "K3工程编码",dataIndex: "proNo"},
        { title: "工程项目名称", dataIndex: "proName"},
        { title: "付款申请日期", dataIndex: "appDate"},
        { title: "申请付款金额(元)", dataIndex: "appPay"},
        { title: "付款内容", dataIndex: "payContent",dic:"pay_content" },
        { title: "实际付款日期", dataIndex: "paidDate"},
        { title: "实际付款金额(元)", dataIndex: "paidAmount"},
        { title: "付款单位名称", dataIndex: "typeName" },
        { title: "开户行", dataIndex: "bankId",dic:"bank_code" },
        { title: "银行账号", dataIndex: "bankNo" }
      ],
      toolbar : {
        delete:false,
        importPayment:{
          visible: () => true,
          click:this.importPayment
        },
        downloadPaymentTemplate:{
          visible: () => true,
          click:this.downloadPaymentTemplate
        }
      }
    }

  }


  importPayment = ()=>{
    window.uc.importFiles("/import/paymant",()=>{
      this.refresh();
    });
  }

  downloadPaymentTemplate = ()=>{
    confirm({
      title: '是否确定下载工程付款模板',
      onOk:()=> {
        window.uc.download("/import/paymantModel");
      },
    });
  }

  swiper = ()=>{
    this.refresh();
  }



  refresh = ()=>{
    this.refs.table.refresh(this.deleteKey);
  }

  render(){
    let {search,columns,action,toolbar} = this.state;


    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/payment/confirmPayAllList"
          columns={columns}
          action={action}
          rowSelection={false}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
      </div>
    )
  }
}



export default List;
