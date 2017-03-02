import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import { createHistory } from 'history';

import Wiki from './components/js/w-wiki';
import Libs from './components/js/w-libs';
import Block from './components/js/w-block';
import Projects from './components/js/w-projects';

function WikiRouter(props) {
    return <Router history={createHistory()}>
        <Redirect from="/wiki" to="/wiki/libs" />
        <Route path='/wiki' component={Wiki}>
            <Route path='libs' component={Libs}>
                <Route path=':libName'>
                    <Route path=':blockName' component={Block}>
                        <Redirect from=":version" to=":version/desktop" />
                        <Route path=':version'>
                            <Route path=':platform' />
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route path='projects' component={Projects}>
                <Route path='*' />
            </Route>
        </Route>
    </Router>
}

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(<WikiRouter />, document.querySelector('#renderTarget'))
);
