import React, {Component} from 'react';
import { Card,Row,Col,Divider,List, Avatar} from 'antd';
//import Table from '@c/table';

import EchartsTest from '@c/echarts/echartsTest';

import './home.css';

import avatar from '@/common/img/BiazfanxmamNRoxxVxka.png';

class Home extends Component {


  render() {

    var columns=[
      { title: 'id', dataIndex: 'id', key: 'id'},
      { title: '申请编号', dataIndex: 'name', key: 'name',render:(text )=>(
        <a>{text}</a>
      ) },
      { title: '流程名称', dataIndex: 'version', key: 'version'},
      { title: '流程发起人', dataIndex: 'upgradeNum', key: 'upgradeNum'},
      { title: '创建时间', dataIndex: 'creator', key: 'creator'},
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a>任务办理</a>
            <Divider type="vertical" />
            <a>跟踪</a>
          </span>
        ),
      }
    ]

    var dataSource =  [];
    for (let i = 0; i < 66; ++i) {
      dataSource.push({
        key: i,
        id: i,
        name: '180124',
        platform: '抄表执行',
        version: '抄表计费',
        upgradeNum: 'admins',
        creator: '2018-01-24 14:55:42'
      });
    }

    let TableConfig = {
      autoLoad:true,
      columns:columns,
      dataSource:dataSource
    }



    const data = [
      {
        title: '英雄联盟',
        msg:'免费送皮肤！'
      },
      {
        title: 'react',
        msg:'试试水~~'
      },
      {
        title: 'javascript',
        msg:'css html java php jquery'
      },
      {
        title: '习主席',
        msg:'单身的不要着急,等国家富裕了包分配！'
      },
    ];


    //var grid = {xs:24,sm:24,md:12,lg:12,xl:12};
    //var grid2 = {xs:24,sm:24,md:24,lg:24,xl:16};
    //var grid3 = {xs:24,sm:24,md:24,lg:24,xl:8};

    
    return (
      <div className="home">
        <Card bordered={false} className="info">
          <div className="clearfix">
              <div className="infop clearfix">
                <div className="avatar">
                  <img src={avatar} alt="用户头像" />
                </div>
                <div className="infot">
                  <h4>早安，曲丽丽，祝你开心每一天！</h4>
                  <p>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</p>
                </div>
              </div>
              <div className="items clearfix">
                <div className="item">
                  <p>项目数</p>
                  <h4>56</h4>
                </div>
                <div className="item">
                  <p>团队内排名</p>
                  <h4>8/24</h4>
                </div>
                <div className="item">
                  <p>项目访问</p>
                  <h4>2,223</h4>
                </div>
              </div>
          </div>
        </Card>
        <div className="project">
          <Row gutter={20}>
            <Col span={17}>
              <Card bordered={false} title="进行中的项目" extra={<a>全部项目</a>}>
                <Card.Grid className="item">
                  <div className="itemBox">
                    <div className="name">
                      <img src={avatar} alt="用户头像" />Alipay
                    </div>
                    <div className="itemp">
                      <p>那是一种内在的东西，他们到达不了，也无法触及的</p>
                    </div>
                    <div className="p">
                      科学搬砖组 2小时前
                    </div>
                  </div>
                </Card.Grid>
                <Card.Grid className="item">
                  <div className="itemBox">
                    <div className="name">
                      <img src={avatar} alt="用户头像" />Alipay
                    </div>
                    <div className="itemp">
                      <p>那是一种内在的东西，他们到达不了，也无法触及的</p>
                    </div>
                    <div className="p">
                      科学搬砖组 2小时前
                    </div>
                  </div>
                </Card.Grid>
                <Card.Grid className="item">
                  <div className="itemBox">
                    <div className="name">
                      <img src={avatar} alt="用户头像" />Alipay
                    </div>
                    <div className="itemp">
                      <p>那是一种内在的东西，他们到达不了，也无法触及的</p>
                    </div>
                    <div className="p">
                      科学搬砖组 2小时前
                    </div>
                  </div>
                </Card.Grid>
                <Card.Grid className="item">
                  <div className="itemBox">
                    <div className="name">
                      <img src={avatar} alt="用户头像" />Alipay
                    </div>
                    <div className="itemp">
                      <p>那是一种内在的东西，他们到达不了，也无法触及的</p>
                    </div>
                    <div className="p">
                      科学搬砖组 2小时前
                    </div>
                  </div>
                </Card.Grid>
                <Card.Grid className="item">
                  <div className="itemBox">
                    <div className="name">
                      <img src={avatar} alt="用户头像" />Alipay
                    </div>
                    <div className="itemp">
                      <p>那是一种内在的东西，他们到达不了，也无法触及的</p>
                    </div>
                    <div className="p">
                      科学搬砖组 2小时前
                    </div>
                  </div>
                </Card.Grid>
                <Card.Grid className="item">
                  <div className="itemBox">
                    <div className="name">
                      <img src={avatar} alt="用户头像" />Alipay
                    </div>
                    <div className="itemp">
                      <p>那是一种内在的东西，他们到达不了，也无法触及的</p>
                    </div>
                    <div className="p">
                      科学搬砖组 2小时前
                    </div>
                  </div>
                </Card.Grid>
              </Card>
            </Col>
            <Col span={7}>
              <Card title="团队" bordered={false} className="team">
                <Row>
                  <Col span={12}>
                    <div className="item">
                      <img src={avatar} alt="用户头像" /><a>Alipay</a>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item">
                      <img src={avatar} alt="用户头像" /><a>Alipay</a>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item">
                      <img src={avatar} alt="用户头像" /><a>Alipay</a>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item">
                      <img src={avatar} alt="用户头像" /><a>Alipay</a>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="item">
                      <img src={avatar} alt="用户头像" /><a>Alipay</a>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

        </div>


        <div>
          <Row gutter={20}>
            <Col span="14">
              <Card title="待办任务" bordered={false}>
                  {/* <Table config={TableConfig} ref="table" /> */}
              </Card>
            </Col>
            <Col span="10">
              <Card title="动态" bordered={false}>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                          title={<a>{item.title}</a>}
                          description={item.msg}
                        />
                      </List.Item>
                    )}
                  />
              </Card>
              <Card title="图表测试" bordered={false} style={{marginTop:'20px'}}>
                  <EchartsTest />
              </Card>
            </Col>
          </Row>
        </div>

      </div>
    )
  }
}

export default Home;
