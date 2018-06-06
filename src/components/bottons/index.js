import React,{Component} from 'react';
import { Button } from 'antd';


const pre = (function(){  //筛选当前页面权限

  return ()=>{
    let permission = window.uc.pre();
    let { pathname } = window.uc.customHistory().location; //拿到地址
    var patt = new RegExp(`^${pathname}/`);
    let btn = [];
    permission.forEach((item,i)=>{
      if(item.search(patt) >= 0){
        btn.push(item)
      }
    })
    return btn;
  }

})();



class Bottons extends Component{
  constructor(){
      super(...arguments);

      this.btns = [];

      this.permission = pre();


      this.pathname = window.uc.customHistory().location.pathname; //拿到地址

      this.getPre("add")

      this.state = {
        selectedRowKeys:[],  //table选中的key
        selectedRows:[],  //table选中的数据
        allData:[]   //table所有的数据
      }
  }



  visible = (selectedRowKeys, selectedRows,allData)=>{
    this.setState({
        selectedRowKeys,
        selectedRows,
        allData
    })

  }

  getPre = (type)=>{  //正则判断权限

    // if(true){
    //   return true;
    // }

    let { permission,pathname } = this;

    var patt = new RegExp(`^${pathname}/.{0,}${type}$`,"g");

    var len = permission.length;

    for(var i=0;i<len;i++){
      if(permission[i].search(patt) >= 0){
        return true;
      }
    }

    // console.log(pathname)
    // console.log("/basis/ownerUnit/xxx/ssssss/add".search(patt))

    return false;

  }

  authButton = (type,text,icon)=>{

    if(! this.getPre(type) ){
      return;
    }

    let {toolbar,marginRight,marginBottom} = this.props;
    let {selectedRowKeys,selectedRows, allData} = this.state;
    let btn = toolbar[type];
    if(btn&&btn.visible(selectedRowKeys,selectedRows, allData)){
      let ev = btn["click"];
      this.btns.push(
        <Button type='primary' style={{marginRight,marginBottom}} key={type} icon={icon} onClick={()=>{
          ev(selectedRowKeys,selectedRows, allData)
        }}>{text}</Button>
      )
    }
  }


  createBtns = ()=>{

    this.btns = [];




    this.authButton("application","开票申请","form");  //开票申请
    this.authButton("invConfirm","开票确认","form");  //开票申请

    this.authButton("printInvoicing","打印开票申请单","printer");  //打印开票申请单



    this.authButton("creditApplication","付款额度申请","form");  //付款额度申请
    this.authButton("editCreditApplication","编辑付款额度申请","edit");  //编辑付款额度申请
    this.authButton("print","打印付款审批单","printer");  //打印付款审批单
    this.authButton("newPayment","新增付款","form");  //新增付款
    this.authButton("other","其他工程付款","form");  //其他工程付款

    this.authButton("confirm","付款确认","form");  //付款确认
    this.authButton("printPayment","打印付款通知书","printer");  //打印付款通知书


    this.authButton("subcontractPayment","分项分包付款","form");  //分项分包付款
    this.authButton("printSubcontractPayment","打印分项分包付款审批单","printer");  //打印分项分包付款审批单
    this.authButton("materialCollar","材料类领用支票申请","form");  //材料类领用支票申请
    this.authButton("printMaterialCollar","打印材料类领用支票申请","printer");  //打印材料类领用支票申请
    this.authButton("nonMaterialCollar","非材料类领用支票申请","form");  //非材料类领用支票申请
    this.authButton("printNonMaterialCollar","打印非材料类领用支票申请","printer");  //打印非材料类领用支票申请
    this.authButton("reimbursement","现金报销申请","form");  //现金报销申请
    this.authButton("printReimbursement","打印现金报销申请","printer");  //打印现金报销申请

    this.authButton("salesTaxAdd","销项税率新增","plus");  //销项税率新增
    this.authButton("salesTaxEdit","销项税率编辑","edit");  //销项税率编辑
    this.authButton("salesTaxView","销项税率查看","eye-o");  //销项税率查看
    this.authButton("inputTaxAdd","进项税率新增","plus");  //进项税率新增
    this.authButton("inputTaxEdit","进项税率编辑","edit");  //进项税率编辑
    this.authButton("inputTaxView","进项税率查看","eye-o");  //销项税率查看
    this.authButton("preTaxAdd","预征率新增","plus");  //预征率新增
    this.authButton("preTaxEdit","预征率编辑","edit");  //预征率编辑
    this.authButton("preTaxView","预征率查看","eye-o");  //销项税率查看
    this.authButton("buildingTaxAdd","城建税率新增","plus");  //城建税率新增
    this.authButton("buildingTaxEdit","城建税率编辑","edit");  //城建税率编辑
    this.authButton("buildingTaxView","城建税率查看","eye-o");  //销项税率查看
    this.authButton("teachingTaxAdd","教附税率新增","plus");  //教附税率新增
    this.authButton("teachingTaxEdit","教附税率编辑","edit");  //教附税率编辑
    this.authButton("teachingTaxView","教附税率查看","eye-o");  //销项税率查看

    this.authButton("add","新增","plus");  //新增按钮
    this.authButton("edit","编辑","edit");  //编辑按钮
    this.authButton("view","查看","eye-o");  //查看按钮
    this.authButton("delete","删除","delete");  //删除
    this.authButton("exportAll","全部导出","file-excel");  //全部导出
    this.authButton("export","导出选中","file-excel");  //批量导出


    this.authButton("addOther","新增其他工程付款","plus");  //新增按钮
    this.authButton("editOther","编辑其他工程付款","edit");  //编辑按钮
    this.authButton("viewOther","查看其他工程付款","eye-o");  //查看按钮
    this.authButton("deleteOther","删除其他工程付款","delete");  //删除

    this.authButton("importReceipt","导入工程收款","to-top");  //导入工程收款
    this.authButton("downloadCollectionTemplate","下载工程收款模板","download");  //下载工程收款模板


    this.authButton("importPayment","导入工付款","to-top");  //导入工付款
    this.authButton("downloadPaymentTemplate","下载工程付款模板","download");  //下载工程付款模板

    this.authButton("importInvoice","导入工程开票","to-top");  //导入工程开票
    this.authButton("downloadInvoiceTemplate","下载工程开票模板","download");  //下载工程开票模板


    this.authButton("importPrepayment","导入预缴","to-top");  //导入预缴
    this.authButton("downloadPre_paidTemplate","下载预缴模板","download");  //下载预缴模板

    this.authButton("importedItems","导入进项","to-top");  //导入预缴
    this.authButton("downloadEntryTemplate","下载进项模板","download");  //下载进项模板

    this.authButton("addInvoice","新增发票明细","plus");  //新增发票明细
    this.authButton("editInvoice","编辑发票明细","edit");  //编辑发票明细
    this.authButton("viewInvoice","查看发票明细","eye-o");  //查看发票明细
    this.authButton("deleteInvoice","删除发票明细","delete");  //删除发票明细

    this.authButton("invoiceDetails","发票明细","file-excel");  //发票明细
    this.authButton("importInvoiceDetails","导入发票明细","to-top");  //导入发票明细
    this.authButton("downloadInvoiceDetailsTemplate","下载发票明细模板","download");  //下载发票明细模板

    // if(toolbar.add&&toolbar.add.visible(selectedRowKeys,selectedRows, allData)){  //添加按钮
    //   btns.push(<Button type='primary' style={{marginRight,marginBottom}} key="add" icon="plus" onClick={toolbar.add.click}>新增</Button> )
    // }
    // if(toolbar.edit&&toolbar.edit.visible(selectedRowKeys,selectedRows, allData)){ //编辑按钮
    //   btns.push(<Button type='primary' style={{marginRight,marginBottom}} key="edit" icon="edit" onClick={toolbar.edit.click}>修改</Button> )
    // }
    // if(toolbar.view&&toolbar.view.visible(selectedRowKeys,selectedRows, allData)){  //查看按钮
    //   btns.push(<Button type='primary' style={{marginRight,marginBottom}} key="view" icon="eye-o" onClick={toolbar.view.click}>查看</Button> )
    // }
    // if(toolbar.exportAll&&toolbar.exportAll.visible(selectedRowKeys,selectedRows, allData)){  //全部导出
    //   btns.push(<Button type='primary' style={{marginRight,marginBottom}} key="exportAll" icon="file-excel" onClick={toolbar.exportAll.click}>全部导出</Button> )
    // }
    // if(toolbar.export&&toolbar.export.visible(selectedRowKeys,selectedRows, allData)){  //选中导出
    //   btns.push(<Button type='primary' style={{marginRight,marginBottom}} key="export" icon="file-excel" onClick={toolbar.export.click}>导出选中</Button> )
    // }
    // if(toolbar.delete&&toolbar.delete.visible(selectedRowKeys,selectedRows, allData)){  //删除
    //   btns.push(<Button type='primary' style={{marginRight,marginBottom}} key="delete" icon="delete" onClick={toolbar.delete.click}>批量删除</Button> )
    // }
    //
    //
    //
    // let i = 0;
    //
    // let len = 0;
    // for(var attr in toolbar){
    //   if(attr === "add" || attr === "edit" || attr === "view" || attr === "exportAll" || attr === "export" || attr === "delete"){
    //     len++;
    //   }
    // }
    //
    //
    // for(var j in toolbar){
    //     i++;
    //     if(i>len){
    //
    //       let visible = toolbar[j].visible;
    //
    //       if(visible(selectedRowKeys,selectedRows, allData)){
    //         let ev = toolbar[j]["click"];
    //         btns.push(
    //           <Button
    //             type='primary'
    //             style={{marginRight,marginBottom}}
    //             key={j}
    //             icon={toolbar[j]["icon"]}
    //             onClick={()=>{
    //               ev(selectedRowKeys,selectedRows, allData)
    //             }}>
    //               {toolbar[j]["text"]}
    //           </Button>
    //         )
    //       }
    //
    //     }
    // }

  }


  render(){
    let {style} = this.props;
    this.createBtns();
    return(
        <div style={style}>
            {this.btns}
        </div>
    )
  }
}

Bottons.defaultProps = {
    style:{marginBottom:14},
    data:[],
    marginRight:"10px",
    marginBottom:"10px"
}

export default Bottons;


/*
[
  {
    icon: "plus",
    text: "新增",
    visible: () => true,
    click:this.add
  },
  {
    icon: "edit",
    text: "编辑",
    visible: () => true,
    click:this.edit
  },
  {
    icon: "eye-o",
    text: "查看",
    visible: () => true,
    click:this.view
  },
  {
    icon: "file-excel",
    text: "导出",
    visible: (selectedRowKeys) => selectedRowKeys.length > 0,
    click:this.export
  },
  {
    icon: "delete",
    text: "删除",
    visible: (selectedRowKeys) => selectedRowKeys.length > 0,
    click: () => this.refs.table.delete()
  }
]
*/
