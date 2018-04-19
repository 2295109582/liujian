import React,{Component} from 'react';
import Login from './login';
import Index from './index';




class App extends Component{

  constructor(){
    super(...arguments);
    this.login = <Login showIndex={this.showIndex} />;
    this.index = <Index showLogin={this.showLogin} />;

    const isLogin = window.uc.storage.get("isLogin");
    this.state = {
      page: isLogin===true?this.index:this.login
    }

  }


  componentWillMount(){  //其他修改数据就退出登录
    window.addEventListener('storage',(...args)=>{
      this.setState({
        page:this.login
      })
    })
  }



  showLogin =()=>{
    window.uc.storage.remove('isLogin');
    this.setState({
      page:<Login showIndex={this.showIndex} />
    })
  }

  showIndex =(data)=>{
    window.uc.storage.set('isLogin',true);
    window.uc.storage.set('userInfo',data);
    this.setState({
      page:<Index showLogin={this.showLogin} />
    })
  }



  render(){
    return(
      <div>
        {this.state.page}
      </div>
    )
  }
}


export default App;
