import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { colors, borders } from '../css/const';
import { hexa } from '../css/util';

function size(name, height, lineHeight, fontSize) {
    const vert = (height - lineHeight) / 2;

    return {
        [`input_size_${name}`]: {
            fontSize,
            lineHeight,
            height,
            paddingTop: vert,
            paddingRight: Math.round(height * 0.8),
            paddingBottom: vert,
            paddingLeft: Math.round(height * 0.3)
        }
    };
}

const s = StyleSheet.create({
    input: {
        display: 'inline-block',
        position: 'relative',
        verticalAlign: 'baseline',
        boxShadow: 'none',

        ':focus': {
            outline: 'none',
            borderColor: '#ffdc3c',
            boxShadow: 'inset 0 0 0 1px #ffdc3c'
        },

        '::placeholder': {
            color: 'rgba(0, 0, 0, 0.4)'
        }
    },

    input_kind_normal: {
        background: '#fff',
        border: borders.button,

        ':hover:not(:focus)': {
            borderColor: 'rgba(0, 0, 0, 0.3)'
        }
    },

    input_kind_pseudo: {
        background: 'transparent',
        border: borders.button,

        ':hover:not(:focus)': {
            borderColor: 'rgba(0, 0, 0, 0.3)'
        }
    },

    input_kind_head: {
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        color: '#fff',

        ':hover:not(:focus)': {
            borderColor: hexa('#fff', 0.5)
        },

        '::placeholder': {
            color: 'rgba(255, 255, 255, 0.8)'
        }
    },

    ...size('S', 24, 16, 13),
    ...size('M', 28, 16, 13),
    ...size('L', 32, 24, 13)
});

export default class Input extends React.Component {
    static defaultProps = {
        size: 'M',
        kind: 'normal'
    };

    blur() {
        this.input.blur();
    }

    focus() {
        this.input.focus();
    }

    moveCursorToEnd() {
        this.input.setSelectionRange(10000, 10000);
    }

    value() {
        return this.input.value;
    }

    render() {
        let { size, kind, ...other } = this.props;
        return <input
            className={css(
                s.input,
                s[`input_kind_${kind}`],
                s[`input_size_${size}`]
            )}
            {...other}
            ref={input => this.input = input}
        />;
    }
}
