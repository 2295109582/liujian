import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import FormModal from '@c/form/formModal';



class List extends Component{




  constructor(){
    super(...arguments);

    this.state = {
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
          name: "tradeCode",
          label: "行业类别编码",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "tradeName",
          label: "行业类别名称",
          rules: [{ required: true}]
        },
        {
          type: "textarea",
          name: "remarks",
          label: "备注信息"
        }
      ],
      search: [
        {
          type: "input",
          name: "tradeCode",
          label: "行业类别编码"
        },
        {
          type: "input",
          name: "tradeName",
          label: "行业类别名称"
        }
      ],
      columns : [
        { title: "行业类别编码",dataIndex: "tradeCode"},
        { title: "行业类别名称", dataIndex: "tradeName"},
        { title: "备注", dataIndex: "remarks"}
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
        view:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.view
        }
      }
    }

  }

  swiper = ()=>{
    this.refresh();
  }

  view = (selectedRowKeys,selectedRows, allData)=>{
    let row = selectedRows[0];
    let {form} = this.refs;
    let { data } = this.state;
    data.forEach((item,i)=>{
      data[i].readonly = true;
    })
    this.setState({data})
    form.setData({
      title:"查看行业类别"
    },row,true);
  }

  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    let {form} = this.refs;
    let { data } = this.state;
    data.forEach((item,i)=>{
      data[i].readonly = false;
    })
    this.setState({data:data});
    form.setData({
      title:"编辑行业类别"
    },row);
  }

  add = ()=>{
    let {form} = this.refs;
    let { data } = this.state;
    data.forEach((item,i)=>{
      data[i].readonly = false;
    })
    this.setState({data:data})
    form.show({
      title:"新增行业类别"
    });
  }




  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns,toolbar,data} = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/tradeCode/show"
          deleteUrl="/tradeCode/delete"
          deleteKey="tradeCode"
          scroll={false}
          columns={columns}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
        <FormModal
          ref="form"
          data={data}
          submitUrl="/tradeCode/add"
          updateUrl="/tradeCode/update"
          submitCallback={this.refresh}
        />
      </div>
    )
  }
}



export default List;
