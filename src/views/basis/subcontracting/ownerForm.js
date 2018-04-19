import React,{Component} from 'react';

import AppForm from '@c/form';

export default class OwnerForm extends Component{

  constructor(){
    super(...arguments);
    let {data} = this.props;

    this.state = {
      data:[
        {
          type: "input",
          name: "id",
          label: "id",
          readonly:true,
          defaultValue:data.id.toString(),
          visible:false
        },
        {
          type: "input",
          name: "subunitId",
          label: "所属分包公司",
          rules: [{ required: true }],
          readonly:true,
          defaultValue:data.subunitName
        },
        {
          type: "input",
          name: "teamName",
          label: "班组名称",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "teamleader",
          label: "班组负责人",
          rules: [{ required: true}],
        },
        {
          type: "input",
          name: "tel",
          label: "联系电话",
          rules: [{ required: true}]
        },
        {
          type:"select",
          options:[
            {value:"水泥",label:"水泥"},
            {value:"模板",label:"模板"},
            {value:"钢筋",label:"钢筋"}
          ],
          name: "teamSort",
          label: "班组类别",
          rules: [{ required: true}]
        },
        {
          type: "textarea",
          name: "remarks",
          label: "备注信息"
        }
      ]
    }

  }







  render(){

    let {data} = this.state;
    let {params,paramsUrl,submitUrl} = this.props;

    return(
      <div className="content">
        <AppForm data={data} params={params} paramsUrl={paramsUrl} submitUrl={submitUrl} />
      </div>
    )
  }
}
