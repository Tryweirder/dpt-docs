import React from 'react';
import block from 'propmods';

if (process.env.BROWSER) {
    require('./WLoading.less');
}

let b = block('WLoading');

export default function Loading(props) {
    return <div {...b()}>Loading...</div>;
}
