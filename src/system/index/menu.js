import React, {Component} from 'react';
import menuRoute from '@/routers/menuRoute.js';
import {Link} from 'react-router-dom';
import { Menu, Icon  } from 'antd';

const SubMenu = Menu.SubMenu;


function CreateMenu(menuData){  //创建菜单
  let permission = window.uc.pre();

  var itemIndex=0; //累计的每一项索引
  var submenuIndex=0; //累计的每一项展开菜单索引
  var menu = [];

  function create(menuData,el){
    for(var i=0;i<menuData.length;i++){
      submenuIndex++;
      if(menuData[i].child){  //如果有子级菜单

        if(permission.includes(menuData[i].url)){  //判断是否有权限
          var child = [];
          create(menuData[i].child,child);
          el.push(
            <SubMenu
               key={`sub${submenuIndex}`}
               title={<span><Icon type={menuData[i].icon} /><span>{menuData[i].name}</span></span>}
             >
               {child}
             </SubMenu>
          )
        }


      }else{   //如果没有子级菜单
        itemIndex++;
        if(permission.includes(menuData[i].url)){ //判断是否有权限
          el.push(
            <Menu.Item key={itemIndex} name={menuData[i].name} breadcrumb={menuData[i].breadcrumb}>
                <Link to={menuData[i].url}>
                  <Icon type={menuData[i].icon} />
                  <span>{menuData[i].name}</span>
                </Link>
            </Menu.Item>
          )
        }
      }
    }

  }

  create(menuData,menu);
  // console.log(menu)
  return menu;

}

class Appmenuitem extends Component {

  constructor(props) {
      super(props);
      let {theme,mode} = this.props;
      this.state = {
        theme,
        mode
      };
  }


  componentDidMount(){
    let {menu} = this.refs;
    window.addEventListener('unload',()=>{  //退出时保存展开的菜单
      window.uc.storage.set("openKeys",menu.state.openKeys);
    })
  }

  select = ({ item, key, selectedKeys }) =>{
    let {breadcrumb} = item.props;
    if(breadcrumb){
      window.uc.storage.set("breadcrumb",breadcrumb);  //面包屑导航
    };
    window.uc.storage.set("selectedKeys",selectedKeys); //选中的菜单
  }


  render() {
    let {mode,theme} = this.state; //菜单列表,应该动态获取
    let {collapsed} = this.props;
    let openKeys = window.uc.storage.get("openKeys");
    let selectedKeys = window.uc.storage.get("selectedKeys");
    return (
      <Menu
        ref="menu"
        mode={mode}
        theme={theme}
        inlineCollapsed={collapsed}
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        onSelect={this.select}
        >
          {CreateMenu(menuRoute)}
      </Menu>
    )
  }
}

Appmenuitem.defaultProps = {
  theme:"dark", //light,dark 布局样式主题
  mode:"inline", //布局方式
  collapsed:false,
}


export default Appmenuitem;
