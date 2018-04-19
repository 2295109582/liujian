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
        "name": "班组信息",
        "url": "",
        "breadcrumb":["基础信息","班组信息"]
      },
      {
        "name": "工程基本信息",
        "url": ""
      },
      {
        "name": "税率设置",
        "url": ""
      },
      {
        "name": "设置工程经办会计",
        "url": ""
      },
    ]
  },
  {
    "name": "工程管理",
    "icon": "form",
    "child": [
      {
        "name": "工程收款",
        "url": ""
      },
      {
        "name": "工程付款",
        "url": ""
      },
      {
        "name": "工程开票",
        "url": ""
      },
      {
        "name": "工程进项",
        "url": ""
      },
      {
        "name": "预缴",
        "url": ""
      },
      {
        "name": "借款",
        "url": ""
      },
    ]
  },
  {
    "name": "辅助查询",
    "icon": "search",
    "child": [
      {
        "name": "当期税务台账",
        "url": ""
      },
      {
        "name": "工程台账",
        "url": ""
      }
    ]
  },
  {
    "name": "系统",
    "icon": "setting",
    "child":[
      {
        "name": "我的面板",
        "url": "/mypanel/home0"
      },
      {
        "name": "OA办公",
        "url": "/process/process"
      },
      {
        "name": "详情页1",
        "url": "/details1/details"
      },
      {
        "name": "详情页2",
        "url": "/details2/details"
      },
      {
        "name": "系统设置",
        "icon": "user",
        "child": [{
            "name": "菜单管理",
            "url": "/systemSet/menu/menu"
          },
          {
            "name": "用户管理",
            "url": "/set/userManagement"
          },
          {
            "name": "机构管理",
            "url": "set/mechanism",
            "child": [{
              "name": "菜单管理",
              "url": "set/menu"
            }]
          },
          {
            "name": "角色管理",
            "url": "set/character"
          }
        ]
      },
      {
        "name": "系统维护",
        "icon": "team",
        "child": [{
            "name": "地址码",
            "url": "ddd"
          },
          {
            "name": "行业类别",
            "url": "eee"
          },
          {
            "name": "抄表册管理",
            "url": "fff"
          }
        ]
      },
      {
        "name": "业扩管理",
        "url": "1",
        "icon": "edit"
      }
    ]
  }
];




// function createBreadcrumb(data,breadcrumb=[]){
//   for(var i=0;i<data.length;i++){
//     if(data[i].child){
//       console.log(breadcrumb)
//       createBreadcrumb(data[i].child,breadcrumb.push(data[i].name))
//     }else{
//       data[i].breadcrumb = breadcrumb;
//       breadcrumb=[];
//     }
//   }
// }
//
// createBreadcrumb(menuRoute);
// console.log(menuRoute)

export default menuRoute;
