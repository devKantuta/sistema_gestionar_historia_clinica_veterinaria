import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* COMPONENTS */
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { VetComponent } from './pages/vet/vet.component';
import { ClientComponent } from './pages/client/client.component';
import { NavComponent } from './shared/nav/nav.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { EspecieComponent } from './pages/especie/especie.component';
import { RazaComponent } from './pages/raza/raza.component';
import { HClinicoComponent } from './pages/h-clinico/h-clinico.component';
import { NewRazaComponent } from './pages/raza/new-raza/new-raza.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { RepoDiaComponent } from './pages/repo-dia/repo-dia.component';
import { ReporteSemenaComponent } from './pages/reporte-semena/reporte-semena.component';
import { ReporteSemenasComponent } from './pages/reporte-semenas/reporte-semenas.component';
import { ReporteCobrosComponent } from './pages/reporte-cobros/reporte-cobros.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  
  { path: 'dashboard', component: DashboardComponent,canActivate:[] },
  
  { path: 'servicios', component: ServiciosComponent,canActivate:[] },
  
  { path: 'vet', component: VetComponent, canActivate:[] },
  
  { path: 'clientes', component: ClientComponent, canActivate: [] },

  { path: 'home', component: NavComponent },
  

  /* SERVICIOS */
  
  
  { path: 'mascota', component: MascotaComponent, canActivate: [] },
  
  { path: 'especie', component: EspecieComponent, canActivate: [] },
  
  /* { path: 'servicio/raza/:id', component: RazaComponent, canActivate: [] }, */
  { path: 'raza', component: RazaComponent, canActivate: [] },
  
  { path: 'f-medica', component: HClinicoComponent, canActivate: [] },
  { path: 'consultas', component: ConsultaComponent, canActivate: [] },
  
  { path: 'turnos', component: HorarioComponent },
  { path: 'empleados', component: EmpleadoComponent },
  
  { path: 'reporte/dia', component: RepoDiaComponent },
  { path: 'reporte/semana', component: ReporteSemenaComponent },
  { path: 'reporte/cobros', component: ReporteCobrosComponent },
  { path: 'reporte/general', component: ReporteSemenasComponent },
  

  /* aqui tiene ir componente login-razacomponent-newRaza */
  { path: '', component: DashboardComponent },
  
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
