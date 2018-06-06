import React,{Component} from 'react';
import { Layout,Icon,Row,Col ,Switch,notification,Menu, Dropdown,Modal,message,Input } from 'antd';
import screenfull from 'screenfull';
const { Header } = Layout;
const confirm = Modal.confirm;
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

    this.password = "";
    this.newpassword1 = "";
    this.newpassword2 = "";

    this.state = {
      visible:false,
      loading:false,
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

  click = ({ item, key, keyPath })=>{
    if(key === "1"){
      this.setState({visible:true})
    }else if(key === "2"){
      confirm({
        title: '是否确认重置默认密码?',
        onOk() {
          return new Promise((resolve, reject) => {
            window.uc.axios.post("/login/resetPassword",{
              id:window.uc.storage.get('userInfo').id,
              password:""
            }).then((data)=>{
              if(data.status === 200){
                message.info(data.msg);
              }
              resolve();
            })
          });
        }
      });
    }
  }

  change = (e)=>{
    let target = e.target;
    this[target.name] = target.value;
  }

  handleOk = ()=>{

    let {password, newpassword1,newpassword2 } = this;

    if( password === ""){
      message.error("当前密码不能为空！");
      return;
    }

    if( newpassword1 === "" || newpassword2 === ""){
      message.error("请输入新密码！");
      return;
    }

    if( newpassword1 !== newpassword2 ){
      message.error("两次新密码不一致！");
      return;
    }

    this.setState({loading:true})
    window.uc.axios.post("/login/resetPassword",{
      id:window.uc.storage.get('userInfo').id,
      validatePwd:password,
      password:newpassword1
    }).then((data)=>{
      if(data.status === 200){
        message.info(data.msg);
      }
      this.setState({loading:false,visible:false})
    })




  }

  render(){
    var userInfo = window.uc.storage.get('userInfo');
    let {userName} = userInfo;
//avatar
    let menu = (
      <Menu style={{width:160}} onClick={this.click}>
        <Menu.Item key="0" disabled>
          <Icon type="setting" style={{marginRight:10}} />个人中心
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="form" style={{marginRight:10}}  />修改密码
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="tool" style={{marginRight:10}}  />重置密码
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" >
          <div onClick={this.props.showLogin}>
            <Icon type="setting" style={{marginRight:10}}  />退出登录
          </div>
        </Menu.Item>
      </Menu>
    );

    let { visible ,loading} = this.state;

    return(
      <Header style={{ background: '#fff', padding: 0 }}>
        <Modal
          title="修改密码"
          visible={visible}
          onOk={this.handleOk}
          destroyOnClose={true}
          maskClosable={false}
          confirmLoading={loading}
          onCancel={()=>{this.setState({visible:false})}}
          >
            <Input placeholder="请输入当前密码" type="password" name="password" onChange={this.change} style={{marginBottom:"24px"}} />
          <Input placeholder="请输入新密码" type="password" name="newpassword1" onChange={this.change} style={{marginBottom:"24px"}}  />
            <Input placeholder="请输入新密码" type="password" name="newpassword2" onChange={this.change} />
        </Modal>
        <div id="headerWrap" className="clearfix">
          <div className="headerMenu">
            <a onClick={this.toggleIcon}>
              <span className="head-example">
                <Icon type={this.state.menuicon} style={{"fontSize":"20px",transform:'translateY(2px)'}} />
              </span>
            </a>
            {/* <a>
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
            </a> */}
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
                  <a>{userName}</a>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>
    )
  }
}
