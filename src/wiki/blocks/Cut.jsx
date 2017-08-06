import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const s = StyleSheet.create({
    title: {
        fontSize: 11,
        marginBottom: 6
    },

    trigger: {
        display: 'inline-block',
        cursor: 'pointer',
        paddingBottom: 2,
        borderBottom: '1px dotted rgba(0, 0, 0, 0.5)'
    }
});

export default class Cut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: props.defaultExpanded || false
        };
    }

    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        } else if (this.props.expanded === void 0) {
            this.setState({
                expanded: !this.state.expanded
            });
        }
    }

    render() {
        return <div>
            <div className={css(s.title)}>
                <div className={css(s.trigger)} onClick={this.handleClick}>
                    {this.props.title || 'Show more'}
                </div>
            </div>
            {this.state.expanded &&
                <div>
                    {this.props.children}
                </div>
            }
        </div>;
    }
}
