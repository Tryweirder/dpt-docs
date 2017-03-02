import React from 'react';
import block from 'propmods';

if (process.env.BROWSER) {
    require('../css/w-loading.less');
}

let b = block('w-loading');

export default function Loading(props) {
    return <div {...b()}>Loading...</div>;
}
