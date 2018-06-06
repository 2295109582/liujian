import React,{Component} from 'react';
import FormView from '@c/form/formView';

//查看
class View extends Component{

  state = {
    data:[
      {
        name: "supplierNo",
        label: "K3供应商编码"
      },
      {
        name: "supplierName",
        label: "供应商名称"
      },
      {
        name: "taxno",
        label: "纳税人识别号"
      },
      {
        name: "tel",
        label: "电话"
      },
      {
        name: "bankId",
        label: "开户行",
        dic:"bank_code"
      },
      {
        name: "bankaccount",
        label: "银行账号"
      },
      {
        name: "taxaddress",
        label: "纳税人地址"
      },
      {
        name: "linkman",
        label: "联系人"
      },
      {
        name: "linkphone",
        label: "联系电话"
      },
      {
        name: "fax",
        label: "传真"
      },
      {
        name: "email",
        label: "电子邮箱"
      },
      {
        name: "remarks",
        label: "备注信息"
      }
    ]
  }

  render(){
    let {params,paramsUrl} = this.props;
    let {data} = this.state;
    return(
      <div className="content">
        <FormView data={data} params={params} paramsUrl={paramsUrl} />
      </div>
    )
  }
}

export default View;
