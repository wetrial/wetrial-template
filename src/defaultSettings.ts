import theme from '../config/theme.config';
import {ISettingsModelState} from './types/settings'

const defaultSettings:ISettingsModelState= {
    "navTheme": "light",
    "primaryColor":theme['primary-color'],
    "layout": "sidemenu",
    "contentWidth": "Fluid",
    "fixedHeader": true,
    "autoHideHeader": true,
    "fixSiderbar": true,
    "menu": {
        "disableLocal": false
    },
    "title": "Wetrial",
    "pwa": true,
    "collapse": true,
    "iconFontUrl": "//at.alicdn.com/t/font_1077466_58oq1vbr6wi.js" // iconfont库地址 
}

export default defaultSettings;