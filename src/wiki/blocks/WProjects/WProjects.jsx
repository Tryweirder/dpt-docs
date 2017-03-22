import React from 'react';
import block from 'propmods';

import './WProjects.less';

let b = block('WProjects');

export default class Projects extends React.Component {
    handleLoad(event) {
        let routePath = '/wiki';
        let projectPath = event.target.contentWindow.location.pathname;

        this.props.history.replaceState(null, routePath + projectPath);
    }

    shouldComponentUpdate(nextProps) {
        let currentProjectPath = this.refs.frame.contentWindow.location.pathname;
        let splat = this.props.params.splat;
        let nextSplat = nextProps.params.splat;
        let nextProjectPath = '/projects' + (nextSplat ? '/' + nextSplat : '');
        return currentProjectPath !== nextProjectPath;
    }

    render() {
        let splat = this.props.params.splat;
        let rnd = Math.round(Math.random() * 10000000);
        let path = '/projects' + (splat ? '/' + splat : '') + '?rnd=' + rnd;
        return <iframe ref='frame' {...b()} src={path} onLoad={this.handleLoad.bind(this)} />
    }
}
