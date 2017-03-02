import React from 'react';

import block from 'propmods';

if (process.env.BROWSER) {
    require('../css/w-cut.less');
}

const b = block('w-cut');

export default class Cut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: props.defaultExpanded || false
        };
    }

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        } else if (this.props.expanded === void 0) {
            this.setState({
                expanded: !this.state.expanded
            });
        }
    }

    render() {
        return <div {...b(this)}>
            <div {...b('title')}>
                <div {...b('trigger')} onClick={() => this.onClick()}>
                    {this.props.title || 'Show more'}
                </div>
            </div>
            <div {...b('content')}>
                {this.props.children}
            </div>
        </div>;
    }
}
