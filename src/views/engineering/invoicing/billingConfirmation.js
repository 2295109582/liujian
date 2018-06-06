import React,{Component} from 'react';

import Form from '@c/form';
import StaticTable from "@c/table/staticTable";

class AppForm extends Component{

    info = {
      data:[
        {
          type: "input",
          name: "appNo",
          label: "申请编号"
        },
        {
          type: "datePicker",
          name: "appDate",
          label: "申请日期",
          readonly:true
        },
        {
          type: "input",
          name: "appDepartment",
          label: "申请部门",
          readonly:true
        },
        {
          type: "input",
          name: "applicant",
          label: "申请人",
          readonly:true
        },
        {
          type: "input",
          name: "tel",
          label: "联系电话",
          readonly:true
        },
        {
          type: "InvoicingApplication",
          name: "proId",
          labelName: "proName",
          label: "工程名称",
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
          label: "开户行",
          dic:"bank_code",
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
          rules: [{ required: true}],
          readonly:true
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
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "invAmount",
          label: "本次开票金额(元)",
          rules: [{ required: true}],
          readonly:true
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
          readonly:true
        },
      ]
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

  setCallback = (list)=>{
    this.taxRate =  list["taxRate"]; //税率
  }

  getTaxRate = ()=>{
    return { taxRate:this.taxRate };
  }

  constructor(){
    super(...arguments);

    this.taxRate = 0; //税率

    let {confiData,conficolumns} = this.confiInfo;

    this.state = {
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


  render(){

    let {data} = this.info;
    let {tableList} = this.state;

    return(
      <div className="content">
        <Form ref={el=>this.form=el} data={data} tableList={tableList} setCallback={this.setCallback} {...this.props} submitCallback={()=>{
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default AppForm;
