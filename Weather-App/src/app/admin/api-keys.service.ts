import {inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, setDoc, updateDoc, deleteDoc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Apikeys{
    id: string,
    apikey: string,
    
}

@Injectable({
    providedIn: 'root'
})
export class ApiKeysService {
    private firestore = inject(Firestore);
    private keyCollection = collection(this.firestore, 'apikeys');

    getKeys(): Observable<Apikeys[]>{
        return collectionData(this.keyCollection, ({idField: 'id'})) as Observable<Apikeys[]>
    }
    
    addApiKey(newApiKey:Apikeys){
        const keyRef = doc(this.keyCollection);
        const newID = keyRef.id;
        newApiKey.id = newID;
        setDoc(keyRef, newApiKey);
    }
    updateApiKey(editKey: Apikeys){
        const keyRef = doc(this.firestore, 'apikeys/${editKey.id}');
        updateDoc(keyRef, { ... editKey});
    }

    deleteApiKey(deleteApiKey: Apikeys){
        const keyRef = doc(this.firestore, 'apikeys/${editKey.id}');
        deleteDoc(keyRef);
    }
}