import theme from '../config/theme.config';
import {ISettingsModelState} from './types/settings'

const defaultSettings:ISettingsModelState= {
    "navTheme": "light",
    "primaryColor":theme.primaryColor,
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
    "iconfontUrl": ""    
}

export default defaultSettings;