import Path from 'path';

import handlebars from 'handlebars';
import remark from 'remark';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import RDS from 'react-dom/server';
import visit from 'unist-util-visit';
import yaml from 'yaml-js';

import * as File from 'dpt/lib/file';
import Doc from '../wiki/components/js/w-doc.js';
import 'dpt/lib/vendor/beast';

function frontMatter(str) {
    const regex = /^---$([\s\S]*?)---(\r?\n)*([\s\S]*)/m;
    const match = regex.exec(str);

    if (!match) {
        return {
            attributes: {},
            body: str
        };
    }

    return {
        attributes: yaml.load(match[1]),
        body: match[3]
    };
}


function slug(str) {
    return _.deburr(str
        .replace(/\s+/, '-')
        .toLowerCase()
    ).replace(/[^a-zа-я\-]/g, '');
}

handlebars.registerHelper('platform', function(...args) {
    return _.initial(args).includes(this.platform) ? _.last(args).fn(this) : '';
});

handlebars.registerHelper('platformNot', function(...args) {
    return !_.initial(args).includes(this.platform) ? _.last(args).fn(this) : '';
});

handlebars.registerHelper('example', function(opts) {
    opts.hash.lang = 'bml';
    return `:::example${JSON.stringify(opts.hash)}\n<example>${opts.fn(this)}</example>:::`;
});

const DONT_PARSE_CHILDREN = {
    example: true
};

function customInline(remark) {
    function tokenizer(eat, value, silent) {
        let match = /^:(\w+)\[(.+?)\](\{.+?\})?/.exec(value);

        if (match) {
            if (silent) {
                return true;
            }

            return eat(match[0])({
                type: match[1],
                children: remark.parse(match[2]).children[0].children,
                ...JSON.parse(match[3] || '{}')
            });
        }
    }

    function locator(value, fromIndex) {
        return value.indexOf(':', fromIndex);
    }

    tokenizer.locator = locator;

    let proto = remark.Parser.prototype;
    let methods = proto.inlineMethods;

    proto.inlineTokenizers.customInline = tokenizer;
    methods.splice(methods.indexOf('inlineText'), 0, 'customInline');
}

function customBlock(remark) {
    function tokenizer(eat, value, silent) {
        let match = /^:::(\w+)(\{[\s\S]*?\})?\n([\s\S]+?)\n?:::/.exec(value);

        if (match) {
            if (silent) {
                return true;
            }

            let node = {
                type: match[1],
                ...JSON.parse(match[2] || '{}')
            };

            if (DONT_PARSE_CHILDREN[node.type]) {
                node.value = match[3];
            } else {
                node.children = remark.parse(match[3]).children;
            }

            return eat(match[0])(node);
        }
    }

    function locator(value, fromIndex) {
        return value.indexOf(':::', fromIndex);
    }

    tokenizer.locator = locator;

    let proto = remark.Parser.prototype;
    let methods = proto.blockMethods;

    proto.blockTokenizers.customBlock = tokenizer;
    methods.splice(methods.indexOf('fences'), 0, 'customBlock');
}


export default async function(input, {path, ...opts}) {
    let parser = remark.use(customInline).use(customBlock);
    let platform = opts.platform || 'desktop';
    let context = { platform };
    let content = parser.parse(handlebars.compile(input)(context));
    let config = {};
    if (content.children && content.children[0] && content.children[0].type === 'yaml') {
        config = yaml.load(content.children.shift().value);
    }
    let headings = {};
    visit(content, 'heading', node => {
        node.text = '';
        visit(node, 'text', text => node.text += text.value);
        let id = slug(node.text);
        let i = 0;
        while (headings[id] !== void 0 && headings[id] >= i) {
            i++;
        }
        headings[id] = i;
        node.id = i === 0 ? id : id + '-' + i;
    });
    ['code', 'example'].forEach(type => {
        visit(content, type, node => {
            if (!node.platform) {
                node.platform = platform;
            }
        });
    });

    let [, version, blockName, libName] = path.split(Path.sep).reverse();
    config.imports.push({[`${libName}.${blockName}`]: version});

    let doc = <html>
        <head>
            <title>Документация</title>
            <script src="/.core/babel-polyfill.js" />
            <script src="/.core/bundles/w-doc.js" />
            <script src="/.core/require.js" />
            <script src="/.core/loader.js" />
            <script dangerouslySetInnerHTML={{__html: `
                Loader.hideContentWhileLoading = false;
                Loader.showProgressBar = false;
                Loader.config(${JSON.stringify(config)});
                var _AST = ${JSON.stringify(content)};
                Loader.onLoad = function() {
                    window.ReactDOM.render(React.createElement(Doc, {
                        ast: _AST
                    }), document.querySelector('.renderTarget'));
                };
            `}} />
        </head>
        <body>
            <div className="renderTarget" dangerouslySetInnerHTML={{__html:
                RDS.renderToString(<Doc ast={content} />)
            }} />
        </body>
    </html>;

    return {
        content: {
            body: RDS.renderToStaticMarkup(doc),
            mime: 'html'
        },
        dependencies: [path]
    };
}
