import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ApiRazaService } from 'src/app/services/api-raza/api-raza.service';
import { ApiSpecieService } from 'src/app/services/specie/api-specie.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-raza',
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.css'],
})
export class RazaComponent implements OnInit {
  // VARIABLES
  onShowComponentRaza: boolean = false;
  showUpdateComponent: boolean = false;
  bodyUpdate = {
    id: 0,
    nombre: '',
    descripcion: '',
    id_especie:0,
  };

  listEspecies: Array<any> = [];
  listData: Array<any> = [];
  textSearch: string = '';
  /* para recupera el id en una route o link 
  route_id: ActivatedRoute = inject(ActivatedRoute);
  id_recovery = 0;
  */

  constructor(
    private apiRazaService: ApiRazaService,
    private apiEspecieService: ApiSpecieService,
    private router: Router,
    private fb: FormBuilder
  ) {
    //this.id_recovery = this.route_id.snapshot.params['id'];
  }

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    id_especie: ['', Validators.required],
  });

  get nombre() {
    return this.formNewData.get('nombre');
  }

  get descripcion() {
    return this.formNewData.get('descripcion');
  }

  get id_especie() {
    return this.formNewData.get('id_especie');
  }

  closeFormRaza() {
    this.onShowComponentRaza = false;
    this.formNewData.reset();
  }

  ngOnInit(): void {
    this.getAllData();
    this.getAllDataEspecies();
  }

  //------ Obteniendo todas las especies
  private getAllDataEspecies() {
    this.apiEspecieService.getAllData().subscribe((data) => {
      this.listEspecies = data;
    });
  }
  //-----
  /*  getRazaById(): void {
    this.serviceRaza.requestRazaById(this.id_recovery).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  } */
  
  
  
  /* LOGICAS PARA LOS GET,POST,ETC PARA CARGAR LA INTERFAZ */

  getAllData(): void {
    this.apiRazaService.getAllData().subscribe((data) => {
      console.log(data);
      this.listData = data;
    });
  }

  //delete Data
  deleteDataTable(id: number) {
    this.apiRazaService.deleteData(id).subscribe((data) => {
      this.getAllData();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  showFormRaza() {
    this.onShowComponentRaza = !this.onShowComponentRaza;
  }

  //cuando envies el formulario de raza
  submitDataForm() {
    const { nombre, descripcion ,id_especie} = this.formNewData.value;
    const body = {
      nombre: nombre ?? '',
      descripcion: descripcion ?? '',
      id_especie: Number(id_especie),
    };
    this.apiRazaService.createData(body).subscribe((data) => {
      this.getAllData();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
    this.onShowComponentRaza = !this.onShowComponentRaza;
    this.formNewData.reset();
  }

  // click  en boton update
  btnUpdateDataIcon(body: any) {
    this.bodyUpdate = body;
    this.formNewData.patchValue({
      nombre: body.nombre,
      descripcion: body.descripcion,
      id_especie:body.id_especie,
    });
    this.showUpdateComponent = !this.showUpdateComponent;
  }
  //Boton de cerrar en el formulario
  closeFormRazaUpdate() {
    this.showUpdateComponent = !this.showUpdateComponent;
  }
  submitUpdateData(): void {
    const { nombre, descripcion ,id_especie} = this.formNewData.value;
    const editBody = {
      id: this.bodyUpdate.id,
      nombre: nombre ?? '',
      descripcion: descripcion ?? '',
      id_especie : Number(id_especie)
    };
    this.apiRazaService.updateData(editBody).subscribe((data) => {
      this.getAllData();
      
      //alert(data.message)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.reset();
  }
}
