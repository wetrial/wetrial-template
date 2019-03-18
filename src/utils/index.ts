import { parse } from 'qs';

export function urlToList(url: string) {
    const urlList = url.split('/').filter((i) => i);
    return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}

export function parseQuery(data?: string) {
    const url = data || window.location.href.split('?')[1];
    return parse(url);
}
