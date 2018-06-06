import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

import FormModal from '@c/form/formModal';



class List extends Component{




  constructor(){
    super(...arguments);

    this.position = [];

    this.state = {
      data:[
        {
          type: "select",
          options:this.position,
          name: "parentId",
          label: "上级职位名称",
        },
        {
          type: "input",
          name: "positionName",
          label: "职位名称",
          rules: [{ required: true}]
        },
        {
          type: "input",
          name: "positionDescribe",
          label: "职位描述"
        }
      ],
      search: [
        {
          type: "input",
          name: "positionName",
          label: "职位名称"
        }
      ],
      columns : [
        { title: "职位名称",dataIndex: "positionName"},
        { title: "上级职位名称", dataIndex: "leadName"},
        { title: "职位描述", dataIndex: "positionDescribe"}
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

  componentDidMount(){
    window.uc.axios.post("/role/showAllLead").then((data)=>{
      if(data.status === 200){
        data.data.forEach((item,i)=>{
          this.position.push({value:`${item.leaderId}`,label:`${item.leaderName}`})
        })
      }
    })
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
      title:"查看职位"
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
      title:"编辑职位"
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
      title:"新增职位"
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
          url="/role/showPosition"
          // deleteUrl="/tradeCode/delete"
          // deleteKey="tradeCode"
          scroll={false}
          columns={columns}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
        <FormModal
          ref="form"
          data={data}
          submitUrl="/role/addPosition"
          updateUrl="/role/addPosition"
          submitCallback={this.refresh}
        />
      </div>
    )
  }
}



export default List;
