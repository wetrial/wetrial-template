import Mock from 'mockjs';
import { delay } from 'roadhog-api-doc';
import responseWrapper, { authorizeIntercept } from '../base';

function getTenants({ response }) {
  const tenants = Mock.mock({
    totalCount: 50,
    'items|15': [
      {
        id: '@guid',
        tenancyName: '@csentence(5,30)',
        name: '@csentence(5,30)',
        'operator|1': ['刘德华', '古天乐', 'XXG'],
        'editionDisplayName|1': ['Standand', 'VIP', 'Super VIP'],
        isActive: true,
        creationTime: '@datetime("yyyy-MM-dd")',
      },
    ],
  });
  return response.json(responseWrapper(tenants));
}

function getTenant({ response }) {
  const tenant = Mock.mock({
    id: '@guid',
    tenancyName: '@csentence(5,8)',
    name: '@csentence(2,4)',
    'isActive:1-2': '安徽省',
    creationTime: '@datetime("yyyy-MM-dd")',
  });
  return response.json(responseWrapper(tenant));
}

// 调用 delay 函数，统一处理
export default delay(
  {
    'GET /api/tenant/getTenants': (req, res) =>
      authorizeIntercept({ request: req, response: res }, getTenants),
    'GET /api/tenant/getTenant': (req, res) =>
      authorizeIntercept({ request: req, response: res }, getTenant),
  },
  1000,
);
