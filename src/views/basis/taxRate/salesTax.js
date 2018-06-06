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
        { title: "计税方式",dataIndex: "taxType",dic:"taxset_mode"},
        { title: "税率值(%)", dataIndex: "taxrate"},
        { title: "生效标志", dataIndex: "effectFlag",dic:"effect_flag"},
        { title: "生效时间", dataIndex: "effectDate"},
        { title: "失效时间", dataIndex: "invalidDate"}
      ],
      toolbar : {
        salesTaxAdd:{
          visible: () => true,
          click:this.add
        },
        salesTaxEdit:{
          visible: (selectedRowKeys) => selectedRowKeys.length === 1,
          click:this.edit
        },
        salesTaxView:{
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
          type:"select",
          dic:"taxset_mode",
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
    data[2].readonly = true;
    this.setState({data:data});
    form.setData({
      title:"编辑销项税率"
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
      title:"新增销项税率"
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
          url="/salesTaxrate/show"
          scroll={false}
          columns={columns}
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
