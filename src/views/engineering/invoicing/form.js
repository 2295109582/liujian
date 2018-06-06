import React,{Component} from 'react';

import Form from '@c/form';
import StaticTable from "@c/table/staticTable";

class AppForm extends Component{

    invAmount = 0;
    salestaxSum = 0;
    vat = 0;
    inputtaxSum = 0;
    pretaxSum = 0;
    info = [
        {
          type: "input",
          name: "appNo",
          label: "申请编号"
        },
        {
          type: "datePicker",
          name: "appDate",
          label: "申请日期"
        },
        {
          type: "input",
          name: "appDepartment",
          label: "申请部门"
        },
        {
          type: "input",
          name: "applicant",
          label: "申请人"
        },
        {
          type: "input",
          name: "tel",
          label: "联系电话"
        },
        {
          type: "InvoicingApplication",
          name: "proId",
          labelName: "proName",
          label: "工程名称",
          callback:(row)=>{

            this.taxRate = parseFloat(row.taxRate);
            this.salestaxSum =  parseFloat(row.salestaxSum);

            this.inputtaxSum = parseFloat(row.inputtaxSum);
            this.pretaxSum = parseFloat(row.pretaxSum);

            this.setTaxAmount();


            this.form.setFieldsValue({
              proNo:row.proNo, //K3工程编码
              taxMode:row.taxMode,    //计税方式
              area:row.area,  //内部单位
              salestaxSum:row.salestaxSum, //累计销项(元)
              inputtaxSum:row.inputtaxSum, //累计进项(元)
              pretaxSum:row.pretaxSum, //累计预缴(元)
              vat:row.vat, //应交增值税(元)
              //taxbearingRate:row.taxbearingRate, //  税负率(%)
              ownerName:row.ownerName, //业主单位名称
              taxpayerSite:row.taxpayerSite, //纳税人地址
              taxpayerNum:row.taxpayerNum, //纳税人识别号
              ownerTel:row.ownerTel, //电话
              openBank:row.openBank, //开户行
              bankAccount:row.bankAccount, //账号
              procost:row.procost, //项目合同造价(元)
              taxRate:row.taxRate, //税率(%)
            })
          }
        },
        {
          type: "input",
          name: "proNo",
          label: "K3工程编码",
          readonly:true
        },
        {
          type: "select",
          dic:"taxset_mode",
          name: "taxMode",
          label: "计税方式",
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
          type: "amount",
          name: "salestaxSum",
          label: "累计销项(元)",
          readonly:true
        },
        {
          type: "amount",
          name: "inputtaxSum",
          label: "累计进项(元)",
          readonly:true
        },
        {
          type: "amount",
          name: "pretaxSum",
          label: "累计预缴(元)",
          readonly:true
        },
        {
          type: "amount",
          name: "vat",
          label: "应交增值税(元)",
          readonly:true
        },
        {
          type: "amount",
          name: "taxbearingRate",
          label: "税负率(%)",
          readonly:true
        },
        {
          type: "input",
          name: "ownerName",
          label: "业主单位名称",
          readonly:true
        },
        {
          type: "textarea",
          name: "taxpayerSite",
          label: "纳税人地址",
          readonly:true
        },
        {
          type: "input",
          name: "taxpayerNum",
          label: "纳税人识别号",
          readonly:true
        },
        {
          type: "input",
          name: "ownerTel",
          label: "电话",
          readonly:true
        },
        {
          type: "select",
          name: "openBank",
          dic:"bank_code",
          label: "开户行",
          readonly:true
        },
        {
          type: "input",
          name: "bankAccount",
          label: "账号",
          readonly:true
        },
        {
          type: "input",
          name: "taxserviceName",
          label: "应税服务名称",
          placeholder:"例如：工程款/设计费/房租/设备租赁",
          rules: [{ required: true}]
        },
        {
          type: "amount",
          name: "procost",
          label: "项目合同造价(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "select",
          dic:"inv_type",
          name: "invType",
          label: "发票类型",
          rules: [{ required: true}]
        },
        {
          type: "amount",
          name: "invAmount",
          label: "本次开票金额(元)",
          rules: [{ required: true}],
          change:(e)=>{
            let value = e.target.value;
            this.invAmount = parseFloat(value) || 0;
            this.setTaxAmount();
          }
        },
        {
          type: "amount",
          name: "notaxAmount",
          label: "不含税金额(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "taxRate",
          label: "税率(%)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "taxAmount",
          label: "销项税额(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "textarea",
          name: "remarks",
          label: "发票备注信息",
          placeholder:"建筑服务发生地/房租所属月份/其他"
        },
      ]



  setTaxAmount = ()=>{  //设置销项税额  设置不含税金额  累计销项
    let { invAmount,taxRate,salestaxSum,inputtaxSum,pretaxSum } = this;

    //invAmount 本次开票金额(元)
    //taxRate 税率(%)
    //salestaxSum 累计销项(元)
    //inputtaxSum  累计进项(元)
    //pretaxSum  累计预缴(元)
    //应交增值税 vat
    //taxAmount 销项税额(元)

    //taxbearingRate 税负率

    let { form } = this;
        taxRate = taxRate/100;
    this.taxAmount = parseFloat(invAmount/(1+taxRate)*taxRate);
    this.notaxAmount = parseFloat(invAmount/(1+taxRate));
    salestaxSum = salestaxSum + this.taxAmount;
    this.sales = parseFloat(invAmount+salestaxSum);
    this.vat = (salestaxSum-inputtaxSum-pretaxSum);

    this.taxbearingRate = (this.vat+pretaxSum)/(salestaxSum/0.11)*100;

    this.taxbearingRate = isNaN(this.taxbearingRate)?0:this.taxbearingRate;

    this.taxbearingRate = this.taxbearingRate === -Infinity?0:this.taxbearingRate;


    form.setFieldsValue({
      taxAmount:this.taxAmount.toFixed(2),
      notaxAmount:this.notaxAmount.toFixed(2),
      sales:this.sales.toFixed(2),
      vat:this.vat.toFixed(2),
      salestaxSum:salestaxSum.toFixed(2),
      taxbearingRate:this.taxbearingRate.toFixed(2)
    })
  }

  confiInfo = {
    confiData : [
      {
        type: "input",
        name: "id",
        label: "id",
        visible:false
      },
      {
        type: "input",
        name: "invCode",
        label: "发票代码",
        rules: [{ required: true }]
      },
      {
        type: "input",
        name: "invNo",
        label: "发票号码",
        rules: [{ required: true }]
      },
      {
        type: "datePicker",
        name: "invdate",
        label: "开票日期"
      },
      {
        type: "amount",
        name: "invAmount",
        label: "含税金额(元)",
        rules: [{ required: true }],
        change:(e)=>{
          let value = e.target.value;
          let { invoicingForm } = this;
          let { taxRate } = this; //税率
          taxRate = taxRate/100;
          let notaxinvAmount = (value/(1+taxRate)).toFixed(2);
          let taxAmount = (value/(1+taxRate)*taxRate).toFixed(2);
          invoicingForm.setFieldsValue({
            notaxinvAmount,
            taxAmount
          });
        }
      },
      {
        type: "amount",
        name: "taxRate",
        label: "税率(%)",
        readonly:true
      },
      {
        type: "amount",
        name: "notaxinvAmount",
        label: "不含税金额(元)",
        readonly:true
      },
      {
        type: "amount",
        name: "taxAmount",
        label: "销项税额(元)",
        readonly:true
      }
    ],
    conficolumns : [
      { title: "发票代码",dataIndex: "invCode"},
      { title: "发票号码", dataIndex: "invNo"},
      { title: "开票日期", dataIndex: "invdate"},
      { title: "含税金额(元)", dataIndex: "invAmount"},
      { title: "税率(%)", dataIndex: "taxRate"},
      { title: "不含税金额(元)", dataIndex: "notaxinvAmount"},
      { title: "销项税额(元)", dataIndex: "taxAmount"}
    ]
  }

  returnForm = (el)=>{
    this.invoicingForm = el;
  }

  getTaxRate = ()=>{
    return { taxRate:this.taxRate };
  }

  constructor(){
    super(...arguments);

    this.invAmount = 0; //本次开票金额(元)
    this.taxRate = 0; //税率

    let {confiData,conficolumns} = this.confiInfo;

    this.state = {
      data:this.info,
      tableList:[
        {
          name:"record",
          view:StaticTable,
          props:{
            title:"发票明细",
            data:confiData,
            columns:conficolumns,
            returnForm:this.returnForm,
            defaultValue:this.getTaxRate
          }
        }
      ]
    }


  }


  setCallback = (list)=>{
    this.taxRate = parseFloat(list.taxRate);
    this.salestaxSum = parseFloat(list.salestaxSum);
  }



  render(){

    let {data,tableList} = this.state;
    let { isInvstatus } = this.props;

    tableList = isInvstatus===true?tableList:[];

    return(
      <div className="content">
        <Form ref={el=>this.form=el} data={data}  tableList={tableList} setCallback={this.setCallback} {...this.props} submitCallback={()=>{
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default AppForm;
