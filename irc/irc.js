export function ircparse(text) {
    //https://raw.githubusercontent.com/braddunbar/irc-parser/master/index.js
    'use strict';
    var raw = text,
        i,
        prefix,
        command,
        params = [];

    // prefix
    if (text.charAt(0) === ':') {
        i = text.indexOf(' ');
        prefix = text.slice(1, i);
        text = text.slice(i + 1);
    }

    // command
    i = text.indexOf(' ');
    if (i === -1) {
        i = text.length;
    }
    command = text.slice(0, i);
    text = text.slice(i + 1);

    // middle
    while (text && text.charAt(0) !== ':') {
        i = text.indexOf(' ');
        if (i === -1) {
            i = text.length;
        }
        params.push(text.slice(0, i));
        text = text.slice(i + 1);
    }

    // trailing
    if (text) {
        params.push(text.slice(1));
    }
    return {
        raw: raw,
        prefix: prefix,
        command: command,
        params: params
    };
};