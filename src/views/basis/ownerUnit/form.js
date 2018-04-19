import React,{Component} from 'react';


import Form from '@c/form';
import FormView from '@c/form/formView';

export class AppForm extends Component{

    state = {
      data:[
        {
          name: "ownerCode",
          label: "K3业主单位编码",
          rules: [{ required: true }]
        },
        {
          name: "ownerName",
          label: "业主单位名称",
          rules: [{ required: true}]
        },
        {
          name: "taxpayerSite",
          label: "纳税人地址",
          rules: [{ required: true}],
        },
        {
          name: "taxpayerNum",
          label: "纳税人识别号",
          rules: [{ required: true}]
        },
        {
          name: "tel",
          label: "电话",
          rules: [{ required: true}]
        },
        {
          type:"select",
          options:[
            {value:1,label:"中国银行"},
            {value:2,label:"建设银行"},
            {value:3,label:"工商银行"},
            {value:4,label:"交通银行"},
            {value:5,label:"农业银行"},
          ],
          name: "openBank",
          label: "开户行",
          rules: [{ required: true}]
        },
        {
          name: "bankAccount",
          label: "银行账号",
          rules: [{ required: true}]
        }
      ],
      hideData:[
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
          type:"textarea",
          name: "noteMsg",
          label: "备注信息"
        }
      ]
    }





  render(){

    let {data,hideData} = this.state;
    let {params,paramsUrl,submitUrl} = this.props;

    return(
      <div className="content">
        <Form data={data} hideData={hideData} params={params} paramsUrl={paramsUrl} submitUrl={submitUrl} />
      </div>
    )
  }
}


export class View extends Component{

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
