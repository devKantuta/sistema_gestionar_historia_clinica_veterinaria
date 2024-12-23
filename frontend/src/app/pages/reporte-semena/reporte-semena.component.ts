import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiEmpleadoService } from 'src/app/services/empleado/api-empleado.service';
import { ReporteDiaService } from 'src/app/services/reporte-dia/reporte-dia.service';
import { ReporteSemanaService } from 'src/app/services/reporte-semana/reporte-semana.service';

import * as printJS from 'print-js';

@Component({
  selector: 'app-reporte-semena',
  templateUrl: './reporte-semena.component.html',
  styleUrls: ['./reporte-semena.component.css'],
})
export class ReporteSemenaComponent {
  // VARIABLES
  listEmpleados: Array<any> = [];
  listData: Array<any> = [];
  textSearch: string = '';
  showme: boolean = true;
  precio_Total = 0;

  constructor(
    private apiEmpleadoService: ApiEmpleadoService,
    private apiReporteSemanaService: ReporteSemanaService,
    private fb: FormBuilder
  ) {}

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    id_empleado: ['', Validators.required],
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
    const { id_empleado, fecha_ini, fecha_fin } = this.formNewData.value;
    const body = {
      id: Number(id_empleado),
      fecha_ini: fecha_ini ?? '',
      fecha_fin: fecha_fin ?? '',
    };
    this.apiReporteSemanaService.createData(body).subscribe((data) => {
      console.log(data);
      this.listData = data;
      this.precio_Total = data[0].precio_total;
    });
    this.formNewData.reset();
  }

  showmeBtn() {
    this.showme = false;
  }
  printData(jsonData: any) {
    /* 
      {
        "veterinario": "maria somo",
        "mascota": "kira",
        "num_hc": 591372,
        "sexo": "hembra",
        "fecha": "2024-12-05T04:00:00.000Z",
        "precio": "68.50"
      }
    */
    console.log(jsonData[0]);
    const vet = jsonData[0];
 /*    const data = {
      fecha: formatDate(jsonData.fecha_reg),
      hc: jsonData.num_hc,
      veterinario: jsonData.veterinario,
      'peso(kg)': jsonData.peso,
      'temperatura(°C)': jsonData.temperatura,
      motivo: jsonData.motivo,
      diagnostico: jsonData.diagnostico,
      tratamiento: jsonData.tratamiento,
      'precio(Bs)': jsonData.precio,
    }; */

    printJS({
      documentTitle: 'REPORTE POR SEMANA',
      printable: jsonData,
      properties: [
        'veterinario',
        'mascota',
        'num_hc',
        'sexo',
        'fecha',
        'precio',
      ],
      type: 'json',
      header: `
        <h2  class = "text"> Veterinari@: ${vet.veterinario.toUpperCase()} </h2>
        <hr/>
      `,
      style: '.text{color:#4e4949;font-family: Verdana,sans-serif;}',
      gridHeaderStyle:
        'color: #fff;font-family: Verdana,sans-serif;background: #4757e4;',
      gridStyle: 'border: 1px solid #4757e4;text-align: center; ',
    });
  }
}
