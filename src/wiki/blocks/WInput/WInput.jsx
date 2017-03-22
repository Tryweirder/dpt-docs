import React from 'react';
import block from 'propmods';

import './WInput.less';

let b = block('WInput');

export default class Input extends React.Component {
    static defaultProps = {
        size: 'M',
        kind: 'normal'
    };

    blur() {
        this.refs.input.blur();
    }

    focus() {
        this.refs.input.focus();
    }

    moveCursorToEnd() {
        this.refs.input.setSelectionRange(10000, 10000);
    }

    value() {
        return this.refs.input.value;
    }

    render() {
        let { size, kind, ...other } = this.props;
        return <div {...b(this)}>
            <input {...b('input')} {...other} ref="input" />
        </div>
    }
}
