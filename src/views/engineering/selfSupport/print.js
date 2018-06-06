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
        for(var i=3;i<td.length;i++){
          td[i].style = "padding:15px;border-color:#000;";
        };

    let check = this.print.querySelectorAll("input[type=checkbox]");
        for(var j=0;j<check.length;j++){
          check[j].style = "position:relative;top:1px;";
        };

    let { params } = this.props;
    window.uc.axios.post("/payment/showSelf",params).then((data)=>{
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
              <p style={{padding:"20px 0 10px 0",margin:0}}>福建六建集团有限公司</p>
              <h3 style={{fontSize:"22px",fontWeight:"bold",padding:'0 0 20px 0',margin:0}}>分项分包付款审批单</h3>
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
                  <td style={{border:'none',padding:'15px 0',textAlign:'left'}} >工程项目名称：{info.proName}</td>
                <td style={{border:'none',padding:'15px 0',textAlign:'center'}} colSpan="2">编号：{info.appNo}</td>
                  <td style={{border:'none',padding:'15px 0',textAlign:'right'}}>申请日期：{info.appDate}</td>
                </tr>
                <tr>
                   <td width="25%">分部分项<br />项目名称</td>
                    <td width="25%" >{info.contractName}</td>
                   <td width="25%" >合同金额</td>
                 <td width="25%" >{info.contractAmount}</td>
                 </tr>
                 <tr>
                   <td >本期完成量</td>
                 <td>{info.thisAccom}</td>
                   <td >累积完成量</td>
                 <td >{info.allAccom}</td>
                 </tr>
                 <tr>
                   <td >累计应付工程款</td>
                   <td>{info.alldueSum}</td>
                   <td >截止目前已付款</td>
                   <td >{info.allpaidSum}</td>
                 </tr>
                 <tr>
                   <td >本期应付工程款</td>
                   <td >{info.appPay}</td>
                   <td >核算员</td>
                   <td >{info.clerkName}</td>
                 </tr>
                 <tr>
                  <td >收款单位名称</td>
                <td colSpan="3">{info.companyName}</td>
                 </tr>
                 <tr>
                   <td >收款单位银行账户及开户行</td>
                   <td>{info.bankNo}({window.uc.getDic("bank_code",info.bankId)})</td>
                   <td >支票领用人</td>
                   <td ></td>
                 </tr>
                 <tr>
                   <td >项目经理</td>
                   <td colSpan="4"></td>
                 </tr>
                 <tr>
                   <td>项目会计</td>
                    <td colSpan="3">
                      <div style={{textAlign:'left',margin:0,lineHeight:"34px"}}>
                        <p>垫资额：</p>
                        <p>需预留款项：</p>
                        <div>
                          <p style={{float:'left',width:"50%",margin:0}}>可支付金额：</p>
                          <p style={{float:'left',width:"50%",margin:0}}>签字：</p>
                          <div style={{clear:'botn'}}></div>
                        </div>
                      </div>
                    </td>
                 </tr>
                 <tr>
                   <td >财务经理意见</td>
                   <td colSpan="4"></td>
                 </tr>
                 <tr>
                   <td >分管工程副总裁意见</td>
                   <td colSpan="4"></td>
                 </tr>
                 <tr>
                   <td >总会计师意见</td>
                   <td colSpan="4"></td>
                 </tr>
                 <tr>
                   <td >总裁意见</td>
                   <td colSpan="4"></td>
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
