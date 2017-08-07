import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { colors } from '../css/const';
import { hexa } from '../css/util';

import Link from './WLink/WLink';

const s = StyleSheet.create({
    pane: {
        background: colors.pane,
        color: '#666',
        overflowX: 'hidden',
        overflowY: 'scroll',
        margin: 0,
        padding: 0,
        width: 160,
        flexGrow: 0,
        flexShrink: 0,
        zIndex: 2,
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)'
    },

    item: {
        display: 'block',
        padding: '10px 20px',

        ':hover': {
            background: 'rgba(255, 255, 255, 0.08)'
        }
    },

    item_active: {
        background: '#ecece8'
    },

    title: {
        fontSize: 14,
        textTransform: 'capitalize'
    },

    description: {
        fontFamily: 'Verdana, sans-serif',
        fontSize: 11,
        color: hexa('#666', 0.5)
    }
});

export default function Pane(props) {
    return <ul className={css(s.pane)}>
        {props.items.map(i =>
            <Pane.Item key={i.title + i.description} {...i} />
        )}
    </ul>
}

Pane.Item = function (props) {
    let isActive;

    if (typeof window !== 'undefined') {
        isActive = window.location.pathname.includes(props.href);
    }

    let item = <li className={css(s.item, isActive && s.item_active)}>
        <div className={css(s.title)}>{props.title}</div>
        <div className={css(s.description)}>{props.description}</div>
    </li>;

    if (props.href) {
        return <Link href={props.href}>{item}</Link>;
    } else {
        return item;
    }
}
