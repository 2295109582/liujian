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
        name: "taxrate",
        label: "税率值(%)",
        rules: [{ required: true}]
      },
      {
        type: "datePicker",
        name: "effectDate",
        label: "生效时间",
        rules: [{ required: true}]
      },
      {
        type: "datePicker",
        name: "invalidDate",
        label: "失效时间",
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
          type:"input",
          name: "taxrate",
          label: "进项税率值"
        }
      ],
      columns : [
        { title: "序号",dataIndex: "taxType"},
        { title: "税率值(%)", dataIndex: "taxrate"},
        { title: "生效标志", dataIndex: "effectFlag"},
        { title: "生效时间", dataIndex: "effectDate"},
        { title: "失效时间", dataIndex: "invalidDate"}
      ],
      action:{
        edit:this.edit,
        view:this.view,
        delete:false
      },
      toolbar : {
        add:{
          visible: () => true,
          click:this.add
        },
        delete:false
      }
    }

  }

  view = (data)=>{
    let {form} = this.refs;
    form.setData({
      title:"查看销项税率"
    },data,true);
  }

  edit = (data) =>{
    let {form} = this.refs;
    form.setData({
      title:"编辑进项税率"
    },data);
  }


  add = ()=>{
    let {form} = this.refs;
    form.show({
      title:"新增进项税率"
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
          url="/entrTaxrate/show"
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
          submitUrl="/entrTaxrate/add"
          updateUrl="/entrTaxrate/update"
          submitCallback={this.refresh}
        />
      </div>
    )
  }
}



export default List;
