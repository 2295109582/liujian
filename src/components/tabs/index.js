import React,{Component} from 'react';
import { Tabs } from 'antd';

import './index.css';

const TabPane = Tabs.TabPane;


class HighOrder extends Component{


  swiper=()=>{
    let { swiper } = this.tab;
    swiper&&swiper();
  }

  render(){
    let {view,add,remove} = this.props;
    let Com = view;
    return(
      <div>
        <Com {...this.props.props} add={add} remove={remove} ref={el=>this.tab=el} />
      </div>
    )
  }
}

class AppTabs extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;

    this.list = [];

    this.state = {
      panes:[]
    };
  }


  onChange = (activeKey) => {
    this.swiper(activeKey);
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }


  swiper = (activeKey)=>{
    let { list } = this;
    for(var attr in list){
      if(attr === activeKey){
        list[activeKey].swiper();
      }
    }
  }

  saveHighOrder = (el,activeKey)=>{
    this.list[activeKey] = el;
  }

  add = (title,content,closable) => {
    const panes = this.state.panes;
    const activeKey = `${++this.newTabIndex}`;

    panes.push({ title: title, content: <HighOrder add={this.add} ref={el=>this.saveHighOrder(el,activeKey)} remove={()=>{this.remove(activeKey)}} {...content} /> , key: activeKey,closable });
    this.setState({ panes, activeKey });
    return activeKey;
  }
  remove = (targetKey) => {

    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }

    this.setState({ panes, activeKey },()=>{
        this.swiper(activeKey);
    });
  }


  render() {
    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  }
}



export default AppTabs;
