import { Component } from '@angular/core';
import {DatePipe} from '@angular/common'
import { FormBuilder, Validators } from '@angular/forms';

import { ApiEmpleadoService } from 'src/app/services/empleado/api-empleado.service';

import { ReporteSemanasService } from 'src/app/services/reporte-semanas/reporte-semanas.service';

import * as printJS from 'print-js';

@Component({
  selector: 'app-reporte-semenas',
  templateUrl: './reporte-semenas.component.html',
  styleUrls: ['./reporte-semenas.component.css'],
  providers:[DatePipe],
})
export class ReporteSemenasComponent {
  // VARIABLES
  listEmpleados: Array<any> = [];
  listData: Array<any> = [];
  textSearch: string = '';
  showme: boolean = true;
  precio_Total = 0;

  constructor(
    private dataPipe: DatePipe,
    private apiEmpleadoService: ApiEmpleadoService,
    private apiReporteSemanasService: ReporteSemanasService,
    private fb: FormBuilder
  ) {}

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    fecha_ini: ['', Validators.required],
    fecha_fin: ['', Validators.required],
  });

  get id_empleado() {
    return this.formNewData.get('id_empleado');
  }

  get fecha_ini() {
    return this.formNewData.get('fecha_ini');
  }

  get fecha_fin() {
    return this.formNewData.get('fecha_fin');
  }

  ngOnInit(): void {
    this.getDataAllEmpleados();
  }

  //------ Obteniendo todas las especies

  private getDataAllEmpleados() {
    this.apiEmpleadoService.getAllData().subscribe((data) => {
      this.listEmpleados = data;
    });
  }
  //-----

  //cuando envies el formulario de raza
  submitDataForm() {
    const { fecha_ini, fecha_fin } = this.formNewData.value;
    const body = {
      fecha_ini: fecha_ini ?? '',
      fecha_fin: fecha_fin ?? '',
    };
    this.apiReporteSemanasService.createData(body).subscribe((data) => {
      //console.log(data);
      this.listData = data;
      this.precio_Total = data[0].precio_total;
      //console.log(this.precio_Total);
    });
    this.formNewData.reset();
  }

  showmeBtn() {
    this.showme = false;
  }
  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    
    // Establece la hora actual (por ejemplo, en este caso, hora exacta al momento de la conversión)
    const horaActual = new Date();
    date.setHours(
      horaActual.getHours(),
      horaActual.getMinutes(),
      horaActual.getSeconds()
    );

    return this.dataPipe.transform(date, 'dd/MM/yyyy HH:mm:ss')!;
    // Convierte la fecha a un formato legible, por ejemplo, 'dd/MM/yyyy'
    //return this.dataPipe.transform(fecha, 'dd/MM/yyyy HH:mm:ss')!;
  }

  printData(jsonData: any) {
    /* 
    {
  "id": 1,
  "id_hc": 4,
  "id_empleado": 1,
  "fecha_reg": "2024-12-18T04:00:00.000Z",
  "peso": "3",
  "temperatura": "33",
  "motivo": "fff",
  "diagnostico": "eeeeeeeee",
  "tratamiento": "eeeeeeeeeeee",
  "precio": "34.00",
  "precio_total": "148.00"
}
   */
    // Formatear todas las fechas en el array de objetos
    const reporteFormateado = jsonData.map((item:any) => {
      return {
        ...item,
        fecha_reg: this.formatearFecha(item.fecha_reg),
        'Temp(°C)': item.temperatura,
        'Peso(kg)': item.peso,
      };
    });
    //console.log("format:",reporteFormateado);
    const vet = jsonData[0];

    printJS({
      documentTitle: 'REPORTE POR GENERAL',
      printable: reporteFormateado,
      properties: [
        'veterinario',
        'mascota',
        'fecha_reg',
        'Peso(kg)',
        'Temp(°C)',
        'motivo',
        'diagnostico',
        'tratamiento',
        'precio',
      ],
      type: 'json',
      header: `
         <section class="background"></section>
        <div class="h">
          <img src="assets/images/logo_vet.png"height="180px" alt="">
          <div class="datos">
            <h2>VETERIANARIA ABY</h2>
            <h3>Medico Veterinario</h3>
            <h3>Registro:23432</h3>
            <h3>Direccion: C. Boliviar-Montero</h3>

          </div>
        </div>
        <hr>
        <h3  class = "text"> RECAUDADO TOTAL: ${vet.precio_total}Bs </h3>
        <hr/>
      `,
      style:
        '.text{color:#4e4949;font-family: Verdana,sans-serif; margin: 2px; }',
      gridHeaderStyle:
        'color: #fff;font-family: Verdana,sans-serif;background: #4757e4;',
      gridStyle: 'border: 1px solid #4757e4;text-align: center; ',
      css: ['assets/css/printJs.css'],
    });
  }
}
