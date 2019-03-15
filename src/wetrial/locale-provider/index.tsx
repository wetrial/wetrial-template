import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { interopDefault } from '../utils';
import enUS from "./en-US";
import zhCN from "./zh-CN";

const locales = {
    'en-US': enUS,
    'zh-CN': zhCN
}

export interface LocaleProviderProps {
    locale: string;
    children?: React.ReactNode;
}

function setMomentLocale(locale: string) {
    if (locale) {
        interopDefault(moment).locale(locale);
    } else {
        interopDefault(moment).locale('en');
    }
}


export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
    static propTypes = {
        locale: PropTypes.string,
        children: PropTypes.node.isRequired,
    };

    static contextTypes = {
        locale: PropTypes.string,
    };

    static defaultProps = {
        locale: 'en-US'
    }

    static childContextTypes = {
        locale: PropTypes.string.isRequired,
    };

    constructor(props: LocaleProviderProps) {
        super(props);
        setMomentLocale(props.locale);
    }


    getChildContext() {
        const { locale } = this.props;
        return {
            locale: locales[locale]
        };
    }

    componentDidUpdate(prevProps: LocaleProviderProps) {
        const { locale } = this.props;
        if (prevProps.locale !== locale) {
            setMomentLocale(locale);
        }
    }

    render() {
        return React.Children.only(this.props.children);
    }
}