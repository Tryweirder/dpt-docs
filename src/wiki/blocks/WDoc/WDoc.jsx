import React from 'react';
import ReactDOM from 'react-dom';

import block from 'propmods';

import Example from '../WExample/WExample';
import Markdown from '../WMarkdown/WMarkdown';
import TOC from '../TOC';

if (process.env.BROWSER) {
    var cookie = require('cookie_js').cookie;
    cookie.expiresMultiplier = 1;
    require('./WDoc.less');
}

const b = block('WDoc');

class Renderer extends Markdown.Renderer {
    code(props) {
        if (props.lang.match(/^bml/)) {
            return <Example lang={props.lang} platform={props.platform} code={props.value} />;
        } else {
            return super.code(props);
        }
    }

    example(props) {
        return <Example {...props} code={props.value} />;
    }

    link(props) {
        return React.createElement('a', {target: '_blank', ...props});
    }
}

const renderer = new Renderer();

export default class Doc extends React.Component {
    componentDidMount() {
        window.addEventListener('beforeunload', function(e) {
            cookie.set('scrollPosition', window.scrollY, {
                expires: 15
            });
        });
    }

    render() {
        let tocTokens = this.props.ast.children.filter(t =>
            t.type === 'heading' &&
            t.depth > 1 &&
            t.depth < 4
        );
        return <div {...b(this)}>
            <TOC {...b('toc')} tokens={tocTokens} />
            <Markdown {...b('content')} ast={this.props.ast} renderer={renderer} />
        </div>;
    }
}

if (typeof window !== 'undefined') {
    window.React = React;
    window.ReactDOM = ReactDOM;
    window.Doc = Doc;
}
