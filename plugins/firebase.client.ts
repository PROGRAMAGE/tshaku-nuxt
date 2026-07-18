import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

let firebaseApp

export default function initFirebase() {
  if (typeof window === 'undefined') return null
  if (firebaseApp) return firebaseApp

  const config = useRuntimeConfig().public
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId
  }

  firebaseApp = initializeApp(firebaseConfig)

  return {
    app: firebaseApp,
    auth: getAuth(firebaseApp),
    db: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp)
  }
}
