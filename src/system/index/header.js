import React,{Component} from 'react';
import { Layout,Badge,Icon,Avatar, Radio,Row,Col ,Switch,notification,Menu, Dropdown,Select } from 'antd';
import screenfull from 'screenfull';
const { Header } = Layout;

class AppSetting extends Component{
  render(){
    return(
      <Row gutter={20} style={{textAlign:'right'}}>
        <Col xs={20} style={{marginTop:'20px'}}>
          表单提交确认：<Switch defaultChecked />
        </Col>
        <Col xs={20} style={{marginTop:'20px'}}>
          表单提交后清空表单数据：<Switch />
        </Col>
        <Col xs={20} style={{marginTop:'20px'}}>
          表格删除提示：<Switch  />
        </Col>
        <Col xs={20} style={{marginTop:'20px'}}>
          新增和编辑后自动刷新表格：<Switch />
        </Col>
        <Col xs={20} style={{marginTop:'20px'}}>
          搜索条件是否显示全部：<Switch />
        </Col>
      </Row>
    )
  }
}

export default class AppHeader extends Component{

  constructor(props, context){
    super(props);
    this.state = {
      menuicon:"menu-fold", //菜单展开图标的type
      screenfullIcon:"arrows-alt"
    }
  }

  toggleScreenfull = ()=>{    //全屏切换,引入了全屏screenfull插件
    var {screenfullIcon} = this.state;
    this.setState({screenfullIcon:screenfullIcon==="arrows-alt"?"shrink":"arrows-alt"})
    screenfull.toggle();
  }

  toggleIcon =()=>{  //点击全屏切换不同的图标
    var {toggleCollapsed} = this.props;
    var {menuicon} = this.state;
    toggleCollapsed();
    if(menuicon === "menu-fold"){
      this.setState({menuicon:"menu-unfold"})
    }else{
      this.setState({menuicon:"menu-fold"})
    }
  }


  toggleSetting=()=>{
    notification.open({
      placement: 'bottomRight',
      message: '系统设置',
      icon:<Icon type="setting" style={{ color: '#108ee9' }} />,
      description: <AppSetting />
    });
  }



  render(){
    var userInfo = window.uc.storage.get('userInfo');
    let {userName,avatar} = userInfo;

    let menu = (
      <Menu style={{width:160}}>
        <Menu.Item key="0" disabled>
          <Icon type="setting" style={{marginRight:10}} />个人中心
        </Menu.Item>
        <Menu.Item key="1" disabled>
          <Icon type="setting" style={{marginRight:10}}  />个人设置
        </Menu.Item>
        <Menu.Item key="2" disabled>
          <Icon type="setting" style={{marginRight:10}}  />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" >
          <div onClick={this.props.showLogin}>
            <Icon type="setting" style={{marginRight:10}}  />退出登录
          </div>
        </Menu.Item>
      </Menu>
    );


    return(
      <Header style={{ background: '#fff', padding: 0 }}>
        <div id="headerWrap" className="clearfix">
          <div className="headerMenu">
            <a onClick={this.toggleIcon}>
              <span className="head-example">
                <Icon type={this.state.menuicon} style={{"fontSize":"20px",transform:'translateY(2px)'}} />
              </span>
            </a>
            <a>
              <Badge count={5} style={{backgroundColor: '#52c41a',opacity:'0.6'}}>
                <span className="head-example">
                  <Icon type="aliwangwang-o" style={{"fontSize":"20px"}} />
                </span>
              </Badge>
            </a>
            <a>
              <Badge count={5} style={{backgroundColor: '#52c41a',opacity:'0.6'}}>
                <span className="head-example">
                  <Icon type="github" style={{"fontSize":"20px"}} />
                </span>
              </Badge>
            </a>
          </div>
          <div className="headerFn clearfix">
            <div className="headerTab" onClick={this.toggleSetting}>
              <a><Icon type="setting" style={{color:'rgba(0, 0, 0, 0.65)'}} /></a>
            </div>
            <div className="headerTab" onClick={this.toggleScreenfull}>
              <a><Icon type={this.state.screenfullIcon} style={{color:'rgba(0, 0, 0, 0.65)'}} /></a>
            </div>
            <div className="headerTab">
              <Dropdown overlay={menu}>
                <div>
                  <Avatar src={"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524914380552&di=caddc081bb46de209510d192458f16e8&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-12-03%2F114912498.jpg"} style={{position:'relative',top:'10px'}} />
                  <a style={{marginLeft:'10px'}}>{"周星驰"}</a>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>
    )
  }
}
