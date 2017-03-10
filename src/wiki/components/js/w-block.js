import React from 'react';
import block from 'propmods';
import reqwest from 'reqwest';

import Head from './w-block-head';

import '../css/w-block.less';

let b = block('w-block');

export default class Doc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async loadBlockInfo(props) {
        let blockName = props.params.blockName;
        let libName = props.params.libName;

        let response = await reqwest({
            url: '/api/wiki/libs/' + libName + '/' + blockName
        });

        let platform = props.params.platform;

        if (platform === void 0) {
            platform = response.platforms.default || (response.platforms.only || [])[0] || 'desktop';
        }

        if (props.params.version === void 0) {
            this.goToVersion(response.current, platform);
        }

        this.setState({
            loaded: true,
            ...response
        });
    }

    goToVersion(nextVersion, nextPlatform) {
        let libName = this.props.params.libName;
        let blockName = this.props.params.blockName;
        let version = nextVersion || this.props.params.version;
        let platform = nextPlatform || this.props.params.platform || 'desktop';

        this.props.history.pushState(
            null,
            `/wiki/libs/${libName}/${blockName}/${version}/${platform}`
        );
    }

    handleVersionChange(nextVersion) {
        this.goToVersion(nextVersion);
    }

    handlePlatformChange(nextPlatform) {
        this.goToVersion(null, nextPlatform);
    }

    handleLoad(event) {
        event.target.contentWindow.addEventListener('keydown', (event) => {
            window.dispatchEvent(new KeyboardEvent('keydown', event))
        });

        event.target.contentWindow.addEventListener('click', (event) => {
            window.dispatchEvent(new MouseEvent('click', event))
        });
    }

    componentDidMount() {
        this.loadBlockInfo(this.props);
    }

    async handleSnapshotClick(event) {
        event.preventDefault();
        let blockName = this.props.params.blockName;
        let libName = this.props.params.libName;

        let response = await reqwest({
            url: `/api/wiki/libs/${libName}/${blockName}/snapshot`,
            method: 'POST'
        });

        console.log(response);

        this.loadBlockInfo(this.props);
    }

    componentWillReceiveProps(nextProps) {
        let blockName = this.props.params.blockName;
        let libName = this.props.params.libName;

        let newBlockName = nextProps.params.blockName;
        let newLibName = nextProps.params.libName;

        if (newBlockName !== blockName || newLibName !== libName) {
            this.setState({ loaded: false });
            this.loadBlockInfo(nextProps);
        } else if (nextProps.params.version === void 0) {
            this.goToVersion(this.state.current);
        }
    }

    render() {
        if (this.state.loaded) {
            let version = this.props.params.version || this.state.current;
            let platform = this.props.params.platform || 'desktop';
            let src = `/blocks/${this.state.library}/${this.state.name}/${version}/${this.state.name}.md?platform=${platform}${this.props.location.hash}`;

            let deprecationMessage = this.state.deprecated ?
                this.state.deprecated.message ||
                    'Block is depricated'
                : null;

            return <div {...b({deprecated: this.state.deprecated !== void 0})}>
                <Head
                    path={this.state.path}
                    owner={this.state.owner}
                    currentPlatform={this.props.params.platform}
                    platforms={this.state.platforms}
                    onPlatformChange={this.handlePlatformChange.bind(this)}
                    versions={this.state.versions}
                    currentVersion={this.props.params.version}
                    onVersionChange={this.handleVersionChange.bind(this)}
                    onSnapshot={this.handleSnapshotClick.bind(this)}
                    docSrc={src}
                />
                {
                    this.state.deprecated &&
                    <div
                        {...b('deprecation-message')}
                        dangerouslySetInnerHTML={{__html: deprecationMessage}}
                    />
                }
                <iframe {...b('content')} src={src} onLoad={this.handleLoad.bind(this)} />
            </div>
        } else {
            return <div></div>
        }
    }
}
