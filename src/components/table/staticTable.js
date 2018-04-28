import React,{Component} from 'react';
import { Table,Modal,message,Divider } from 'antd';
import Title from '@c/title';
import FormModal from '@c/form/formModal';
import Bottons from '@c/bottons';


const confirm = Modal.confirm;

class AppTable extends Component{
  constructor(){
    super(...arguments);
    let {selectedRowKeys,dataSource,columns,toolbar,action} = this.props;

    this.index = 0;

    if(action!==false){
      columns.push({
        title: "操作", dataIndex: "action",render: (text, row) => (
          <div>
            <a onClick={()=>this.edit(row)}>编辑</a>
              <Divider type="vertical" />
            {/* <a onClick={()=>this.view(row)}>查看</a>
              <Divider type="vertical" /> */}
            <a onClick={()=>this.delete(row)}>删除</a>
          </div>
        )
      })

    }




    dataSource.forEach((item,i)=>{
      if(item.id){
        dataSource[i].id = `${item.id}`;
        dataSource[i].key = dataSource[i].id;
      }
    })





    this.state = {
      columns,
      dataSource,
      selectedRowKeys,
      toolbar:toolbar===false?{}:{
        add:{
          visible: () => true,
          click:this.showForm
        },
        delete:{
          visible: (selectedRowKeys) => selectedRowKeys.length > 0,
          click:()=>this.delete()
        }
      }
    }



  }

  componentDidMount(){
    this.saveTableData();
  }

  saveTableData = ()=>{
    let {saveTableData,name} = this.props;
    let {dataSource} = this.state;
    saveTableData&&saveTableData(name,dataSource);
  }

  setDataSource = (data)=>{
    data.forEach((item,i)=>{
      if(item.id){
        data[i].id = `${item.id}`
        data[i].key = data[i].id;
      }
    })


    this.setState({dataSource:data},()=>this.saveTableData());
  }



  showForm = ()=>{   //显示模态表单
    let {title} = this.props;
    let {form} = this.refs;
    form.show({
      title: `新增${title}`
    });
  }

  edit = (row)=>{  //编辑
    let {title} = this.props;
    let {form} = this.refs;
    form.setData({
      title: `编辑${title}`
    },row);
  }

  view = ()=>{   //查看

  }


  delete = (row)=>{  //删除

    this.confirm(()=>{
      let dataSource = [...this.state.dataSource];
      if(row){
        dataSource.forEach((item,i)=>{
          if(item.key === row.key){
            dataSource.splice(i,1);
          }
        })
      }else{
        let selectedData = this.getSelections();
        selectedData.forEach((item,i)=>{
          dataSource.forEach((it,j)=>{
            if(item.key === it.key){
              dataSource.splice(j,1);
            }
          })
        })
      }

      this.setState({dataSource},()=>this.saveTableData());

    })



  }


  addData = (values)=>{ //设置数据

    let dataSource = this.state.dataSource===undefined?[]:[...this.state.dataSource];
        if(values.key){
          dataSource.forEach((item,i)=>{
            if(item.key === values.key){
              dataSource[i] = values;
            }
          })
        }else{
          values.key = `${++this.index}`;
          dataSource.push(values);
        }
        this.setState({dataSource},()=>this.saveTableData())
  }


  confirm = (fn)=>{
    confirm({
      title: "确定删除吗？",
      okText: '确定',
      cancelText: '取消',
      onOk() {
        fn();
      }
    });
  }


  onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });  //设置选中
    let allData = this.getData();  //获取所有数据
    this.props.onChange(selectedRowKeys, selectedRows,allData);  //勾选时触发的事件
    this.refs.bottons&&this.refs.bottons.visible(selectedRowKeys, selectedRows,allData);  //bottons按钮组显示隐藏的方法
  }



  getData=()=>{ //获取到所有数据
    return this.state.dataSource;
  }

  getSelections=()=>{  //获取到勾选中的数据
    var {dataSource,selectedRowKeys} = this.state;
    var data = [];
    dataSource.forEach((item,i)=>{
      selectedRowKeys.forEach((it,j)=>{
        if(item["key"] === it){
          data.push(item)
        }
      })
    })
    return data;
  }



  render(){
    let {selectedRowKeys,dataSource,columns,toolbar} = this.state;
    let {expandedRowRender,size,title,data,check,pagination} = this.props;
    const rowSelection = check===false?null:{
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange
    };


    return (
      <div>
        {title===""?null:(<Title>{title}</Title>)}
        {JSON.stringify(toolbar)==="{}"?null:<Bottons toolbar={toolbar} ref="bottons" />}
        <Table
          size={size}
          onRow={this.onRow}
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          expandedRowRender={expandedRowRender}
          pagination={pagination}
          onChange={this.handleTableChange}
        />
        <FormModal ref="form" title={`新增${title}`}  data={data} ok={this.addData} />
      </div>
    );
  }
}

AppTable.defaultProps = {
  action:{}, //最右边操作列
  title:"", //标题
  data:[], //弹出框增加的数据
  columns:[],  //展示的列,父级带入
  dataSource:[],  //展示的内容,动态获取
  size:"middle",   //表格大小,default middle small
  bordered:false,  //边框
  onChange:()=>{}, //勾选改变时触发的的函数
  pagination: { //分页设置
    showSizeChanger:true,   //是否可以改变 pageSize
    showQuickJumper:true,   //是否可以快速跳转至某页
    pageSize:10,  //每页条数
    current:1,   //初始条数
  },
  expandedRowRender:null, //是否要展开详情
  toolbar:{}  //按钮对象
}

export default AppTable;
