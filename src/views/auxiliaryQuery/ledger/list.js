import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import Modal from '@c/modal';
import { Modal as Mod} from 'antd';
const confirm = Mod.confirm;


class List extends Component{

  constructor(){
    super(...arguments);


    this.refmodal = el =>{
      this.modal = el;
    }

    this.state = {
      visible:false,
      title:"标题",
      tableConfig:{},
      totalValue:0,
      search: [
        {
          type: "Accounting",
          name:"id",
          labelName: "name",
          label: "工程名称"
        },
        {
          type: "monthPicker",
          name: "upMonth",
          label: "申报月",
          placeholder:"默认当前系统年月"
        }
      ],
      columns : [
        { title: "申报月",dataIndex: "upMonth"},
        { title: "内部单位", dataIndex: "area",dic:"area_sort"},
        { title: "K3工程编码", dataIndex: "proNo"},
        { title: "计税方式", dataIndex: "taxsetMode",dic:"taxset_mode"},
        { title: "工程名称", dataIndex: "proName" },
        { title: "不含税金额(元)", dataIndex: "notaxinvAmount", render:(text,row)=>{
          return <a onClick={()=>{
            this.openInfo(row,{
              title:"不含税金额明细",
              total:"不含税金额合计",
              totalValue:text,
              props:{
                url:"/query/notaxinvAmount",
                queryParams:()=>{
                  return {id:row.id,upMonth:this.upMonth};
                },
                columns:[
                  { title: "开票日期",dataIndex: "invdate"},
                  { title: "不含税金额(元)", dataIndex: "notaxinvAmount"},
                  { title: "发票代码", dataIndex: "invCode"},
                  { title: "发票号码", dataIndex: "invNo"},
                  { title: "含税金额(元)", dataIndex: "invAmount" },
                  { title: "税率(%)", dataIndex: "taxRate" },
                  { title: "销项税额(元)", dataIndex: "taxAmount" }
                ]
              }
            })
            }}>{text}</a>
        }},
        { title: "销项税额(元)", dataIndex: "taxAmount",render:(text,row)=>{
          return <a onClick={()=>{
            this.openInfo(row,{
              title:"销项税额明细",
              total:"销项税额合计",
              totalValue:text,
              props:{
                url:"/query/taxAmount",
                queryParams:()=>{
                  return {id:row.id,upMonth:this.upMonth};
                },
                columns:[
                  { title: "开票日期",dataIndex: "invdate"},
                  { title: "销项额(元)", dataIndex: "taxAmount"},
                  { title: "发票代码", dataIndex: "invCode"},
                  { title: "发票号码", dataIndex: "invNo"},
                  { title: "含税金额(元)", dataIndex: "invAmount" },
                  { title: "税率(%)", dataIndex: "taxRate" },
                  { title: "不含税金额(元)", dataIndex: "notaxinvAmount" }
                ]
              }
            })
            }}>{text}</a>
        } },
        { title: "分包发票金额(元)", dataIndex: "taxamounts",render:(text,row)=>{
          return <a onClick={()=>{
            this.openInfo(row,{
              title:"分包发票金额明细",
              total:"分包发票金额合计",
              totalValue:text,
              props:{
                url:"/query/taxamounts",
                queryParams:()=>{
                  return {id:row.id,upMonth:this.upMonth};
                },
                columns:[
                  { title: "开票单位名称",dataIndex: "invUnit"},
                  { title: "认证日期", dataIndex: "confirmdate"},
                  { title: "发票金额(元)", dataIndex: "taxamount"},
                  { title: "发票代码", dataIndex: "invCode"},
                  { title: "发票号码", dataIndex: "invno" },
                  { title: "不含税金额(元)", dataIndex: "notaxamount" },
                  { title: "税率(%)", dataIndex: "taxrate" },
                  { title: "进项税额(元)", dataIndex: "intaxamount" },
                  { title: "转出税额(元)", dataIndex: "outtaxamount" }
                ]
              }
            })
            }}>{text}</a>
        } },
        { title: "已预缴税额(元)", dataIndex: "actprepayAmount",render:(text,row)=>{
          return <a onClick={()=>{
            this.openInfo(row,{
              title:"已预缴税额明细",
              total:"已预缴税额合计",
              totalValue:text,
              props:{
                url:"/query/prepay",
                queryParams:()=>{
                  return {id:row.id,upMonth:this.upMonth};
                },
                columns:[
                  { title: "税单号码",dataIndex: "taxformNo"},
                  { title: "税款所属期间", dataIndex: "prepayPeriod"},
                  { title: "实际预缴税额(元)", dataIndex: "actprepayAmount"},
                  { title: "内部单位", dataIndex: "area",dic:"area_sort" },
                  { title: "是否鼓楼申报", dataIndex: "isgulou",dic:"isgulou_flag" },
                  { title: "计税方式", dataIndex: "taxsetMode",dic:"taxset_mode" },
                  { title: "预征率", dataIndex: "pretaxRate" }
                ]
              }
            })
            }}>{text}</a>
        } },
        { title: "进项(元)", dataIndex: "intaxamounts",render:(text,row)=>{
          return <a onClick={()=>{
            this.openInfo(row,{
              title:"进项明细",
              total:"进项税额合计",
              totalValue:text,
              props:{
                url:"/query/intaxamount",
                queryParams:()=>{
                  return {id:row.id,upMonth:this.upMonth};
                },
                columns:[
                  { title: "开票单位",dataIndex: "invUnit"},
                  { title: "认证日期", dataIndex: "confirmdate"},
                  { title: "进项税额(元)", dataIndex: "intaxamount"},
                  { title: "发票代码", dataIndex: "invCode"},
                  { title: "发票号码", dataIndex: "invno" },
                  { title: "发票金额(元)", dataIndex: "taxamount"},
                  { title: "不含税金额(元)", dataIndex: "notaxamount"},
                  { title: "税率(%)", dataIndex: "taxrate" },
                  { title: "转出税额(元)", dataIndex: "outtaxamount" }
                ]
              }
            })
            }}>{text}</a>
        }},
        { title: "进项转出(元)", dataIndex: "outtaxamounts",render:(text,row)=>{
          return <a onClick={()=>{
            this.openInfo(row,{
              title:"进项转出明细",
              total:"进项转出合计",
              totalValue:text,
              props:{
                url:"/query/outtaxamount",
                queryParams:()=>{
                  return {id:row.id,upMonth:this.upMonth};
                },
                columns:[
                  { title: "开票单位",dataIndex: "invUnit"},
                  { title: "认证日期", dataIndex: "confirmdate"},
                  { title: "转出税额(元)", dataIndex: "outtaxamount"},
                  { title: "发票代码", dataIndex: "invCode"},
                  { title: "发票号码", dataIndex: "invno" },
                  { title: "发票金额(元)", dataIndex: "taxamount"},
                  { title: "不含税金额(元)", dataIndex: "notaxamount"},
                  { title: "税率(%)", dataIndex: "taxrate" },
                  { title: "进项税额(元)", dataIndex: "intaxamount" }
                ]
              }
            })
            }}>{text}</a>
        } },
        { title: "鼓楼申报(元)", dataIndex: "gulouUp" },
        { title: "城建(元)", dataIndex: "cityTax" },
        { title: "教附(元)", dataIndex: "eduTax" },
        { title: "鼓楼", dataIndex: "isgulou",dic:"isgulou_flag" }
      ],
      toolbar : {
        exportAll:{
          visible: () => true,
          click:this.exportAll
        }
      }
    }

  }

  openInfo = (row,config)=>{
    let { title,props,total,totalValue } = config;

    this.setState({
      total,
      totalValue,
      tableConfig:props
    })

    this.modal.show(title);
  }

  exportAll = ()=>{
    confirm({
      title: '是否确定全部导出',
      onOk:()=> {
        window.uc.download("/query/exportMonth");
      },
    });
  }

  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns} = this.state;
    let {tableConfig,total,totalValue,toolbar } = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/query/ledgerList"
          columns={columns}
          toolbar={toolbar}
          queryParams={()=>{
            let data = this.refs.search.getData();

            if(data.upMonth === undefined){
              let myDate = new Date();
              let year = myDate.getFullYear();
              let month = myDate.getMonth() + 1;
              data.upMonth = `${year}-${month}`;
            }

            this.upMonth = data.upMonth;

            return data;
          }}
          rowSelection={false}
          ref="table"
        />
      <Modal ref={this.refmodal} width="1000px">
        <h2>{total}：<span style={{color:"#40a9ff"}}>{totalValue}</span></h2>
        <Table
          {...tableConfig}
          action={false}
          scroll={false}
          // pagination={false}
          rowSelection={false}
        />
      </Modal>
      </div>
    )
  }
}



export default List;
