import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Wiki from './blocks/pages/Wiki';

function WikiRouter(props) {
    return <BrowserRouter>
        <Route path='/wiki' component={Wiki} />
    </BrowserRouter>;
}

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(<WikiRouter />, document.querySelector('#renderTarget'))
);
