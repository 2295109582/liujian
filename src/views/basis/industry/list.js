import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import FormModal from '@c/form/formModal';

import { Divider} from 'antd';


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
    ]
  }

  constructor(){
    super(...arguments);

    this.state = {
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
        {title: "行业类别编码",dataIndex: "tradeCode"},
        { title: "行业类别名称", dataIndex: "tradeName"},
        { title: "备注", dataIndex: "remarks"}
      ],
      action:{
        edit:this.edit,
        view:this.view
      },
      toolbar : {
        add:{
          visible: () => true,
          click:this.add
        }
      }
    }

  }

  view = (data)=>{
    let {form} = this.refs;
    form.setData({
      title:"查看行业类别"
    },data,true);
  }

  edit = (data) =>{
    let {form} = this.refs;
    form.setData({
      title:"编辑行业类别"
    },data);
  }


  add = ()=>{
    let {form} = this.refs;
    form.show({
      title:"新增行业类别"
    });
  }


  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns,action,toolbar} = this.state;
    let {data} = this.info;
    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/tradeCode/show"
          deleteUrl="/tradeCode/delete"
          deleteKey="tradeCode"
          scroll={false}
          columns={columns}
          action={action}
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
