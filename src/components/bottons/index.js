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



  createBtns = ()=>{
    let {selectedRowKeys,selectedRows, allData} = this.state;
    let {toolbar,marginRight} = this.props;

    let btns = [];

    if(toolbar.add&&toolbar.add.visible(selectedRowKeys,selectedRows, allData)){
      btns.push(<Button type='primary' style={{marginRight}} key="add" icon="plus" onClick={toolbar.add.click}>新增</Button> )
    }
    if(toolbar.edit&&toolbar.edit.visible(selectedRowKeys,selectedRows, allData)){
      btns.push(<Button type='primary' style={{marginRight}} key="edit" icon="edit" onClick={toolbar.edit.click}>修改</Button> )
    }
    if(toolbar.view&&toolbar.view.visible(selectedRowKeys,selectedRows, allData)){
      btns.push(<Button type='primary' style={{marginRight}} key="view" icon="eye-o" onClick={toolbar.view.click}>查看</Button> )
    }
    if(toolbar.exportAll&&toolbar.exportAll.visible(selectedRowKeys,selectedRows, allData)){
      btns.push(<Button type='primary' style={{marginRight}} key="exportAll" icon="file-excel" onClick={toolbar.exportAll.click}>全部导出</Button> )
    }
    if(toolbar.export&&toolbar.export.visible(selectedRowKeys,selectedRows, allData)){
      btns.push(<Button type='primary' style={{marginRight}} key="export" icon="file-excel" onClick={toolbar.export.click}>导出选中</Button> )
    }
    if(toolbar.delete&&toolbar.delete.visible(selectedRowKeys,selectedRows, allData)){
      btns.push(<Button type='primary' style={{marginRight}} key="delete" icon="delete" onClick={toolbar.delete.click}>批量删除</Button> )
    }

    let i = 0;
    for(var attr in toolbar){
        i++;
        if(i>6){
          btns.push(
            <Button
              type='primary'
              style={{marginRight}}
              key={toolbar[attr]}
              icon={toolbar[attr]["icon"]}
              onClick={toolbar[attr]["click"]}>
                {toolbar[attr]["text"]}
            </Button>
          )
        }
    }


    return btns;
  }


  render(){
    let {style} = this.props;
    return(
        <div style={style}>
            {this.createBtns()}
        </div>
    )
  }
}

Bottons.defaultProps = {
    style:{marginBottom:24},
    data:[],
    marginRight:"10px"
}

export default Bottons;


/*
[
  {
    icon: "plus",
    text: "新增",
    visible: () => true,
    click:this.add
  },
  {
    icon: "edit",
    text: "编辑",
    visible: () => true,
    click:this.edit
  },
  {
    icon: "eye-o",
    text: "查看",
    visible: () => true,
    click:this.view
  },
  {
    icon: "file-excel",
    text: "导出",
    visible: (selectedRowKeys) => selectedRowKeys.length > 0,
    click:this.export
  },
  {
    icon: "delete",
    text: "删除",
    visible: (selectedRowKeys) => selectedRowKeys.length > 0,
    click: () => this.refs.table.delete()
  }
]
*/
