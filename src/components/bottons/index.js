import React,{Component} from 'react';
import { Button } from 'antd';

class Bottons extends Component{



  constructor(){
      super(...arguments);
      this.state = {
        selectedRowKeys:[],  //table选中的key
        selectedRows:[],  //table选中的数据
        allData:[]   //table所有的数据
      }
  }

  visible = (selectedRowKeys, selectedRows,allData)=>{
    
    this.setState({
        selectedRowKeys,
        selectedRows,
        allData
    })
  
  }

  render(){
    let {selectedRowKeys,selectedRows, allData} = this.state;
    let {data,marginRight,style} = this.props;

    var btn = data.map((item,i)=>{
        if(item.visible&&item.visible(selectedRowKeys,selectedRows, allData)){
            return (
                <Button type='primary' 
                    style={{marginRight}} 
                    icon={item.icon} 
                    key={item.text} 
                    onClick={item.click} 
                >
                    {item.text}
                </Button>
              )
        }
        return null;
    })

    return(
        <div style={style}>
            {btn}
        </div>
    )
  }
}

Bottons.defaultProps = {
    style:{},
    data:[],
    marginRight:"10px"
}

export default Bottons;