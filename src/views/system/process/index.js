import React,{Component} from 'react';
import {Card,Row,Col,Radio ,Input ,Button,List, Avatar ,Pagination,Divider,Progress } from 'antd';


import './process.css';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;
class Process extends Component{




  render(){

    const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

    return(
      <div className="process">
        <div className="title">
          <Card  bordered={false}>
            <Row>
              <Col span="8">
                <span>我的待办</span>
                <p>8个任务</p>
              </Col>
              <Col span="8">
                <span>本周任务平均处理时间</span>
                <p>32分钟</p>
              </Col>
              <Col span="8">
                <span>本周完成任务数</span>
                <p>24个任务 </p>
              </Col>
            </Row>
          </Card>
        </div>

        <div>
          <Card  bordered={false} style={{marginTop:'20px'}}>
            <Row>
              <Col span="12">
                <h3 style={{lineHeight:'32px'}}>流程列表</h3>
              </Col>
              <Col span="12" className='clearfix'>
                <div style={{float:'right'}}>
                  <RadioGroup  defaultValue="a">
                    <RadioButton value="a">全部</RadioButton>
                    <RadioButton value="b">进行中</RadioButton>
                    <RadioButton value="c">等待中</RadioButton>
                  </RadioGroup>
                  <Search placeholder="请输入" style={{ width: 270,marginLeft:'20px' }} />
                </div>
              </Col>
            </Row>
            <Button type="dashed" icon="plus" style={{width:'100%',margin:'24px 0'}}>添加</Button>
            <List
              size="large"
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />


                  <div style={{width:'200px'}}>
                    <p style={{marginBottom:'5px'}}>开始时间</p>
                    <p>2018-03-21 16:54</p>
                  </div>
                  <div style={{width:'200px',marginLeft:'30px'}}>
                    <Progress percent={50} status="active" />
                  </div>
                  <div style={{marginLeft:'48px'}}>
                    <a>编辑</a>
                    <Divider type="vertical" />
                    <a>更多</a>
                  </div>
                </List.Item>
              )}
            />


            <div  style={{marginTop:'24px'}} className='clearfix'>
              <Pagination showQuickJumper showSizeChanger defaultCurrent={1} total={50} style={{float:'right'}} />
            </div>



          </Card>
        </div>

      </div>
    )
  }
}

export default Process;
