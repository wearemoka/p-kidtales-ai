import { db } from "@/app/firebase/Config/Config";
import { addDoc, collection, getDocs } from "@/app/firebase/Config/Config";
import { doc, updateDoc } from "firebase/firestore";

export interface getDocArrayDataType {
  [index: string]: any;
}
/**
 * Add document in firebase store.
 * 
 * @param documentPath
 * @param documentData
 * 
 * This function will add document in firebase store based on document path and data we pass.
 */
export const addDocumentInFireStore = async (
  documentPath: string,
  documentData: any
) => {
  const dbRef = await addDoc(collection(db, documentPath), documentData);
  return dbRef.id
};

/**
 * Get document from firebase store.
 * 
 * @param documentPath
 * @returns Array of document data
 *
 * This function will get document from firebase store based on document path we pass.
 */
export const getDocumentFromFireStore = async (documentPath: string) => {
  const documents = await getDocs(collection(db, documentPath));
  let data: getDocArrayDataType[] = [];
  documents.forEach((doc) => {
    const document = {
      id: doc.id,
      ...doc.data(),
    };
    data.push(document);
  });
  return data;
};

/**
 * Update document in firebase store.
 * 
 * @param documentPath
 * @param documentData
 * @param documentId
 * @returns
 * 
 * This function will update document in firebase store based on document path, data and document id we pass.
 */
export const updateDocumentInFireStore = async (
  documentPath: string,
  documentData: any,
  documentId: string
) => {
  const storyRef = doc(db, documentPath, documentId);
  const response = await updateDoc(storyRef, documentData);
  return response;
};
