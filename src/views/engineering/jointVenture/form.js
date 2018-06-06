import React,{Component} from 'react';

import Form from '@c/form';
import StaticTable from "@c/table/staticTable";
import PrintPayment from './printPayment';
class AppForm extends Component{

    info = [
        {
          type: "CreditApproval",
          name: "proId",
          labelName:"proName",
          label: "工程名称",
          rules: [{ required: true }],
          callback:(row)=>{


            this.manFee = parseFloat(row.manFee);
            this.alltaxSum = parseFloat(row.alltaxSum);
            this.reserve = parseFloat(row.reserve);
            this.otherReserve = parseFloat(row.otherReserve);
            this.recSum = parseFloat(row.recSum);
            this.allpaidSum = parseFloat(row.allpaidSum);
            this.payableSurplus = parseFloat(row.payableSurplus);



            this.form.setFieldsValue({
              proNo:row.proNo,  //k3工程编码
              procost:row.procost, //合同造价(元)
              pronature:row.pronature, //工程性质
              recSum:row.recSum, //累计收取工程款(元)
              invSum:row.invSum, //累计开票数(元)
              manRate:row.manRate, //管理费率
              manFee:row.manFee, //管理费金额(元)
              salestaxSum:row.salestaxSum, //累计销项税(元)
              inputtaxSum:row.inputtaxSum, //累计进项税(元)
              vat:row.vat, //累计应交增值税(元)
              cjtaxSum:row.cjtaxSum, //城建税及教育费附加(元)
              estimateVat:row.estimateVat, //按税率2.5%暂估增值税款(元)
              alltaxSum:row.alltaxSum, //税金小计(元)
              reserve:row.reserve, //合同预留款(元)
              chargeSum:row.chargeSum, //应扣款合计(元)
              alldueSum:row.alldueSum, //累计应付工程款(元)
              allpaidSum:row.allpaidSum, //累计已付工程款(元)
              allpayableSurplus:row.allpayableSurplus //历史可支付工程款结余
            })
          }
        },
        {
          type: "input",
          name: "proNo",
          label: "K3工程编码",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "procost",
          label: "合同造价(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "select",
          dic:"pronature_type",
          name: "pronature",
          label: "工程性质",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type:"datePicker",
          name: "appDate",
          label: "申请日期",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "limitappNo",
          label: "编号",
          rules: [{ required: true}]
        },
        {
          type: "ProjectReceipts",
          name: "receiveId",
          labelName:"thisReceive",
          label: "本次收款数(元)",
          rules: [{ required: true}],
        },
        {
          type: "input",
          name: "applicant",
          label: "请款人",
          rules: [{ required: true}],
        },
        {
          type: "input",
          name: "quantity",
          label: "累计已完成工程量",
          rules: [{ required: true}],
        },
        {
          type: "amount",
          name: "recSum",
          label: "累计收取工程款(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("recSum");
          }
        },
        {
          type: "input",
          name: "recSumManual",
          label: "累计收取工程款(元)--手工",
          visible:false
        },
        {
          type: "input",
          name: "invSum",
          label: "累计开票数(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("invSum");
          }
        },
        {
          type: "input",
          name: "invSumManual",
          label: "累计开票数(元)--手工",
          visible:false
        },
        {
          type: "input",
          name: "manRate",
          label: "管理费率(%)",
          readonly:true,
          rules: [{ required: true}],
          change:()=>{
            this.setManual("manRate");
          }
        },
        {
          type: "input",
          name: "manRateManual",
          label: "管理费率--手工",
          visible:false
        },
        {
          type: "amount",
          name: "manFee",
          label: "管理费金额(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("manFee");
          }
        },
        {
          type: "input",
          name: "manFeeManual",
          label: "管理费金额(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "salestaxSum",
          label: "累计销项税(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("salestaxSum");
          }
        },
        {
          type: "input",
          name: "salestaxSumManual",
          label: "累计销项税(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "inputtaxSum",
          label: "累计进项税(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("inputtaxSum");
          }
        },
        {
          type: "input",
          name: "inputtaxSumManual",
          label: "累计进项税(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "vat",
          label: "累计应交增值税(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("vat");
          }
        },
        {
          type: "input",
          name: "vatManual",
          label: "累计应交增值税(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "cjtaxSum",
          label: "城建税及教育费附加(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("cjtaxSum");
          }
        },
        {
          type: "input",
          name: "cjtaxSumManual",
          label: "城建税及教育费附加(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "estimateVat",
          label: "按税率2.5%暂估增值税款(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("estimateVat");
          }
        },
        {
          type: "input",
          name: "estimateVatManual",
          label: "按税率2.5%暂估增值税款(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "alltaxSum",
          label: "税金小计(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("alltaxSum");
          }
        },
        {
          type: "input",
          name: "alltaxSumManual",
          label: "税金小计(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "reserve",
          label: "合同预留款(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("reserve");
          }
        },
        {
          type: "input",
          name: "reserveManual",
          label: "合同预留款(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "otherReserve",
          label: "其他预留(元)",
          rules: [{ required: true}],
          change:(e)=>{
            this.otherReserve = parseFloat(e.target.value) || 0;
            this.setChargeSum();
            this.setManual("otherReserve");
          }
        },
        {
          type: "input",
          name: "otherReserveManual",
          label: "其他预留(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "chargeSum",
          label: "应扣款合计(元)",
          rules: [{ required: true}],
          change:(e)=>{
            this.setManual("chargeSum");
          }
        },
        {
          type: "input",
          name: "chargeSumManual",
          label: "应扣款合计(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "borrSum",
          label: "累计借款(元)",
          rules: [{ required: true}],
          change:(e)=>{
            this.borrSum = parseFloat(e.target.value) || 0;
            this.setBorrSurplus();
            this.setAlldueSum();
            this.setManual("borrSum");
          }
        },
        {
          type: "input",
          name: "borrSumManual",
          label: "累计借款(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "preborInsterest",
          label: "预留借款利息(元)",
          rules: [{ required: true}],
          change:(e)=>{
            this.preborInsterest = parseFloat(e.target.value) || 0;
            this.setAlldueSum();
            this.setManual("preborInsterest");
          }
        },
        {
          type: "input",
          name: "preborInsterestManual",
          label: "预留借款利息(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "borrpaidSum",
          label: "累计已付借款(元)",
          rules: [{ required: true}],
          change:(e)=>{
            this.borrpaidSum = parseFloat(e.target.value) || 0;
            this.setBorrSurplus();
            this.setManual("borrpaidSum");
          }
        },
        {
          type: "input",
          name: "borrpaidSumManual",
          label: "累计已付借款(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "borrSurplus",
          label: "借款结余(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "alldueSum",
          label: "累计应付工程款(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("alldueSum");
          }
        },
        {
          type: "input",
          name: "alldueSumManual",
          label: "累计应付工程款(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "allpaidSum",
          label: "累计已付工程款(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("allpaidSum");
          }
        },
        {
          type: "input",
          name: "allpaidSumManual",
          label: "累计已付工程款(元)--手工",
          visible:false
        },
        {
          type: "amount",
          name: "allpayableSurplus",
          label: "历史可支付工程款结余(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "payable",
          label: "可支付工程款(元)",
          rules: [{ required: true}],
          change:()=>{
            this.setManual("payable");
          }
        },
        {
          type: "input",
          name: "payableManual",
          label: "可支付工程款(元)--手工",
          visible:false
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

  setManual = (key)=>{  //设置手工
    let { form } = this;
    form.setFieldsValue({
      [`${key}Manual`]:"true"
    })
  }


  setChargeSum = ()=>{  //设置应扣款合计
    let { form } = this;
    let { manFee,alltaxSum,reserve,otherReserve } = this;

    // this.manFee = 0; //管理费金额
    // this.alltaxSum = 0;//税金小计
    // this.reserve = 0;//合同预留款
    // this.otherReserve = 0; //其他预留

    this.chargeSum = (manFee + alltaxSum + reserve + otherReserve).toFixed(2);
    form.setFieldsValue({
      chargeSum:this.chargeSum
    });
    this.setAlldueSum();
  }


  setBorrSurplus = ()=>{ //设置借款结余
    let { form } = this;
    let { borrSum,borrpaidSum } = this;
    this.borrSurplus = ( borrSum - borrpaidSum ).toFixed(2);

    form.setFieldsValue({
      borrSurplus:this.borrSurplus
    })
  }


  setAlldueSum = ()=>{ //设置累计应付工程款
    let { form } = this;
    let { recSum,borrSum,chargeSum,preborInsterest } = this;

    this.alldueSum = ( recSum + borrSum - chargeSum - preborInsterest ).toFixed(2);
    form.setFieldsValue({
      alldueSum:this.alldueSum
    });
    this.setPayable();
  }


  setPayable = ()=>{ //设置可支付工程款
    let { form } = this;
    let { alldueSum,allpaidSum,allpayableSurplus } = this;

    this.payable = (  alldueSum - allpaidSum - allpayableSurplus ).toFixed(2);
    form.setFieldsValue({
      payable:this.payable
    })
  }

  constructor(){
    super(...arguments);

    this.chargeSum = 0;  //应扣款合计
    this.manFee = 0; //管理费金额
    this.alltaxSum = 0;//税金小计
    this.reserve = 0;//合同预留款
    this.otherReserve = 0; //其他预留


    this.borrSurplus = 0;//借款结余
    this.borrSum = 0;      //累计借款
    this.borrpaidSum = 0;//累计已付借款

    this.alldueSum = 0;//累计应付工程款
    this.recSum = 0;//累计收取工程款
    this.preborInsterest = 0;//预留借款利息


    this.payable = 0;//可支付工程款
    this.allpaidSum = 0;//累计已付工程款
    this.allpayableSurplus = 0;//历史可支付工程款结余



    let {paymentColumns} = this.paymentRecord;

    this.state = {
      info:this.info,
      tableList:[
        {
          name:"paymentRecords",
          view:StaticTable,
          props:{
            title:"付款记录信息",
            toolbar:{
              add:{
                visible:()=>false
              },
              delete:{
                visible:()=>false
              },
              print:{
                text:"打印付款通知书",
                visible: (selectedRowKeys) => selectedRowKeys.length === 1,
                click:this.print
              }
            },
            columns:paymentColumns
          }
        }
      ]
    }

  }


  print = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`打印付款通知书`,{
      view:PrintPayment,
      props:{
        params:{
          id:row.id
        }
      }
    });
  }

  clear = ()=>{
    this.chargeSum = 0;  //应扣款合计
    this.manFee = 0; //管理费金额
    this.alltaxSum = 0;//税金小计
    this.reserve = 0;//合同预留款
    this.otherReserve = 0; //其他预留

    this.borrSurplus = 0;//借款结余
    this.borrSum = 0;      //累计借款
    this.borrpaidSum = 0;//累计已付借款

    this.alldueSum = 0;//累计应付工程款
    this.recSum = 0;//累计收取工程款
    this.preborInsterest = 0;//预留借款利息


    this.payable = 0;//可支付工程款
    this.allpaidSum = 0;//累计已付工程款
    this.allpayableSurplus = 0;//历史可支付工程款结余


    this.form.setFieldsValue({
      recSumManual:'',
      invSumManual:'',
      manRateManual:'',
      manFeeManual:'',
      salestaxSumManual:'',
      inputtaxSumManual:'',
      vatManual:'',
      cjtaxSumManual:'',
      estimateVatManual:'',
      alltaxSumManual:'',
      reserveManual:'',
      allpaidSumManual:'',
      otherReserveManual:'',
      borrSumManual:'',
      preborInsterestManual:'',
      borrpaidSumManual:'',
      payableManual:'',
      chargeSumManual:'',
      alldueSumManual:''
    })
  }


  setCallback = (data)=>{
    this.form.setFieldsValue({
      recSumManual:data.recSumManual, //累计收取工程款(元)--手工
      invSumManual:data.invSumManual,  //累计开票数(元)--手工
      manRateManual:data.manRateManual,  //管理费率--手工
      manFeeManual:data.manFeeManual,  //管理费金额(元)--手工
      salestaxSumManual:data.salestaxSumManual, //累计销项税(元)--手工
      inputtaxSumManual:data.inputtaxSumManual,  //累计进项税(元)--手工
      vatManual:data.vatManual,  //累计应交增值税(元)--手工
      cjtaxSumManual:data.cjtaxSumManual, //城建税及教育费附加(元)--手工
      estimateVatManual:data.estimateVatManual,  //按税率2.5%暂估增值税款(元)--手工
      alltaxSumManual:data.alltaxSumManual,  //税金小计(元)--手工
      reserveManual:data.reserveManual, //合同预留款(元)--手工
      allpaidSumManual:data.allpaidSumManual,  //累计已付工程款(元)--手工
      otherReserveManual:data.otherReserveManual,  //其他预留(元)--手工
      borrSumManual:data.borrSumManual,  //累计借款(元)--手工
      preborInsterestManual:data.preborInsterestManual, //预留借款利息(元)--手工
      borrpaidSumManual:data.borrpaidSumManual,  //累计已付借款(元)--手工
      payableManual:data.payableManual, //可支付工程款(元)--手工
      chargeSumManual:data.chargeSumManual,  //应扣款合计(元)--手工
      alldueSumManual:data.alldueSumManual //累计应付工程款(元)--手工
    })
  }

  render(){

    let {info,tableList} = this.state;




    return(
      <div className="content">
        <Form data={info} ref={e=>this.form=e} {...this.props} setCallback={this.setCallback}  tableList={tableList} submitCallback={()=>{
            this.clear();
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default AppForm;
