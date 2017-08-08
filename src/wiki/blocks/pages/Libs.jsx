import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Route } from 'react-router-dom';

import * as API from '../../lib/api-client';

import Block from './Block';
import Pane from '../Pane';
import Link from '../Link';

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
        depotConfig: PropTypes.object
    }

    async componentDidMount() {
        let blocks = [];
        let libraries = await API.libraries.list();
        if (this.props.match.params.libName) {
            blocks = (await API.blocks.byLibrary(this.props.match.params.libName)).blocks;
        }
        this.setState({
            libraries, blocks, loaded: true
        });
    }

    async componentWillReceiveProps(nextProps) {
        let changes = {};
        let blockNames = this.state.blocks.map(b => b.name);
        if (
            nextProps.match.params.libName !== this.props.match.params.libName ||
            blockNames.indexOf(nextProps.match.params.blockName) < 0
        ) {
            changes.blocks = (await API.blocks.byLibrary(nextProps.match.params.libName)).blocks;
        }

        let libraryNames = this.state.libraries.map(l => l.name);
        if (libraryNames.indexOf(nextProps.match.params.libName) < 0) {
            changes.libraries = (await API.libraries.list());
        }

        this.setState(changes);
    }

    render() {
        let libraries = this.state.libraries
            .filter(lib => !lib.hidden)
            .map(lib => ({
                title: lib.name,
                description: lib.title,
                href: '/docs/libs/' + lib.name
            }));

        let blocks = this.state.blocks.map(block => ({
            title: block.name,
            description: block.title,
            deprecated: block.deprecated,
            href: '/docs/libs/' + block.library + '/' + block.name
        }));

        let cover = this.context.depotConfig.cover;

        if (this.state.loaded) {
            return <div className={css(s.libs)} style={{
                backgroundImage: !this.props.children && cover && `url(${cover})`
            }}>
                {libraries.length > 0 && <Pane items={libraries} />}
                {blocks.length > 0 && this.props.match.params.libName && <Pane items={blocks} />}
                 <Route path='/docs/libs/:libName/:blockName/:version?/:platform?' component={Block} /> 
            </div>;
        } else {
            return <div className={css(s.libs)} />;
        }
    }
}
