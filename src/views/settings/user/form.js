import React,{Component} from 'react';
import Form from '@c/form';
import StaticTable from "@c/table/staticTable";

export default class AppForm extends Component{


  teams = {
    teamColumns : [
      { title: "角色名称",dataIndex: "roleName"}
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
        type:"Role",
        name: "id",
        labelName: "roleName",
        label: "角色名称",
        rules: [{ required: true}]
      }
    ]
  }


  constructor(){
    super(...arguments);

    let {teamColumns,teamData} = this.teams;


    this.state = {
      data:[
        {
          type: "input",
          name: "id",
          label: "id",
          visible:false
        },
        {
          type: "input",
          name: "userName",
          label: "用户名",
          rules: [{ required: true }]
        },
        {
          type: "input",
          name: "realName",
          label: "真实姓名",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "tel",
          label: "联系电话",
          rules: [{ required: true}],
        },
        {
          type: "input",
          name: "email",
          label: "邮箱"
        },
        {
          type: "Department",
          name: "department",
          labelName:"departmentName",
          label: "所在部门"
        },
        {
          type: "Position",
          name: "position",
          labelName:"positionName",
          label: "职位名称",
          rules: [{ required: true}],
          callback:(row)=>{
            window.uc.axios.post("/role/showUserLead",{
              position:row.id
            }).then((result)=>{

              if(result.status === 200){
                let { data } = this.state;

                let parentId = result.data.map((item,i)=>{
                  return {value:`${item.id}`,label:`${item.userName}`};
                })
                data[7] = Object.assign(data[7],{
                  readonly:false,
                  options:parentId
                })

                this.setState({data})

              }

            })
          }
        },
        {
          type: "select",
          options:[],
          name: "parentId",
          label: "上级领导名称",
          readonly:true
        },
      ],
      tableList:[
        {
          name:"role",
          view:StaticTable,
          props:{
            title:"角色信息",
            data:teamData,
            columns:teamColumns
          }
        }
      ]
    }
  }



  render(){

    let {tableList,data} = this.state;

    return(
      <div className="content">
        <Form
          {...this.props}
          data={data}
          tableList={tableList}
          submitCallback={()=>{
             if(this.props.params){
               this.props.remove();
             };
           }}
          ref="form"
        />

      </div>
    )
  }
}
