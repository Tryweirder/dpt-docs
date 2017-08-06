import React from 'react';
import _ from 'lodash';

class Renderer {
    text(props) {
        return props.value;
    }

    root(props) {
        return React.createElement('div', _.omit(props, ['position']));
    }

    paragraph(props) {
        return React.createElement('p', props);
    }

    blockquote(props) {
        return React.createElement('blockquote', props);
    }

    heading(props) {
        return React.createElement('h' + props.depth, _.omit(props, ['depth', 'text']));
    }

    code(props) {
        return <pre>
            <code>
                { props.value }
            </code>
        </pre>;
    }

    inlineCode(props) {
        return React.createElement('code', null, props.value);
    }

    yaml(props) {
        return null;
    }

    html(props) {
        return <span dangerouslySetInnerHTML={{__html: props.value}} />;
    }

    list(props) {
        return React.createElement(props.ordered ? 'ol' : 'ul', _.omit(props, ['ordered', 'start', 'loose']));
    }

    listItem(props) {
        return React.createElement('li', _.omit(props, ['loose', 'checked']));
    }

    table(props) {
        return React.createElement('table', props);
    }

    tableHeader(props) {
        return React.createElement('thead', props);
    }

    tableRow(props) {
        return React.createElement('tr', props);
    }

    tableCell(props) {
        return React.createElement('td', props);
    }

    horizontalRule(props) {
        return React.createElement('hr', props);
    }

    lineBreak(props) { // break
        return React.createElement('br', props);
    }

    emphasis(props) {
        return React.createElement('em', props);
    }

    strong(props) {
        return React.createElement('strong', props);
    }

    del(props) { // delete
        return React.createElement('del', props);
    }

    link(props) {
        return React.createElement('a', props);
    }

    image(props) {
        return React.createElement('img', props);
    }

    footnote(props) {
        return React.createElement('footnote', props);
    }

    linkReference(props) {
        return null;
    }

    imageReference(props) {
        return null;
    }

    footnoteReference(props) {
        return null;
    }

    definition(props) {
        return null;
    }

    footnoteDefinition(props) {
        return null;
    }

    escape(props) {
        return null;
    }

    renderNode(node) {
        if (node.children) {
            node.children = node.children.map(n => this.renderNode(n));
        }

        let type = node.type;

        if (node.url) {
            if (node.type === 'image') {
                node.src = node.url;
            } else {
                node.href = node.url;
            }
            delete node.url;
        }

        if (this[type]) {
            delete node.type;
        }

        switch (type) {
        case 'break':
            return this.lineBreak(node);
        case 'delete':
            return this.del(node);
        default:
            if (this[type]) {
                return this[type](_.omit(node, ['position']));
            } else {
                console.warn(`Unknown Markdown node type "${node.type}" at ${node.position.start.line}:${node.position.start.column}`);
            }
        }
    }

    render(root) {
        return this.renderNode(_.cloneDeep(root));
    }
}

export default class Markdown extends React.Component {
    static propTypes = {
        ast: React.PropTypes.object.isRequired,
        renderer: React.PropTypes.instanceOf(Renderer).isRequired
    };

    static defaultProps = {
        renderer: new Renderer()
    };

    render() {
        return <div {..._.omit(this.props, ['ast', 'renderer'])}>
            {this.props.renderer.render(this.props.ast)}
        </div>;
    }
}

Markdown.Renderer = Renderer;
