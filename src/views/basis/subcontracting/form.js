import React,{Component} from 'react';
import Form from '@c/form';

export default class AppForm extends Component{

    state = {
      data:[
        {
          type: "input",
          name: "subunitNo",
          label: "K3分包单位编码",
          rules: [{ required: true }]
        },
        {
          type: "input",
          name: "subunitName",
          label: "分包单位名称",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "taxaddress",
          label: "纳税人地址",
          rules: [{ required: true}],
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
            {value:"中国银行",label:"中国银行"},
            {value:"建设银行",label:"建设银行"},
            {value:"工商银行",label:"工商银行"},
            {value:"交通银行",label:"交通银行"},
            {value:"农业银行",label:"农业银行"},
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
          type:"select",
          options:[
            {value:"劳务",label:"劳务"},
            {value:"材料",label:"材料"}
          ],
          name: "subunitType",
          label: "分包类别",
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
    let {params,paramsUrl,submitUrl} = this.props;

    return(
      <div className="content">
        <Form data={data} hideData={hideData} params={params} paramsUrl={paramsUrl} submitUrl={submitUrl} />
      </div>
    )
  }
}
