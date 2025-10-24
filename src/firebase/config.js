import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore'

// COLE AQUI A CONFIGURAÇÃO DO SEU FIREBASE
// (mesma do app Android - google-services.json convertido)
const firebaseConfig = {
  apiKey: "AIzaSyCGgx25-aEGEw5HueQIUH5yZKmqfgtoAoI",
  authDomain: "oryontech-85fdf.firebaseapp.com",
  projectId: "oryontech-85fdf",
  storageBucket: "oryontech-85fdf.firebasestorage.app",
  messagingSenderId: "1001500887231",
  appId: "1:1001500887231:web:855de175b771c6630f1e0a",
  measurementId: "G-Q34B7948D2"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Collections
export const COLLECTIONS = {
  AREAS: 'areas',
  SESSIONS: 'scan_sessions'
}

// Realtime listeners
export const listenToAreas = (callback) => {
  const q = query(
    collection(db, COLLECTIONS.AREAS),
    orderBy('codigo', 'asc')
  )
  
  return onSnapshot(q, (snapshot) => {
    console.log('🔥 Firestore snapshot - Áreas:', snapshot.size)
    const areas = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      // Filtrar apenas áreas ativas
      if (data.ativo !== false) {
        areas.push({ id: doc.id, ...data })
      }
    })
    console.log('📋 Áreas ativas:', areas.length, areas)
    callback(areas)
  }, (error) => {
    console.error('❌ Erro no listener de áreas:', error)
  })
}

export const listenToSessions = (callback) => {
  const q = query(
    collection(db, COLLECTIONS.SESSIONS),
    orderBy('startTime', 'desc'),
    limit(100)
  )
  return onSnapshot(q, (snapshot) => {
    const sessions = []
    snapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() })
    })
    callback(sessions)
  })
}

// CRUD Áreas
export const createArea = async (areaData) => {
  // Garantir que tenha todos os campos necessários
  const area = {
    codigo: areaData.codigo,
    nome: areaData.nome,
    ativo: true,
    createdAt: Date.now()
  }
  return await addDoc(collection(db, COLLECTIONS.AREAS), area)
}

export const updateArea = async (areaId, areaData) => {
  const areaRef = doc(db, COLLECTIONS.AREAS, areaId)
  return await updateDoc(areaRef, areaData)
}

export const deleteArea = async (areaId) => {
  // Soft delete: marcar como inativo ao invés de deletar
  const areaRef = doc(db, COLLECTIONS.AREAS, areaId)
  return await updateDoc(areaRef, { ativo: false })
}

// CRUD Sessions
export const updateSession = async (sessionId, sessionData) => {
  const sessionRef = doc(db, COLLECTIONS.SESSIONS, sessionId)
  return await updateDoc(sessionRef, sessionData)
}

export const deleteSession = async (sessionId) => {
  const sessionRef = doc(db, COLLECTIONS.SESSIONS, sessionId)
  return await deleteDoc(sessionRef)
}

export { db }
