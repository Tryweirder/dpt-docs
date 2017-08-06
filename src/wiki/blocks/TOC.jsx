import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const s = StyleSheet.create({
    toc: {
        boxSizing: 'border-box',
        position: 'fixed',
        height: '100%',
        margin: 0,
        padding: 0,
        fontSize: 14
    },

    item: {
        display: 'block'
    },

    link: {
        ':hover': {
            color: 'rgba(0, 0, 0, 1)'
        },

        display: 'block',
        color: 'rgba(0, 0, 0, 0.7)',
        textDecoration: 'none',
        padding: '6px 0'
    },

    link_depth_2: {
        marginTop: 10,
        paddingLeft: 30,
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    link_depth_3: {
        paddingLeft: 50
    }
});

export default function TOC(props) {
    function handleItemClick(event) {
        event.preventDefault();
        window.parent.location.hash = event.target.getAttribute('href');
    }

    let headings = props.tokens.map(t => {
        const hash = '#' + t.id;
        const linkClassName = css(s.link, s[`link_depth_${t.depth}`]);

        return <li className={css(s.item)} key={t.id}>
            <a className={linkClassName} href={hash} onClick={handleItemClick}>
                {t.children[0].value}
            </a>
        </li>
    });
    
    return <ul className={css(s.toc)}>
        {headings}
    </ul>;
}
