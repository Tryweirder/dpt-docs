import React from 'react';

import block from 'propmods';
import '../../../vendor/beast';

import Loading from './w-loading';
import Cut from './w-cut';

if (process.env.BROWSER) {
    var cookie = require('cookie_js').cookie;
    require('../css/w-example.less');

    document.addEventListener('DOMContentLoaded', maintainScroll);
}

const b = block('w-example');

function maintainScroll() {
    let previousScroll = cookie.get('scrollPosition');
    if (previousScroll) {
        window.scrollTo(window.scrollX, previousScroll);
    }
}

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        if (!this.props.src) {
            let node = eval(Beast.parseBML(this.props.code));
            this.setState({
                loaded: true
            });

            let dom = this.refs.example;

            node.render(dom);

            setTimeout(maintainScroll, 0);
        }
    }

    render() {
        let parts = this.props.lang.split('_');
        let [lang, modName, modValue = true] = parts;

        let mods = modName = {[modName]: modValue};

        let style = {
            width: this.props.width,
            height: this.props.height
        };

        let result;

        if (this.props.src) {
            let src = this.props.src + '?platform=' + this.props.platform;
            result = <div {...b(this)}>
                <iframe {...b('content')} src={src} style={style} ref="example" />
            </div>;
        } else {
            result = <div {...b(this, mods)} style={style}>
                <div {...b('preloader')}>
                    <Loading />
                </div>
                <div {...b('content')} ref="example" />
                <div {...b('code')}>
                    <Cut title="Show the code">
                        <div {...b('code-content')}>
                            {this.props.code}
                        </div>
                    </Cut>
                </div>
            </div>;
        }

        return result;
    }
}
