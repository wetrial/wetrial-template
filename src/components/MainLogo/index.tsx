import React, { useRef } from 'react';

// import classNames from 'classnames';
// import styles from './index.less';


import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});





const MainLogo: React.FC<DrawerMenuProps> = props => {


    const logosrc = `..${props.props}`;

    return (
        <div className='mainlogo'>
            <img alt='' src={logosrc} />

        </div>

    );
};

export default MainLogo;
