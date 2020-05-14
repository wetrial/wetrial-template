import { urlRegexp } from './regexp';

export const isUrl = (path: string): boolean => urlRegexp.test(path);
