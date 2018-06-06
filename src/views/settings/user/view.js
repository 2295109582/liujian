import React,{Component} from 'react';


import FormView from '@c/form/formView';
import StaticTable from "@c/table/staticTable";

//
export default class View extends Component{

  info = {
    infoData:[
      {
        name: "userName",
        label: "用户名"
      },
      {
        name: "realName",
        label: "真实姓名"
      },
      {
        name: "tel",
        label: "联系电话"
      },
      {
        name: "email",
        label: "邮箱"
      },
      {
        name: "departmentName",
        label: "所在部门"
      }
    ]
  }

  teams = {
    teamColumns : [
      { title: "角色名称",dataIndex: "roleName"}
    ]
  }

  constructor(){
    super(...arguments);

    let {teamColumns} = this.teams;

    this.state = {
      tableList:[
        {
          name:"role",
          view:StaticTable,
          props:{
            title:"角色信息",
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
