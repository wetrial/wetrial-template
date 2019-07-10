import extendModel from '@wetrial/model';
import defaultSettings,{Settings} from '@config/defaultSettings';

export default extendModel<Settings>({
  namespace: 'settings',
  state: defaultSettings,
});
