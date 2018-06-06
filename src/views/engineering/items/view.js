import React,{Component} from 'react';
import FormView from '@c/form/formView';
import StaticTable from "@c/table/staticTable";
//查看
class View extends Component{

  info = [
    {
      name: "proName",
      label: "工程名称"
    },
    {
      name: "proNo",
      label: "K3工程编码"
    },
    {
      dic:"taxset_mode",
      name: "taxsetMode",
      label: "计税方式",
    },
    {
      dic:"pay_content",
      name: "costSort",
      label: "成本分类",
    },
    {
      dic:"invunit_type",
      name: "invUnit",
      label: "开票单位类型"
    },
    {
      name: "typeName",
      label: "开票单位名称"
    },
    {
      name: "tradeName",
      label: "行业"
    },
    {
      name: "locality",
      label: "发生地"
    },
    {
      name: "prepayPeriod",
      label: "税款所属期间"
    },
    {
      dic:"ispro_flag",
      name: "ispro",
      label: "是否工程类"
    },
    {
      dic:"isfb_flag",
      name: "isfb",
      label: "是否分包"
    },
    {
      name: "invCount",
      label: "发票张数"
    },
    {
      name: "taxamounts",
      label: "含税金额(元)"
    },
    {
      name: "notaxamounts",
      label: "不含税金额(元)"
    },
    {
      name: "intaxamounts",
      label: "进项税额(元)"
    },
    {
      name: "outtaxamounts",
      label: "转出税额(元)"
    },
    {
      name: "remarks",
      label: "备注信息"
    }
  ]

  invoiceDetails = {
    invoColumns : [
      { title: "发票代码",dataIndex: "invCode"},
      { title: "发票号码", dataIndex: "invno"},
      { title: "开票日期", dataIndex: "invdate"},
      { title: "含税金额(元)", dataIndex: "taxamount"},
      { title: "进项税率(%)", dataIndex: "taxrate"},
      { title: "不含税金额(元)", dataIndex: "notaxamount"},
      { title: "进项税额(元)", dataIndex: "intaxamount"},
      { title: "认证日期", dataIndex: "confirmdate"},
      { title: "转出税额(元)", dataIndex: "outtaxamount"},
    ]
  }

  constructor(){
    super(...arguments);

    let { invoColumns } = this.invoiceDetails;
    this.state = {
      info:this.info,
      tableList: [
        {
          name:"incomeRecord",
          view:StaticTable,
          props:{
            title:"发票明细",
            columns:invoColumns
          }
        }
      ]
    }
  }


  render(){
    let { tableList,info} = this.state;
    return(
      <div className="content">
        <FormView data={info} {...this.props}  tableList={tableList} />
      </div>
    )
  }
}

export default View;
