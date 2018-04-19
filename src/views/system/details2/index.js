import React, {Component,Fragment} from 'react';

import { Button, Icon,Card,Steps,Badge,Table} from 'antd';
import './details2.css';

const ButtonGroup = Button.Group;
const { Step } = Steps;
class Details extends Component{

  state = {
    key: 'tab1',
    noTitleKey: 'app',
  }
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  }

  render(){

    const desc1 = (
      <div>
        <Fragment>
          曲丽丽
          <Icon type="dingding-o" style={{ marginLeft: 8 }} />
        </Fragment>
        <div>2016-12-12 12:32</div>
      </div>
    );

    const desc2 = (
      <div>
        <Fragment>
          周毛毛
          <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
        </Fragment>
        <div><a href="">催一下</a></div>
      </div>
    );

    const tabListNoTitle = [{
      key: 'article',
      tab: '操作日志一',
    }, {
      key: 'app',
      tab: '操作日志二',
    }, {
      key: 'project',
      tab: '操作日志三',
    }];

    const columns = [{
      title: '操作类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '执行结果',
      dataIndex: 'status',
      key: 'status',
      render: text => (
        text === 'agree' ? <Badge status="success" text="成功" /> : <Badge status="error" text="驳回" />
      ),
    }, {
      title: '操作时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    }, {
      title: '备注',
      dataIndex: 'memo',
      key: 'memo',
    }];

    let advancedOperation1 = [];

    for(var i=0;i<5;i++){
      advancedOperation1.push({
        key:i,
        type:"财务复审",
        name:"曲丽丽",
        status:"agree",
        updatedAt:"2017-10-03 19:23:12	",
        memo:"很棒"
      })
    }

    const contentListNoTitle = {
      article: <Table
        pagination={false}
        dataSource={advancedOperation1}
        columns={columns}
      />,
      app: <Table
        pagination={false}
        dataSource={advancedOperation1}
        columns={columns}
      />,
      project: <Table
        pagination={false}
        dataSource={advancedOperation1}
        columns={columns}
      />,
    };

    return(
      <div className="details2">
        <div className="info clearfix">
          <div className="infoBox">
            <h1>单号：234231029431</h1>
            <div className="infop clearfix">
              <p>创建人：曲丽丽</p>
              <p>订购产品：XX 服务</p>
              <p>创建时间：2017-07-07</p>
              <p>关联单据：<a>12421</a></p>
              <p>生效日期：2017-07-07 ~ 2017-08-08</p>
              <p>备注：请于两个工作日内确认</p>
            </div>
          </div>
          <div className="operatingBox">
            <div>
              <ButtonGroup>
                <Button>操作1</Button>
                <Button>操作2</Button>
              </ButtonGroup>
              <Button type="primary" style={{marginLeft:'5px'}}>主操作</Button>
            </div>
            <div className="clearfix">
              <div className='infot'>
                <span>状态</span>
                <h1>待审批</h1>
              </div>
              <div className='infot'>
                <span>订单金额</span>
                <h1>¥ 568.08</h1>
              </div>
            </div>
          </div>
        </div>
        <Card title="流程进度" bordered={false} style={{marginTop:'20px'}}>
          <Steps direction={"horizontal"}  current={1}>
            <Step title="创建项目" description={desc1} />
            <Step title="部门初审" description={desc2} />
            <Step title="财务复核" />
            <Step title="完成" />
          </Steps>
        </Card>
        <Card title="用户近半年来电记录" bordered={false} style={{marginTop:'20px'}}>
          <div className="noData">
            <Icon type="frown-o" />暂无数据
          </div>
        </Card>
        <Card
          bordered={false}
          style={{ width: '100%',marginTop:'20px' }}
          tabList={tabListNoTitle}
          activetabkey={this.state.noTitleKey}
          onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    )
  }
}

export default Details;
