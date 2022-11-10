import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  
})
export class NavComponent implements OnInit {

  public usuarios : any;

  constructor(public as : AuthService, public fs : FirestoreService) { 
    this.fs.ListaUsuarios().subscribe((data)=>{
      this.usuarios = data;
    });
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, 'ListadoUsuarios.xlsx');
 
  }
  
  ngOnInit(): void {
  }

}
