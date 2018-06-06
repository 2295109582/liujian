import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import FormModal from '@c/form/formModal';




class List extends Component{


  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type:"input",
          name: "taxrate",
          label: "预征率值"
        }
      ],
      columns : [
        { title: "税率值(%)", dataIndex: "taxrate"},
        { title: "生效标志", dataIndex: "effectFlag",dic:"effect_flag"},
        { title: "生效时间", dataIndex: "effectDate"},
        { title: "失效时间", dataIndex: "invalidDate"}
      ],
      toolbar : {
        preTaxAdd:{
          visible: () => true,
          click:this.add
        },
        preTaxEdit:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.edit
        },
        preTaxView:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.view
        },
        delete:false
      },
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
      title:"查看销项税率"
    },row,true);
  }


  edit = (selectedRowKeys,selectedRows, allData) =>{
    let row = selectedRows[0];
    let {form} = this.refs;
    let { data } = this.state;
    data.forEach((item,i)=>{
      data[i].readonly = false;
    })
    data[1].readonly = true;
    this.setState({data:data});
    form.setData({
      title:"编辑进项税率"
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
      title:"新增进项税率"
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
          url="/preTaxrate/show"
          scroll={false}
          columns={columns}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
        <FormModal
          ref="form"
          data={data}
          submitUrl="/preTaxrate/add"
          updateUrl="/preTaxrate/update"
          submitCallback={this.refresh}
        />
      </div>
    )
  }
}



export default List;
