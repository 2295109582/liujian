import React,{Component} from 'react';


import FormView from '@c/form/formView';
import StaticTable from "@c/table/staticTable";

//
export default class View extends Component{

  info = {
    infoData:[
      {
        name: "contractNo",
        label: "合同编号"
      },
      {
        name: "contractName",
        label: "合同名字"
      },
      {
        dic:"contract_type",
        name: "contractType",
        label: "合同类型"
      },
      {
        name: "contractAmount",
        label: "合同金额(元)"
      },
      {
        name: "ownerName",   //显示的名字name
        label: "业主单位名称",
      },
      {
        name: "proNo",
        label: "k3工程编码"
      },
      {
        name: "proName",
        label: "工程名称"
      },
      {
        dic:"pronature_type",
        name: "pronature",
        label: "工程性质"
      },
      {
        name: "reserveRate",
        label: "合同预留款率(%)"
      },
      {
        name: "promanRate",
        label: "暂定管理费率(%)"
      },
      {
        name: "manrateChange",
        label: "管理费率增减(%)"
      },
      {
        name: "manRate",
        label: "实际管理费率(%)"
      },
      {
        dic:"area_sort",
        name: "area",
        label: "内部单位"
      },
      {
        dic:"taxset_mode",
        name: "taxsetMode",
        label: "计税方式"
      },
      {
        dic:"isgulou_flag",
        name: "isgulou",
        label: "是否鼓楼申报"
      },
      {
        dic:"preTax",
        options:this.props.preTax,
        name: "pretaxRate",
        label: "预征率(%)"
      },
      {
        name: "procost",
        label: "工程造价"
      },
      {
        name: "accountantName",
        label: "项目经办会计"
      },
      {
        type: "textarea",
        name: "remarks",
        label: "备注信息"
      }
    ]
  }


  contractSub = {
    contractSubColumns : [
      { title: "分包单位名称",dataIndex: "subName"},
      { title: "合同编号", dataIndex: "contractNo"},
      { title: "合同名称", dataIndex: "contractName"},
      { title: "合同金额(元)", dataIndex: "contractAmount"},
      { title: "签订日期", dataIndex: "signingdate"}
    ]
  }


  contractRep = {
    contractRepColumns : [
      { title: "补充合同编号",dataIndex: "contractNo"},
      { title: "补充合同名称", dataIndex: "contractName"},
      { title: "合同金额(元)", dataIndex: "contractAmount"},
      { title: "签订日期", dataIndex: "signingdate"}
    ]
  }

  constructor(){
    super(...arguments);

    let { contractSubColumns } = this.contractSub;
    let { contractRepColumns } = this.contractRep;
    this.state = {
      tableList:[
        {
          name:"contractSub",
          view:StaticTable,
          props:{
            title:"分包合同",
            columns:contractSubColumns
          }
        },
        {
          name:"contractRep",
          view:StaticTable,
          props:{
            title:"总包补充合同",
            columns:contractRepColumns
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
