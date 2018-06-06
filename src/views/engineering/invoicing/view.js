import React,{Component} from 'react';
import FormView from '@c/form/formView';
import StaticTable from "@c/table/staticTable";
//查看
class View extends Component{

  info = [
      {
        name: "appNo",
        label: "申请编号"
      },
      {
        name: "appDate",
        label: "申请日期"
      },
      {
        name: "appDepartment",
        label: "申请部门"
      },
      {
        name: "applicant",
        label: "申请人"
      },
      {
        name: "tel",
        label: "联系电话"
      },
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
        label: "计税方式"
      },
      {
        dic:"area_sort",
        name: "area",
        label: "内部单位"
      },
      {
        name: "salestaxSum",
        label: "累计销项(元)"
      },
      {
        name: "inputtaxSum",
        label: "累计进项(元)"
      },
      {
        name: "pretaxSum",
        label: "累计预缴(元)"
      },
      {
        name: "vat",
        label: "应交增值税(元)"
      },
      {
        name: "taxbearingRate",
        label: "税负率(%)"
      },
      {
        name: "ownerName",
        label: "业主单位名称"
      },
      {
        name: "taxpayerSite",
        label: "纳税人地址"
      },
      {
        name: "taxpayerNum",
        label: "纳税人识别号"
      },
      {
        name: "ownerTel",
        label: "电话"
      },
      {
        dic:"bank_code",
        name: "openBank",
        label: "开户行"
      },
      {
        name: "bankAccount",
        label: "账号"
      },
      {
        name: "taxserviceName",
        label: "应税服务名称"
      },
      {
        name: "procost",
        label: "项目合同造价(元)"
      },
      {
        dic:"inv_type",
        name: "invType",
        label: "发票类型"
      },
      {
        name: "invAmount",
        label: "本次开票金额(元)"
      },
      {
        name: "notaxAmount",
        label: "不含税金额(元)"
      },
      {
        name: "taxRate",
        label: "税率(%)"
      },
      {
        name: "taxAmount",
        label: "销项税额(元)"
      },
      {
        name: "remarks",
        label: "发票备注信息"
      }
    ]



  confiInfo = {
    conficolumns : [
      { title: "发票代码",dataIndex: "invCode"},
      { title: "发票号码", dataIndex: "invNo"},
      { title: "开票日期", dataIndex: "invdate"},
      { title: "含税金额(元)", dataIndex: "invAmount"},
      { title: "税率(%)", dataIndex: "taxRate"},
      { title: "不含税金额(元)", dataIndex: "notaxinvAmount"},
      { title: "销项税额(元)", dataIndex: "taxAmount"}
    ]
  }



  constructor(){
    super(...arguments);

    let {conficolumns} = this.confiInfo;
    this.state = {
      data:this.info,
      tableList:[
        {
          name:"record",
          view:StaticTable,
          props:{
            title:"发票明细",
            columns:conficolumns
          }
        }
      ]
    }


  }


  render(){
    let {data,tableList} = this.state;
    let { isInvstatus } = this.props;

    tableList = isInvstatus===true?tableList:[];

    return(
      <div className="content">
        <FormView data={data} tableList={tableList} {...this.props}  />
      </div>
    )
  }
}

export default View;
