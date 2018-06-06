
export const permissionData = [
  { title: '首页',key: '/'},
  {
    title: '基础信息',
    key: '/basis',
    children: [
      { title: '业主单位',key: '/basis/ownerUnit',
          children:[
            { title: '新增',key:'/basis/ownerUnit/add' },
            { title: '删除',key:'/basis/ownerUnit/delete' },
            { title: '编辑',key:'/basis/ownerUnit/edit' },
            { title: '查看',key:'/basis/ownerUnit/view' },
          ]
       },
      { title: '专业分包',key: '/basis/subcontracting',
        children:[
          { title: '新增',key:'/basis/subcontracting/add' },
          { title: '删除',key:'/basis/subcontracting/delete' },
          { title: '编辑',key:'/basis/subcontracting/edit' },
          { title: '查看',key:'/basis/subcontracting/view' },
        ]
       },
      { title: '供应商',key: '/basis/supplier' ,
        children:[
          { title: '新增',key:'/basis/supplier/add' },
          { title: '删除',key:'/basis/supplier/delete' },
          { title: '编辑',key:'/basis/supplier/edit' },
          { title: '查看',key:'/basis/supplier/view' },
        ]
      },
      { title: '工程基本信息',key: '/basis/projectInfo',
        children:[
          { title: '新增',key:'/basis/projectInfo/add' },
          { title: '删除',key:'/basis/projectInfo/delete' },
          { title: '编辑',key:'/basis/projectInfo/edit' },
          { title: '查看',key:'/basis/projectInfo/view' },
          { title: '全部导出',key:'/basis/projectInfo/exportAll' },
          { title: '批量导出',key:'/basis/projectInfo/export' },
        ]
       },
      { title: '税率设置',key: '/basis/taxRate',
        children:[
          { title: '销项税率新增',key:'/basis/taxRate/salesTaxAdd' },
          { title: '销项税率编辑',key:'/basis/taxRate/salesTaxEdit' },
          { title: '销项税率查看',key:'/basis/taxRate/salesTaxView' },
          { title: '进项税率新增',key:'/basis/taxRate/inputTaxAdd' },
          { title: '进项税率编辑',key:'/basis/taxRate/inputTaxEdit' },
          { title: '进项税率查看',key:'/basis/taxRate/inputTaxView' },
          { title: '预征率新增',key:'/basis/taxRate/preTaxAdd' },
          { title: '预征率编辑',key:'/basis/taxRate/preTaxEdit' },
          { title: '预征率查看',key:'/basis/taxRate/preTaxView' },
          { title: '城建税率新增',key:'/basis/taxRate/buildingTaxAdd' },
          { title: '城建税率编辑',key:'/basis/taxRate/buildingTaxEdit' },
          { title: '城建税率查看',key:'/basis/taxRate/buildingTaxView' },
          { title: '教附税率新增',key:'/basis/taxRate/teachingTaxAdd' },
          { title: '教附税率编辑',key:'/basis/taxRate/teachingTaxEdit' },
          { title: '教附税率查看',key:'/basis/taxRate/teachingTaxView' },
        ]
      },
      { title: '常用行业类别',key: '/basis/industry',
        children:[
          { title: '新增',key:'/basis/industry/add' },
          { title: '删除',key:'/basis/industry/delete' },
          { title: '编辑',key:'/basis/industry/edit' },
          { title: '查看',key:'/basis/industry/view' },
        ]
      }
    ]
  },
  {
    title: '工程管理',
    key: '/engineering',
    children: [
      { title: '工程收款',key:'/engineering/receipt',
        children:[
          { title: '新增',key:'/engineering/receipt/add' },
          { title: '删除',key:'/engineering/receipt/delete' },
          { title: '编辑',key:'/engineering/receipt/edit' },
          { title: '查看',key:'/engineering/receipt/view' },
          { title: '导入工程收款',key:'/engineering/receipt/importReceipt' },
          { title: '下载工程收款模板',key:'/engineering/receipt/downloadCollectionTemplate' },
        ]
      },
      { title: '工程付款',key:'/engineering/payment',
        children:[
          { title: '联营项目',key:'/engineering/payment/jointVenture',children:[
            { title: '付款额度申请',key:'/engineering/payment/jointVenture/creditApplication' },
            { title: '编辑付款额度申请',key:'/engineering/payment/jointVenture/editCreditApplication' },
            { title: '查看',key:'/engineering/payment/jointVenture/view' },
            { title: '打印付款审批单',key:'/engineering/payment/jointVenture/print' },
            { title: '新增付款',key:'/engineering/payment/jointVenture/newPayment' },
            { title: '其他工程付款',key:'/engineering/payment/jointVenture/other' },
            { title: '新增其他工程付款',key:'/engineering/payment/jointVenture/addOther' },
            { title: '编辑其他工程付款',key:'/engineering/payment/jointVenture/editOther' },
            { title: '查看其他工程付款',key:'/engineering/payment/jointVenture/viewOther' },
            { title: '删除其他工程付款',key:'/engineering/payment/jointVenture/deleteOther' },
            { title: '付款确认',key:'/engineering/payment/jointVenture/confirm' },
            { title: '打印付款通知书',key:'/engineering/payment/jointVenture/printPayment' },
          ] },
          { title: '自营项目',key:'/engineering/payment/selfSupport',children:[
            { title: '编辑',key:'/engineering/payment/selfSupport/edit' },
            { title: '查看',key:'/engineering/payment/selfSupport/view' },
            { title: '分项分包付款',key:'/engineering/payment/selfSupport/subcontractPayment' },
            { title: '打印分项分包付款审批单',key:'/engineering/payment/selfSupport/printSubcontractPayment' },
            { title: '材料类领用支票申请',key:'/engineering/payment/selfSupport/materialCollar' },
            { title: '打印材料类领用支票申请',key:'/engineering/payment/selfSupport/printMaterialCollar' },
            { title: '非材料类领用支票申请',key:'/engineering/payment/selfSupport/nonMaterialCollar' },
            { title: '打印非材料类领用支票申请',key:'/engineering/payment/selfSupport/printNonMaterialCollar' },
            { title: '现金报销申请',key:'/engineering/payment/selfSupport/reimbursement' },
            { title: '打印现金报销申请',key:'/engineering/payment/selfSupport/printReimbursement' },
            { title: '其他工程付款',key:'/engineering/payment/selfSupport/other' },
            { title: '新增其他工程付款',key:'/engineering/payment/selfSupport/addOther' },
            { title: '编辑其他工程付款',key:'/engineering/payment/selfSupport/editOther' },
            { title: '查看其他工程付款',key:'/engineering/payment/selfSupport/viewOther' },
            { title: '删除其他工程付款',key:'/engineering/payment/selfSupport/deleteOther' },
            { title: '付款确认',key:'/engineering/payment/selfSupport/confirm' },
          ] },
          { title: '已确认付款记录列表',key:'/engineering/payment/paymentRecord',children:[
            { title: '导入工程收款',key:'/engineering/payment/paymentRecord/importPayment' },
            { title: '下载工程收款模板',key:'/engineering/payment/paymentRecord/downloadPaymentTemplate' },
          ] }
        ]
      },
      {
        title: '工程开票',key:'/engineering/invoicing',children:[
          { title: '开票申请',key:'/engineering/invoicing/application' },
          { title: '开票申请编辑',key:'/engineering/invoicing/edit' },
          { title: '开票确认',key:'/engineering/invoicing/invConfirm' },
          { title: '打印开票申请单',key:'/engineering/invoicing/printInvoicing' },
          { title: '导入工程开票',key:'/engineering/invoicing/importInvoice' },
          { title: '下载工程开票模板',key:'/engineering/invoicing/downloadInvoiceTemplate' },
          { title: '新增',key:'/engineering/invoicing/add' },
          { title: '删除',key:'/engineering/invoicing/delete' },
          { title: '查看',key:'/engineering/invoicing/view' },
        ]
      },
      {
        title: '工程进项',key:'/engineering/items',children:[
          { title: '新增',key:'/engineering/items/add' },
          { title: '删除',key:'/engineering/items/delete' },
          { title: '编辑',key:'/engineering/items/edit' },
          { title: '查看',key:'/engineering/items/view' },
          { title: '导入进项',key:'/engineering/items/importedItems' },
          { title: '下载进项模板',key:'/engineering/items/downloadEntryTemplate' },
          { title: '发票明细',key:'/engineering/items/invoiceDetails' },
          { title: '新增发票明细',key:'/engineering/items/addInvoice' },
          { title: '编辑发票明细',key:'/engineering/items/editInvoice' },
          { title: '查看发票明细',key:'/engineering/items/viewInvoice' },
          { title: '删除发票明细',key:'/engineering/items/deleteInvoice' },
          { title: '导入发票明细',key:'/engineering/items/importInvoiceDetails' },
          { title: '下载发票明细模板',key:'/engineering/items/downloadInvoiceDetailsTemplate' },
        ]
      },
      {
        title: '预缴',key:'/engineering/prepayment',children:[
          { title: '新增',key:'/engineering/prepayment/add' },
          { title: '删除',key:'/engineering/prepayment/delete' },
          { title: '编辑',key:'/engineering/prepayment/edit' },
          { title: '查看',key:'/engineering/prepayment/view' },
          { title: '全部导出',key:'/engineering/prepayment/exportAll' },
          { title: '批量导出',key:'/engineering/prepayment/export' },
          { title: '导入预缴',key:'/engineering/prepayment/importPrepayment' },
          { title: '下载预缴模板',key:'/engineering/prepayment/downloadPre_paidTemplate' },
        ]
      },
      {
        title: '工程收款与开票累计情况',key:'/engineering/projectInvoicing',children:[
          { title: '删除',key:'/engineering/projectInvoicing/delete' },
        ]
      },
      {
        title: '工程付款与进项累计情况',key:'/engineering/projectInput',children:[
          { title: '删除',key:'/engineering/projectInput/delete' }
        ]
      }
    ]
  },
  {
    title: '辅助查询',key:'/auxiliaryQuery',children:[
      { title: '当月税收台账',key:'/auxiliaryQuery/ledger',children:[
          { title: '全部导出',key:'/auxiliaryQuery/ledger/exportAll' },
        ]
      },
      { title: '累计税收台账',key:'/auxiliaryQuery/tax' },
    ]
  },
  {
    title: '系统管理',key:'/settings',children:[
      { title: '用户',key:'/settings/user',children:[
        { title: '新增',key:'/settings/user/add' },
        { title: '删除',key:'/settings/user/delete' },
        { title: '编辑',key:'/settings/user/edit' },
        { title: '查看',key:'/settings/user/view' },
      ] },
      { title: '角色',key:'/settings/role',children:[
        { title: '新增',key:'/settings/role/add' },
        { title: '删除',key:'/settings/role/delete' },
        { title: '编辑',key:'/settings/role/edit' },
        { title: '查看',key:'/settings/role/view' },
      ] },
      { title: '部门',key:'/settings/department',children:[
        { title: '新增',key:'/settings/department/add' },
        { title: '删除',key:'/settings/department/delete' },
        { title: '编辑',key:'/settings/department/edit' },
        { title: '查看',key:'/settings/department/view' },
      ] },
      { title: '职位',key:'/settings/position',children:[
        { title: '新增',key:'/settings/position/add' },
        { title: '删除',key:'/settings/position/delete' },
        { title: '编辑',key:'/settings/position/edit' },
        { title: '查看',key:'/settings/position/view' },
      ] },
      { title: '数据字典',key:'/settings/dic',children:[
        { title: '新增',key:'/settings/dic/add' },
        { title: '删除',key:'/settings/dic/delete' },
        { title: '编辑',key:'/settings/dic/edit' },
        { title: '查看',key:'/settings/dic/view' },
      ] },
    ]
  }

];

let menuRoute = [
  {
    "name": "首页",
    "icon": "home",
    "url": "/",
    "breadcrumb":["首页"]
  },
  {
    "name": "基础信息",
    "icon": "idcard",
    "url":"/basis",
    "child":[
      {
        "name": "业主单位",
        "url": "/basis/ownerUnit",
        "breadcrumb":["基础信息","业主单位"]
      },
      {
        "name": "专业分包",
        "url": "/basis/subcontracting",
        "breadcrumb":["基础信息","专业分包"]
      },
      {
        "name": "供应商",
        "url": "/basis/supplier",
        "breadcrumb":["基础信息","供应商"]
      },
      {
        "name": "工程基本信息",
        "url": "/basis/projectInfo",
        "breadcrumb":["基础信息","工程基本信息"]
      },
      {
        "name": "税率设置",
        "url": "/basis/taxRate",
        "breadcrumb":["基础信息","税率设置"]
      },
      {
        "name": "常用行业类别",
        "url": "/basis/industry",
        "breadcrumb":["基础信息","常用行业类别"]
      },
    ]
  },
  {
    "name": "工程管理",
    "icon": "form",
    "url": "/engineering",
    "child": [
      {
        "name": "工程收款",
        "url": "/engineering/receipt",
        "breadcrumb":["工程管理","工程收款"]
      },
      {
        "name": "工程付款",
        "url": "/engineering/payment",
        "child":[
          {
            "name": "联营项目",
            "url": "/engineering/payment/jointVenture",
            "breadcrumb":["工程管理","工程付款","联营项目"]
          },
          {
            "name": "自营项目",
            "url": "/engineering/payment/selfSupport",
            "breadcrumb":["工程管理","工程付款","自营项目"]
          },
          {
            "name": "已确认付款记录列表",
            "url": "/engineering/payment/paymentRecord",
            "breadcrumb":["工程管理","工程付款","已确认付款记录列表"]
          }
        ]
      },
      {
        "name": "工程开票",
        "url": "/engineering/invoicing",
        "breadcrumb":["工程管理","工程开票"]
      },
      {
        "name": "工程进项",
        "url": "/engineering/items",
        "breadcrumb":["工程管理","工程进项"]
      },
      {
        "name": "预缴",
        "url": "/engineering/prepayment",
        "breadcrumb":["工程管理","预缴"]
      },
      {
        "name": "工程收款与开票累计情况",
        "url": "/engineering/projectInvoicing",
        "breadcrumb":["工程管理","工程收款与开票累计情况"]
      },
      {
        "name": "工程付款与进项累计情况",
        "url": "/engineering/projectInput",
        "breadcrumb":["工程管理","工程付款与进项累计情况"]
      },
      // {
      //   "name": "借款",
      //   "url": "",
      //   "breadcrumb":["工程管理","借款"]
      // }
    ]
  },
  {
    "name": "辅助查询",
    "url":"/auxiliaryQuery",
    "icon": "search",
    "child": [
      {
        "name": "当月税收台账",
        "url": "/auxiliaryQuery/ledger",
        "breadcrumb":["辅助查询","当月税收台账"]
      },
      {
        "name": "累计税收台账",
        "url": "/auxiliaryQuery/tax",
        "breadcrumb":["辅助查询","累计税收台账"]
      },
      // {
      //   "name": "付款记录",
      //   "url": "/auxiliaryQuery/payment",
      //   "breadcrumb":["辅助查询","付款记录"]
      // }
    ]
  },
  {
    "name": "系统管理",
    "url":"/settings",
    "icon": "api",
    "child": [
      {
        "name": "用户",
        "url": "/settings/user",
        "breadcrumb":["系统管理","用户"]
      },
      {
        "name": "角色",
        "url": "/settings/role",
        "breadcrumb":["系统管理","角色"]
      },
      {
        "name": "部门",
        "url": "/settings/department",
        "breadcrumb":["系统管理","部门"]
      },
      {
        "name": "职位",
        "url": "/settings/position",
        "breadcrumb":["系统管理","职位"]
      },
      {
        "name": "数据字典",
        "url": "/settings/dic",
        "breadcrumb":["系统管理","数据字典"]
      }
    ]
  },
  // {
  //   "name": "系统",
  //   "permission":true,   //可以看到菜单
  //   "icon": "setting",
  //   "child":[
  //     {
  //       "name": "我的面板",
  //       "url": "/mypanel/home0"
  //     },
  //     {
  //       "name": "OA办公",
  //       "url": "/process/process"
  //     },
  //     {
  //       "name": "详情页1",
  //       "url": "/details1/details"
  //     },
  //     {
  //       "name": "详情页2",
  //       "url": "/details2/details"
  //     },
  //     {
  //       "name": "系统设置",
  //       "icon": "user",
  //       "child": [{
  //           "name": "菜单管理",
  //           "url": "/systemSet/menu/menu"
  //         },
  //         {
  //           "name": "用户管理",
  //           "url": "/set/userManagement"
  //         },
  //         {
  //           "name": "机构管理",
  //           "url": "set/mechanism",
  //           "child": [{
  //             "name": "菜单管理",
  //             "url": "set/menu"
  //           }]
  //         },
  //         {
  //           "name": "角色管理",
  //           "url": "set/character"
  //         }
  //       ]
  //     },
  //     {
  //       "name": "系统维护",
  //       "icon": "team",
  //       "child": [{
  //           "name": "地址码",
  //           "url": "ddd"
  //         },
  //         {
  //           "name": "行业类别",
  //           "url": "eee"
  //         },
  //         {
  //           "name": "抄表册管理",
  //           "url": "fff"
  //         }
  //       ]
  //     },
  //     {
  //       "name": "业扩管理",
  //       "url": "1",
  //       "icon": "edit"
  //     }
  //   ]
  // }
];







export default menuRoute;
