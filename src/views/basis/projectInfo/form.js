import React,{Component} from 'react';
import StaticTable from "@c/table/staticTable";
import AppForm from '@c/form';


class InfoForm extends Component{



  contractSub = {
    contractSubData : [
      {
        type: "input",
        name: "id",
        label: "id",
        visible:false
      },
      {
        type: "Subcontracting",
        name:"subunitId", //隐藏域的值
        labelName: "subName",   //显示的名字name
        label: "专业分包公司",
        rules: [{ required: true }]
      },
      {
        type: "input",
        name: "contractNo",
        label: "合同编号",
        rules: [{ required: true }]
      },
      {
        type: "input",
        name: "contractName",
        label: "合同名称",
        rules: [{ required: true }]
      },
      {
        type: "amount",
        name: "contractAmount",
        label: "合同金额(元)",
        rules: [{ required: true }]
      },
      {
        type: "datePicker",
        name: "signingdate",
        label: "签订日期",
        rules: [{ required: true }]
      },
      {
        type: "textarea",
        name: "remarks",
        label: "备注信息"
      }
    ],
    contractSubColumns : [
      { title: "分包单位名称",dataIndex: "subName"},
      { title: "合同编号", dataIndex: "contractNo"},
      { title: "合同名称", dataIndex: "contractName"},
      { title: "合同金额(元)", dataIndex: "contractAmount"}
    ]
  }


  contractRep = {
    contractRepData : [
      {
        type: "input",
        name: "id",
        label: "id",
        visible:false
      },
      {
        type: "input",
        name: "contractNo",
        label: "补充合同编号",
        rules: [{ required: true }]
      },
      {
        type: "input",
        name: "contractName",
        label: "补充合同名称",
        rules: [{ required: true }]
      },
      {
        type: "amount",
        name: "contractAmount",
        label: "合同金额(元)",
        rules: [{ required: true }]
      },
      {
        type: "datePicker",
        name: "signingdate",
        label: "签订日期",
        rules: [{ required: true }]
      },
      {
        type: "textarea",
        name: "remarks",
        label: "备注信息"
      }
    ],
    contractRepColumns : [
      { title: "补充合同编号",dataIndex: "contractNo"},
      { title: "补充合同名称", dataIndex: "contractName"},
      { title: "合同金额(元)", dataIndex: "contractAmount"},
      { title: "签订日期", dataIndex: "signingdate"}
    ]
  }


  changeList = (value)=>{
    let { info } = this.state;
    let data = [...info.data];

    let { form } = this;

    if(value === "02"){  //如果是自营项目
      data[8] = Object.assign(data[8],{
        readonly:true
      })
      data[9] = Object.assign(data[9],{
        readonly:true
      })
      data[10] = Object.assign(data[10],{
        readonly:true
      })
      info.data = data;
      this.setState({info},()=>{
        form.setFieldsValue({
          reserveRate:"0",
          promanRate:"0",
          manrateChange:"0",
          manRate:"0"
        })
      })
    }else if(value === "01"){   //如果是联营项目

      let { promanRate,manrateChange,manRate,reserveRate } = this;
      data[8] = Object.assign(data[8],{
        readonly:false
      })
      data[9] = Object.assign(data[9],{
        readonly:false
      })
      data[10] = Object.assign(data[10],{
        readonly:false
      })
      info.data = data;
      this.setState({info},()=>{
        form.setFieldsValue({
          reserveRate:`${reserveRate}`,
          promanRate:`${promanRate}`,
          manrateChange:`${manrateChange}`,
          manRate:`${manRate}`
        })
      })

    }


  }

  setManRate = ()=>{
    let { form } = this;
    let { promanRate,manrateChange} = this;

    this.manRate = isNaN(parseFloat(promanRate) + parseFloat(manrateChange))?"0":((parseFloat(promanRate)*100 + parseFloat(manrateChange)*100)/100);

    form.setFieldsValue({
      manRate:this.manRate
    })
  }


  setCallback = (val)=>{
    this.ca = val["contractAmount"];
    this.promanRate = val.promanRate;
    this.manrateChange = val.manrateChange;
  }

  setProjectCosts = ()=>{
    let { ca,tpsca } = this;
    let { form } = this;

    form.setFieldsValue({
      procost:`${ca+tpsca}`
    })

  }

  constructor(){
    super(...arguments);

    this.setform = el=>{
      this.form = el;  //表单对象
    }
    this.reserveRate = 0;  // 合同预留款率(%)
    this.promanRate = 0;  //暂定管理费率(%)
    this.manrateChange = 0;  //管理费率增减(%)
    this.manRate = 0;  //实际管理费率(%)

    this.ca = 0; //合同金额
    this.tpsca = 0; //总包补充合同额

    let info = {
      data:[
        {
          type: "input",
          name: "contractNo",
          label: "合同编号",
          rules: [{ required: true }]
        },
        {
          type: "input",
          name: "contractName",
          label: "合同名字",
          rules: [{ required: true }]
        },
        {
          type:"select",
          dic:"contract_type",
          name: "contractType",
          label: "合同类型",
          rules: [{ required: true }]
        },
        {
          type: "amount",
          name: "contractAmount",
          label: "合同金额(元)",
          rules: [{ required: true }],
          change:(e)=>{
            let value = e.target.value;
            this.ca = parseFloat(value);
            this.setProjectCosts();
          }
        },
        {
          type: "OwnerUnit",  //业主单位组件
          name:"ownerId", //隐藏域的值
          labelName: "ownerName",   //显示的名字name
          label: "业主单位名称",
          rules: [{ required: true }]
        },
        {
          type: "input",
          name: "proNo",
          label: "k3工程编码",
          rules: [{ required: true }]
        },
        {
          type: "input",
          name: "proName",
          label: "工程名称",
          rules: [{ required: true }]
        },
        {
          type:"select",
          dic:"pronature_type",
          name: "pronature",
          label: "工程性质",
          rules: [{ required: true }],
          change:this.changeList
        },
        {
          type: "amount",
          name: "reserveRate",
          label: "合同预留款率(%)",
          rules: [{ required: true }],
          placeholder:"联营项目专属",
          change:(e)=>{
            let value = e.target.value;
            this.reserveRate = value;
          }
        },
        {
          type: "amount",
          name: "promanRate",
          label: "暂定管理费率(%)",
          rules: [{ required: true }],
          placeholder:"联营项目专属",
          change:(e)=>{
            let value = e.target.value;
            this.promanRate = value;
            this.setManRate();
          }
        },
        {
          type: "negativeAmount",
          name: "manrateChange",
          label: "管理费率增减(%)",
          rules: [{ required: true }],
          placeholder:"联营项目专属",
          change:(e)=>{
            let value = e.target.value;
            this.manrateChange = value;
            this.setManRate();
          }
        },
        {
          type: "amount",
          name: "manRate",
          label: "实际管理费率(%)",
          rules: [{ required: true }],
          readonly:true,
          placeholder:"联营项目专属"
        },
        {
          type:"select",
          dic:"area_sort",
          name: "area",
          label: "内部单位",
          rules: [{ required: true }]
        },
        {
          type:"select",
          dic:"taxset_mode",
          name: "taxsetMode",
          label: "计税方式",
          rules: [{ required: true }]
        },
        {
          type: "radio",
          dic:"isgulou_flag",
          name: "isgulou",
          label: "是否鼓楼申报",
          rules: [{ required: true }]
        },
        {
          type:"select",
          options:this.props.preTax,
          name: "pretaxRate",
          label: "预征率(%)",
          rules: [{ required: true }]
        },
        {
          type: "input",
          name: "procost",
          label: "工程造价",
          readonly:true,
          rules: [{ required: true }]
        },
        {
          type: "ProjectAccounting",
          name: "accountant",
          labelName:"accountantName",
          label: "项目经办会计",
          rules: [{ required: true }]
        },
        {
          type: "textarea",
          name: "remarks",
          label: "备注信息"
        }
      ]
    }

    let {contractSubData,contractSubColumns} = this.contractSub;
    let {contractRepData,contractRepColumns} = this.contractRep;
    this.state = {
      info,
      tableList:[
        {
          name:"contractSub",
          view:StaticTable,
          props:{
            title:"分包合同",
            data:contractSubData,
            columns:contractSubColumns
          }
        },
        {
          name:"contractRep",
          view:StaticTable,
          props:{
            title:"总包补充合同",
            data:contractRepData,
            columns:contractRepColumns,
            callback:(data)=>{
              let  tpsca = 0;
              data.forEach((item,i)=>{
                tpsca += parseFloat(item["contractAmount"]);
              })

              this.tpsca = tpsca;
              this.setProjectCosts();
            }
          }
        }
      ]
    }

  }




  render(){
    let {data} = this.state.info;
    let {tableList} = this.state;
    return(
      <div className="content">
        <AppForm data={data} {...this.props} ref={this.setform} setCallback={this.setCallback} tableList={tableList} submitCallback={()=>{
              this.reserveRate = 0;  // 合同预留款率(%)
              this.promanRate = 0;  //暂定管理费率(%)
              this.manrateChange = 0;  //管理费率增减(%)
              this.manRate = 0;  //实际管理费率(%)

              this.ca = 0; //合同金额
              this.tpsca = 0; //总包补充合同额
              if(this.props.params){
              this.props.remove();
            };
          }} />
      </div>
    )
  }
}

export default InfoForm;
