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
      dev_url:
        /* 'http://192.168.0.103:3000' */ 'http://172.20.10.2:3000' /* 'http://192.168.1.10:3000' */,
      token: 'token',
      storage_url: 'https://storage.googleapis.com/react-native-sigma-test.appspot.com/',
      firebaseConfig: {
        apiKey: 'AIzaSyAR-AgJkEqdvrT1TDRyE4LBkLzxlzAr7XE',
        authDomain: 'react-native-sigma-test.firebaseapp.com',
        projectId: 'react-native-sigma-test',
        storageBucket: 'react-native-sigma-test.appspot.com',
        messagingSenderId: '929258666598',
        appId: '1:929258666598:web:c67f1501eab8190e394ba7',
      },
      imageAPI: 'https://avatars.dicebear.com/api/avataaars/',
    },
  },
};
