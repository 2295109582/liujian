import React,{Component} from 'react';

import Form from '@c/form';


class AppForm extends Component{

    recSum = 0;


    state = {
      data:[
        {
          type: "PeceiptComponent",
          name: "proId",
          labelName: "proName",
          label: "工程名称",
          rules: [{ required: true}],
          callback:(row)=>{

            this.recSum = parseFloat(row.recAmount);

            this.form.setFieldsValue({
              proNo:row.proNo, //K3工程编码
              ownerName:row.ownerName, //业主单位
              procost:row.procost, //工程造价
              taxsetMode:row.taxsetMode, //计税方式
              area:row.area,  //内部单位
              saleinvSum:row.invAmount, //累计已开票金额(元)
              recSum:row.recAmount, //累计收款金额(元)
            })
          }
        },
        {
          type: "input",
          name: "proNo",
          label: "K3工程编码",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "input",
          name: "ownerName",
          label: "业主单位名称",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "input",
          name: "procost",
          label: "工程造价",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type:"select",
          name: "taxsetMode",
          dic:"taxset_mode",
          label: "计税方式",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "select",
          dic:"area_sort",
          name: "area",
          label: "内部单位",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "saleinvSum",
          label: "累计已开票金额(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "recSum",
          label: "累计收款金额(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "datePicker",
          name: "recDate",
          label: "收款日期",
          rules: [{ required: true}]
        },
        {
          type: "amount",
          name: "recAmount",
          label: "本次收款金额(元)",
          rules: [{ required: true}],
          change:(e)=>{
            let value = parseFloat(e.target.value) || 0;
            let { recSum } = this;

            let rec = parseFloat(recSum + value).toFixed(2);
            this.form.setFieldsValue({
              recSum:rec
            })
          }
        },
        {
          type: "amount",
          name: "deduction",
          label: "甲方扣款(元)"
        },
        {
          type: "textarea",
          name: "reason",
          label: "扣款原因"
        },
        {
          type: "textarea",
          name: "remarks",
          label: "备注信息"
        }
      ]
    }


  setCallback = (list)=>{
      this.recSum = parseFloat(list.recAmount);
  }


  render(){

    let {data} = this.state;

    return(
      <div className="content">
        <Form ref={el=>this.form=el} data={data} {...this.props} setCallback={this.setCallback} submitCallback={()=>{
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default AppForm;
