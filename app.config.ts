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
        /* 'http://192.168.0.103:3000' */ /* 'http://172.20.10.2:3000' */ 'http://192.168.1.10:3000',
      token: 'token',
      storage_url: 'https://storage.googleapis.com/expo-13.appspot.com/',
      firebaseConfig: {
        apiKey: 'AIzaSyALNAy3CKb5kFzLCFG5CwvD1HA_bJcC_Zc',
        authDomain: 'expo-13.firebaseapp.com',
        projectId: 'expo-13',
        storageBucket: 'expo-13.appspot.com',
        messagingSenderId: '515893427539',
        appId: '1:515893427539:web:2eb5da49c5fed8329f35a6',
      },
    },
  },
};
