import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

let firebaseStorage: FirebaseStorage;

export const getFirebaseStorage = () => {
  if (!firebaseStorage) {
    const firebaseApp = initializeApp(Constants.manifest?.extra?.firebaseConfig);
    const storage = getStorage(firebaseApp);
    firebaseStorage = storage;
    return storage;
  }

  return firebaseStorage;
};
