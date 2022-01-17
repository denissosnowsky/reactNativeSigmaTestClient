export default {
  expo: {
    name: 'Todos',
    slug: 'todos-rn-app',
    privacy: 'public',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/sp.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      prod_url: 'http://31.184.253.38',
      dev_url: 'http://192.168.0.103:3000',
    },
  },
};
