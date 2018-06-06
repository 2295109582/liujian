import React,{Component} from 'react';

import Form from '@c/form';


class AppForm extends Component{

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
        label: "proId",
        readonly:true,
        visible:false
      },
      {
        type: "input",
        name: "limitappNo",
        label: "付款审批单编号",
        readonly:true
      },
      {
        type: "input",
        name: "proName",
        label: "工程名称",
        readonly:true
      },
      {
        type: "input",
        name: "payable",
        label: "审批单额度(元)",
        readonly:true
      },
      {
        type: "input",
        name: "thispaidSum",
        label: "审批单累计已付款(元)",
        readonly:true
      },
      {
        type: "input",
        name: "applicant",
        label: "付款申请人",
        rules: [{ required: true}],
      },
      {
        type: "datePicker",
        name: "appDate",
        label: "付款申请日期",
        rules: [{ required: true}],
      },
      {
        type: "select",
        dic:"pay_content",
        name: "payContent",
        label: "付款内容",
        rules: [{ required: true}],
      },
      {
        type: "amount",
        name: "appPay",
        label: "付款金额(元)",
        rules: [{ required: true}]
      },
      {
        type: "select",
        dic:"invunit_type",
        name: "payeeType",
        label: "付款单位类型",
        rules: [{ required: true}],
        change:(value)=>{
          let info = [...this.state.info];
          if(value === "01"){  //供应商类型
            info[11] = Object.assign(info[11],{
              type: "Supplier",
              readonly:false
            })
          }else if(value === "02"){  //专业分包公司
            info[11] = Object.assign(info[11],{
              type: "Subcontracting",
              readonly:false
            })
          };
          this.form.setFieldsValue({
            payeeId:"",
            payeeName:""
          });
          this.setState({info});
        }
      },
      {
        type: "Supplier",
        name: "payeeId",
        labelName:"payeeName",
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
        dic:"bank_code",
        name: "bankId",
        label: "开户行",
        rules: [{ required: true}]
      },
      {
        type: "input",
        name: "bankNo",
        label: "银行账号"
      },
      {
        type: "ProjectManagerAccounting",
        name: "comptrollerId",
        labelName:"comptrollerName",
        label: "项目主管会计"
      },
      {
        type: "FinancialManager",
        name: "fimanagerId",
        labelName:"fimanagerName",
        label: "财务经理"
      },
      {
        type: "input",
        name: "checkNo",
        label: "领用支票号码"
      },
      {
        type: "input",
        name: "recipient",
        label: "领用支票人"
      },
      {
        type: "textarea",
        name: "rmakes",
        label: "备注信息"
      }
    ];




  constructor(){
    super(...arguments);

    this.state = {
      info:this.info
    }

  }


  componentDidMount(){
    let { row } = this.props;

    let { id,proId,limitappNo,proName,payable,thispaidSum } = row;

    this.form.setFieldsValue({
      id,
      proId,
      limitappNo,
      proName,
      payable,
      thispaidSum
    })

  }


  render(){

    let { info } = this.state;

    return(
      <div className="content">
        <Form ref={el=>this.form=el} data={info} {...this.props} submitCallback={()=>{
            this.props.remove();
          }} />
      </div>
    )
  }
}

export default AppForm;
