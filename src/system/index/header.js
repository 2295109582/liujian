import React,{Component} from 'react';
import { Layout,Badge,Icon,Avatar, Radio,Row,Col ,Switch,notification,Menu, Dropdown } from 'antd';
import screenfull from 'screenfull';
const { Header } = Layout;


class AppSetting extends Component{
  render(){
    return(
      <Row gutter={20}>
        <Col xs={12} style={{marginTop:'20px'}}>
          滚动：<Switch defaultChecked />
        </Col>
        <Col xs={12} style={{marginTop:'20px'}}>
          边框：<Switch />
        </Col>
        <Col xs={12} style={{marginTop:'20px'}}>
          分页：<Switch  />
        </Col>
        <Col xs={12} style={{marginTop:'20px'}}>
          页头：<Switch />
        </Col>
        <Col xs={12} style={{marginTop:'20px'}}>
          详情：<Switch />
        </Col>
        <Col xs={12} style={{marginTop:'20px'}}>
          选框：<Switch />
        </Col>
        <Col xs={24} style={{marginTop:'20px'}}>
          大小：
          <Radio.Group size="default">
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="middle">Middle</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
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
            {/* <div className="headerTab">
              <span className="textRight">Tab</span>
              <Switch defaultChecked />
            </div>
            <div className="headerTab">
              <Select defaultValue="lucy">
                <Option value="jack">
                  <Icon type="aliwangwang-o" />
                </Option>
                <Option value="lucy">
                  <Icon type="aliwangwang-o" />
                </Option>
                <Option value="disabled">
                  <Icon type="aliwangwang-o" />
                </Option>
                <Option value="Yiminghe">
                  <Icon type="aliwangwang-o" />
                </Option>
              </Select>
            </div> */}
            <div className="headerTab" onClick={this.toggleSetting}>
              <a><Icon type="setting" style={{color:'rgba(0, 0, 0, 0.65)'}} /></a>
            </div>
            <div className="headerTab" onClick={this.toggleScreenfull}>
              <a><Icon type={this.state.screenfullIcon} style={{color:'rgba(0, 0, 0, 0.65)'}} /></a>
            </div>
            <div className="headerTab">
              <Dropdown overlay={menu}>
                <div>
                  <Avatar src={avatar} style={{position:'relative',top:'10px'}} />
                  <a style={{marginLeft:'10px'}}>{userName}</a>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>
    )
  }
}
