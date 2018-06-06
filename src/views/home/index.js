import React, {Component} from 'react';


class Home extends Component {


  componentDidMount(){
    let { iframe } = this;
    iframe.addEventListener('load',()=>{
      //console.log(iframe.contentWindow.document)
    })
  }


  render() {
    return(
      <div>
        <iframe ref={el=>this.iframe=el} width="100%" title="六建" height="2800px" style={{border:"none"}}  src="http://www.fjljg.com.cn/index.aspx" />
      </div>
    )
  }
}

export default Home;
