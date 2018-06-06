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
        label: "K3工程编码"
      },
      {
        name: "ownerName",
        label: "业主单位名称"
      },
      {
        name: "procost",
        label: "工程造价"
      },
      {
        name: "taxsetMode",
        dic:"taxset_mode",
        label: "计税方式"
      },
      {
        dic:"area_sort",
        name: "area",
        label: "内部单位"
      },
      {
        name: "saleinvSum",
        label: "累计已开票金额(元)"
      },
      {
        name: "recSum",
        label: "累计收款金额(元)"
      },
      {
        name: "recDate",
        label: "收款日期"
      },
      {
        name: "recAmount",
        label: "本次收款金额(元)"
      },
      {
        name: "deduction",
        label: "甲方扣款(元)"
      },
      {
        name: "reason",
        label: "扣款原因"
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
