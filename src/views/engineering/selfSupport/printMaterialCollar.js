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
              <h3 style={{fontSize:"22px",fontWeight:"bold",padding:'0 0 20px 0',margin:0}}>工程领用支票申请单（材料类）</h3>
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
                 <td style={{border:'none',padding:'15px 0',textAlign:'right'}} colSpan="3">编号：{info.appNo}</td>
                </tr>
                <tr>
                   <td width="25%">用款时间</td>
                   <td width="25%">{info.appDate}</td>
                   <td width="25%">垫资额</td>
                   <td width="25%">{info.advancePay}</td>
                 </tr>
                 <tr>
                   <td >请款用途</td>
                   <td colSpan="3">{window.uc.getDic("pay_content",info.costSort)}</td>
                 </tr>
                 <tr>
                   <td >银行账号</td>
                   <td colSpan="3">{info.bankNo}</td>
                 </tr>
                 <tr>
                   <td>用款金额</td>
                   <td colSpan="3">
                     <p style={{textAlign:'left',margin:'0',fontSize:"18px"}}>
                       (大写)&nbsp;&nbsp;{info.appPayToChinese}<br />(小写)&nbsp;&nbsp;{info.appPay}
                     </p>
                   </td>
                 </tr>
                 <tr>
                   <td rowSpan="2">领导审批</td>
                   <td colSpan="3" height="80px"></td>
                 </tr>
                 <tr>
                   <td colSpan="3">备注：10万以下工程副总裁审批，10万以上须提交总裁审批</td>
                 </tr>
                 <tr>
                   <td>财务经理</td>
                   <td></td>
                   <td>项目会计</td>
                   <td></td>
                 </tr>
                 <tr>
                   <td>项目管理中心</td>
                   <td colSpan="3"></td>
                 </tr>
                 <tr>
                   <td>项目经理</td>
                   <td></td>
                   <td>领用支票人</td>
                   <td></td>
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
