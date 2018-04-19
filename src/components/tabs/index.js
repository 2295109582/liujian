import React,{Component} from 'react';
import { Tabs, Button } from 'antd';

import './index.css';

const TabPane = Tabs.TabPane;

class AppTabs extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;

    let {panes,activeKey} = this.props;

    panes.forEach((item,i)=>{
      this.newTabIndex++;
      panes[i].key = `${this.newTabIndex}`;
    })

    this.state = {
      activeKey,
      panes,
    };
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = (title,content) => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: title, content: content, key: activeKey });
    this.setState({ panes, activeKey });
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
    this.setState({ panes, activeKey });
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

AppTabs.defaultProps = {
  panes:[
    { title: 'Tab 1', content: 'Content of Tab Pane 1', closable: false },
    { title: 'Tab 2', content: 'Content of Tab Pane 2'}
  ],
  key:'1',
  activeKey:'1'
}

export default AppTabs;
