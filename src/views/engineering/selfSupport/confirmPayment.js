import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';


import FormModal from '@c/form/formModal';



class List extends Component{


  info = [
    {
      type: "input",
      name: "id",
      label: "id",
      readonly:true,
      visible:false
    },
    {
      type: "input",
      name: "proId",
      label: "工程id",
      readonly:true,
      visible:false
    },
    {
      type: "input",
      name: "proName",
      label: "工程项目名称",
      readonly:true
    },
    {
      type: "input",
      name: "proNo",
      label: "K3工程编码",
      readonly:true
    },
    {
      type: "select",
      name: "proNo",
      dic:"pronature",
      label: "工程性质",
      readonly:true
    },
    {
      type: "select",
      dic:"area_sort",
      name: "area",
      label: "内部单位",
      readonly:true
    },
    {
      type: "input",
      name: "appNo",
      label: "编号",
      readonly:true
    },
    {
      type: "datePicker",
      name: "appDate",
      label: "申请日期",
      readonly:true
    },
    {
      type: "amount",
      name: "appPay",
      label: "申请付款金额(元)",
      readonly:true
    },
    {
      type: "input",
      name: "typeName",
      label: "收款单位名称",
      readonly:true
    },
    {
      type: "select",
      dic:"bank_code",
      name: "bankId",
      label: "开户行",
      readonly:true
    },
    {
      type: "input",
      name: "bankNo",
      label: "银行账号",
      readonly:true
    },
    {
      type: "datePicker",
      name: "paidDate",
      label: "实际付款日期",
      rules: [{ required: true}]
    },
    {
      type: "amount",
      name: "paidAmount",
      label: "实际付款金额(元)",
      rules: [{ required: true}]
    }
  ]


  constructor(){
    super(...arguments);

    this.deleteKey = null;

    this.state = {
      search: [
        {
          type: "select",
          dic:"payee_type",
          name:"payeeType",
          label: "付款单位类型"
        },
        {
          type: "input",
          name:"typeName",
          label: "付款单位名称"
        },
        {
          type: "input",
          name: "applyPay",
          label: "申请付款金额(元)"
        },
        {
          type: "monthPicker",
          name: "beginDate",
          label: "起始付款申请日期"
        },
        {
          type: "monthPicker",
          name: "endDate",
          label: "结束付款申请日期"
        },
      ],
      columns : [
        { title:"付款类型",dataIndex:"selfType",dic:"self_type"},
        { title: "K3工程编码",dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "编号", dataIndex: "appNo"},
        { title: "付款申请日期", dataIndex: "appDate"},
        { title: "申请付款金额(元)", dataIndex: "appPay"},
        { title: "付款单位类型", dataIndex: "payType",dic:"payee_type" },
        { title: "付款单位名称", dataIndex: "typeName" },
        { title: "开户行", dataIndex: "bankId",dic:"bank_code" },
        { title: "银行账号", dataIndex: "bankNo" },
        { title: "状态", dataIndex: "confirmIspay" }
      ],
      action:false,
      toolbar : {
        delete:false,
        confirm:{
          text:"付款确认",
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.confirm
        }
      }
    }

  }

  swiper = ()=>{
    this.refresh();
  }

  confirm = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.deleteKey = row.id;
    let {form} = this;
    form.setData({
      title:"付款确认"
    },row);
  }


  refresh = ()=>{
    this.deleteKey = null;
    this.refs.table.refresh(this.deleteKey);
  }

  render(){
    let {search,columns,action,toolbar} = this.state;
    let {info} = this;


    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/payment/confirmSelfPayList"
          columns={columns}
          action={action}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
        <FormModal
          ref={e=>this.form=e}
          data={info}
          submitUrl="/payment/confirmSelfPayRecord"
          updateUrl="/payment/confirmSelfPayRecord"
          submitCallback={this.refresh}
        />
      </div>
    )
  }
}



export default List;
