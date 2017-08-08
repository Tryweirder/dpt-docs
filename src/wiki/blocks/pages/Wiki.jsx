import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Route, Redirect } from 'react-router-dom';

import * as API from '../../lib/api-client';

import Libs from './Libs';
import Page from './Page';

import Link from '../Link';
import Spinner from '../Spinner';
import Search from '../Search';
import Modal from '../Modal';
import NewBlock from '../forms/NewBlock';
import NewLibrary from '../forms/NewLibrary';

const headHeight = 40;
const headColor = 'rgba(255, 255, 255, 0.8)';

const s = StyleSheet.create({
    wiki: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },

    head: {
        display: 'flex',
        alignItems: 'center',
        height: headHeight,
        color: headColor,
        flexGrow: 0,
        flexShrink: 0,
        padding: '0 20px 2px',
        bloxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08)'
    },

    head_external: {
        background: '#333338'
    },

    head_local: {
        background: '#962c2c'
    },

    title: {
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#fc0'
    },

    content: {
        display: 'flex',
        flex: `0 1 calc(100% - ${headHeight}px)`,
        alignItems: 'stretch'
    },

    headGroup: {
        display: 'flex',
        alignItems: 'center',
    },

    headGroup_main: {
        flexGrow: 1
    },

    menu: {
        ':not(:first-child)': {
            marginLeft: 40
        }
    },

    menuItem: {
        display: 'inline-block',
        marginLeft: 20
    },

    link: {
        color: 'rgba(255, 255, 255, 0.8)',

        ':hover': {
            color: 'rgba(255, 255, 255, 0.9)'
        }
    },

    link_active: {
        color: '#fc0 !important',

        ':hover': {
            color: '#fff5cc !important'
        }
    }
});

export default class Wiki extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            newBlockFormOpen: false,
            newLibraryFormOpen: false,
            depotConfig: {}
        };
    }

    static childContextTypes = {
        isLocal: PropTypes.bool,
        depotConfig: PropTypes.object
    };

    getChildContext() {
        return {
            isLocal: window.location.hostname === 'localhost',
            depotConfig: this.state.depotConfig
        };
    }

    async componentDidMount() {
        let depotConfig;

        try {
            depotConfig = await API.depotConfig.get();
        } catch (e) {
            console.error('Could not load Depot config. Check config.yaml file at the root of your Depot.');
            return;
        }

        this.setState({
            loaded: true,
            depotConfig
        });
    }

    handleFindBlock = (block) => {
        this.props.history.pushState(null, `/docs/libs/${block.library}/${block.name}`);
    }

    handleNewBlockClick = () => {
        this.setState({
            newBlockFormOpen: true
        });
    }

    handleNewLibraryClick = () => {
        this.setState({
            newLibraryFormOpen: true
        });
    }

    handleNewBlockFormClose = () => {
        this.setState({
            newBlockFormOpen: false
        });
    }

    handleNewLibraryFormClose = () => {
        this.setState({
            newLibraryFormOpen: false
        });
    }

    handleNewBlockSuccess = (response) => {
        this.handleNewBlockFormClose();
        this.props.history.pushState(null, `/docs/libs/${response.lib}/${response.block}/`);
    }

    handleNewLibrarySuccess = (response) => {
        this.handleNewLibraryFormClose();
        window.location = `/docs/libs/${response.libname}/`;
    }

    render() {
        if (this.state.loaded) {
            return <Page>
                <div className={css(s.wiki)}>
                    <Head
                        depotConfig={this.state.depotConfig}
                        location={this.props.location}
                        history={this.props.history}
                        blocks={this.state.blocks}
                        onFindBlock={this.handleFindBlock}
                        onNewBlockClick={this.handleNewBlockClick}
                        onNewLibraryClick={this.handleNewLibraryClick}
                    />
                    <Modal padded open={this.state.newBlockFormOpen} onClose={this.handleNewBlockFormClose}>
                        <NewBlock
                            currentLibrary={this.props.match.params.libName}
                            onSuccess={this.handleNewBlockSuccess}
                        />
                    </Modal>
                    <Modal padded open={this.state.newLibraryFormOpen} onClose={this.handleNewLibraryFormClose}>
                        <NewLibrary
                            currentLibrary={this.props.match.params.libName}
                            onSuccess={this.handleNewLibrarySuccess}
                        />
                    </Modal>
                    <div className={css(s.content)}>
                        <Route exact path='/docs' render={() =>
                            <Redirect to="/docs/libs" />
                        } />
                        <Route path='/docs/libs/:libName?' component={Libs} />
                    </div>
                </div>
            </Page>;
        } else {
            return <Spinner />;
        }
    }
}

function Head(props) {
    let isLocal = window.location.hostname === 'localhost';
    let pathname = props.history.createHref(props.location);
    let hash = props.location.hash;
    const linkMixins = {
        mixClassName: s.link,
        activeClassName: css(s.link_active)
    };

    return <div className={css(s.head, isLocal ? s.head_local : s.head_external)}>
        <Head.Group main={true}>
            <div className={css(s.title)}><Link {...linkMixins} href="/docs">{props.depotConfig.name || 'Депо'}</Link></div>
             <ul className={css(s.menu)}>
                <li className={css(s.menuItem)}><Link {...linkMixins} href='/docs/libs'>Blocks</Link></li>
                <li className={css(s.menuItem)}><Link {...linkMixins} external href='/projects'>Projects</Link></li>
            </ul>
            <ul className={css(s.menu)}>
                <li className={css(s.menuItem)}>
                    <Search blocks={props.blocks} onSelect={props.onFindBlock} />
                </li>
            </ul>
            {
                isLocal &&
                <ul className={css(s.menu)}>
                    <li className={css(s.menuItem)}><Link {...linkMixins} href="#" onClick={props.onNewBlockClick}>Create Block</Link></li>
                    <li className={css(s.menuItem)}><Link {...linkMixins} href="#" onClick={props.onNewLibraryClick}>Create Library</Link></li>
                </ul>
            } 
        </Head.Group>
         <Head.Group>
            <ul className={css(s.menu)}>
                {props.depotConfig.repository &&
                    <li className={css(s.menuItem)}>
                        <Link {...linkMixins} href={props.depotConfig.repository}>
                            GitHub
                        </Link>
                    </li>
                }
                {props.depotConfig.docs &&
                    <li className={css(s.menuItem)}>
                        <Link {...linkMixins} href={props.depotConfig.docs}>
                            Quick Start
                        </Link>
                    </li>
                }
            </ul>
            <ul className={css(s.menu)}>
                <li className={css(s.menuItem)}>
                    {
                        isLocal ?
                            props.depotConfig.url &&
                            <Link {...linkMixins} href={props.depotConfig.url + pathname + hash}>
                                To Public Version
                                </Link>
                            :
                            props.depotConfig.port &&
                            <Link {...linkMixins} href={'http://localhost:' + props.depotConfig.port + pathname + hash}>
                                To Local Version
                                </Link>
                    }
                </li>
            </ul>
        </Head.Group> 
    </div>;
}

Head.Group = function (props) {
    return <div className={css(s.headGroup, props.main && s.headGroup_main)}>
        {props.children}
    </div>;
};
