import React,{Component} from 'react';

import './index.css';

class Title extends Component{
  render(){
    return(
      <span className="Title">{this.props.children}</span>
    )
  }
}


export default Title;
