import React,{Component} from 'react';

import Form from '@c/form';


class AppForm extends Component{

    info = [
      {
        type: "SubcontractPayment",
        name: "proId",
        labelName: "proName",
        label: "工程名称",
        callback:(row)=>{
          this.form.setFieldsValue({
            proNo:row.proNo,//K3工程编码
            taxsetMode:row.taxsetMode,//计税方式
            area:row.area,//内部单位
            allpaidSum:row.allpaidSum //截止目前已付款(元)
          });

          let info = [...this.state.info];
          info[2] = Object.assign(info[2],{
            readonly:false,
            params:{
              proId:row.id
            }
          })
          this.form.setFieldsValue({
            contractid:"",
            contractName:""
          });
          this.setState({info});

        }
      },
      {
        type: "input",
        name: "proNo",
        label: "K3工程编码",
        readonly:true
      },
      {
        type: "Contract",
        name: "contractid",
        labelName:"contractName",
        label: "分包合同名称",
        readonly:true,
        callback:(row)=>{
          this.form.setFieldsValue({
            contractAmount:row.contractAmount,//合同金额(元)
          });
        }
      },
      {
        type: "input",
        name: "contractAmount",
        label: "合同金额(元)",
        readonly:true
      },
      {
        type: "select",
        dic:"taxset_mode",
        name: "taxsetMode",
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
        type: "datePicker",
        name: "appDate",
        label: "申请日期",
        rules: [{ required: true}],
      },
      {
        type: "input",
        name: "appNo",
        label: "编号",
        rules: [{ required: true}],
      },
      {
        type: "input",
        name: "thisAccom",
        label: "本期完成量",
        rules: [{ required: true}],
      },
      {
        type: "input",
        name: "allAccom",
        label: "累计完成量",
        rules: [{ required: true}],
      },
      {
        type: "amount",
        name: "alldueSum",
        label: "累计应付工程款(元)",
        rules: [{ required: true}],
      },
      {
        type: "amount",
        name: "allpaidSum",
        label: "截止目前已付款(元)",
        readonly:true
      },
      {
        type: "amount",
        name: "appPay",
        label: "本期应付工程款(元)"
      },
      {
        type: "input",
        name: "clerk",
        label: "核算员",
        readonly:true
      },
      {
        type: "input",
        name: "clerkId",
        label: "核算员id",
        visible:false
      },
      {
        type: "select",
        dic:"payee_type",
        name: "payType",
        label: "付款单位类型",
        rules: [{ required: true}],
        change:(value)=>{
          let info = [...this.state.info];
          if(value === "01"){  //供应商类型
            info[16] = Object.assign(info[16],{
              type: "Supplier",
              readonly:false
            })
          }else if(value === "02"){  //专业分包公司
            info[16] = Object.assign(info[16],{
              type: "Subcontracting",
              readonly:false
            })
          };
          this.form.setFieldsValue({
            payeeId:"",
            companyName:""
          });
          this.setState({info});
        }
      },
      {
        type: "Supplier",
        name: "payeeId",
        labelName:"companyName",
        label: "付款单位名称",
        rules: [{ required: true}],
        readonly:true
      },
      {
        type: "select",
        dic:"bank_code",
        name: "bankId",
        label: "开户行",
        rules: [{ required: true}]
      },
      {
        type: "input",
        name: "bankNo",
        label: "银行账号",
        rules: [{ required: true}]
      }
    ];




  constructor(){
    super(...arguments);

    this.state = {
      info:this.info
    }

  }

  componentDidMount(){

    let { id , userName } = window.uc.storage.get("userInfo");


    this.form.setFieldsValue({
      clerk:userName,
      clerkId:id
    })


  }

  render(){

    let { info } = this.state;

    return(
      <div className="content">
        <Form ref={el=>this.form=el} data={info} {...this.props} submitCallback={()=>{
            if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default AppForm;
