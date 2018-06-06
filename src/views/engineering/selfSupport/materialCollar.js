import React,{Component} from 'react';

import Form from '@c/form';


class AppForm extends Component{

    info = [
      {
        type: "AccountingRemoveUnion",
        name: "proId",
        labelName: "proName",
        label: "工程名称",
        callback:(row)=>{
          this.form.setFieldsValue({
            proNo:row.proNo,
            pronature:row.pronature,
            area:row.area
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
        name: "pronature",
        dic:"pronature_type",
        label: "工程性质",
        readonly:true
      },
      {
        type: "select",
        name: "area",
        dic:"area_sort",
        label: "内部单位",
        readonly:true
      },
      {
        type: "input",
        name: "appNo",
        label: "编号",
        rules: [{ required: true}],
      },
      {
        type: "datePicker",
        name: "appDate",
        label: "用款日期",
        rules: [{ required: true}],
      },
      {
        type: "amount",
        name: "advancePay",
        label: "垫资额",
        rules: [{ required: true}],
      },
      {
        type: "select",
        name: "costSort",
        dic:"pay_content",
        label: "请款用途",
        rules: [{ required: true}],
      },
      {
        type: "select",
        dic:"payee_type",
        name: "payType",
        label: "付款单位类型",
        rules: [{ required: true}],
        change:(value)=>{
          let info = [...this.state.info];
          if(value === "01"){  //供应商类型
            info[9] = Object.assign(info[9],{
              type: "Supplier",
              readonly:false
            })
          }else if(value === "02"){  //专业分包公司
            info[9] = Object.assign(info[9],{
              type: "Subcontracting",
              readonly:false
            })
          };
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
        label: "银行账号",
        rules: [{ required: true}]
      },
      {
        type: "amount",
        name: "appPay",
        label: "付款金额(元)",
        rules: [{ required: true}]
      },
      {
        type: "textarea",
        name: "remarks",
        label: "备注"
      }
    ];




  constructor(){
    super(...arguments);

    this.state = {
      info:this.info
    }

  }



  render(){

    let { info } = this.state;

    return(
      <div className="content">
        <Form ref={el=>this.form=el} data={info} {...this.props} submitCallback={()=>{
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default AppForm;
