import React,{Component} from 'react';
import Table from "@c/table";
import Search from '@c/search';
import FormModal from '@c/form/formModal';
import { Modal,Tree,Alert,message  } from 'antd';

import { permissionData } from '@/routers/menuRoute';

const TreeNode = Tree.TreeNode;

class Permission extends Component{


    constructor(){
      super(...arguments);



      this.state = {
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: {checked: [], halfChecked: []},
        selectedKeys: [],
        spinning:true,
        loading:false
      }
    }


    onExpand = (expandedKeys) => {
      //如果未将autoExpandParent设置为false，如果子项展开，则父项不能折叠。
       //或者，您可以删除所有展开的子项。
      this.setState({
        expandedKeys,
        autoExpandParent: false,
      });
    }
    onCheck = (checkedKeys) => {
      console.log('onCheck', checkedKeys);
      this.setState({ checkedKeys });
    }
    onSelect = (selectedKeys, info) => {
      this.setState({ selectedKeys });
    }
    renderTreeNodes = (data) => {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} />;
      });
    }

    componentWillReceiveProps(nextProps){
        let { data } = nextProps;
        let { permission } = data;
        permission = permission===undefined?"":permission;

        permission = permission.split(",");
        this.setState({
          checkedKeys:{checked: permission, halfChecked: []}
        })

    }



    handleOk = ()=>{
      let { handleOk,data } = this.props;
      let { checkedKeys } = this.state;
      let { checked } = checkedKeys;

      this.setState({loading:true});

      window.uc.axios.post("/role/rolePermission",{
        id:data.id,
        permission:checked
      }).then((data)=>{
        if(data.status === 200){
          message.info(`${data.msg},重新登录后生效！`);
          this.setState({loading:false})
          handleOk(checked);
        }
      }).catch(()=>{
        this.setState({loading:false})
      })


    }

  render(){



    let { loading } = this.state;
    let { visible,handleCancel } = this.props;
    return(
      <Modal
        title="权限控制"
        wrapClassName="vertical-center-modal"
        destroyOnClose={true}
        maskClosable={false}
        confirmLoading={loading}
        visible={visible}
        onOk={this.handleOk}
        onCancel={handleCancel}
        >
          <Alert message="父级是页面进入权限，最下级是页面操作权限" type="info" />
          <Tree
            checkable={true}
            defaultExpandAll={true}
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkStrictly={true}
            showLine={true}
            checkedKeys={this.state.checkedKeys}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(permissionData)}
          </Tree>


      </Modal>
    )

  }
}



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
          name: "roleName",
          label: "角色名称",
          rules: [{ required: true}]
        },
        {
          type: "textarea",
          name: "roleDetail",
          label: "角色描述"
        }
      ],
      search: [
        {
          type: "input",
          name: "roleName",
          label: "角色名称"
        },
        {
          type: "input",
          name: "roleDetail",
          label: "角色描述"
        }
      ],
      columns : [
        { title: "角色名称", dataIndex: "roleName"},
        { title: "角色描述", dataIndex: "roleDetail"},
        { title: "创建时间", dataIndex: "createDate"},
        { title: "权限控制", dataIndex: "action",render:(text,row)=>{
          return (<a title="点击分配权限" onClick={()=>this.permission(row)}>分配权限</a>)
        }},
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
      },
      visible:false,
      row:{}
    }

  }

  permission = (row)=>{
    this.setState({visible:true,row})
  }

  handleOk = (data)=>{
    this.setState({visible:false})
    this.refresh();
  }

  handleCancel = ()=>{
    this.setState({visible:false})
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
      title:"查看角色"
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
      title:"编辑角色"
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
      title:"新增角色"
    });
  }




  refresh = ()=>{
    this.refs.table.refresh();
  }

  render(){
    let {search,columns,toolbar,data} = this.state;


    let { visible,row,checked } = this.state;

    return(
      <div className="content">
        <Search data={search} ref="search" click={()=>this.refs.table.refresh()} />
        <Table
          url="/role/showRole"
          deleteUrl="/role/delete"
          deleteKey="role"
          scroll={false}
          columns={columns}
          queryParams={()=>this.refs.search.getData()}
          toolbar={toolbar}
          ref="table"
        />
        <FormModal
          ref="form"
          data={data}
          submitUrl="/role/add"
          updateUrl="/role/update"
          submitCallback={this.refresh}
        />
        <Permission
          data={row}
          checked={checked}
          visible={visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
         />
      </div>
    )
  }
}



export default List;
