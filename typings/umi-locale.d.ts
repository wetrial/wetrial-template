// import React from 'react';
// import { formatMessage  } from "umi-plugin-react/locale";

// type formatValues = { [key: string]: string | number }

// declare class TFormattedMessage extends React.Component<
//     {
//         id: string;
//         values?: formatValues;
//     },
//     any
//     > {
//     render(): JSX.Element;
// }

// declare module 'umi-plugin-react/locale' {
//     export const formatMessage:({ id }: { id: string }, values?: formatValues) => string;
//     export const setLocale: (lang: string) => string;
//     export const getLocale: () => string;
//     export const FormattedMessage:TFormattedMessage
// }