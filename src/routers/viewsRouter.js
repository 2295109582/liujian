import React,{Component} from 'react';
import {AsyncComponent as asy} from './asyncComponent';
import {Route,Switch} from 'react-router-dom';

class ViewsRouter extends Component{
  render(){
    return(
      <Switch>
        <Route path="/" exact render={(props)=> //首页
          asy(import(/* webpackChunkName: "views/home/index" */'@/views/home'),props)}
        />
        {/*基础信息*/}
        <Route path="/basis/ownerUnit" exact render={(props)=> //业主单位列表
          asy(import(/* webpackChunkName: "views/basis/ownerUnit" */'@/views/basis/ownerUnit'),props)}
        />

        <Route path="/basis/subcontracting" render={(props)=> //专业分包
          asy(import(/* webpackChunkName: "views/basis/subcontracting" */'@/views/basis/subcontracting'),props)}
        />

        <Route path="/basis/supplier" render={(props)=> //供应商
          asy(import(/* webpackChunkName: "views/basis/supplier" */'@/views/basis/supplier'),props)}
        />


        <Route path="/basis/projectInfo" render={(props)=> // 工程基本信息
          asy(import(/* webpackChunkName: "views/basis/projectInfo" */'@/views/basis/projectInfo'),props)}
        />

        <Route path="/mypanel/home0" render={(props)=> // 系统/表格页
          asy(import(/* webpackChunkName: "views/system/mypanel/home0" */'@/views/system/mypanel'),props)}
        />
        <Route path="/process/process" render={(props)=> // 系统/流程页
          asy(import(/* webpackChunkName: "views/system/process/process" */'@/views/system/process'),props)}
        />
        <Route path="/systemSet/menu/menu" render={(props)=> // 系统/菜单
          asy(import(/* webpackChunkName: "views/system/systemSet/menu/menu" */'@/views/system/systemSet/menu'),props)}
        />
        <Route path="/details1/details" render={(props)=> // 系统/详情页1
          asy(import(/* webpackChunkName: "views/system/details1/index" */'@/views/system/details1'),props)}
        />
        <Route path="/details2/details" render={(props)=> // 系统/详情页2
          asy(import(/* webpackChunkName: "views/system/details2/index" */'@/views/system/details2'),props)}
        />
        <Route render={(props)=> // 404
          asy(import(/* webpackChunkName: "views/system/404" */'@/views/system/404'),props)}
        />
      </Switch>
    )
  }
}

export default ViewsRouter;




























































//666
