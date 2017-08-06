import React from 'react';
import block from 'propmods';

import Link from '../WLink/WLink';
import Button from '../WButton/WButton';
import Select from '../Select';

import './WBlockHead.less';

let b = block('WBlockHead');

export default function BlockHead(props, context) {
    let githubUrl;

    if (context.depotConfig.repository) {
        githubUrl = context.depotConfig.repository + '/tree/master' +
        props.path + '/' + props.currentVersion;
    }

    return <div {...b(props)}>
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

BlockHead.contextTypes = {
    isLocal: React.PropTypes.bool,
    depotConfig: React.PropTypes.object
};

function Group(props) {
    return <div {...b('group', props)}>
        {props.children}
    </div>;
}

function Owner(props) {
    return <div {...b('owner')}>
        <span {...b('owner-name')}>
            {props.username}
        </span>
    </div>;
}

function Platforms(props) {
    let defaultPlatforms = ['desktop', 'tablet', 'mobile'];
    let platforms = props.platforms.only || defaultPlatforms;

    let options = platforms.map(p => {
        return <Select.Item value={p} key={p}>
            <span {...b('platform')}>{p}</span>
        </Select.Item>;
    });

    return <div {...b('platforms')}>
        <label {...b('label')}>
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

    let snapshotButton = <div {...b('snapshot-button')}>
        <Button {...snapshotButtonProps}>Freeze next version</Button>
    </div>;

    return <div {...b('versions')}>
        <label {...b('label')}>
            Version:
        </label>
        <Select size="S" value={props.current} onChange={props.onChange}>
            {props.versions.map(v =>
                <Select.Item value={v} key={v}>
                    {v}
                </Select.Item>
            )}
        </Select>
        { context.isLocal && snapshotButton }
    </div>;
}

Versions.contextTypes = {
    isLocal: React.PropTypes.bool
};
