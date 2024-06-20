import admin from 'firebase-admin'


const serviceAccount = require('@/t--exteli-firebase-adminsdk-4s1b2-bd147e4afd.json')

if ( !admin.apps.length ) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export const verifyIdToken = ( token ) => {
  return admin.auth().verifyIdToken(token)
}
