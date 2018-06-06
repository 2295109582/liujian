import React,{Component} from 'react';
import FormView from '@c/form/formView';
import StaticTable from "@c/table/staticTable";
//查看
class View extends Component{

  info = [
      {
        name: "proName",
        label: "工程名称",
      },
      {
        name: "proNo",
        label: "K3工程编码"
      },
      {
        name: "procost",
        label: "合同造价(元)"
      },
      {
        dic:"pronature_type",
        name: "pronature",
        label: "工程性质"
      },
      {
        name: "appDate",
        label: "申请日期"
      },
      {
        name: "limitappNo",
        label: "编号"
      },
      {
        name: "thisReceive",
        label: "本次收款数(元)"
      },
      {
        name: "applicant",
        label: "请款人"
      },
      {
        name: "quantity",
        label: "累计已完成工程量"
      },
      {
        name: "recSum",
        label: "累计收取工程款(元)",
      },
      {
        name: "invSum",
        label: "累计开票数(元)"
      },
      {
        name: "manRate",
        label: "管理费率"
      },
      {
        name: "manFee",
        label: "管理费金额(元)",
      },
      {
        name: "salestaxSum",
        label: "累计销项税(元)"
      },
      {
        name: "inputtaxSum",
        label: "累计进项税(元)"
      },
      {
        name: "vat",
        label: "累计应交增值税(元)"
      },
      {
        name: "cjtaxSum",
        label: "城建税及教育费附加(元)"
      },
      {
        name: "estimateVat",
        label: "按税率2.5%暂估增值税款(元)"
      },
      {
        name: "alltaxSum",
        label: "税金小计(元)"
      },
      {
        name: "reserve",
        label: "合同预留款(元)"
      },
      {
        name: "otherReserve",
        label: "其他预留(元)"
      },
      {
        name: "chargeSum",
        label: "应扣款合计(元)"
      },
      {
        name: "borrSum",
        label: "累计借款(元)"
      },
      {
        name: "preborInsterest",
        label: "预留借款利息(元)"
      },
      {
        name: "borrpaidSum",
        label: "累计已付借款(元)"
      },
      {
        name: "borrSurplus",
        label: "借款结余(元)"
      },
      {
        name: "alldueSum",
        label: "累计应付工程款(元)"
      },
      {
        name: "allpaidSum",
        label: "累计已付工程款(元)"
      },
      {
        name: "allpayableSurplus",
        label: "历史可支付工程款结余(元)"
      },
      {
        name: "payable",
        label: "可支付工程款(元)"
      }
    ]


    paymentRecord = {
      paymentColumns : [
        { title: "付款单位",dataIndex: "typeName"},
        { title: "付款申请日期", dataIndex: "appDate"},
        { title: "本次付款金额(元)", dataIndex: "paidAmount"},
        { title: "付款内容", dataIndex: "payContent",dic:"pay_content"},
        { title: "项目主管会计", dataIndex: "comptrollerName"},
        { title: "财务经理", dataIndex: "fimanagerName"},
        { title: "领用支票号码", dataIndex: "checkNo"},
        { title: "领用支票人", dataIndex: "recipient"},
        { title: "实际付款日期", dataIndex: "paidDate"}
      ]
    }

  constructor(){
    super(...arguments);

    let {paymentColumns} = this.paymentRecord;

    this.state = {
      info:this.info,
      tableList:[
        {
          name:"paymentRecords",
          view:StaticTable,
          props:{
            title:"付款记录信息",
            toolbar:false,
            columns:paymentColumns
          }
        }
      ]
    }

  }

  render(){
    let {info,tableList} = this.state;
    return(
      <div className="content">
        <FormView data={info} tableList={tableList} {...this.props}  />
      </div>
    )
  }
}

export default View;
