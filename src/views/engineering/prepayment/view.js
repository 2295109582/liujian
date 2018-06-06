import React,{Component} from 'react';
import FormView from '@c/form/formView';

//查看
class View extends Component{

  state = {
    data:[
      {
        name: "proName",
        label: "工程名称"
      },
      {
        name: "proNo",
        label: "K3工程编码",
      },
      {
        name: "area",
        dic:"area_sort",
        label: "内部单位"
      },
      {
        name: "isgulou",
        dic:"isgulou_flag",
        label: "是否鼓楼申报"
      },
      {
        name: "taxsetMode",
        dic:"taxset_mode",
        label: "计税方式"
      },
      {
        name: "pretaxRate",
        dic:"preTax",
        options:this.props.preTax,
        label: "预征率(%)"
      },
      {
        name: "saleinvSum",
        label: "累计开票销项金额(元)"
      },
      {
        name: "subinvSum",
        label: "累计分包进项金额(元)"
      },
      {
        name: "prepaySum",
        label: "应预缴税额累计(元)"
      },
      {
        name: "actprepayum",
        label: "实际预缴税额累计(元)"
      },
      {
        name: "cursaleinvSum",
        label: "当月开票销项金额(元)"
      },
      {
        name: "cursubinvSum",
        label: "当月分包进项金额(元)"
      },
      {
        name: "curprepaySum",
        label: "当月应预缴税额(元)"
      },
      {
        name: "actprepayAmount",
        label: "实际预缴税额(元)"
      },
      {
        name: "prepayPeriod",
        label: "税款所属期间"
      },
      {
        name: "taxformNo",
        label: "税单号码"
      },
      {
        name: "remarks",
        label: "备注信息"
      }
    ]
  }

  render(){
    let {data} = this.state;
    return(
      <div className="content">
        <FormView data={data} {...this.props}  />
      </div>
    )
  }
}

export default View;
