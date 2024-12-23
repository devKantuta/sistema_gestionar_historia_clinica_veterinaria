import { Component } from '@angular/core';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css'],
})
export class FormTemplateComponent {

  messageError: string = "";
  fname: string = '';
  pwd: string = '';
  rol: string = '';
  roles: string[] = ['front-end', 'back-end', 'full-stak'];

  showMessage:string = '';
  selectedValue: string = ''; // Valor por defect

  onSubmit(form:any) {
    if (form.valid) {
      console.log('Datos:', form.value);
      alert(`Formulario enviado: ${JSON.stringify(form.value)}`);
      this.showMessage = form.value;
      form.reset();
    } else {
      alert('Seleccione todos los campos');
    }
  }
  
}
