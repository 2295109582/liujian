import React from 'react';

const asyncComponent = loadComponent => (
    class AsyncComponent extends React.Component {
        state = {
            Component: null,
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({ Component });
                    this.c = this.refs.c;
                })
                .catch((err) => {
                    console.error(`无法在<AsyncComponent />中加载组件`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props} ref="c" /> : null;
        }
    }
);

//用户查询组件
export const User = asyncComponent(() => import(/* webpackChunkName: "components/query/user" */'@c/query/user'));
