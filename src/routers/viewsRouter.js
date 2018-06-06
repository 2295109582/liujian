import React,{Component} from 'react';
//import {AsyncComponent as asy} from './asyncComponent';
import {Route,Switch,Redirect} from 'react-router-dom';

import Index from '@/views/home'; //首页
import OwnerUnit from '@/views/basis/ownerUnit';  //业主单位列表
import Subcontracting from '@/views/basis/subcontracting'; //专业分包
import Supplier from '@/views/basis/supplier'; //供应商
import ProjectInfo from '@/views/basis/projectInfo'; //工程基本信息
import TaxRate from '@/views/basis/taxRate'; //税率设置
import Industry from '@/views/basis/industry';//常用行业类别


import Receipt from '@/views/engineering/receipt';// 工程收款
import JointVenture from '@/views/engineering/jointVenture';// 联营项目
import SelfSupport from '@/views/engineering/selfSupport';// 自营项目
import PaymentRecord from '@/views/engineering/paymentRecord';// 已确认付款记录列表
import Invoicing from '@/views/engineering/invoicing';//  工程开票
import Items from '@/views/engineering/items';// 工程进项
import Prepayment from '@/views/engineering/prepayment';// 预缴
import ProjectInvoicing from '@/views/engineering/projectInvoicing'; // 工程收款与开票情况
import ProjectInput from '@/views/engineering/projectInput'; // 工程付款与进项累计情况


import Ledger from '@/views/auxiliaryQuery/ledger'; // 当月税收台账
import Tax from '@/views/auxiliaryQuery/tax'; // 税收台账
import Payment from '@/views/auxiliaryQuery/payment';// 付款记录列表


import User from '@/views/settings/user';// 用户
import Role from '@/views/settings/role'; // 角色
import Department from '@/views/settings/department'; // 部门
import Position from '@/views/settings/position';  // 职位
import Dic from '@/views/settings/dic';  // 数据字典


import My404 from '@/views/404';  // 404

class ViewsRouter extends Component{
  render(){

    let { pathname } = window.uc.customHistory().location; //拿到地址
    let permission = window.uc.pre();
    if(!permission.includes(pathname)){

      if(pathname !== "/404"){
        return <Redirect  to="/404" />
      }
    };



    return(
      <Switch>
        <Route path="/" exact component={Index} />
        {/*基础信息*/}
        <Route path="/basis/ownerUnit" component={OwnerUnit} />

        <Route path="/basis/subcontracting" component={Subcontracting}  />

        <Route path="/basis/supplier" component={Supplier}  />

        <Route path="/basis/projectInfo" component={ProjectInfo} />

        <Route path="/basis/taxRate" component={TaxRate}  />

        <Route path="/basis/industry" component={Industry}  />


        {/*工程管理*/}
        <Route path="/engineering/receipt" component={Receipt}  />

        <Route path="/engineering/payment/jointVenture" component={JointVenture}  />

        <Route path="/engineering/payment/selfSupport" component={SelfSupport}  />

        <Route path="/engineering/payment/paymentRecord" component={PaymentRecord}  />

        <Route path="/engineering/invoicing" component={Invoicing}  />

        <Route path="/engineering/items" component={Items}  />

        <Route path="/engineering/prepayment" component={Prepayment}  />

        <Route path="/engineering/projectInvoicing" component={ProjectInvoicing}  />

        <Route path="/engineering/projectInput" component={ProjectInput}  />


      {/*辅助查询*/}
        <Route path="/auxiliaryQuery/ledger" component={Ledger}  />

        <Route path="/auxiliaryQuery/tax" component={Tax}  />

        <Route path="/auxiliaryQuery/payment" component={Payment}  />

        {/*系统数据*/}
        <Route path="/settings/user" component={User} />

        <Route path="/settings/role" component={Role}  />

        <Route path="/settings/department" component={Department}  />

        <Route path="/settings/position" component={Position}  />

        <Route path="/settings/dic" component={Dic}  />


        {/*404*/}
        <Route path="/404" component={My404} />



      </Switch>
    )
  }
}

export default ViewsRouter;




























































//666
