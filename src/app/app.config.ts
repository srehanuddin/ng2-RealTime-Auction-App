import { AuthProviders, AuthMethods } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDiVamh_kUGy87vua0-wIIiN4XJaVx53Fw',
  authDomain: 'ng2-realtime-auction.firebaseio.com',
  databaseURL: 'https://ng2-realtime-auction.firebaseio.com/',
  storageBucket: 'gs://ng2-realtime-auction.appspot.com',
  messagingSenderId: '<your-messaging-sender-id>'
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};