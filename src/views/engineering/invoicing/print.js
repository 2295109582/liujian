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
    window.uc.axios.post("/invoiceApp/detail",params).then((data)=>{
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
              <h3 style={{fontSize:"22px",fontWeight:"bold",padding:'20px 0 0 0'}}>发票开具申请单</h3>
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
                  <td style={{border:'none',padding:'5px 0',textAlign:'right'}} colSpan="3">编号：{info.appNo}</td>
                </tr>
                <tr>
                 <td>申请人</td>
                 <td>{info.applicant}</td>
                 <td colSpan="2">申请部门</td>
                 <td colSpan="2">{info.appDepartment}</td>
                </tr>
                <tr>
                 <td>联系电话</td>
                 <td colSpan="5">{info.tel}</td>
                </tr>
                <tr>
                 <td rowSpan="7">客户信息</td>
                 <td>客户名称全称</td>
                 <td colSpan="4">{info.ownerName}</td>
                </tr>
                <tr>
                 <td>纳税人类型</td>
                 <td colSpan="4"> &nbsp; &nbsp; &nbsp;一般纳税人  <input type="checkbox" /> &nbsp; &nbsp; &nbsp;小规模纳税人  <input type="checkbox" /> &nbsp; &nbsp; &nbsp;非增值税  <input type="checkbox" /> </td>
                </tr>
                <tr>
                 <td>纳税人识别号</td>
                <td colSpan="4">{info.taxpayerNum}</td>
                </tr>
                <tr>
                 <td>银行开户行</td>
               <td colSpan="4">{window.uc.getDic("bank_code",info.openBank)}</td>
                </tr>
                <tr>
                 <td>银行账号</td>
                 <td colSpan="4">{info.bankAccount}</td>
                </tr>
                <tr>
                 <td>地址</td>
                 <td colSpan="4">{info.taxpayerSite}</td>
                </tr>
                <tr>
                 <td>联系电话</td>
                 <td colSpan="4">{info.ownerTel}</td>
                </tr>
                <tr>
                 <td rowSpan="2">异地先预缴<br />后开票</td>
                 <td>
                   预缴税单号<br />(2016.12.31前营业税开普票)
                 </td>
                 <td colSpan="4"></td>
                </tr>
                <tr>
                 <td>附：复印件和电子文档</td>
                 <td colSpan="2">缴纳增值税银行联</td>
                 <td colSpan="2">增值税申报表</td>
                </tr>
                <tr>
                 <td rowSpan="8">发票开具项目</td>
                 <td>应税服务名称</td>
                 <td colSpan="4">{info.taxserviceName}</td>
                </tr>
                <tr>
                <td>项目合同造价</td>
                <td colSpan="4">{info.procost}</td>
               </tr>
                <tr>
                 <td>开票类型</td>
                 <td colSpan="4">{window.uc.getDic("inv_type",info.invType)}</td>
                </tr>
                <tr>
                 <td>本次申请开票金额</td>
                 <td colSpan="4">{info.invAmount}</td>
                </tr>
                <tr>
                 <td>其中:不含税金额</td>
                 <td colSpan="4">{info.notaxAmount}</td>
                </tr>
                 <tr>
                 <td>税率</td>
                 <td colSpan="4">{info.taxRate}</td>
                </tr>
                 <tr>
                 <td>销项税额</td>
                 <td colSpan="4">{info.taxAmount}</td>
                </tr>
                 <tr>
                 <td>发票备注信息</td>
                 <td colSpan="4">{info.remarks}</td>
                </tr>
                <tr>
                 <td rowSpan="5">一般计税累计税负</td>
                 <td>开工累计销项</td>
                 <td colSpan="2">{info.salestaxSum}</td>
                 <td colSpan="2">含本表申请开票数</td>
                </tr>
                 <tr>
                 <td>开工累计进项</td>
                 <td colSpan="2">{info.inputtaxSum}</td>
                 <td colSpan="2">截止本申请表时点开工累计</td>
                </tr>
                <tr>
                 <td>开工累计预缴</td>
                 <td colSpan="2">{info.pretaxSum}</td>
                 <td colSpan="2">截止本申请表时点开工累计</td>
                </tr>
                <tr>
                 <td>应交增值税</td>
                 <td colSpan="2">{info.vat}</td>
                 <td colSpan="2">开工（累计销项-累计进项-累计预缴）</td>
                </tr>
                 <tr>
                 <td>税负率</td>
                 <td colSpan="2">{info.taxbearingRate}</td>
                 <td colSpan="2">(应交增值税+累计预缴)/(开工累计销项/0.11)*100%</td>
                </tr>
                <tr>
                 <td rowSpan="4">审批意见</td>
                 <td>经办人意见</td>
                 <td colSpan="4"></td>
                </tr>
                 <tr>
                 <td>业务部门主管意见</td>
                 <td colSpan="4"></td>
                </tr>
                <tr>
                 <td>项目会计</td>
                 <td colSpan="4"></td>
                </tr>
                <tr>
                 <td>财务中心</td>
                 <td colSpan="4"></td>
                </tr>
                <tr>
                 <td>附加材料</td>
                 <td colSpan="5">合同、结算单、客户信息表、税务登记证</td>
                </tr>
                <tr>
                 <td rowSpan="2">交付方式</td>
                 <td style={{color:"red"}}>邮寄地址及收件人</td>
                 <td colSpan="4"></td>
                </tr>
                <tr>
                 <td>领取签字</td>
                 <td colSpan="4"></td>
                </tr>
                <tr>
                 <td colSpan="6">以下信息由发票开具人员填写</td>
                </tr>
                <tr>
                 <td>发票号码:</td>
                 <td></td>
                 <td colSpan="2">发票代码:</td>
                 <td colSpan="2"></td>
                </tr>
                <tr>
                 <td>发票张数:</td>
                 <td></td>
                 <td colSpan="2">发票金额:</td>
                 <td colSpan="2"></td>
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
