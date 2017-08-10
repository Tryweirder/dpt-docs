import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
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
        const {
            mixClassName,
            activeClassName,
            external,
            children,
            icon,
            href,
            ...other
        } = this.props;

        let cn = css(s.link, icon && s.link_hasIcon, mixClassName);
        let style = {};
        if (icon) {
            style.backgroundImage = 'url(' + icon + ')';
        }

        if (this.isExternal()) {
            return (
                <a className={cn} href={href} {...other}>
                    {icon && <div className={css(s.icon)} style={style} />}
                    {children}
                </a>
            );
        } else {
            return (
                <NavLink
                    className={cn}
                    activeClassName={activeClassName || css(s.link_active)}
                    to={href}
                    {...other}
                >
                    {icon && <div className={css(s.icon)} style={style} />}
                    {children}
                </NavLink>
            );
        }
    }
}
