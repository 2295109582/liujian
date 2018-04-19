import React,{Component} from 'react';
import FormView from '@c/form/formView';

//查看
class View extends Component{

  state = {
    data:[
      {
        name: "ownerCode",
        label: "K3业主单位编码"
      },
      {
        name: "ownerName",
        label: "业主单位名称"
      },
      {
        name: "taxpayerSite",
        label: "纳税人地址"
      },
      {
        name: "taxpayerNum",
        label: "纳税人识别号"
      },
      {
        name: "tel",
        label: "电话"
      },
      {
        name: "openBank",
        label: "开户行"
      },
      {
        name: "bankAccount",
        label: "银行账号"
      },
      {
        name: "linkman",
        label: "联系人"
      },
      {
        name: "linkTel",
        label: "联系电话"
      },
      {
        name: "linkFax",
        label: "传真"
      },
      {
        name: "linkEmail",
        label: "电子邮箱"
      },
      {
        name: "noteMsg",
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
