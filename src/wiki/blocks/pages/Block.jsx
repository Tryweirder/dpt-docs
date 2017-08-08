import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, css} from 'aphrodite/no-important';

import * as API from '../../lib/api-client';
import { colors } from '../../css/const';

import Link from '../Link';
import Button from '../WButton/WButton';
import Select from '../Select';

const s = StyleSheet.create({
    block: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        position: 'relative',
        background: '#fff'
    },

    content: {
        flexGrow: 1,
        width: '100%',
        border: 'none'
    },

    head: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: '0 0 40px',
        color: '#666',
        background: colors.pane,
        padding: '0 20px 2px',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)',
        zIndex: 1,
        height: 40
    },

    group: {
        ':not(:first-of-type)': {
            marginLeft: 40
        },

        ':last-child': {
            flexGrow: 1,
            textAlign: 'right'
        }
    },

    label: {
        display: 'inline-block',
        marginRight: 7
    },

    snapshot: {
        display: 'inline-block',
        marginLeft: 15
    }
});

export default class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async loadBlockInfo(props) {
        let blockName = props.match.params.blockName;
        let libName = props.match.params.libName;

        let response = await API.blocks.get(libName, blockName);

        let platform = props.match.params.platform;

        if (platform === void 0) {
            platform = response.platforms.default || (response.platforms.only || [])[0] || 'desktop';
        }

        if (props.match.params.version === void 0) {
            this.goToVersion(response.current, platform);
        }

        this.setState({
            loaded: true,
            ...response
        });
    }

    goToVersion(nextVersion, nextPlatform) {
        let libName = this.props.match.params.libName;
        let blockName = this.props.match.params.blockName;
        let version = nextVersion || this.props.match.params.version;
        let platform = nextPlatform || this.props.match.params.platform || 'desktop';

        this.props.history.push(
            `/docs/libs/${libName}/${blockName}/${version}/${platform}`,
            null
        );
    }

    handleVersionChange = nextVersion => {
        this.goToVersion(nextVersion);
    }

    handlePlatformChange = nextPlatform => {
        this.goToVersion(null, nextPlatform);
    }

    handleLoad = event => {
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

    handleSnapshotClick = async event => {
        let blockName = this.props.match.params.blockName;
        let libName = this.props.match.params.libName;

        let response = await API.blocks.snapshot(libName, blockName);

        console.log(response);

        this.loadBlockInfo(this.props);
    }

    componentWillReceiveProps(nextProps) {
        let blockName = this.props.match.params.blockName;
        let libName = this.props.match.params.libName;

        let newBlockName = nextProps.match.params.blockName;
        let newLibName = nextProps.match.params.libName;

        if (newBlockName !== blockName || newLibName !== libName) {
            this.setState({ loaded: false });
            this.loadBlockInfo(nextProps);
        } else if (nextProps.match.params.version === void 0) {
            this.goToVersion(this.state.current);
        }
    }

    render() {
        if (this.state.loaded) {
            let version = this.props.match.params.version || this.state.current;
            let platform = this.props.match.params.platform || 'desktop';
            let src = `/blocks/${this.state.library}/${this.state.name}/${version}/${this.state.name}.md?platform=${platform}${this.props.location.hash}`;

            return <div className={css(s.block)}>
                <Head
                    path={this.state.path}
                    owner={this.state.owner}
                    currentPlatform={this.props.match.params.platform}
                    platforms={this.state.platforms}
                    onPlatformChange={this.handlePlatformChange}
                    versions={this.state.versions}
                    currentVersion={this.props.match.params.version}
                    onVersionChange={this.handleVersionChange}
                    onSnapshot={this.handleSnapshotClick}
                    docSrc={src}
                />
                <iframe className={css(s.content)} src={src} onLoad={this.handleLoad} />
            </div>
        } else {
            return <div></div>
        }
    }
}

function Head(props, context) {
    let githubUrl;

    if (context.depotConfig.repository) {
        githubUrl = context.depotConfig.repository + '/tree/master' +
            props.path + '/' + props.currentVersion;
    }

    return <div className={css(s.head)}>
        <Group>
            <Owner username={props.owner} />
        </Group>

        <Group>
            <Platforms
                onChange={props.onPlatformChange}
                current={props.currentPlatform}
                platforms={props.platforms}
            />
        </Group>

        <Group>
            <Versions
                versions={props.versions}
                current={props.currentVersion}
                onChange={props.onVersionChange}
                onSnapshotClick={props.onSnapshot}
            />
        </Group>

        {githubUrl &&
            <Group>
                <Link icon="/.core/assets/icons/favicon-github.png" href={githubUrl}>Show the code</Link>
            </Group>
        }

        <Group align="right">
            <Button external={true} icon="/.core/assets/icons/maximize.svg" href={props.docSrc} kind="clear" size="S" />
        </Group>

    </div>;
}

Head.contextTypes = {
    isLocal: PropTypes.bool,
    depotConfig: PropTypes.object
};

function Group(props) {
    return <div className={css(s.group)}>
        {props.children}
    </div>;
}

function Owner(props) {
    return <div className={css(s.owner)}>
        {props.username}
    </div>;
}

function Platforms(props) {
    let defaultPlatforms = ['desktop', 'tablet', 'mobile'];
    let platforms = props.platforms.only || defaultPlatforms;

    let options = platforms.map(p => {
        return <Select.Item value={p} key={p}>
            <span className={css(s.platform)}>{p}</span>
        </Select.Item>;
    });

    return <div className={css(s.platforms)}>
        <label className={css(s.label)}>
            Platform:
        </label>
        <Select size="S" value={props.current} onChange={props.onChange}>
            {options}
        </Select>
    </div>;
}

function Versions(props, context) {
    let hasNext = props.versions.includes('next');
    let snapshotButtonProps = {
        disabled: !hasNext,
        onClick: props.onSnapshotClick,
        size: 'S',
        title: !hasNext ? 'Block dosn\'t have next version' : null
    };

    let snapshotButton = <div className={css(s.snapshot)}>
        <Button {...snapshotButtonProps}>Freeze next version</Button>
    </div>;

    return <div className={css(s.versions)}>
        <label className={css(s.label)}>
            Version:
        </label>
        <Select size="S" value={props.current} onChange={props.onChange}>
            {props.versions.map(v =>
                <Select.Item value={v} key={v}>
                    {v}
                </Select.Item>
            )}
        </Select>
        {context.isLocal && snapshotButton}
    </div>;
}

Versions.contextTypes = {
    isLocal: PropTypes.bool
};
