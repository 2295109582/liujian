import React,{Component} from 'react';
import Table from "@c/table";



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
      type: "SubcontractPayment",
      name: "proId",
      labelName: "proName",
      label: "工程名称",
      callback:(row)=>{
        this.form.setFieldsValue({
          proNo:row.proNo,//K3工程编码
        });
      }
    },
    {
      type: "input",
      name: "proNo",
      label: "K3工程编码",
      readonly:true,
    },
    {
      type: "datePicker",
      name: "paidDate",
      label: "付款日期",
      rules: [{ required: true}]
    },
    {
      type: "select",
      dic:"payee_type",
      name: "payeeType",
      label: "付款单位类型",
      rules: [{ required: true}],
      change:(value)=>{
         let info = [...this.state.info];
        if(value === "01"){  //供应商类型
          info[5] = Object.assign(info[5],{
            type: "Supplier",
            readonly:false
          })
        }else if(value === "02"){  //专业分包公司
          info[5] = Object.assign(info[5],{
            type: "Subcontracting",
            readonly:false
          })
        }
        this.form.setFieldsValue({
          payeeId:"",
          companyName:""
        });
        this.setState({info});
      }
    },
    {
      type: "Supplier",
      name: "payeeId",
      labelName:"companyName",
      label: "付款单位名称",
      rules: [{ required: true}],
      readonly:true
    },
    {
      type: "Team",
      name: "teamId",
      labelName:"teamName",
      label: "收款班组"
    },
    {
      type: "select",
      dic:"pay_content",
      name: "payContent",
      label: "付款内容",
      rules: [{ required: true}],
    },
    {
      type: "select",
      dic:"bank_code",
      name: "bankId",
      label: "开户行",
      rules: [{ required: true}],
    },
    {
      type: "input",
      name: "bankNo",
      label: "银行账号",
      rules: [{ required: true}],
    },
    {
      type: "amount",
      name: "paidAmount",
      label: "付款金额",
      rules: [{ required: true}],
    }
  ]


  constructor(){
    super(...arguments);

    this.state = {
      info:this.info,
      columns : [
        { title: "K3工程编码", dataIndex: "proNo"},
        { title: "付款日期", dataIndex: "paidDate"},
        { title: "付款单位", dataIndex: "typeName"},
        { title: "收款班组", dataIndex: "teamName"},
        { title: "付款金额(元)", dataIndex: "paidAmount"},
        { title: "开户行", dataIndex: "bankId",dic:"bank_code" },
        { title: "银行账户", dataIndex: "bankNo" }
      ],
      action:false,
      toolbar : {
        delete:false,
        addOther:{
          text:"新增其他工程付款",
          visible: () => true,
          click:this.confirm
        },
        editOther:{
          text:"编辑其他工程付款",
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.editOther
        },
        viewOther:{
          text:"查看其他工程付款",
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.viewOther
        },
        deleteOther:{
          text:"删除其他工程付款",
          visible: (selectedRowKeys) => selectedRowKeys.length >= 1,
          click:this.deleteOther
        }
      }
    }

  }


  deleteOther = ()=>{
    let { table } = this.refs;
    table.delete();
  }

  viewOther = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    let { form } = this;
    let { info } = this.state;
    info.forEach((item,i)=>{
      info[i].readonly = true;
    })
    this.setState({info})
    form.setData({
      title:"查看其他工程付款"
    },row,true);
  }

  editOther =(selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    let { form } = this;
    let { info } = this.state;
    info.forEach((item,i)=>{
      info[i].readonly = false;
    })
    info[2].readonly = true;
    info[5].readonly = true;
    this.setState({info});
    form.setData({
      title:"编辑其他工程付款"
    },row);
  }

  confirm = ()=>{
    let { form } = this;
    let { info } = this.state;
    info.forEach((item,i)=>{
      info[i].readonly = false;
    })
    info[2].readonly = true;
    info[5].readonly = true;
    this.setState({info});
    form.setData({
      title:"新增其他工程付款"
    });
  }


  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {columns,action,toolbar,info} = this.state;

    return(
      <div className="content">
        <Table
          url="/payment/selfOtherList"
          columns={columns}
          action={action}
          scroll={false}
          queryParams={()=>null}
          toolbar={toolbar}
          ref="table"
        />
        <FormModal
          ref={e=>this.form=e}
          data={info}
          submitUrl="/payment/addSelfOther"
          updateUrl="/payment/addSelfOther"
          submitCallback={this.refresh}
        />
      </div>
    )
  }
}



export default List;
