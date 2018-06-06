import React,{Component} from 'react';

import Form from '@c/form';


class AppForm extends Component{

    actprepaySum = 0;

    state = {
      data:[
        {
          type: "ProjectPrepayment",
          name: "proId",
          labelName: "proName",
          label: "工程名称",
          rules: [{ required: true}],
          callback:(row)=>{

            this.actprepaySum = row.actprepaySum;

            this.form.setFieldsValue({
              proNo:row.proNo, //K3工程编码
              area:row.area, //内部单位
              isgulou:row.isgulou,   //是否鼓楼申报
              taxsetMode:row.taxsetMode,   //计税方式
              pretaxRate:`${row.pretaxRate}`,  //预征率(%)
              saleinvSum:row.saleinvSum,   //累计开票销项金额
              subinvSum:row.subinvSum, //累计分包进项金额
              prepaySum:row.prepaySum,  //应预缴税额累计
              actprepaySum:row.actprepaySum,  //实际预缴税额累计
              cursaleinvSum:row.cursaleinvSum,  //当月开票销项金额
              cursubinvSum:row.cursubinvSum,  //  当月分包进项金额
              curprepaySum:row.curprepaySum, //当月应预缴税额
            })
          }
        },
        {
          type: "input",
          name: "proNo",
          label: "K3工程编码",
          readonly:true
        },
        {
          type: "select",
          name: "area",
          dic:"area_sort",
          label: "内部单位",
          readonly:true
        },
        {
          type: "select",
          name: "isgulou",
          dic:"isgulou_flag",
          label: "是否鼓楼申报",
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
          name: "pretaxRate",
          options:this.props.preTax,
          label: "预征率(%)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "saleinvSum",
          label: "累计开票销项金额(元)",
          readonly:true
        },
        {
          type: "amount",
          name: "subinvSum",
          label: "累计分包进项金额(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "prepaySum",
          label: "应预缴税额累计(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "actprepaySum",
          label: "实际预缴税额累计(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "cursaleinvSum",
          label: "当月开票销项金额(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "cursubinvSum",
          label: "当月分包进项金额(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "curprepaySum",
          label: "当月应预缴税额(元)",
          rules: [{ required: true}],
          readonly:true
        },
        {
          type: "amount",
          name: "actprepayAmount",
          label: "实际预缴税额(元)",
          rules: [{ required: true}],
          change:(e)=>{
            this.actprepayAmount = e.target.value;
            let actprepaySum =  this.actprepaySum;

            this.form.setFieldsValue({
              actprepaySum:parseFloat(actprepaySum)+parseFloat(this.actprepayAmount) || parseFloat(actprepaySum)
            })

          }
        },
        {
          type: "monthPicker",
          name: "prepayPeriod",
          label: "税款所属期间",
          rules: [{ required: true}],
        },
        {
          type: "input",
          name: "taxformNo",
          label: "税单号码",
          rules: [{ required: true}],
        },
        {
          type: "textarea",
          name: "remarks",
          label: "备注信息"
        }
      ]
    }




  render(){

    let {data} = this.state;

    return(
      <div className="content">
        <Form ref={el=>this.form=el} data={data} {...this.props} submitCallback={()=>{
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default AppForm;
