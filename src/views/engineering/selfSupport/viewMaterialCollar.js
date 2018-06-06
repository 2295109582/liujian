import React,{Component} from 'react';
import FormView from '@c/form/formView';

//查看
class View extends Component{

  state = {
    data:[
      {
        name: "proName",
        labelName: "proName",
        label: "工程名称"
      },
      {
        name: "proNo",
        label: "K3工程编码"
      },
      {
        name: "pronature",
        dic:"pronature_type",
        label: "工程性质"
      },
      {
        name: "area",
        dic:"area_sort",
        label: "内部单位"
      },
      {
        name: "appNo",
        label: "编号"
      },
      {
        name: "appDate",
        label: "用款日期"
      },
      {
        name: "advancePay",
        label: "垫资额"
      },
      {
        name: "costSort",
        dic:"pay_content",
        label: "请款用途"
      },
      {
        dic:"payee_type",
        name: "payType",
        label: "付款单位类型"
      },
      {
        name: "companyName",
        label: "付款单位名称"
      },
      {
        name: "teamName",
        label: "收款班组"
      },
      {
        dic:"bank_code",
        name: "bankId",
        label: "开户行"
      },
      {
        name: "bankNo",
        label: "银行账号"
      },
      {
        name: "appPay",
        label: "付款金额(元)"
      },
      {
        name: "remarks",
        label: "备注"
      }
    ]
  }

  render(){
    let {data} = this.state;
    return(
      <div className="content">
        <FormView data={data} {...this.props}  />
      </div>
    )
  }
}

export default View;
