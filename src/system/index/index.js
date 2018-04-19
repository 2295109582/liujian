import React,{Component} from 'react';
import { LocaleProvider,Icon } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AppMenuItem from './menu';
import AppHeader from './header';
import Router from '@/routers';


// window.addEventListener('beforeunload',(e)=>{
//   var e=window.event||e;
//   e.returnValue=("确定离开当前页面吗？");
// })


class AppSider extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false
    };
  }

  setCollapsed=(value)=>{
    var {menuWrap} = this.refs;
    if(value === true){
      menuWrap.style.width = 80 +"px";
    }else{
      menuWrap.style.width = 230 +"px";
    }
    this.setState({collapsed:value});
  }

  getCollapsed=()=>{
    return this.state.collapsed;
  }

  render(){
    return(
      <div id="menuWrap" ref="menuWrap">
        <div id="logo" />
        <AppMenuItem collapsed={this.state.collapsed} />
      </div>
    )
  }
}


class Index extends Component{

  componentDidMount(){  //组件挂载完成调用resizeWindow
    this.resizeWindow();
    window.addEventListener('resize',this.resizeWindow)
  }

  resizeWindow=()=>{ //屏幕宽度调整时切换布局
    var {sider} = this.refs;
    var collapsed = sider.getCollapsed();
    if(document.body.offsetWidth <= 640){
      if(collapsed === true){return;}
      this.toggleCollapsed();
    }else{
      if(collapsed === false){return;}
      this.toggleCollapsed();
    }
  }

  toggleCollapsed = ()=>{  //页面布局切换
    var {contentWrap,sider} = this.refs;
    if(contentWrap.classList.contains("layoutSmall640")){
      contentWrap.className = "layoutBig640";
      sider.setCollapsed(false);
    }else{
      contentWrap.className = "layoutSmall640";
      sider.setCollapsed(true);
    }
  }


  expandMenu = ()=>{  //页面切换显示菜单和导航
    var {tabs,contentWrap} = this.refs;
    if(tabs.classList.contains("layoutTop")){
      tabs.classList.remove("layoutTop");
      contentWrap.classList.remove("layoutLeft");
    }else{
      tabs.classList.add("layoutTop")
      contentWrap.classList.add("layoutLeft");
    }
  }

  render(){
    let copyright = window.uc.appConfig["copyright"];
    return(
      <LocaleProvider locale={zhCN}>
        <div id="wrap">
          <div id="expandMenu" onClick={this.expandMenu}>
            <Icon type="menu-unfold" />
          </div>
          <AppSider ref="sider" />
          <div id="contentWrap" ref="contentWrap">
            <AppHeader toggleCollapsed={this.toggleCollapsed} showLogin={this.props.showLogin} />
            <div id="tabs" ref="tabs">
              <Router />
            </div>
            <div id="footer">{copyright}</div>
          </div>
        </div>
      </LocaleProvider>
    )
  }
}


export default Index;
