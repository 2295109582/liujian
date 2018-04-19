import React, { Component } from "react";
import Table from "@c/table";
import FormModal from "@c/form/formModal";
import Search from '@c/search';

class Home0 extends Component {


  constructor(){
    super(...arguments);
    this.state = {
      data : [
        {
          type: "input",
          name: "theCompany1",
          label: "用户编号",
          rules: [{ required: true, message: "请输入您的用户编号!" }]
        },
        {
          type: "input",
          name: "theCompany2",
          label: "用户名称",
          rules: [{ required: true, message: "请输入您的用户编号!" }]
        },
        {
          type: "input",
          name: "theCompany3",
          label: "用水地址",
          rules: [{ required: true, message: "请输入您的用户编号!" }]
        },
        {
          type: "input",
          name: "theCompany4",
          label: "水费年月",
          rules: [{ required: true, message: "请输入您的用户编号!" }]
        },
        {
          type: "check",
          name: "character",
          data: [
            { label: "部门管理员", value: "Apple1" },
            { label: "收费员", value: "rPea2" },
            { label: "管理员", value: "Orange3" }
          ],
          label: "用户角色",
          rules: [{ required: true, message: "请输入您的用户编号!" }]
        },
        {
          type: "radio",
          data: [{ label: "是", value: "1" }, { label: "否", value: "2" }],
          name: "islogin",
          label: "是否允许登录",
          rules: [{ required: true, message: "请输入您的用户编号!" }]
        },
        {
          type: "textarea",
          name: "note",
          label: "备注",
          rules: [{ required: true, message: "请输入您的用户名!" }]
        }
      ],
      columns : [
        {
          title: "用户编号",dataIndex: "name",key: "name",
          render: (text, row) => (
            <a onClick={() => { console.log(row)}}>
              {text}
            </a>
          )
        },
        { title: "用户名称", dataIndex: "platform", key: "platform" },
        { title: "用水地址", dataIndex: "version", key: "version" },
        { title: "水费年月", dataIndex: "upgradeNum", key: "upgradeNum" },
        { title: "抄表期数", dataIndex: "creator", key: "creator" },
        { title: "抄表日期", dataIndex: "createdAt", key: "createdAt" },
        { title: "抄表顺序号", key: "operation", render: () => <a>Publish</a> }
      ],
      searchConfig : [
        { type: "User", name: "theCompany1", label: "用户编号" },
        { type: "datePicker", name: "theCompany2", label: "起始日期" },
        { type: "select",data: [{ value: "55", label: "你好" },{ value: "66", label: "你很好" }],name: "theCompany3",label: "用户类型"},
        { type: "input", name: "theCompany4", label: "用户编号" },
        { type: "input", name: "theCompany5", label: "用户编号" }
      ],
      toolbarConfig : [
        {
          icon: "plus",
          text: "新建",
          visible:()=>true,
          click: () => {this.refs.form.show()}
        },
        {icon: "edit",text: "修改",visible:(selectedRowKeys, selectedRows,allData)=>{
          return selectedRowKeys.length === 1
        }, click: () => {}},
        {icon: "delete",text: "删除",visible:()=>true,click: () => {alert(11)}},
        {icon: "scan",text: "查看",visible:()=>true,click: () => {this.refs.form.show()}}
      ]
    }
  }


  render() {
    
    let {data,columns,searchConfig,toolbarConfig} = this.state;

    return (
      <div className="content">
        <Search data={searchConfig} ref="search" />
        <Table
          url="/api?type=table"
          columns={columns}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbarConfig}
          ref="table"
        />
        <FormModal
          title="新建抄表信息"
          submitUrl="/api?type=form"
          data={data}
          visible={false}
          ref="form"
        />
      </div>
    );
  }
}

export default Home0;
