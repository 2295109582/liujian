import React from 'react';

const asyncComponent = loadComponent => (
    class AsyncComponent extends React.Component {
        state = {
            Component: null,
        }
        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({ Component });
                    this.c = this.refs.c;
                })
                .catch((err) => {
                    console.error(`无法在<AsyncComponent />中加载组件`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props} ref="c" /> : null;
        }
    }
);

//用户查询组件

//业主单位组件
export const OwnerUnit = asyncComponent(() => import(/* webpackChunkName: "components/query/ownerUnit" */'@c/query/ownerUnit'));


//工程名组件
export const Accounting = asyncComponent(() => import(/* webpackChunkName: "components/query/accounting" */'@c/query/accounting'));


//工程名组件,只有自营
export const AccountingRemoveUnion = asyncComponent(() => import(/* webpackChunkName: "components/query/accountingRemoveUnion" */'@c/query/accountingRemoveUnion'));


//开票申请
export const InvoicingApplication = asyncComponent(() => import(/* webpackChunkName: "components/query/invoicingApplication" */'@c/query/invoicingApplication'));


//projectInformation
//联营项目工程信息
export const ProjectInformation = asyncComponent(() => import(/* webpackChunkName: "components/query/projectInformation" */'@c/query/projectInformation'));

//选择工程信息列表（返回详细信息，用来回填到额度审批单上）
export const CreditApproval = asyncComponent(() => import(/* webpackChunkName: "components/query/creditApproval" */'@c/query/creditApproval'));



//供应商单位组件
export const Supplier = asyncComponent(() => import(/* webpackChunkName: "components/query/supplier" */'@c/query/supplier'));


//选择专业分包公司
export const Subcontracting = asyncComponent(() => import(/* webpackChunkName: "components/query/subcontracting" */'@c/query/subcontracting'));

//行业
export const Industry = asyncComponent(() => import(/* webpackChunkName: "components/query/industry" */'@c/query/industry'));


//peceiptComponent
//添加工程收款组件（返回工程的详细信息）
export const PeceiptComponent = asyncComponent(() => import(/* webpackChunkName: "components/query/peceiptComponent" */'@c/query/peceiptComponent'));

//新增分项分包付款返回工程信息组件
export const SubcontractPayment = asyncComponent(() => import(/* webpackChunkName: "components/query/team" */'@c/query/subcontractPayment'));


///选择班组
export const Team = asyncComponent(() => import(/* webpackChunkName: "components/query/team" */'@c/query/team'));



//分包合同名称
export const Contract = asyncComponent(() => import(/* webpackChunkName: "components/query/contract" */'@c/query/contract'));

//收款付款单位theCompany
export const TheCompany = asyncComponent(() => import(/* webpackChunkName: "components/query/theCompany" */'@c/query/theCompany'));

//选择工程收款
export const ProjectReceipts = asyncComponent(() => import(/* webpackChunkName: "components/query/projectReceipts" */'@c/query/projectReceipts'));


//预缴
export const ProjectPrepayment = asyncComponent(() => import(/* webpackChunkName: "components/query/projectPrepayment" */'@c/query/projectPrepayment'));

//部门组件
export const Department = asyncComponent(() => import(/* webpackChunkName: "components/query/department" */'@c/query/department'));

//角色组件
export const Role = asyncComponent(() => import(/* webpackChunkName: "components/query/role" */'@c/query/role'));

//职位组件
export const Position = asyncComponent(() => import(/* webpackChunkName: "components/query/position" */'@c/query/position'));

//项目经办会计
export const ProjectAccounting = asyncComponent(() => import(/* webpackChunkName: "components/query/projectAccounting" */'@c/query/projectAccounting'));

//项目主管会计
export const ProjectManagerAccounting = asyncComponent(() => import(/* webpackChunkName: "components/query/projectManagerAccounting" */'@c/query/projectManagerAccounting'));

//财务经理
export const FinancialManager = asyncComponent(() => import(/* webpackChunkName: "components/query/financialManager" */'@c/query/financialManager'));



//
