import { firebase as firestore } from "./index";
import firebase from 'firebase-admin';

interface whereItem {
  property: string;
  sign: any;
  value: any;
}

async function getAll (document: string) {
  const ref = firestore.collection(document);
  const allDocuments = await ref.get();
  const data = [];
  for(const doc of allDocuments.docs){
    data.push(doc.data());
  }
  return data;
};

async function get(arrayOfWhere: whereItem[], document: string) {
  let ref = firestore.collection(document);
  for (const whereOption of arrayOfWhere) {
    const { property, sign, value } = whereOption;
    ref.where(property, sign, value);
  }
  const allDocuments = await ref.get();
  const data = [];
  for(const doc of allDocuments.docs){
    const dataFromDocument = doc.data()
    data.push({ dataFromDocument, doc, id: doc.id });
  }
  return data;
}

function getInnerCollection () {
  
}

export { getAll, get };