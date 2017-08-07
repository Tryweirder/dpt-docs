import React from 'react';
import reqwest from 'reqwest';
import { StyleSheet, css } from 'aphrodite/no-important';

import Pane from '../Pane';
import Link from '../WLink/WLink';

const s = StyleSheet.create({
    libs: {
        display: 'flex',
        alignItems: 'stretch',
        flexGrow: 1,
        background: '320px center no-repeat'
    }
});

export default class Wiki extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            libraries: [],
            blocks: []
        };
    }

    static contextTypes = {
        depotConfig: React.PropTypes.object
    }

    loadLibrariesList() {
        return reqwest({
            url: '/api/wiki/libs'
        });
    }

    loadBlocksList(libraryName) {
        return reqwest({
            url: '/api/wiki/libs/' + libraryName
        });
    }

    async componentDidMount() {
        let blocks = [];
        let libraries = await this.loadLibrariesList();
        if (this.props.params.libName) {
            blocks = (await this.loadBlocksList(this.props.params.libName)).blocks;
        }

        this.setState({
            libraries, blocks, loaded: true
        });
    }

    async componentWillReceiveProps(nextProps) {
        let changes = {};
        let blockNames = this.state.blocks.map(b => b.name);
        if (
            nextProps.params.libName !== this.props.params.libName ||
            blockNames.indexOf(nextProps.params.blockName) < 0
        ) {
            changes.blocks = (await this.loadBlocksList(nextProps.params.libName)).blocks;
        }

        let libraryNames = this.state.libraries.map(l => l.name);
        if (libraryNames.indexOf(nextProps.params.libName) < 0) {
            changes.libraries = (await this.loadLibrariesList());
        }

        this.setState(changes);
    }

    render() {
        let libraries = this.state.libraries
            .filter(lib => !lib.hidden)
            .map(lib => ({
                title: lib.name,
                description: lib.title,
                href: '/wiki/libs/' + lib.name
            }));

        let blocks = this.state.blocks.map(block => ({
            title: block.name,
            description: block.title,
            deprecated: block.deprecated,
            href: '/wiki/libs/' + block.library + '/' + block.name
        }));

        let cover = this.context.depotConfig.cover;

        if (this.state.loaded) {
            return <div className={css(s.libs)} style={{
                backgroundImage: !this.props.children && cover && `url(${cover})`
            }}>
                {libraries.length > 0 && <Pane items={libraries} />}
                {blocks.length > 0 && this.props.params.libName && <Pane items={blocks} />}
                {this.props.children}
            </div>;
        } else {
            return <div className={css(s.libs)} />;
        }
    }
}
