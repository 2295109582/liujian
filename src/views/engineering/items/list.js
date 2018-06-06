import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Form from './form';
import View from './view';

import InvoiceDetails from './invoiceDetails';

import { Modal} from 'antd';
const confirm = Modal.confirm;


class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type: "Accounting",
          name:"proId",
          labelName: "proName",
          label: "工程名称"
        },
        {
          type: "select",
          name:"invUnit",
          dic:"invunit_type",
          label: "开票单位类型",
        },
        {
          type: "input",
          name:"proName",
          label: "开票单位名称"
        },
        {
          type: "datePicker",
          name: "beginDate",
          label: "起始认证日期"
        },
        {
          type: "datePicker",
          name: "endDate",
          label: "结束认证日期"
        },
      ],
      columns : [
        { title: "K3工程编码",dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "开票单位", dataIndex: "invUnit",dic:"invunit_type"},
        { title: "含税金额(元)", dataIndex: "taxamounts" },
        { title: "不含税金额(元)", dataIndex: "notaxamounts" },
        { title: "进项税额(元)", dataIndex: "intaxamounts" },
        { title: "发生地", dataIndex: "locality"},
        { title: "是否工程类", dataIndex: "ispro",dic:"ispro_flag" },
        { title: "转出税额(元)", dataIndex: "outtaxamounts" },
        { title: "备注信息", dataIndex: "rmakes" }
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
        },
        invoiceDetails:{
          visible:(selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.invoiceDetails
        },
        importedItems:{
          visible: () => true,
          click:this.importedItems
        },
        downloadEntryTemplate:{
          visible: () => true,
          click:this.downloadEntryTemplate
        }
      }
    }

  }

  swiper = ()=>{
    this.refresh();
  }

  importedItems = () => {
    window.uc.importFiles("/import/income",()=>{
      this.refresh();
    });
  }

  downloadEntryTemplate = ()=>{
    confirm({
      title: '是否确定下载工程进项模板',
      onOk:()=> {
        window.uc.download("/import/incomeModel");
      },
    });
  }

  invoiceDetails = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`发票明细${row.proNo}`,{
      view:InvoiceDetails,
      props:{
        row,
        preTax:this.props.preTax
      }
    });
  }

  view = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`查看${row.proNo}`,{
      view:View,
      props:{
        params:{id:row.id},
        paramsUrl:"/income/detail"
      }
    });
  }

  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    this.props.add(`编辑${row.proNo}`,{
      view:Form,
      props:{
        params:{id:row.id},
        paramsUrl:"/income/detail",
        submitUrl:"/income/update",
        preTax:this.props.preTax
      }
    })
  }


  add = ()=>{
    this.props.add('新增进项',{
      view:Form,
      props:{
        submitUrl:"/income/add",
        preTax:this.props.preTax
      }
    })
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
          url="/income/show"
          deleteUrl="/income/delete"
          deleteKey="proNo"
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
