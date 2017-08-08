import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const s = StyleSheet.create({
    projects: {
        flexGrow: 1
    }
});

export default class Projects extends React.Component {
    handleLoad = event => {
        let routePath = '/docs';
        let projectPath = event.target.contentWindow.location.pathname;

        this.props.history.replaceState(null, routePath + projectPath);
    }

    shouldComponentUpdate(nextProps) {
        let currentProjectPath = this.refs.frame.contentWindow.location.pathname;
        let splat = this.props.match.params.splat;
        let nextSplat = nextProps.match.params.splat;
        let nextProjectPath = '/projects' + (nextSplat ? '/' + nextSplat : '');
        return currentProjectPath !== nextProjectPath;
    }

    render() {
        let splat = this.props.match.params.splat;
        let rnd = Math.round(Math.random() * 10000000);
        let path = '/projects' + (splat ? '/' + splat : '') + '?rnd=' + rnd;
        return <iframe ref='frame' className={css(s.projects)} src={path} onLoad={this.handleLoad} />
    }
}
