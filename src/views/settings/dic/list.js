import React,{Component} from 'react';

import Table from "@c/table";
import Search from '@c/search';

import FormModal from '@c/form/formModal';



class List extends Component{


  info = {
    data:[
      {
        type: "input",
        name: "id",
        label: "id",
        readonly:true,
        visible:false
      },
      {
        type: "input",
        name: "code",
        label: "字典类别",
        rules: [{ required: true}],
        placeholder:"例如:is_default"
      },
      {
        type: "input",
        name: "name",
        label: "字典描述",
        rules: [{ required: true}],
        placeholder:"例如:是否默认"
      }
    ]
  }

  dic = {
    dicData:[
      {
        type: "input",
        name: "id",
        label: "id",
        readonly:true,
        visible:false
      },
      {
        type: "input",
        name: "code",
        label: "键值",
        rules: [{ required: true}],
        placeholder:"例如:0"
      },
      {
        type: "input",
        name: "name",
        label: "标签",
        rules: [{ required: true}],
        placeholder:"例如:否"
      }
    ]
  }

  constructor(){
    super(...arguments);

    this.dicIndex = 0 ;
    this.dicTable = {};
    this.state = {
      search: [
        {
          type: "input",
          name: "code",
          label: "字典类别"
        },
        {
          type: "input",
          name: "name",
          label: "字典描述"
        }
      ],
      columns : [
        { title: "字典类别",dataIndex: "code",render:text=><a>{text}</a>},
        { title: "字典描述", dataIndex: "name"},
        { title: "添加键值", dataIndex: "action",render:(text,row)=>{
          return (
            <a onClick={()=>{
                this.addDic(row)
              }}>分配键值
            </a>
          )
        }},
      ],
      toolbar : {
        add:{
          visible: () => true,
          click:this.add
        },
        edit:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.edit
        },
      }
    }

  }


  setDicTable = (element,id)=>{
    this.dicIndex = id;
    this.dicTable[`dic${this.dicIndex}`] = element;
  }


  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    let {form} = this.refs;
    form.setData({
      title:"编辑数据字典"
    },row);
  }


  add = ()=>{
    let {form} = this.refs;
    form.show({
      title:"新增数据字典"
    });
  }


  editDic = (data)=>{
    let {dicform} = this.refs;
    dicform.setData({
      title:"编辑键值"
    },data);
  }

  addDic = (data)=>{
    this.dicIndex = data.id;
    let {dicform} = this.refs;
    dicform.show({
      title:"新增键值",
      params:{
        id:data.id
      }
    });
  }

  createTable = (row)=>{
    let columns = [
      { title: "标签",dataIndex: "name"},
      { title: "键值", dataIndex: "code"},
      { title: "添加键值", dataIndex: "code",render:(text,row)=>{
        return (
          <a onClick={()=>{
              this.editDic(row)
            }}>
            分配键值
          </a>
        )
      }},
    ];
    return (
      <Table
        url="/dic/showChlds"
        scroll={false}
        deleteUrl="/dic/deleteChld"
        deleteKey="name"
        size="small"
        columns={columns}
        rowSelection={false}
        pagination={false}
        queryParams={()=>({id:row.id})}
        ref={(element)=>this.setDicTable(element,row.id)}
      />
    )
  }

  refresh = ()=>{
    this.refs.table.refresh();
  }

  dicRefresh = ()=>{
    if (this.dicTable[`dic${this.dicIndex}`]){
      this.dicTable[`dic${this.dicIndex}`].refresh();
    };
  }

  render(){
    let {search,columns,toolbar} = this.state;
    let {data} = this.info;
    let {dicData} = this.dic;
    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/dic/showAllParents"
          scroll={false}
          columns={columns}
          deleteUrl="/dic/deleteParent"
          deleteKey="id"
          expandedRowRender={this.createTable}
          pagination={false}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
        <FormModal
          ref="form"
          data={data}
          submitUrl="/dic/addParent"
          updateUrl="/dic/editParent"
          submitCallback={this.refresh}
        />
        <FormModal
          ref="dicform"
          data={dicData}
          submitUrl="/dic/addChid"
          updateUrl="/dic/editChld"
          submitCallback={this.dicRefresh}
        />
      </div>
    )
  }
}



export default List;
