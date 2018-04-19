import React,{Component} from 'react';

import { Collapse,Icon,Button,Badge,Divider,Dropdown ,Menu } from 'antd';

import './menu.css';

const Panel = Collapse.Panel;



class SystemSetMenu extends Component{
  render(){

    const text = (
      <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
      </p>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <Icon type="menu-unfold" style={{marginRight:'5px'}} />查看
        </Menu.Item>
        <Menu.Item>
          <Icon type="menu-unfold" style={{marginRight:'5px'}} />添加下级菜单
        </Menu.Item>
      </Menu>
    );

    let header = (
      <div className='clearfix header'>
        <div className='name'>
          <Icon type="menu-unfold" />
          <span style={{marginLeft:10}}>统计报表</span>
        </div>
        <div className='url'>
          <a>/home/add</a>
        </div>
        <div className='sorting'>
          <a><Icon type="arrow-up" /></a>
          <a><Icon type="arrow-down" /></a>
        </div>
        <div className='showHidden'>
           <Badge status="processing" text="显示" />
        </div>
        <div className='suthority'>
           <a>:a:Saaad:Saada</a>
        </div>
        <div className='operating'>
           <a>修改</a>
           <Divider type="vertical" />
           <a>删除</a>
           <Divider type="vertical" />
           <Dropdown overlay={menu}>
            <a className="ant-dropdown-link">
              更多 <Icon type="down" />
            </a>
          </Dropdown>

        </div>
      </div>
    )

    return(
      <div className='menu'>
        <Button type="dashed" icon="plus" className='add'>添加</Button>
        <div className='clearfix title'>
          <span>名称</span>
          <span>链接</span>
          <span>排序</span>
          <span>显示/隐藏</span>
          <span>权限标识</span>
          <span>操作</span>
        </div>
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header={header} key="1" >
            <Collapse bordered={false}>
              <Panel header={header} key="2">
                {text}
              </Panel>
            </Collapse>
          </Panel>
          <Panel header={header} key="2">
            {text}
          </Panel>
          <Panel header={header} key="3">
            {text}
          </Panel>
        </Collapse>
      </div>
    )
  }
}

export default SystemSetMenu;
