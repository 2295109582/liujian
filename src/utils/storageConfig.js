
//初始化项目本地存储
export default {
  isLogin:false, //是否登录
  userInfo:{
    "id": null,  //用户id
    "userName": null,  //用户名
    "password": null,  //登录密码
    "realName": null, //
    "tel": null,
    "email": null,  //用户邮箱
    "loginTime": null,  //登录时间
    "createTime": null,  //创建时间
    "updateTime": null,  //更新时间
    "status": 0,  //
    "token": null,  //用户token
    "isAdmin":true,  //是否管理员
    "permission":[] //权限
  },  //用户信息
  dic:{}, //数据字典
  pageWrapScrollTop:0, //页面滚动的距离
  breadcrumb:["首页"], //面包屑导航
  openKeys:[], //展开的菜单
  selectedKeys:["1"], //被选中的key
  formSubmitPrompt:true, //表单提交前的提示
  formClearData:true,  //表单添加后清空数据
  formVisible:true,  //表单更多信息隐藏
}
