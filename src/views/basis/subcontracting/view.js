import React,{Component} from 'react';


import FormView from '@c/form/formView';
import StaticTable from "@c/table/staticTable";

//
export default class View extends Component{

  info = {
    infoData:[
      {
        name: "subunitNo",
        label: "K3分包单位编码"
      },
      {
        name: "subunitName",
        label: "分包单位名称"
      },
      {
        name: "taxaddress",
        label: "纳税人地址"
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
        label: "开户行"
      },
      {
        name: "bankaccount",
        label: "银行账号"
      },
      {
        name: "subunitType",
        label: "分包类别"
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

  teams = {
    teamColumns : [
      { title: "班组名称",dataIndex: "teamName"},
      { title: "班组类别", dataIndex: "teamSort"},
      { title: "班组负责人", dataIndex: "teamleader"},
      { title: "联系电话", dataIndex: "teamTel"}
    ]
  }

  constructor(){
    super(...arguments);

    let {teamColumns} = this.teams;

    this.state = {
      tableList:[
        {
          name:"team",
          view:StaticTable,
          props:{
            title:"班组信息",
            columns:teamColumns
          }
        }
      ]
    }
  }


  render(){
    let {infoData} = this.info;
    let {tableList} = this.state;
    return(
      <div className="content">
        <FormView
          data={infoData}
          {...this.props}
          tableList={tableList}
        />
      </div>
    )
  }
}
