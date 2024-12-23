import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiEmpleadoService } from 'src/app/services/empleado/api-empleado.service';
import { ReporteCobrosService } from 'src/app/services/reporte-cobros/reporte-cobros.service';
import { ReporteDiaService } from 'src/app/services/reporte-dia/reporte-dia.service';

import * as printJS from 'print-js';

@Component({
  selector: 'app-reporte-cobros',
  templateUrl: './reporte-cobros.component.html',
  styleUrls: ['./reporte-cobros.component.css'],
  providers: [DatePipe],
})
export class ReporteCobrosComponent {
  // VARIABLES
  listEmpleados: Array<any> = [];
  listData: Array<any> = [];
  textSearch: string = '';
  showme: boolean = true;
  precio_Total = 0;

  constructor(
    private dataPipe: DatePipe,
    private apiEmpleadoService: ApiEmpleadoService,
    private apiCobroService: ReporteCobrosService,
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
    this.apiCobroService.createData(body).subscribe((data) => {
      //console.log(data);
      this.listData = data;
      this.precio_Total = data[0].precio_total;
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
        "veterinario": "maria somo",
        "mascota": "kira",
        "num_hc": 591372,
        "sexo": "hembra",
        "fecha": "2024-12-05T04:00:00.000Z",
        "precio": "68.50"
      }
    */
    // Formatear todas las fechas en el array de objetos
    const reporteFormateado = jsonData.map((item: any) => {
      return {
        ...item,
        fecha: this.formatearFecha(item.fecha), 
        
      };
    });
    //console.log(jsonData[0]);
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
      documentTitle: 'REPORTE POR DINERO RECUDADO',
      printable: reporteFormateado,
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
         <section class="background"></section>
        <div class="h">
          <img src="assets/images/logo_vet.png"height="180px" alt="">
          <div class="datos">
            <h2>Dr. ${vet.veterinario.toUpperCase()}</h2>
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
