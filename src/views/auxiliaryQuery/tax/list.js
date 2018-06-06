import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';
class List extends Component{

  constructor(){
    super(...arguments);

    this.state = {
      search: [
        // {
        //   type: "input",
        //   name: "proNo",
        //   label: "K3工程编码"
        // },
        {
          type: "input",
          name: "proName",
          label: "工程名称"
        }
      ],
      columns : [
        { title: "K3工程编码",dataIndex: "proNo"},
        { title: "工程名称",dataIndex: "proName"},
        { title: "内部单位", dataIndex: "area",dic:"area_sort"},
        { title: "计税方式", dataIndex: "taxsetMode",dic:"taxset_mode"},
        { title: "不含税金额(元)", dataIndex: "notaxinvAmount"},
        { title: "销项税额(元)", dataIndex: "taxAmount" },
        { title: "分包发票金额(元)", dataIndex: "taxamounts" },
        { title: "已预缴税额(元)", dataIndex: "actprepayAmount" },
        { title: "进项(元)", dataIndex: "intaxamounts" },
        { title: "进项转出(元)", dataIndex: "outtaxamounts" },
        { title: "鼓楼申报", dataIndex: "gulouUp" },
        { title: "城建税", dataIndex: "cityTax" },
        { title: "教附税", dataIndex: "eduTax" },
        { title: "是否鼓楼申报", dataIndex: "isgulou",dic:"isgulou_flag" },
      ]
    }

  }



  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns} = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/query/sumLedgerList"
          columns={columns}
          rowSelection={false}
          queryParams={()=>this.refs.search.getData()}
          ref="table"
        />
      </div>
    )
  }
}



export default List;
