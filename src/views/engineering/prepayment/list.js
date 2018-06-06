import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Form from './form';
import View from './view';


import {Modal} from 'antd';
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
          type: "monthPicker",
          name: "beginDate",
          label: "起始税款所属期间"
        },
        {
          type: "monthPicker",
          name: "endDate",
          label: "结束税款所属期间"
        },
      ],
      columns : [
        { title: "K3工程编码",dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "内部单位", dataIndex: "area",dic:"area_sort"},
        { title: "是否鼓楼申报", dataIndex: "isgulou",dic:"isgulou_flag"},
        { title: "计税方式", dataIndex: "taxsetMode",dic:"taxset_mode" },
        { title: "预征率", dataIndex: "pretaxRate",render:(text)=>{
          let {preTax} = this.props;

          for(var i=0;i<preTax.length;i++){
            if(`${text}` === preTax[i].value){
              return preTax[i].label;
            }
          }

          return text;
        }  },
        { title: "累计开票销项金额(元)", dataIndex: "saleinvSum" },
        { title: "累计分包进项金额(元)", dataIndex: "subinvSum" },
        { title: "应预缴税额累计(元)", dataIndex: "prepaySum"},
        { title: "实际预缴税额累计(元)", dataIndex: "actprepaySum" },
        { title: "当月开票销项金额(元)", dataIndex: "cursaleinvSum" },
        { title: "当月分包进项金额(元)", dataIndex: "cursubinvSum" },
        { title: "当月应预缴税额(元)", dataIndex: "curprepaySum" },
        { title: "实际预缴税额(元)", dataIndex: "actprepayAmount" },
        { title: "税款所属期间", dataIndex: "prepayPeriod" },
        { title: "税单号码", dataIndex: "taxformNo" },
        { title: "备注信息", dataIndex: "remarks" },
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
        export:{
          visible: (selectedRowKeys) => selectedRowKeys.length > 0,
          click:this.export
        },
        exportAll:{
          visible: () => true,
          click:this.exportAll
        },
        importPrepayment:{
          visible: () => true,
          click:this.importPrepayment
        },
        downloadPre_paidTemplate:{
          visible: () => true,
          click:this.downloadPre_paidTemplate
        }
      }
    }

  }

  importPrepayment = ()=>{
    window.uc.importFiles("/import/prepay",()=>{
      this.refresh();
    });
  }

  downloadPre_paidTemplate = ()=>{
    confirm({
      title: '是否确定下载预缴模板',
      onOk:()=> {
        window.uc.download("/import/prepayModel");
      },
    });
  }


  swiper = ()=>{
    this.refresh();
  }

  export = (selectedRowKeys,selectedRows, allData)=>{

    let ids = selectedRows.map((item,i)=>{
      return item.id;
    })

    confirm({
      title: '是否确定导出',
      onOk:()=> {
        window.uc.download(`/prepay/export`,{
          ids:ids.toString()
        });
      },
    });

  }

  exportAll = ()=>{
    confirm({
      title: '是否确定全部导出',
      onOk:()=> {
        window.uc.download("/prepay/export");
      },
    });
  }

  view = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`查看${row.proNo}`,{
      view:View,
      props:{
        params:{id:row.id},
        paramsUrl:"/prepay/detail",
        preTax:this.props.preTax
      }
    });
  }

  edit = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    this.props.add(`编辑${row.proNo}`,{
      view:Form,
      props:{
        params:{id:row.id},
        paramsUrl:"/prepay/detail",
        submitUrl:"/prepay/update",
        preTax:this.props.preTax
      }
    })
  }


  add = ()=>{
    this.props.add('新增预缴',{
      view:Form,
      props:{
        submitUrl:"/prepay/add",
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
          url="/prepay/show"
          deleteUrl="/prepay/delete"
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
