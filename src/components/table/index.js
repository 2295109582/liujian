import React,{Component} from 'react';
import { Table,Modal,message } from 'antd';
import Bottons from '@c/bottons';


const confirm = Modal.confirm;

class AppTable extends Component{
  constructor(){
    super(...arguments);
    let {loading,selectedRowKeys,dataSource,pagination,columns,scroll,toolbar,selectedRows} = this.props;

    if(scroll){
      let len = columns.length;
      let w = (2000 - 150)/(len-1);
      columns.forEach((item,i)=>{
        if(i === 0){
          columns[0].fixed = 'left';
          columns[0].width = 150;
        }else{
          columns[i].width = w;
        }
        columns[i]["key"] = columns[i]["dataIndex"];
      })
    }

    if(toolbar.delete !== false){
      toolbar =  Object.assign({
        delete:{
          visible: (rowKeys) => rowKeys.length > 0,
          click:() => this.delete()
        }
      },toolbar)
    }


    columns.forEach((item,i)=>{
      if(item.dic){
        let dic = window.uc.dic(item.dic);
        columns[i].render = (text,row,index)=>{
          for(var i=0;i<dic.length;i++){
            if(text === dic[i].value){
              if(item.click){
                return <a onClick={()=>item.click(text,row)}>{dic[i].label}</a>
              }
              return dic[i].label
            }
          }
          return text;
        }
      }
    })


    this.state = {
      loading,
      toolbar,
      columns,
      selectedRows,
      selectedRowKeys,
      dataSource,
      pagination
    }

  }

  componentDidMount(){
    this.refresh();
  }



  confirm = (ids,fn)=>{
    confirm({
      title: "确定删除吗？",
      content: (
        <div style={{width:'80%',wordWrap:'break-word' }}>
          {ids}
        </div>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          fn(resolve);
        });
      }
    });
  }


  getDeleteKey = (row)=>{  //获取删除时提示的key
    let {deleteKey} = this.props;
    let titleTds = row || this.getKeySelections([deleteKey]);
    if(titleTds.length){
      titleTds = titleTds.map((item,i)=>{
        return item[deleteKey]
      });
    }else{
      titleTds = titleTds[deleteKey];
    }
    return titleTds;
  }

  getDeleteId = (row)=>{  //获取删除的id
    let ids = row || this.getKeySelections(["id"]);
    if(ids.length){
      ids = ids.map((item,i)=>{
        return item["id"]
      });
    }else{
      ids = ids["id"];
    }
    return ids;
  }

  delete = (row)=>{ //删除数据
    this.confirm(this.getDeleteKey(row),(resolve)=>{
      let {deleteUrl} = this.props;
      let _this = this;
      window.uc.axios.post(deleteUrl,{ids:this.getDeleteId(row)})
      .then((data)=>{
        message.info("删除成功！");
        resolve();
        _this.refresh();
      })
      .catch(()=>{
        message.error("删除失败！");
        resolve();
      })
    });
  }

  load = ()=>{   //加载状态
    this.setState({loading:true})
  }

  unload = ()=>{  //取消加载状态
    this.setState({loading:false})
  }

  refresh = (deleteKey)=>{    //去网络请求数据
    const {url,queryParams} = this.props;
    if(!url){
      this.unload();
      return;
    }
    let query = queryParams();
    if(query === undefined){message.warning("搜索条件验证不通过！");  return;}
    let {pagination} = this.state;
    this.load();
    let formdata;
    if(pagination === false){
      formdata = {...query};
    }else{
      formdata = {...query,...pagination};
    }
    window.uc.axios.post(url,formdata)
    .then((data)=>{
      let rows;
      let pagination = this.state.pagination;

      if(data.pageSize){
        rows = data.rows;
      }else{
        rows = data.data;
      };

      if(pagination === false){
        pagination = {
          pageSize:rows.length,
          showSizeChanger:false,   //是否可以改变 pageSize
          showQuickJumper:false,   //是否可以快速跳转至某页
        }
      }else{
        pagination = {
          current:data.current,
          pageSize:data.pageSize,
          total:data.total
        };
      }


      rows.forEach((item,i)=>{
        rows[i].key = item.id;
      })

      if(deleteKey){

          let { selectedRows,selectedRowKeys } = this.state;

          selectedRows.forEach((item,i)=>{
            if(item.id === deleteKey){
              selectedRows.splice(i,1);
            }
          })

          selectedRowKeys.forEach((item,i)=>{
            if(item === deleteKey){
              selectedRowKeys.splice(i,1);
            }
          })


          this.setState({selectedRows,selectedRowKeys});

      }

      //console.log(rows)


      this.setState({
        loading:false,
        dataSource:this.setDataSourceKey(rows),
        pagination,
        //selectedRows:[],
        //selectedRowKeys:[],
      },()=>{
        this.buttons();
      });
    })
    .catch(()=>{
      this.unload();
    })
  }


  buttons = ()=>{

    let {selectedRowKeys,selectedRows,dataSource} = this.state;

    this.refs.bottons&&this.refs.bottons.visible(selectedRowKeys,selectedRows,dataSource);  //bottons按钮组显示隐藏的方法
  }

 setDataSourceKey = (dataSource)=>{
   dataSource.forEach((item,i)=>{
     dataSource[i].key = dataSource[i].id;
   })
   return dataSource;
 }

 handleTableChange = (pagination, filters, sorter)=>{
   this.setState({
    pagination
   },()=>{
    this.refresh();
   })

  }


  //
  // selectRow = (record) => { //勾选
  //   const selectedRowKeys = [...this.state.selectedRowKeys];
  //   if (selectedRowKeys.indexOf(record.key) >= 0) {
  //     selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
  //   } else {
  //     selectedRowKeys.push(record.key);
  //   }
  //   this.setState({ selectedRowKeys });
  // }

  onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {

    this.setState({ selectedRowKeys,selectedRows },()=>{
      let allData = this.getData();  //获取所有数据
      this.props.onChange(selectedRowKeys, selectedRows,allData);  //勾选时触发的事件
      this.buttons();
    });  //设置选中

  }

  onRow = (record) => ({
    onClick: (ev) => {
      if(ev.target.nodeName === "A"){
        return;
      }
      // var {disabled} = this.props;
      // if(disabled !== undefined){
      //   if(disabled(record)["disabled"]){
      //     return;
      //   }
      // }
      //this.selectRow(record);
      this.props.click(record);
    }
  })


  getData=()=>{ //获取到所有数据
    return this.state.dataSource;
  }

  getKeyData=(key)=>{  //根据key筛选所有数据
    var dataSource = this.state.dataSource;
    var data = [];
    for(var i = 0;i<dataSource.length;i++){
      var list = {};
      for(var j=0;j<key.length;j++){
        list[key[j]] = dataSource[i][key[j]];
      }
      data.push(list)
    }
    return data;
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

  getKeySelections=(key)=>{ //根据key筛选勾选中的数据
    var selections = this.getSelections();
    var data = [];
    for(var i = 0;i<selections.length;i++){
      var list = {};
      for(var j=0;j<key.length;j++){
        list[key[j]] = selections[i][key[j]];
      }
      data.push(list)
    }
    return data;
  }


  render(){
    let {loading,selectedRowKeys,dataSource,pagination,columns,toolbar} = this.state;
    let {scroll,expandedRowRender,style,size,title,rowSelection} = this.props;

        rowSelection = rowSelection === false?null:{
          selectedRowKeys,
          onChange: this.onSelectedRowKeysChange,
          getCheckboxProps:this.props.disabled
        }



    return (
      <div>
        {JSON.stringify(toolbar)==="{}"?null:<Bottons toolbar={toolbar} ref="bottons" />}
        {scroll === false?(
          <Table
            title={title}
            style={style}
            size={size}
            onRow={this.onRow}
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            rowSelection={rowSelection}
            expandedRowRender={expandedRowRender}
            pagination={pagination}
            onChange={this.handleTableChange}
          />
          ):(
            <Table
              title={title}
              style={style}
              size={size}
              onRow={this.onRow}
              loading={loading}
              scroll={scroll}
              columns={columns}
              dataSource={dataSource}
              rowSelection={rowSelection}
              expandedRowRender={expandedRowRender}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
      )}

      </div>
    );
  }
}

AppTable.defaultProps = {
  style:{},
  click:()=>{}, //点击列执行的事件
  queryParams:()=>{}, //每次查询都会带上的数据
  url:null, //获取数据的地址
  deleteUrl:"", //数据删除的地址
  deleteKey:"", //获取删除时提示的key
  columns:[],  //展示的列,父级带入
  dataSource:[],  //展示的内容,动态获取
  scroll:{x:2000,y:500},  //定位表头滚动高度 {x:1000,y:1000}
  size:"middle",   //表格大小,default middle small
  loading:true,  //初始化是加载状态
  bordered:false,  //边框
  selectedRowKeys: [], //默认勾选的
  selectedRows:[],
  rowSelection:{}, //列对象
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
