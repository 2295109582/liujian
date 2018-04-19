import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//主题
import 'echarts/theme/macarons';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        let {main} = this.refs;
        var myChart = echarts.init(main,'macarons');
        // 绘制图表

    var  option = {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
              orient: 'left',
              x: 'left',
              data:['直接访问','邮件营销','联盟广告','搜索引擎']
          },
          series: [
              {
                  name:'访问来源',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '30',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:[
                      {value:335, name:'直接访问'},
                      {value:310, name:'邮件营销'},
                      {value:234, name:'联盟广告'},
                      {value:158, name:'搜索引擎'}
                  ]
              }
          ]
      };

      myChart.setOption(option);

    }
    render() {
        return (
            <div className="clearfix">
              <div  ref="main" style={{ width: 300, height: 300,float:'left' }}></div>
              <div style={{float:'left',paddingTop:'70px'}}>
                <p>家用电器28.79%¥ 4,544</p>
                <p>家用电器28.79%¥ 4,544</p>
                <p>家用电器28.79%¥ 4,544</p>
                <p>家用电器28.79%¥ 4,544</p>
              </div>
            </div>
        );
    }
}

export default EchartsTest;
