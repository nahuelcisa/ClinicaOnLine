import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc,collectionData} from '@angular/fire/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Observable } from 'rxjs';
import {doc, query, updateDoc, where } from "firebase/firestore";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  storage : any;
  profesionalCollectionReference : any;
  usuariosCollectionReference : any;
  pacientesCollectionReference : any;
  adminCollectionReference : any;
  turnoCollectionReference : any;

  constructor(public Firestore: Firestore, public as : AuthService) {
    this.storage = getStorage();
    this.profesionalCollectionReference = collection(this.Firestore, 'profesionales');
    this.pacientesCollectionReference = collection(this.Firestore, 'pacientes');
    this.usuariosCollectionReference = collection(this.Firestore, 'usuarios');
    this.adminCollectionReference = collection(this.Firestore, 'administradores');
    this.turnoCollectionReference = collection(this.Firestore, 'turnos');
    
  }

  agregarProfesional(profesional : any){
    let referencia = ref(this.storage,profesional.foto.name);
    uploadBytes(referencia,profesional.foto).then((snapshot)=>{
      getDownloadURL(ref(this.storage,profesional.foto.name)).then((url)=>{
        profesional.foto = url;
        this.as.register(profesional.mail, profesional.clave).then(()=>{
                  addDoc(this.profesionalCollectionReference,profesional);
          return  addDoc(this.usuariosCollectionReference,profesional);
        });
      }).catch((error)=>{
        console.log(error);
      });
    });
  }

  agregarUsuario(usuario : any){
    let referencia = ref(this.storage,usuario.foto.name);
    uploadBytes(referencia,usuario.foto).then((snapshot)=>{
      getDownloadURL(ref(this.storage,usuario.foto.name)).then((url)=>{
        usuario.foto = url;
        this.as.register(usuario.mail, usuario.clave).then(()=>{
          addDoc(this.pacientesCollectionReference,usuario);
          return addDoc(this.usuariosCollectionReference,usuario);
        });
      }).catch((error)=>{
        console.log(error);
      });
    });
  }

  agregarAdmin(admin : any){
    let referencia = ref(this.storage,admin.foto.name);
    uploadBytes(referencia,admin.foto).then((snapshot)=>{
      getDownloadURL(ref(this.storage,admin.foto.name)).then((url)=>{
        admin.foto = url;
        this.as.register(admin.mail, admin.clave).then(()=>{
          addDoc(this.adminCollectionReference,admin);
          return addDoc(this.usuariosCollectionReference,admin);
        });
      }).catch((error)=>{
        console.log(error);
      });
    });
  }

  agregarTurno(turno : any){
    return addDoc(this.turnoCollectionReference,turno);
  }

  ListaUsuarios():Observable<any[]>{
    return collectionData(this.usuariosCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }

  ListaTurnos():Observable<any[]>{
    return collectionData(this.turnoCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }

  ListaEspecialistas():Observable<any[]>{
    return collectionData(this.profesionalCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }

  ListaPacientes():Observable<any[]>{
    return collectionData(this.pacientesCollectionReference,{idField: 'id'}) as Observable<any[]>;
  }

  ModificarUsuario(usuario:any,id:any){
    const UsuarioDocRef = doc(this.Firestore, `usuarios/${id}`);
    return updateDoc(UsuarioDocRef,usuario);
  }

  ModificarProfesional(profesional:any,id:any){
    const profesionalDocRef = doc(this.Firestore, `profesionales/${id}`);
    return updateDoc(profesionalDocRef,profesional);
  }

  ModificarTurno(turno:any,id:any){
    const turnoDocRef = doc(this.Firestore, `turnos/${id}`);
    return updateDoc(turnoDocRef,turno);
  }

}
