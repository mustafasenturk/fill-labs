import { create } from 'zustand';

export type Document = {
  id: number;
  mendatory: string;
  text: string | undefined;
  numeric: number | undefined;
  status: 'active' | 'inactive';
  date?: string;
  documentType?: 'X' | 'Y';
};

type DocumentStore = {
  documents: Document[];
  addDocument: (document: Document) => void;
  removeDocument: (id: number) => void;
  getDocumentById: (id: number) => Document | undefined;
  updateDocument: (document: Document) => void;
  changeType: (id: number) => void;
  changeStatus: (id: number) => void;
};

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  addDocument: (document: Document) =>
    set((state) => ({ documents: [...state.documents, document] })),
  removeDocument: (id: number) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),
  getDocumentById: (id: number) => {
    const { documents } = get();
    const document = documents.find((doc) => doc.id === id);
    return document;
  },
  updateDocument: (document: Document) =>
    set((state) => ({
      documents: state.documents.map((doc) => (doc.id === document.id ? document : doc)),
    })),
  changeType: (id: number) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, documentType: doc.documentType === 'X' ? 'Y' : 'X' } : doc
      ),
    })),
  changeStatus: (id: number) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, status: doc.status === 'active' ? 'inactive' : 'active' } : doc
      ),
    })),
}));
