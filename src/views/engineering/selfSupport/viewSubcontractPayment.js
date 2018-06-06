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
        name: "contractName",
        label: "分包合同名称"
      },
      {
        name: "contractAmount",
        label: "合同金额(元)"
      },
      {
        dic:"taxset_mode",
        name: "taxsetMode",
        label: "计税方式"
      },
      {
        dic:"area_sort",
        name: "area",
        label: "内部单位"
      },
      {
        name: "appDate",
        label: "申请日期"
      },
      {
        name: "appNo",
        label: "编号"
      },
      {
        name: "thisAccom",
        label: "本期完成量"
      },
      {
        name: "allAccom",
        label: "累计完成量"
      },
      {
        name: "alldueSum",
        label: "累计应付工程款(元)"
      },
      {
        name: "allpaidSum",
        label: "截止目前已付款(元)"
      },
      {
        name: "appPay",
        label: "本期应付工程款(元)"
      },
      {
        name: "clerk",
        label: "核算员"
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
        dic:"bank_code",
        name: "bankId",
        label: "开户行"
      },
      {
        name: "bankNo",
        label: "银行账号"
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
