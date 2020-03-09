import extend from '@wetrial/core/model';
import defaultSettings, { DefaultSettings } from '@config/defaultSettings';

const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};
export default extend<DefaultSettings>({
  namespace: 'settings',
  state: defaultSettings,
  effects: {},
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      return {
        ...state,
        ...payload,
      };
    },
  },
});
