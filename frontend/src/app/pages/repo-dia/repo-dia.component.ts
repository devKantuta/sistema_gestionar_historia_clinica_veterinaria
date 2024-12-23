import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiEmpleadoService } from 'src/app/services/empleado/api-empleado.service';
import { ReporteDiaService } from 'src/app/services/reporte-dia/reporte-dia.service';

import * as printJS from 'print-js';
import { formatDate } from 'src/app/helpers/helper';

@Component({
  selector: 'app-repo-dia',
  templateUrl: './repo-dia.component.html',
  styleUrls: ['./repo-dia.component.css'],
})
export class RepoDiaComponent {
  // VARIABLES
  listEmpleados: Array<any> = [];
  listData: Array<any> = [];
  textSearch: string = '';
  showme: boolean = true;
  precio_Total = 0;

  constructor(
    private apiEmpleadoService: ApiEmpleadoService,
    private apiReporteDiaService: ReporteDiaService,
    private fb: FormBuilder
  ) {}

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    id_empleado: ['', Validators.required],
    fecha_ini: ['', Validators.required],
  });

  get id_empleado() {
    return this.formNewData.get('id_empleado');
  }

  get fecha_ini() {
    return this.formNewData.get('fecha_ini');
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
    const { id_empleado, fecha_ini } = this.formNewData.value;
    const body = {
      id: Number(id_empleado),
      fecha: fecha_ini ?? '',
    };
    this.apiReporteDiaService.createData(body).subscribe((data) => {
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
    const data = {
      fecha: formatDate(jsonData.fecha_reg),
      hc: jsonData.num_hc,
      veterinario: jsonData.veterinario,
      'peso(kg)': jsonData.peso,
      'temperatura(°C)': jsonData.temperatura,
      motivo: jsonData.motivo,
      diagnostico: jsonData.diagnostico,
      tratamiento: jsonData.tratamiento,
      'precio(Bs)': jsonData.precio,
    };

    printJS({
      documentTitle: 'REPORTE POR DIA',
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
