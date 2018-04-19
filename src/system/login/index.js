import React,{Component} from 'react';
import { Button,Input,Checkbox,Icon,message } from 'antd';
import logo from '@/common/img/logo.svg';
import '@/utils/storage.js';

export default class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"",
      remember:true,
      loading: false
    }
  }


  doSubmit=(e)=>{
    e.preventDefault();
    let {username,password} = this.state;
    let _this = this;


    if(username.trim() === ""){message.error('用户名不能为空'); return;}
    if(password.trim() === ""){message.error('密码不能为空'); return;}

    _this.setState({loading: true})
    window.uc.axios.post('/login/name', {
      userName:username,
      password:password
    })
    .then((data)=> {
      if(data.status === 200){
        var {showIndex} = _this.props;
        showIndex(data.data);
      }
      _this.setState({loading: false});
      message.info(data.msg)
    })
    .catch(()=>{
      _this.setState({loading: false});
    })

  }


  render(){
    let appName = window.uc.appConfig["appName"];
    let {username,password,remember,loading} = this.state;
    return(
      <div id="login">
        <h4 className="loginTitle">
          <img src={logo} alt='logo' />Ant Design
          <p>{appName}</p>
        </h4>
        <div className="loginbox">
          <form onSubmit={this.doSubmit}>
            <Input value={username} style={{marginBottom:"30px"}} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder='用户名' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} size='large' />
            <Input value={password} type="password" style={{marginBottom:"30px"}} onChange={(e)=>{this.setState({password:e.target.value})}} placeholder='密码' name="password" prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} size='large' />
            <Checkbox checked={remember} style={{marginBottom:"30px"}} onChange={(e)=>{this.setState({remember:e.target.value})}}>自动登录</Checkbox>
            <Button htmlType="submit" size="large" type="primary" style={{width:"100%"}} loading={loading}>登录</Button>
          </form>
          <div style={{marginTop:'24px'}} className='clearfix'>
            <a style={{float:'left'}}>注册</a>
            <a style={{float:'right'}} className="login-form-forgot">忘记密码</a>
          </div>
        </div>
      </div>
    )
  }
}
//<WrappedNormalLoginForm showIndex={showIndex}/>
