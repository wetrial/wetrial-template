import React, { useRef } from 'react';
import { Popover } from 'antd';

import classNames from 'classnames';
import styles from './index.less';


import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});


export interface MainFooter {

}


const MainFooter: React.FC<DrawerMenuProps> = props => {


    const content = (
        <div>
            <p>张无忌</p>
            <p style={{ 'font-size': '12px', 'color': '#aaa' }}><span>武当派</span> <span>掌门</span></p>
        </div>
    );

    return (
        <div className='mainfooter'>
            <Popover placement="right" content={content} trigger="hover">
                <IconFont type='icon-facebook' />

            </Popover>

        </div>

    );
};

export default MainFooter;
