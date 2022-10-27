import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {

  public usuarios : any;

  constructor(private fs : FirestoreService) { 
    this.fs.ListaUsuarios().subscribe((data)=>{
      this.usuarios = data;
      this.usuarios = this.usuarios.filter((usu: { perfil: string; }) => usu.perfil == 'profesional');
    });
  }

  habilitarProfesional(usuario : any, habilitar : any){
    if(!habilitar){
      usuario.habilitado = true;
  
    }else{
      usuario.habilitado = false;
    }
    this.fs.ModificarUsuario(usuario,usuario.id);
  }

  ngOnInit(): void {
  }

}
