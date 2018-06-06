import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';


class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type: "select",
          name:"payeeType",
          dic:"payee_type",
          label: "付款单位类型"
        },
        {
          type: "input",
          name:"payeeName",
          label: "付款单位"
        },
        {
          type: "Accounting",
          name:"proId",
          labelName: "proName",
          label: "工程名称"
        }
      ],
      columns : [
        { title: "K3工程编码", dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "累计付款金额", dataIndex: "sumPaidAmount"},
        { title: "累计已认证金额", dataIndex: "sumTaxamounts" },
        { title: "已认证金额与付款差额", dataIndex: "abs" },
        { title: "状态", dataIndex: "state",dic:"state_2" }
      ],
      toolbar:{
        delete:false
      }
    }

  }



  render(){
    let {search,columns,toolbar} = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/payment/showPayIncome"
          columns={columns}
          scroll={false}
          rowSelection={false}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
      </div>
    )
  }
}



export default List;
