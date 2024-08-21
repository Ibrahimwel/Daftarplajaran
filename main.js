import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLd1WDA9uF77_Oqn1YRm-1exSf7KBdLSo",
  authDomain: "ibrahim-af5f3.firebaseapp.com",
  projectId: "ibrahim-af5f3",
  storageBucket: "ibrahim-af5f3.appspot.com",
  messagingSenderId: "65867278858",
  appId: "1:65867278858:web:9bdaab0c0b44dbf14a8df3",
  measurementId: "G-TN3BT5MZJR"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarmapel() {
  const refDokumen = collection(db, "jadwal-mapel");
  const kueri = query(refDokumen, orderBy("mapel"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      waktu: dok.data().waktu,
      kelas: dok.data().kelas,
      mapel: dok.data().mapel,
      gurumapel:dok.data().gurumapel
    });
  });


  return hasil
}

//export function formatAngka(x) {
//return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
  
  export async function tambahjadwalmapel(hari, waktu, kelas, mapel, gurumapel) {
  try {
    const dokRef = await addDoc(collection(db, 'jadwal-mapel'), {
      hari: hari,
      waktu: waktu,
      kelas: kelas,
      mapel: mapel,
     gurumapel:gurumapel
    });
    console.log('berhasil menembah jadwal ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah jadwal' + e);
  }
}

//fungsi untuk hapus data
export async function hapusmapel(docId) {
  await deleteDoc(doc(db, "jadwal-mapel", docId));
}
//fungsi untuk ubah data
export async function ubahdaftarmapel(docId, hari, waktu, kelas, mapel, gurumapel) {
  await updateDoc(doc(db, "jadwal-mapel", docId), {
    hari: hari,
    waktu: waktu,
    kelas: kelas,
    mapel: mapel,
    gurumapel: gurumapel
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambildaftarmapel(docId) {
  const docRef = await doc(db, "jadwal-mapel", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}