import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';


import FormModal from '@c/form/formModal';


import { Modal} from 'antd';
const confirm = Modal.confirm;



class List extends Component{


  info = [
    {
      type: "input",
      name: "id",
      label: "id",
      visible:false
    },
    {
      type: "input",
      name: "incomeId",
      label: "incomeId",
      visible:false
    },
    {
      type: "input",
      name: "proId",
      label: "proId",
      visible:false
    },
    {
      type: "input",
      name:"invCode",
      label: "发票代码",
      rules: [{ required: true }]
    },
    {
      type: "input",
      name: "invno",
      label: "发票号码",
      rules: [{ required: true }]
    },
    {
      type: "datePicker",
      name: "invdate",
      label: "开票日期",
      rules: [{ required: true }]
    },
    {
      type: "amount",
      name: "taxamount",
      label: "含税金额(元)",
      rules: [{ required: true }],
      change:(e)=>{
        this.cTaxamounts = parseFloat(e.target.value);
        this.setValue();
      }
    },
    {
      type: "select",
      dic:"preTax",
      options:this.props.preTax,
      name: "taxrate",
      label: "进项税率(%)",
      rules: [{ required: true }],
      change:(value)=>{
        let {preTax} = this.props;
        preTax.forEach((item,i)=>{
          if(item.value === value){
            this.preTax = parseFloat(item.label); //设置税率
          }
        });
        this.setValue();
      }
    },
    {
      type: "amount",
      name: "notaxamount",
      label: "不含税金额(元)",
      readonly:true
    },
    {
      type: "amount",
      name: "intaxamount",
      label: "进项税额(元)",
      readonly:true
    },
    {
      type: "datePicker",
      name: "confirmdate",
      label: "认证日期"
    },
    {
      type: "amount",
      name: "outtaxamount",
      label: "转出税额(元)"
    }
  ]


  constructor(){
    super(...arguments);


    this.preTax = 0;
    this.cTaxamounts = 0;

    this.state = {
      info:this.info,
      search: [
        {
          type: "input",
          name:"invCode",
          label: "发票代码"
        },
        {
          type: "input",
          name: "invno",
          label: "发票号码"
        },
      ],
      columns : [
        { title: "发票代码",dataIndex: "invCode"},
        { title: "发票号码", dataIndex: "invno"},
        { title: "开票日期", dataIndex: "invdate"},
        { title: "含税金额(元)", dataIndex: "taxamount"},
        { title: "进项税率(%)", dataIndex: "taxrate",render:(text)=>{
          let {preTax} = this.props;
          let val = text;
          preTax.forEach((item,i)=>{
            if(item.value === text){
              val = item.label
            }
          });
          return val;
        }},
        { title: "不含税金额(元)", dataIndex: "notaxamount"},
        { title: "进项税额(元)", dataIndex: "intaxamount"},
        { title: "认证日期", dataIndex: "confirmdate"},
        { title: "转出税额(元)", dataIndex: "outtaxamount"},
      ],
      toolbar : {
        delete:false,
        addInvoice:{
          text:"新增发票明细",
          visible: () => true,
          click:this.addInvoice
        },
        editInvoice:{
          text:"编辑发票明细",
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.editInvoice
        },
        viewInvoice:{
          text:"查看发票明细",
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.viewInvoice
        },
        deleteInvoice:{
          text:"删除发票明细",
          visible: (selectedRowKeys) => selectedRowKeys.length >= 1,
          click:this.deleteInvoice
        },
        importInvoiceDetails:{
          visible: () => true,
          click:this.importInvoiceDetails
        },
        downloadInvoiceDetailsTemplate:{
          visible: () => true,
          click:this.downloadInvoiceDetailsTemplate
        }
      }
    }

  }

  importInvoiceDetails = ()=>{
    window.uc.importFiles("/income/importIncome",()=>{
      this.refresh();
    });
  }

  downloadInvoiceDetailsTemplate = ()=>{
    confirm({
      title: '是否确定下载发票明细模板',
      onOk:()=> {
        window.uc.download("/income/exportModel");
      },
    });
  }

  setValue = ()=>{  //设置不含税金额
          //含税金额,税率
    let { cTaxamounts,preTax } = this;
    let { form } = this;

    preTax = preTax/100;
    cTaxamounts = cTaxamounts || 0;

    form.setFieldsValue({
      notaxamount:(cTaxamounts/(1+preTax)).toFixed(2),
      intaxamount:(cTaxamounts/(1+preTax)*preTax).toFixed(2),
    })

  }



  deleteInvoice = ()=>{
    let { table } = this.refs;
    table.delete();
  }

  viewInvoice = (selectedRowKeys,selectedRows, allData)=>{

    let row = selectedRows[0];
    let { form } = this;
    let { info } = this.state;
    info.forEach((item,i)=>{
      info[i].readonly = true;
    })
    this.setState({info})
    form.setData({
      title:"新增发票明细"
    },row,true);

  }

  editInvoice =(selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];

    let data = this.props.row;

    row.incomeId = data.id;
    row.proId = data.proId;

    let { form } = this;
    let { info } = this.state;
    info.forEach((item,i)=>{
      info[i].readonly = false;
    })
    info[8].readonly = true;
    info[9].readonly = true;
    this.setState({info});
    form.setData({
      title:"编辑发票明细"
    },row);

  }


  addInvoice = ()=>{
    let { row } = this.props;
    let data = {};
    data.incomeId = row.id;
    data.proId = row.proId;
    let { form } = this;
    let { info } = this.state;
    info.forEach((item,i)=>{
      info[i].readonly = false;
    })
    info[8].readonly = true;
    info[9].readonly = true;
    this.setState({info});
    form.setData({
      title:"新增发票明细"
    },data);
  }


  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {columns,toolbar,info,search} = this.state;
    let { id } = this.props.row;
    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/income/incomeDetail"
          deleteUrl="/income/deleteIncomeDetail"
          deleteKey="invCode"
          columns={columns}
          scroll={false}
          queryParams={()=>{
            return {id:id}
          }}
          toolbar={toolbar}
          ref="table"
        />
        <FormModal
          ref={e=>this.form=e}
          data={info}
          submitUrl="/income/addIncomeDetail"
          updateUrl="/income/updateIncomeDetail"
          submitCallback={this.refresh}
        />
      </div>
    )
  }
}



export default List;
