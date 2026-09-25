// Firebase-SDK van Google's CDN, op één plek vastgepind.
export { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
export {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  collection, doc, setDoc, updateDoc, deleteDoc, writeBatch, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
