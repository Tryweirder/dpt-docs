export function hex2rgb(hex) {
    let color;

    if (typeof hex === 'string') {
        if (hex[0] === '#') {
            hex = hex.slice(1);
        }

        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        color = parseInt(hex, 16);
    } else {
        color = hex;
    }

    return [
        (color & 0xff0000) >> 16,
        (color & 0x00ff00) >> 8,
        color & 0x0000ff
    ];
}

export function hexa(hex, a) {
    const [r, g, b] = hex2rgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
