import React,{Component} from 'react';
import Form from '@c/form';
import StaticTable from "@c/table/staticTable";

export default class AppForm extends Component{


  info = {
    infoData:[
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
          {value:"1",label:"中国银行"},
          {value:"2",label:"建设银行"},
          {value:"3",label:"工商银行"},
          {value:"4",label:"交通银行"},
          {value:"5",label:"农业银行"},
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
          {value:"1",label:"劳务"},
          {value:"2",label:"材料"}
        ],
        name: "subunitType",
        label: "分包类别",
        rules: [{ required: true}]
      }
    ],
    infoHideData:[
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

  teams = {
    teamColumns : [
      { title: "班组名称",dataIndex: "teamName"},
      { title: "班组类别", dataIndex: "teamSort"},
      { title: "班组负责人", dataIndex: "teamleader"},
      { title: "联系电话", dataIndex: "teamTel"}
    ],
    teamData:[
      {
        type: "input",
        name: "id",
        label: "id",
        readonly:true,
        visible:false
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
        rules: [{ required: true}]
      },
      {
        type: "input",
        name: "teamTel",
        label: "联系电话",
        rules: [{ required: true}]
      },
      {
        type:"select",
        options:[
          {value:"1",label:"水泥"},
          {value:"2",label:"模板"},
          {value:"3",label:"钢筋"}
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


  constructor(){
    super(...arguments);

    let {teamColumns,teamData} = this.teams;

    this.state = {
      tableList:[
        {
          name:"team",
          view:StaticTable,
          props:{
            title:"班组信息",
            data:teamData,
            columns:teamColumns
          }
        }
      ]
    }
  }



  render(){

    let {infoData,infoHideData} = this.info;
    let {tableList} = this.state;

    return(
      <div className="content">
        <Form
          {...this.props}
          data={infoData}
          hideData={infoHideData}
          tableList={tableList}
        
          ref="form"
        />

      </div>
    )
  }
}
