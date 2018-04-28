import React,{Component} from 'react';

import AppForm from '@c/form';


class Form extends Component{

    state = {
      data:[
        {
          type: "input",
          name: "supplierNo",
          label: "K3供应商编码",
          rules: [{ required: true }]
        },
        {
          type: "input",
          name: "supplierName",
          label: "供应商单位名称",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "taxno",
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
            {value:5,label:"农业银行"}
          ],
          name: "bankId",
          label: "开户行",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "bankaccount",
          label: "银行账号",
          rules: [{ required: true}]
        },
        {
          type: "textarea",
          name: "taxaddress",
          label: "纳税人地址",
          rules: [{ required: true}]
        }
      ],
      hideData:[
        {
          type: "input",
          name: "linkman",
          label: "联系人"
        },
        {
          type: "input",
          name: "linkphone",
          label: "联系电话"
        },
        {
          type: "input",
          name: "fax",
          label: "传真"
        },
        {
          type: "input",
          name: "email",
          label: "电子邮箱"
        },
        {
          type:"textarea",
          name: "remarks",
          label: "备注信息"
        }
      ]
    }


  render(){

    let {data,hideData} = this.state;


    return(
      <div className="content">
        <AppForm data={data} hideData={hideData} {...this.props} submitCallback={()=>{
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default Form;
