import React,{Component} from 'react';
import FormView from '@c/form/formView';

//查看
class View extends Component{

  state = {
    data:[
      {
        name: "proName",
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
        label: "内部单位",
      },
      {
        name: "appNo",
        label: "单据编号"
      },
      {
        name: "appDate",
        label: "领款日期"
      },
      {
        name: "attachcount",
        label: "附加张数"
      },
      {
        name: "reimSort",
        dic:"reim_sort",
        label: "报销费用类别"
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
