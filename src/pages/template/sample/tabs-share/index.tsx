import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import React from 'react';
import { history, useLocation } from 'umi';

const { TabPane } = Tabs;

const tabs = [
  { title: '全部任务', key: 'all' },
  { title: '我的任务', key: 'my' },
  { title: '我关注的任务', key: 'attention' },
];

export default () => {
  const location = useLocation();

  const activeTab = location['query']?.tab || 'my';

  const changeTab = (tab) => {
    if (tab === activeTab) {
      return;
    }
    history.push({
      pathname: location.pathname,
      query: {
        tab,
      },
    });
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <Tabs activeKey={activeTab} onChange={changeTab}>
        {tabs.map((item) => (
          <TabPane tab={item.title} key={item.key}>
            {activeTab === item.key ? item.title : null}
          </TabPane>
        ))}
      </Tabs>
    </PageContainer>
  );
};
