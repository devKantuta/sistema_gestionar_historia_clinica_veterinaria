import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
/* modulo para formulario de base de plantilla */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



/* COMPONENTES */
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { FormTemplateComponent } from './helpers/form-template/form-template.component';
import { FormReactiveComponent } from './helpers/form-reactive/form-reactive.component';
import { NavComponent } from './shared/nav/nav.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { VetComponent } from './pages/vet/vet.component';
import { ClientComponent } from './pages/client/client.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { EspecieComponent } from './pages/especie/especie.component';
import { RazaComponent } from './pages/raza/raza.component';
import { HClinicoComponent } from './pages/h-clinico/h-clinico.component';
import { NewRazaComponent } from './pages/raza/new-raza/new-raza.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { FilterPipe } from './pipes/filter.pipe';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { FilterVetPipe } from './pipes/filter-vet.pipe';
import { RepoDiaComponent } from './pages/repo-dia/repo-dia.component';
import { ReporteSemenaComponent } from './pages/reporte-semena/reporte-semena.component';
import { ReporteSemenasComponent } from './pages/reporte-semenas/reporte-semenas.component';
import { ReporteCobrosComponent } from './pages/reporte-cobros/reporte-cobros.component';
import { FilterMascotaPipe } from './pipes/filter-mascota.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    FormTemplateComponent,
    FormReactiveComponent,
    NavComponent,
    SignupComponent,
    ServiciosComponent,
    VetComponent,
    ClientComponent,
    MascotaComponent,
    EspecieComponent,
    RazaComponent,
    HClinicoComponent,
    NewRazaComponent,
    HorarioComponent,
    FilterPipe,
    EmpleadoComponent,
    ConsultaComponent,
    FilterVetPipe,
    RepoDiaComponent,
    ReporteSemenaComponent,
    ReporteSemenasComponent,
    ReporteCobrosComponent,
    FilterMascotaPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
