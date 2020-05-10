import * as firebase from 'firebase-admin'
import { fire } from '../../config'


const params = {
  ...fire
}
   
firebase.initializeApp({
  credential: firebase.credential.cert(params),
});

const db = firebase.firestore();


export { db as firebase, firebase as admin }