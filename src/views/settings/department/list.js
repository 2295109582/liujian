import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import FormModal from '@c/form/formModal';



class List extends Component{



  constructor(){
    super(...arguments);

    this.state = {
      data:[
        {
          type: "input",
          name: "id",
          label: "id",
          readonly:true,
          visible:false
        },
        {
          type: "input",
          name: "departmentName",
          label: "部门名称",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "shortName",
          label: "部门简称"
        },
        {
          type: "input",
          name: "description",
          label: "部门描述"
        },
        {
          type: "input",
          name: "officeEmail",
          label: "部门邮箱"
        },
        {
          type: "input",
          name: "officeFax",
          label: "部门传真"
        },
        {
          type: "input",
          name: "officeTel",
          label: "部门电话"
        },
        {
          type: "input",
          name: "employeeNum",
          label: "部门人数"
        }
      ],
      search: [
        {
          type: "input",
          name: "departmentName",
          label: "部门名称"
        },
        {
          type: "input",
          name: "shortName",
          label: "部门简称"
        },
        {
          type: "input",
          name: "officeTel",
          label: "部门联系电话"
        }
      ],
      columns : [
        { title: "部门名称 ", dataIndex: "departmentName"},
        { title: "部门简称", dataIndex: "shortName"},
        { title: "部门描述", dataIndex: "description"},
        { title: "部门邮箱", dataIndex: "officeEmail"},
        { title: "部门传真", dataIndex: "officeFax"},
        { title: "部门电话", dataIndex: "officeTel"},
        { title: "部门人数", dataIndex: "employeeNum"},
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

  view = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    let {form} = this.refs;
    let { data } = this.state;
    data.forEach((item,i)=>{
      data[i].readonly = true;
    })
    this.setState({data})
    form.setData({
      title:"查看部门"
    },row,true);
  }


  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    let {form} = this.refs;
    let { data } = this.state;
    data.forEach((item,i)=>{
      data[i].readonly = false;
    })
    this.setState({data:data});
    form.setData({
      title:"编辑部门"
    },row);
  }

  add = ()=>{
    let {form} = this.refs;
    let { data } = this.state;
    data.forEach((item,i)=>{
      data[i].readonly = false;
    })
    this.setState({data:data})
    form.show({
      title:"新增部门"
    });
  }



  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns,toolbar,data} = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/department/show"
          deleteUrl="/department/delete"
          deleteKey="departmentName"
          scroll={false}
          columns={columns}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
        <FormModal
          ref="form"
          data={data}
          submitUrl="/department/add"
          updateUrl="/department/update"
          submitCallback={this.refresh}
        />
      </div>
    )
  }
}



export default List;
