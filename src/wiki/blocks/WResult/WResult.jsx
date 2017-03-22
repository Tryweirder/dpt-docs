import React from 'react';
import block from 'propmods';

let b = block('WResult');

import './WResult.less';

export default function Result(props) {
    let image = props.result === 'failure' ? '😢' : '😉';
    let title = props.result === 'failure' ? 'Doesn\'t make it' : 'Done';
    return <div {...b(props)}>
        <figure {...b('image')}>
            {image}
        </figure>
        <h2 {...b('title')}>
            {title}
        </h2>
        <div {...b('message')}>
            {props.children}
        </div>
    </div>
}
