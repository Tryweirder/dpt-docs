import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router';
import { StyleSheet, css } from 'aphrodite/no-important';

const s = StyleSheet.create({
    link: {
        color: '#04b',
        textDecoration: 'none',
        position: 'relative'
    },

    link_active: {
        color: '#000'
    },

    link_hasIcon: {
        paddingLeft: 20
    },

    icon: {
        position: 'absolute',
        height: 16,
        width: 16,
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'left center no-repeat'
    }
});

export default class Link extends React.Component {
    static propTypes = {
        href: PropTypes.string.isRequired,
        mixClassName: PropTypes.object
    };

    isExternal() {
        let r = new RegExp('^(?:[a-z]+:)?//', 'i');
        return this.props.external || r.test(this.props.href);
    }

    render() {
        let cn = css(s.link, this.props.icon && s.link_hasIcon, this.props.mixClassName);
        let style = {};
        if (this.props.icon) {
            style.backgroundImage = 'url(' + this.props.icon + ')';
        }

        if (this.isExternal()) {
            return <a className={cn} {...this.props}>
                {this.props.icon && <div className={css(s.icon)} style={style} />}
                {this.props.children}
            </a>
        } else {
            return <RouterLink className={cn} activeClassName={css(s.link_active)} to={this.props.href} {...this.props}>
                {this.props.icon && <div className={css(s.icon)} style={style} />}
                {this.props.children}
            </RouterLink>
        }
    }
}
