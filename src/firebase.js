import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqoKZIIJ5_86Fg9Lva8OMv_hHBQMy6zgw",
  authDomain: "comennt-test.firebaseapp.com",
  projectId: "comennt-test",
  storageBucket: "comennt-test.firebasestorage.app",
  messagingSenderId: "512375516129",
  appId: "1:512375516129:web:95d0d05f340f09fdcf00a0",
  measurementId: "G-26QD6YB677",
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore のいいね数を取得
export const fetchLikes = async () => {
  const docRef = doc(db, "likes", "likeCounter");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().count;
  } else {
    await setDoc(docRef, { count: 0 });
    return 0;
  }
};

// Firestore のいいね数を更新
export const updateLikes = async (newCount) => {
  const docRef = doc(db, "likes", "likeCounter");
  await updateDoc(docRef, { count: newCount });
};

// Firestore にコメントを追加
export const addComment = async (text) => {
  const commentsRef = collection(db, "comments");
  await addDoc(commentsRef, {
    text,
    timestamp: new Date(),
  });
};

// Firestore からコメントを取得（新着順）
export const fetchComments = async () => {
  const commentsRef = collection(db, "comments");
  const q = query(commentsRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};
