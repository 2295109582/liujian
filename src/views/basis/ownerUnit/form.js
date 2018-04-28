import React,{Component} from 'react';

import Form from '@c/form';


class AppForm extends Component{

    state = {
      data:[
        {
          type: "input",
          name: "ownerCode",
          label: "K3业主单位编码",
          rules: [{ required: true }]
        },
        {
          type: "input",
          name: "ownerName",
          label: "业主单位名称",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "taxpayerNum",
          label: "纳税人识别号",
          rules: [{ required: true}]
        },
        {
          type: "input",
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
          type: "input",
          name: "bankAccount",
          label: "银行账号",
          rules: [{ required: true}]
        },
        {
          type: "textarea",
          name: "taxpayerSite",
          label: "纳税人地址",
          rules: [{ required: true}],
        },
      ],
      hideData:[
        {
          type: "input",
          name: "linkman",
          label: "联系人"
        },
        {
          type: "input",
          name: "linkTel",
          label: "联系电话"
        },
        {
          type: "input",
          name: "linkFax",
          label: "传真"
        },
        {
          type: "input",
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

    return(
      <div className="content">
        <Form data={data} hideData={hideData} {...this.props} submitCallback={()=>{
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default AppForm;
