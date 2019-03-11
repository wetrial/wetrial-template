import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export interface IGlobalFooterProps {
  links?: Array<{
    key?: string;
    title: React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }>;
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
  className?:any
}

const GlobalFooter = (props:IGlobalFooterProps) => {
    const {className,links,copyright}=props;
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  );
};

export default GlobalFooter;
