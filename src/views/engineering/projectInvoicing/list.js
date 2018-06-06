import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';

class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
        {
          type: "OwnerUnit",
          name:"ownerId",
          labelName: "ownerName",
          label: "业主单位"
        },
        {
          type: "Accounting",
          name:"proId",
          labelName: "proName",
          label: "工程名称"
        }
      ],
      columns : [
        { title: "业主单位",dataIndex: "ownerName"},
        { title: "K3工程编码", dataIndex: "proNo"},
        { title: "工程名称", dataIndex: "proName"},
        { title: "累计收款金额", dataIndex: "saleinvSum"},
        { title: "累计已开票金额", dataIndex: "recSum" },
        { title: "开票与收款差额", dataIndex: "abs" },
        { title: "状态", dataIndex: "state",dic:"state_1"}
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
          url="/receipt/sumReceiptInvoice"
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
