import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Form from './form';
import View from './view';
import Print from './print';


import NewPayment from './newPayment';

import Other from './other';

class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type: "input",  //业主单位组件
          name:"proNo", //隐藏域的值
          label: "K3工程编码"
        },
        {
          type: "Accounting",
          name: "proId",
          labelName:"proName",
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
        },
      ],
      columns : [
        { title: "K3工程编码",dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "申请日期", dataIndex: "appDate"},
        { title: "审批单编号", dataIndex: "limitappNo"},
        { title: "请款人", dataIndex: "applicant" },
        { title: "可支付工程款(元)", dataIndex: "payable" },
        { title: "可支付工程款结余(元)", dataIndex: "allpayableSurplus" },
        { title: "该审批单累计已付(元)", dataIndex: "thispaidSum" },
        { title: "累计收取工程款(元)", dataIndex: "recSum" },
        { title: "累计应付工程款(元)", dataIndex: "alldueSum" },
        { title: "累计已付工程款(元)", dataIndex: "allpaidSum" },
        { title: "管理费率", dataIndex: "manRate" },
        { title: "管理费金额(元)", dataIndex: "manFee" },
        { title: "累计销项税(元)", dataIndex: "salestaxSum" },
        { title: "累计进项税(元)", dataIndex: "inputtaxSum" },
        { title: "应交增值税(元)", dataIndex: "vat" },
      ],
      toolbar : {
        delete:{
          visible: () => false,
        },
        creditApplication:{
          text:"付款额度申请",
          visible: () => true,
          click:this.add
        },
        editCreditApplication:{
          text:"编辑付款额度申请",
          visible:(selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.edit
        },
        print:{
          text:"打印付款审批单",
          visible:(selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.print
        },
        newPayment:{
          text:"新增付款",
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.newPayment
        },
        other:{
          text:"其他工程付款",
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.other
        }
      }
    }

  }

  swiper = ()=>{
    this.refresh();
  }

  print = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`打印付款审批单`,{
      view:Print,
      props:{
        params:{
          id:row.id
        }
      }
    });
  }

  other = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`其他工程付款记录${row.proNo}`,{
      view:Other,
      props:{
        submitUrl:"/payment/addProPay",
        row:row
      }
    });
  }

  add = ()=>{
    this.props.add(`付款额度申请`,{
      view:Form,
      props:{
        submitUrl:"/payment/addLimit"
      }
    });
  }

  newPayment = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`新增付款${row.proNo}`,{
      view:NewPayment,
      props:{
        submitUrl:"/payment/addProPay",
        row:row
      }
    });
  }


  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    this.props.add(`编辑${row.proNo}`,{
      view:Form,
      props:{
        params:{id:row.id},
        paramsUrl:"/payment/limitDetail",
        submitUrl:"/payment/updateLimit"
      }
    })
  }



  view = (data)=>{
    this.props.add(`查看${data.proNo}`,{
      view:View,
      props:{
        params:{id:data.id},
        paramsUrl:"/payment/limitDetail"
      }
    });
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
          url="/payment/poolList"
          deleteUrl="/payment/delete"
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
