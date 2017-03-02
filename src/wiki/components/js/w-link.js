import React from 'react';
import * as Router from 'react-router';

import block from 'propmods';

import '../css/w-link.less';

let b = block('w-link');

export default class Link extends React.Component {
    static propTypes = {
        href: React.PropTypes.string.isRequired
    };

    isExternal() {
        let r = new RegExp('^(?:[a-z]+:)?//', 'i');
        return this.props.external || r.test(this.props.href);
    }

    render() {
        let cn = b({'has-icon': this.props.icon !== void 0});
        let style = {};
        if (this.props.icon) {
            style.backgroundImage = 'url(' + this.props.icon + ')';
        }

        if (this.isExternal()) {
            return <a {...cn} {...this.props}>
                <div {...b('icon')} style={style} />
                {this.props.children}
            </a>
        } else {
            return <Router.Link {...cn} activeClassName="w-link_active" to={this.props.href} {...this.props}>
                <div {...b('icon')} style={style} />
                {this.props.children}
            </Router.Link>
        }
    }
}
