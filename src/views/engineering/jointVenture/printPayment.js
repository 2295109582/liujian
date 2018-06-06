import React,{Component} from 'react';

import { getLodop } from '@/utils/lodopFuncs';

import { Spin,Button } from 'antd';

let  LODOP; //声明为全局变量
class Print extends Component {


  constructor(){
    super(...arguments);

    this.state = {
      info:{},
      spinning:true
    }

  }

  componentDidMount(){
    let td = this.print.querySelectorAll("td");
        for(var i=2;i<td.length;i++){
          td[i].style = "padding:15px;border-color:#000;";
        };

    let check = this.print.querySelectorAll("input[type=checkbox]");
        for(var j=0;j<check.length;j++){
          check[j].style = "position:relative;top:1px;";
        };

    let { params } = this.props;
    window.uc.axios.post("/payment/showProPay",params).then((data)=>{
      this.setState({
        info:data.data,
        spinning:false
      })
    })

  }


  toPrint = ()=>{
		this.CreateOneFormPage();
    LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width");
		LODOP.PRINT();
  }


   CreateOneFormPage =()=>{
		LODOP = getLodop();
		LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_整页缩放打印输出");
		LODOP.ADD_PRINT_HTM(5,5,"100%","100%",this.print.innerHTML);
		LODOP.SET_PREVIEW_WINDOW(0,0,0,0,0,"");
	}

  isManual = (value)=>{
    return value==="true"?"(手)":null;
  }


  render(){
    let {spinning,info} = this.state;

    return(
      <Spin spinning={spinning}>
        <div className="content">
          <div style={{textAlign:'right'}}>
              <Button type="primary" onClick={this.toPrint}>打印</Button>
          </div>
        <div style={{  margin:"0 auto",width:" 1000px",fontFamily: "微软雅黑",padding:"20px"}} ref={el=>this.print=el}>
            <div style={{textAlign:'center'}}>
              <h3 style={{fontSize:"22px",fontWeight:"bold",padding:'20px 0 0 0'}}>付款通知书</h3>
            </div>
            <table border="1"
              style={{
                width: "90%",
                margin:"0 auto",
                textAlign: "center",
                border:"none",
                color:"#000",
                borderCollapse: "collapse",
                fontSize:"14px"
              }}>
              <tbody>
                <tr border="none">
                 <td style={{border:'none',padding:'15px 0',textAlign:'left'}} colSpan="2">工程项目名称：{info.proName}</td>
                 <td style={{border:'none',padding:'15px 0',textAlign:'right'}} colSpan="3">付款申请日期：{info.appDate}</td>
                </tr>
                 <tr>
                 	<td>付款通知书依据</td>
                <td colSpan="3">已审批编号为<u>{info.limitappNo}</u>的《付款审批单》，该审批单额度为<u>{info.payable}</u>，累计已付款<u>{info.allpaidSum}</u></td>
                 </tr>
                 <tr>
                 	<td>摘要<br />(付款内容)</td>
                  <td colSpan="3">{window.uc.getDic("pay_content",info.payContent)}</td>
                 </tr>
                 <tr>
                 	<td rowSpan="2">付款金额<br />(人民币)</td>
                  <td colSpan="3">
                    <p style={{textAlign:'left',margin:'0',fontSize:"18px"}}>
                      (大写)&nbsp;&nbsp;{info.appPayToChinese}<br />(小写)&nbsp;&nbsp;{info.appPay}
                    </p>
                  </td>
                 </tr>
                 <tr>
                 	<td>付款单位</td>
                 	<td colSpan="3">{info.typeName}</td>
                 </tr>
                  <tr>
                 	<td>银行账号</td>
                <td colSpan="3">{info.bankNo} </td>
                 </tr>
                 <tr>
                 	<td>项目主管会计</td>
                  <td>{info.comptrollerName}</td>
                 	<td>财务经理</td>
                 	<td>{info.fimanagerName}</td>
                 </tr>
                  <tr>
                 	<td>领用支票号码</td>
                  <td>{info.checkNo}</td>
                 	<td>领用支票人</td>
                  <td>{info.recipient}</td>
                 </tr>
               </tbody>
            </table>
          </div>
        </div>
      </Spin>
    )
  }
}

export default Print;
