import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  public log : any;
  public chartPie: any;
  public contadorPie : any = [0,0];
  public contadorDia : any = [0,0,0,0,0,0];

  public dataChartPie : any;
  public configChartPie  : any;
  public chartBarDia : any;

  public especialistas : any ;


  public arrayCantTurnosEspPend : any = [];
  public arrayNombresEspPend : any = [];

  public arrayCantTurnosEspFin : any = [];
  public arrayNombresEspFin : any = [];

  public arrayTurnos : any = [];


  horasLunVie : any = [
    '8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00',
    '17:30','18:00','18:30','19:00'
  ];

  public horaDesde : any = '8:00';
  public horaHasta : any = '19:00';

  constructor(public fs : FirestoreService) { 

    this.fs.ListaLogs().subscribe((data)=>{
      this.log = data;
    });

    this.fs.ListaEspecialistas().subscribe((data)=>{
      this.especialistas = data;
    });

    this.fs.ListaTurnos().subscribe((data)=>{

      this.arrayTurnos = data;

      data.forEach(element => {


        if(element.profesional.especialidad == 'Clinico'){
          this.contadorPie[0]++;
        }else if(element.profesional.especialidad == 'Cardiologo'){
          this.contadorPie[1]++;
        }

        switch(element.dia[1]){
          case 'lunes':
            this.contadorDia[0]++;
            break;
          case 'martes':
            this.contadorDia[1]++;
            break;
          case 'miércoles':
            this.contadorDia[2]++;
            break;
          case 'jueves':
            this.contadorDia[3]++;
            break;
          case 'viernes':
            this.contadorDia[4]++;
            break;
          case 'sábado':
            this.contadorDia[5]++;
            break;
        }

      });

      this.createChartPie();
      this.createChartLine();


    });
  }

  ngOnInit(): void {
  }
  

  generarArrayPend(){
    let charExiste = Chart.getChart('MyChartEspDiaPend');
    if (charExiste != undefined)  {
      charExiste.destroy(); 
    }

    this.horasLunVie = this.horasLunVie.slice(this.horasLunVie.indexOf(this.horaDesde) + 1, this.horasLunVie.indexOf(this.horaHasta) + 1);
    console.log(this.horasLunVie);
    for (let index = 0; index < this.especialistas.length; index++) {
        
      let count = 0
      let count2 = 0;
      console.log(this.arrayTurnos);
      this.arrayTurnos.forEach((element: { profesional: { dni: any; }; estado: string; hora : any}) => {


        if(element.profesional.dni == this.especialistas[index].dni && element.estado == 'pendiente' && this.horasLunVie.includes(element.hora)){
          count2++;
          this.arrayNombresEspPend[index] = this.especialistas[index].apellido;
          this.arrayCantTurnosEspPend[index] = count2;
        }
      });
      
    }

    this.createChartDonut();

    this.horasLunVie = [
      '8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00',
      '17:30','18:00','18:30','19:00'
    ];

    this.arrayNombresEspPend = [];
    this.arrayCantTurnosEspPend = [];
  }

  generarArrayFin(){
    let charExiste = Chart.getChart('MyChartEspDiaFinal');
    if (charExiste != undefined)  {
      charExiste.destroy(); 
    }

    this.horasLunVie = this.horasLunVie.slice(this.horasLunVie.indexOf(this.horaDesde) + 1, this.horasLunVie.indexOf(this.horaHasta) + 1);
    for (let index = 0; index < this.especialistas.length; index++) {
        
      let count = 0
      let count2 = 0;
      console.log(this.arrayTurnos);
      this.arrayTurnos.forEach((element: { profesional: { dni: any; }; estado: string; hora : any}) => {


        console.log(element.hora);
        if(element.profesional.dni == this.especialistas[index].dni && element.estado == 'finalizado' && this.horasLunVie.includes(element.hora)){
          count2++;
          this.arrayNombresEspFin[index] = this.especialistas[index].apellido;
          this.arrayCantTurnosEspFin[index] = count2;
        }
      });
      
    }

    this.createChartLinea();

    this.horasLunVie = [
      '8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00',
      '17:30','18:00','18:30','19:00'
    ];
    this.arrayNombresEspFin = [];
    this.arrayCantTurnosEspFin = [];
    
  }

  createChartPie(){

    this.dataChartPie = {
      labels: ['Clinico', 'Cardiologo'],
      datasets: [{
        label: 'Cantidad Turnos',
        data: this.contadorPie,
        hoverOffset: 4
      }]
    };

    this.configChartPie = {
      type: 'pie',
      data: this.dataChartPie,
    };
  
    this.chartBarDia = new Chart("MyChart",
    this.configChartPie
  );
  }

  createChartLine(){

    this.dataChartPie = {
      labels: ['Lunes', 'Martes','Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      datasets: [{
        label: 'Cantidad Turnos',
        data: this.contadorDia,
        hoverOffset: 4
      }]
    };

    this.configChartPie = {
      type: 'bar',
      data: this.dataChartPie,
    };
  
    this.chartPie = new Chart("MyChartDias",
    this.configChartPie
  );
  }

  createChartDonut(){

    this.dataChartPie = {
      labels: this.arrayNombresEspPend,
      datasets: [{
        label: 'Cantidad Turnos',
        data: this.arrayCantTurnosEspPend,
        hoverOffset: 4
      }]
    };

    this.configChartPie = {
      type: 'doughnut',
      data: this.dataChartPie,
    };
  
    this.chartPie = new Chart("MyChartEspDiaPend",
    this.configChartPie
  );
  }

  createChartLinea(){

    this.dataChartPie = {
      labels: this.arrayNombresEspFin,
      datasets: [{
        label: 'Cantidad Turnos',
        data: this.arrayCantTurnosEspFin,
        hoverOffset: 4
      }]
    };

    this.configChartPie = {
      type: 'polarArea',
      data: this.dataChartPie,
    };
  
    this.chartPie = new Chart("MyChartEspDiaFinal",
    this.configChartPie
  );
  }

  downloadPDF() {
    // Extraemos el
    const DATA : any = document.getElementById('paginaGraficos');
    const doc = new jsPDF('p', 'pt', 'a4', true);
    const options = {
      background: 'white',
      scale: 1
    };

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();



      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight);
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_Graficos_Estadisticas_Turnos.pdf`);
    });


  }


}
