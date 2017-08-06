import React from 'react';
import block from 'propmods';

import './WPage.less';

let b = block('page');

export default class Page extends React.Component {
    componentWillMount() {
        let link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '/.core/assets/icons/favicon.png';
        document.getElementsByTagName('head')[0].appendChild(link);

        if (this.props.title) {
            document.title = this.props.title;
        }
    }

    render() {
        return <div {...b() } {...this.props}>
            {this.props.children}
        </div>
    }
}
