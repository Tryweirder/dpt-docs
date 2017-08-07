import React from 'react';
import block from 'propmods';
import reqwest from 'reqwest';

import Page from '../pages/Page';
import Link from '../WLink/WLink';
import Spinner from '../Spinner';
import Search from '../WSearch/WSearch';
import Modal from '../Modal';
import NewBlock from '../forms/NewBlock';
import NewLibrary from '../forms/NewLibrary';

import './WWiki.less';

let b = block('WWiki');

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
        isLocal: React.PropTypes.bool,
        depotConfig: React.PropTypes.object
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
            depotConfig = await this.loadDepotConfig();
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
        this.props.history.pushState(null, `/wiki/libs/${block.library}/${block.name}`);
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
        this.props.history.pushState(null, `/wiki/libs/${response.lib}/${response.block}/`);
    }

    handleNewLibrarySuccess = (response) => {
        this.handleNewLibraryFormClose();
        window.location = `/wiki/libs/${response.libname}/`;
    }

    loadDepotConfig() {
        return reqwest({
            url: '/api/wiki/config'
        });
    }

    render() {
        if (this.state.loaded) {
            return <Page>
                <div {...b()}>
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
                            currentLibrary={this.props.params.libName}
                            onSuccess={this.handleNewBlockSuccess}
                        />
                    </Modal>
                    <Modal padded open={this.state.newLibraryFormOpen} onClose={this.handleNewLibraryFormClose}>
                        <NewLibrary
                            currentLibrary={this.props.params.libName}
                            onSuccess={this.handleNewLibrarySuccess}
                        />
                    </Modal>
                    <div {...b('content')}>
                        { this.props.children }
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
    let pathname = props.history.createHref(props.location.pathname, props.location.query);
    let hash = props.location.hash;
    return <div {...b('head', {local: isLocal})}>
        <Head.Group main={true}>
            <div {...b('title')}><Link href="/wiki">{props.depotConfig.name || 'Депо'}</Link></div>
            <ul {...b('menu')}>
                <li {...b('menu-item')}><Link href='/wiki/libs'>Blocks</Link></li>
                <li {...b('menu-item')}><Link external href='/projects'>Projects</Link></li>
            </ul>
            <ul {...b('menu')}>
                <li {...b('menu-item')}>
                    <Search blocks={props.blocks} onSelect={props.onFindBlock} />
                </li>
            </ul>
            {
                isLocal &&
                <ul {...b('menu')}>
                    <li {...b('menu-item')}><Link href="#" onClick={props.onNewBlockClick}>Create Block</Link></li>
                    <li {...b('menu-item')}><Link href="#" onClick={props.onNewLibraryClick}>Create Library</Link></li>
                </ul>
            }
        </Head.Group>
        <Head.Group>
            <ul {...b('menu')}>
                { props.depotConfig.repository &&
                    <li {...b('menu-item')}>
                        <Link href={props.depotConfig.repository}>
                            GitHub
                        </Link>
                    </li>
                }
                { props.depotConfig.docs &&
                    <li {...b('menu-item')}>
                        <Link href={props.depotConfig.docs}>
                            Quick Start
                        </Link>
                    </li>
                }
            </ul>
            <ul {...b('menu')}>
                <li {...b('menu-item')}>
                    {
                        isLocal ?
                            props.depotConfig.url &&
                                <Link href={props.depotConfig.url + pathname + hash}>
                                    To Public Version
                                </Link>
                            :
                            props.depotConfig.port &&
                                <Link href={'http://localhost:' + props.depotConfig.port + pathname + hash}>
                                    To Local Version
                                </Link>
                    }
                </li>
            </ul>
        </Head.Group>
    </div>;
}

Head.Group = function(props) {
    let cn = b('head-group', { main: props.main });
    return <div {...cn}>
        {props.children}
    </div>;
};
