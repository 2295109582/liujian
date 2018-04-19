import React, {Component} from 'react';
import { Divider,Table,Badge  } from 'antd';

import './details1.css';

class Details extends Component{
  render(){

    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'right'
      },
      {
        title: '数量（件）',
        dataIndex: 'num',
        key: 'num',
        align: 'right'
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right'
      },
    ];

    let goodsData = [];

    for(var i=0;i<5;i++){
      goodsData.push({
        key:i,
        id:"1234561",
        name:"矿泉水 550ml",
        barcode:"12421432143214321",
        price:"2.00	",
        num:"1",
        amount:"2.0"
      })
    }

     if (goodsData.length) {
       let num = 0;
       let amount = 0;
       goodsData.forEach((item) => {
         num += Number(item.num);
         amount += Number(item.amount);
       });
       goodsData = goodsData.concat({
         key:"ss",
         id: '总计',
         num,
         amount,
       });
     }



     const progressColumns = [
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '当前进度',
        dataIndex: 'rate',
        key: 'rate',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text =>
          (text === 'success' ? (
            <Badge status="success" text="成功" />
          ) : (
            <Badge status="processing" text="进行中" />
          )),
      },
      {
        title: '操作员ID',
        dataIndex: 'operator',
        key: 'operator',
      },
      {
        title: '耗时',
        dataIndex: 'cost',
        key: 'cost',
      },
    ];



   const progressDataSource = [];

   for(let i=0;i<5;i++){
     progressDataSource.push({
       key:i,
       time:"1234561",
       rate:"矿泉水 550ml",
       status:"success",
       operator:"2.00	",
       cost:"1"
     })
   }

    return(
      <div className='details1'>
        <div className='box'>
          <div className='title'>退款申请</div>
          <div className='center clearfix'>
            <p>取货单号：1000000000</p>
            <p>状态：已取货</p>
            <p>销售单号：1234123421</p>
            <p>子订单：3214321432</p>
          </div>
        </div>
        <Divider />
        <div className='box'>
          <div className='title'>用户信息</div>
          <div className='center clearfix'>
            <p>用户姓名:付小小</p>
            <p>联系电话:18100000000</p>
            <p>常用快递:菜鸟仓储</p>
            <p>取货地址:浙江省杭州市西湖区万塘路18号</p>
            <p>备注:无</p>
          </div>
        </div>
        <Divider />
        <div className='box'>
          <div className='title'>退货商品</div>
          <Table
            style={{ marginTop: 26 }}
            pagination={false}
            dataSource={goodsData}
            columns={goodsColumns}
          />
        </div>
        <div className='box' style={{marginTop:'24px'}}>
          <div className='title'>退货进度</div>
          <Table
            style={{ marginTop: 26 }}
            pagination={false}
            dataSource={progressDataSource}
            columns={progressColumns}
          />
        </div>
      </div>
    )
  }
}

export default Details;
