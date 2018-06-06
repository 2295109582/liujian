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
          td[i].style = "padding:5px;border-color:#000;";
        };

    let check = this.print.querySelectorAll("input[type=checkbox]");
        for(var j=0;j<check.length;j++){
          check[j].style = "position:relative;top:1px;";
        };

    let { params } = this.props;
    window.uc.axios.post("/payment/limitDetail",params).then((data)=>{
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
              <h3 style={{fontSize:"22px",fontWeight:"bold",padding:'0 0 20px 0',margin:0}}>付款审批单</h3>
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
                 <td style={{border:'none',padding:'5px 0',textAlign:'left'}} colSpan="2">项目名称：{info.proName}</td>
                 <td style={{border:'none',padding:'5px 0',textAlign:'center'}} colSpan="3">申请日期：{info.appDate}</td>
                 <td style={{border:'none',padding:'5px 0',textAlign:'right'}} colSpan="3">编号：{info.limitappNo}</td>
                </tr>
                <tr>
                	<td >合同造价</td>
                	<td colSpan="2">{info.procost}</td>
                	<td >累计已完成工程量</td>
                	<td >{info.quantity}{this.isManual(info.quantityManual)}</td>
                	<td>本次收款数</td>
                	<td>{info.thisReceive}</td>
                </tr>
                <tr>
                	<td >项目经理意见</td>
                	<td colSpan="4"></td>
                	<td >请款人</td>
                	<td colSpan="2">{info.applicant}</td>
                </tr>
                <tr>
                	<td rowSpan="14">项目会计审核</td>
                	<td colSpan="2">累计收取工程款</td>
                	<td >{info.recSum}{this.isManual(info.recSumManual)}</td>
                	<td >累计开票数</td>
                	<td colSpan="2">{info.invSum}{this.isManual(info.invSumManual)}</td>
                </tr>
                <tr>
                	<td rowSpan="7">应扣款</td>
                	<td>管理费</td>
                	<td>费率</td>
                	<td >{info.manRate}{this.isManual(info.manRateManual)}</td>
                	<td>管理费金额</td>
                	<td >{info.manFee}{this.isManual(info.manFeeManual)}</td>
                </tr>
                <tr>
                	<td rowSpan="4">税金</td>
                	<td>累计销项税</td>
                	<td>{info.salestaxSum}{this.isManual(info.salestaxSumManual)}</td>
                	<td>累计进项税</td>
                	<td>{info.inputtaxSum}{this.isManual(info.inputtaxSumManual)}</td>
                </tr>
                <tr>
                	<td>应交增值税</td>
                	<td>{info.vat}{this.isManual(info.vatManual)}</td>
                	<td>按税率2.5%暂估增值税款</td>
                	<td>{info.estimateVat}{this.isManual(info.estimateVatManual)}</td>
                </tr>
                <tr>
               	  <td colSpan="2">城建税集教育费附加</td>
                	<td colSpan="2">{info.cjtaxSum}{this.isManual(info.cjtaxSumManual)}</td>
                </tr>
                <tr>
                	<td>税金小计</td>
                	<td colSpan="3">{info.alltaxSum}{this.isManual(info.alltaxSumManual)}</td>
                </tr>
                <tr>
                	<td>预留</td>
                	<td>合同预留款(%)</td>
                	<td>{info.reserve}{this.isManual(info.reserveManual)}</td>
                	<td>其他预留</td>
                	<td>{info.otherReserve}{this.isManual(info.otherReserveManual)}</td>
                </tr>
                <tr>
                	<td>应扣款合计</td>
                	<td colSpan="4">{info.chargeSum}{this.isManual(info.chargeSumManual)}</td>
                </tr>
                <tr>
               	  <td>累计借款</td>
                	<td colSpan="2">{info.borrSum}{this.isManual(info.borrSumManual)}</td>
                	<td>预留借款利息</td>
                	<td colSpan="2">{info.preborInsterest}{this.isManual(info.preborInsterestManual)}</td>
                 </tr>
                 <tr>
                 	  <td>累计已付借款</td>
                  	<td colSpan="2">{info.borrpaidSum}{this.isManual(info.borrpaidSumManual)}</td>
                  	<td>借款结余</td>
                  	<td colSpan="2">{info.borrSurplus}</td>
                 </tr>
                 <tr>
                 	  <td>累计应付工程款</td>
                  	<td colSpan="2">{info.alldueSum}{this.isManual(info.alldueSumManual)}</td>
                  	<td>累计已付工程款</td>
                  	<td colSpan="2">{info.allpaidSum}</td>
                 </tr>
                 <tr>
                 	  <td>历史可支付工程款结余</td>
                  	<td colSpan="5">{info.allpayableSurplus}</td>
                 </tr>
                 <tr>
                 	  <td>可支付工程款</td>
                  	<td colSpan="5">{info.payable}{this.isManual(info.payableManual)}</td>
                 </tr>
                 <tr>
                 	  <td>审核签字</td>
                  	<td colSpan="5"></td>
                 </tr>
                  <tr>
                 	  <td>财务经理意见</td>
                  	<td colSpan="6"></td>
                 </tr>
                 <tr>
                 	  <td>项目管理中心总经理意见<br />(500万以下)</td>
                  	<td colSpan="6"></td>
                 </tr>
                 <tr>
                 <td>总会计师意见<br />(500万以下)</td>
                  	<td colSpan="3"></td>
                  	<td>总裁意见<br />(工程结算)</td>
                  	<td colSpan="2"></td>
                 </tr>
                 <tr>
                  	<td colSpan="7">本审核单额度内付款记录</td>
                 </tr>
                 <tr>
                  	<td colSpan="7"><br /><br /><br /></td>
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
