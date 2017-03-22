import React from 'react';
import block from 'propmods';
import { Link } from 'react-router';

import './WLink.less';

const b = block('WLink');

export default function WLink(props) {
    let icon = props.icon && <span {...b('icon') } style={{
        backgroundImage: `url(${props.icon})`
    }} />;

    const isExternal = props.external || /^(?:[a-z]+:)?\/\//i.test(props.href);

    return isExternal ?
        <a {...b(props) } {...props}>
            {icon}
            {props.children}
        </a> :
        <Link {...b(props) } activeClassName="WLink_active" to={props.href} {...props}>
            {icon}
            {props.children}
        </Link>;
}

WLink.propTypes = {
    href: React.PropTypes.string.isRequired
};
