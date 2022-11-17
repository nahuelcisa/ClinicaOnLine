import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  public log : any;
  constructor(public fs : FirestoreService) { 
    this.fs.ListaLogs().subscribe((data)=>{
      this.log = data;
    })
  }

  ngOnInit(): void {
  }

}
