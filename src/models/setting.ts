import extendModel from '@wetrial/model';
import defaultSettings from '@config/defaultSettings';

export default extendModel({
  namespace: 'setting',
  state: defaultSettings,
});
