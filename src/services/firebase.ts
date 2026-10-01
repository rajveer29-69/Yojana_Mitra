import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore,
  doc, 
  setDoc, 
  getDoc,
  getDocFromServer,
  collection, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import type { UserProfile } from '../data/schemes.ts';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with experimentalForceLongPolling to avoid 10-second backend connection timeouts in iframe/proxy environments
export const db = (() => {
  try {
    return initializeFirestore(
      app,
      {
        experimentalForceLongPolling: true,
      },
      firebaseConfig.firestoreDatabaseId
    );
  } catch {
    return firebaseConfig.firestoreDatabaseId
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  }
})();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Error handler conforming to FirestoreErrorInfo skill specification
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate Connection to Firestore as mandated by skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection: client appears offline, check network config.');
    }
  }
}
testConnection();

export interface SubscriptionData {
  email: string;
  userId?: string;
  state: string;
  occupation?: string;
  age?: number;
  income?: number;
  category?: string;
  gender?: string;
  createdAt: string;
  status: 'active' | 'unsubscribed';
}

/**
 * Save an email subscription to Firestore
 */
export async function saveEmailSubscription(
  email: string,
  profile?: UserProfile | null,
  currentUser?: User | null
): Promise<{ success: boolean; subscriptionId: string; message?: string }> {
  try {
    // Generate clean alphanumeric ID
    const sanitizedEmail = email.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '_');
    const subscriptionId = `sub_${sanitizedEmail}`;

    const payload: SubscriptionData = {
      email: email.toLowerCase().trim(),
      state: profile?.state || 'All India',
      status: 'active',
      createdAt: new Date().toISOString()
    };

    if (currentUser?.uid) {
      payload.userId = currentUser.uid;
    }
    if (profile?.occupation) {
      payload.occupation = profile.occupation;
    }
    if (profile?.age !== undefined) {
      payload.age = Number(profile.age);
    }
    if (profile?.income !== undefined) {
      payload.income = Number(profile.income);
    }
    if (profile?.category) {
      payload.category = profile.category;
    }
    if (profile?.gender) {
      payload.gender = profile.gender;
    }

    const docRef = doc(db, 'subscriptions', subscriptionId);
    await setDoc(docRef, payload, { merge: true });

    return {
      success: true,
      subscriptionId,
      message: 'Subscription saved successfully to Firestore.'
    };
  } catch (error: any) {
    console.error('Failed to save subscription to Firestore:', error);
    handleFirestoreError(error, OperationType.WRITE, 'subscriptions');
    throw error;
  }
}

/**
 * Sign in with Google Auth
 */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Sign out user
 */
export async function logOut(): Promise<void> {
  await signOut(auth);
}
