import React from 'react';
import block from 'propmods';

import Link from './w-link';

import '../css/w-pane.less';

let b = block('w-pane');

export default function Pane(props) {
    return <ul {...b()}>
        { props.items.map(i =>
            <Pane.Item key={i.title + i.description} {...i} />
        ) }
    </ul>
}

Pane.Item = function(props) {
    let item = <li {...b('item', {deprecated: props.deprecated !== void 0})}>
        <div {...b('item-title')}>{props.title}</div>
        <div {...b('item-description')}>{props.description}</div>
    </li>;

    if (props.href) {
        return <Link href={props.href}>{item}</Link>;
    } else {
        return item;
    }
}
