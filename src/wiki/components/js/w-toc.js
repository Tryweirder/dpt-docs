import React from 'react';
import block from 'propmods';

if (process.env.BROWSER) {
    require('../css/w-toc.less');
}

const b = block('w-toc');

export default function TOC(props) {
    function handleItemClick(event) {
        event.preventDefault();
        window.parent.location.hash = event.target.getAttribute('href');
    }

    let headings = props.tokens.map(t => {
        let hash = '#' + t.id;
        return <li {...b('item', { depth: t.depth })} key={t.id}>
            <a href={hash} onClick={handleItemClick}>
                {t.children[0].value}
            </a>
        </li>
    });
    return <ul {...b(props)}>
        {headings}
    </ul>;
}
