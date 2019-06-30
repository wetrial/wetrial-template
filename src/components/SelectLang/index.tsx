import React from 'react';
import ClassNames from 'classnames';
import { Menu, Icon } from 'antd';
import { formatMessage, setLocale, getLocale } from 'umi-plugin-react/locale';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface SelectLangProps {
  className?: string;
}

class SelectLang extends React.PureComponent<SelectLangProps, any> {
  changeLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();

    const locales = {
      'zh-CN': {
        label: '简体中文',
        icon: '🇨🇳',
      },
      'en-US': {
        label: 'English',
        icon: '🇬🇧',
      },
    };

    const langMenu = (
      <Menu
        className={styles.menu}
        selectedKeys={[selectedLang]}
        onClick={this.changeLang}
      >
        {Object.keys(locales).map(locale => {
          const data = locales[locale];
          return (
            <Menu.Item key={locale}>
              <span role="img" aria-label={data.label}>
                {data.icon}
              </span>{' '}
              {data.label}
            </Menu.Item>
          );
        })}
      </Menu>
    );

    return (
      <HeaderDropdown overlay={langMenu} placement="bottomRight">
        <Icon
          type="global"
          className={ClassNames(styles.dropDown, className)}
          title={formatMessage({ id: 'navBar.lang' })}
        />
      </HeaderDropdown>
    );
  }
}

export default SelectLang;
