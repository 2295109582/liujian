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
        name: "taxType",
        label: "计税方式",
        rules: [{ required: true}]
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
          type:"select",
          options:[
            {value:1,label:"简易"},
            {value:2,label:"一般"}
          ],
          name: "taxType",
          label: "计税方式"
        }
      ],
      columns : [
        { title: "计税方式",dataIndex: "taxType"},
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
      title:"编辑销项税率"
    },data);
  }


  add = ()=>{
    let {form} = this.refs;
    form.show({
      title:"新增销项税率"
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
          url="/salesTaxrate/show"
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
          submitUrl="/salesTaxrate/add"
          updateUrl="/salesTaxrate/update"
          submitCallback={this.refresh}
        />
      </div>
    )
  }
}



export default List;
