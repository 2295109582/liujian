import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from "antd";

function MyLoadingComponent({ error, pastDelay }) {
  if (error) {
    return (<div style={{position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%,-50%)'}}>加载出错!</div>);
  } else if (pastDelay) {
    return (<Spin style={{position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%,-50%)'}}>加载中!</Spin>);
  } else {
    return null;
  }
}

export function AsyncComponent(loadComponent,props){
  const AppComponent = Loadable({
    loader: () => loadComponent,
    loading: MyLoadingComponent,
    delay:300
  });
  return <AppComponent {...props} />
}
