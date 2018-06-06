import React,{Component} from 'react';
import Form from '@c/form';

class AppForm extends Component{

    info = [
      {
        type: "Accounting",
        name: "proId",
        labelName: "proName",
        label: "工程名称",
        rules: [{ required: true}],
        callback:(row)=>{
          this.form.setFieldsValue({
            proNo:row.proNo, //K3工程编码
            taxsetMode:row.taxsetMode, //计税方式
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
        type: "select",
        dic:"taxset_mode",
        name: "taxsetMode",
        label: "计税方式",
        readonly:true
      },
      {
        type: "select",
        dic:"pay_content",
        name: "costSort",
        label: "成本分类",
        rules: [{ required: true}]
      },
      {
        type: "select",
        dic:"invunit_type",
        name: "invUnit",
        label: "开票单位类型",
        rules: [{ required: true}],
        change:(value)=>{
          let info = [...this.state.info];
          if(value === "01"){  //供应商类型
            info[5] = Object.assign(info[5],{
              type: "Supplier",
              readonly:false
            })
          }else if(value === "02"){  //专业分包公司
            info[5] = Object.assign(info[5],{
              type: "Subcontracting",
              readonly:false
            })
          }

          this.form.setFieldsValue({
            typeId:"",
            typeName:""
          });
          this.setState({info});
        }
      },
      {
        type: "Supplier",
        name: "typeId",
        labelName:"typeName",
        label: "开票单位名称",
        rules: [{ required: true}],
        readonly:true
      },
      {
        type: "Industry",
        name: "tradeType",
        labelName: "tradeName",
        label: "行业",
        rules: [{ required: true}]
      },
      {
        type: "input",
        name: "locality",
        label: "发生地",
        rules: [{ required: true}]
      },
      {
        type: "monthPicker",
        name: "prepayPeriod",
        label: "税款所属期间",
        rules: [{ required: true}]
      },
      {
        type: "select",
        dic:"ispro_flag",
        name: "ispro",
        label: "是否工程类",
        rules: [{ required: true}]
      },
      {
        type: "select",
        dic:"isfb_flag",
        name: "isfb",
        label: "是否分包",
        rules: [{ required: true}],
      },
      {
        type: "amount",
        name: "invCount",
        label: "发票张数",
        readonly:true
      },
      {
        type: "amount",
        name: "taxamounts",
        label: "含税金额(元)",
        readonly:true
      },
      {
        type: "amount",
        name: "notaxamounts",
        label: "不含税金额(元)",
        readonly:true
      },
      {
        type: "amount",
        name: "intaxamounts",
        label: "进项税额(元)",
        readonly:true
      },
      {
        type: "amount",
        name: "outtaxamounts",
        label: "转出税额(元)",
        readonly:true
      },
      {
        type: "textarea",
        name: "remarks",
        label: "备注信息"
      }
    ];






  constructor(){
    super(...arguments);


    this.state = {
      info:this.info
    }

  }



  render(){

    let { info } = this.state;

    return(
      <div className="content">
        <Form ref={el=>this.form=el} data={info}  {...this.props} submitCallback={()=>{
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default AppForm;
