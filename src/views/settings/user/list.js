import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Form from './form';
import View from './view';





class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type: "input",
          name: "userName",
          label: "用户名"
        },
        {
          type: "input",
          name: "realName",
          label: "真实姓名"
        }
      ],
      columns : [
        { title: "用户名",dataIndex: "userName"},
        { title: "真实姓名", dataIndex: "realName"},
        { title: "联系电话", dataIndex: "tel"},
        { title: "邮箱", dataIndex: "email"},
        { title: "所在部门", dataIndex: "departmentName" },
        { title: "职位名称", dataIndex: "positionName" },
        { title: "上级领导名称", dataIndex: "leadName" }
      ],
      toolbar : {
        add:{
          visible: () => true,
          click:this.add
        },
        edit:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.edit
        },
        view:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.view
        }
      }
    }

  }


  swiper = ()=>{
    this.refresh();
  }

  view = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`查看${row.userName}`,{
      view:View,
      props:{
        params:{id:row.id},
        paramsUrl:"/role/showUserDetail"
      }
    });
  }

  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    this.props.add(`编辑${row.userName}`,{
      view:Form,
      props:{
        params:{id:row.id},
        paramsUrl:"/role/showUserDetail",
        submitUrl:"/role/updateUser"
      }
    });
  }

  add = ()=>{

    //window.uc.axios.post("")

    this.props.add('新增用户',{
      view:Form,
      props:{
        submitUrl:"/login/regist"
      }
    });
  }


  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns,toolbar} = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/role/showUserList"
          deleteUrl="/role/delete"
          deleteKey="userName"
          scroll={false}
          columns={columns}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
      </div>
    )
  }
}



export default List;
