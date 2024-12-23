import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent {
  // Array de panels con la información necesaria
  panels = [
    {
      title: 'Explore The World',
      imageUrl:
        'https://www.pequedogs.com/wp-content/uploads/2023/02/schnauzer-salud-4.jpg',
      title2:'Reservas al 7347388 ó 3345789'
    },
    {
      title: 'Wild Forest',
      imageUrl:
        'https://mundovets.com/wp-content/uploads/2022/06/mascotas-favoritas-profesionales-veterinarios.jpg',
      title2:'Reservas al 7347388 ó 3345789'
    },
    {
      title: 'Sunny Beach',
      imageUrl:
        'https://rs.projects-abroad.ie/v1/hero/product-5b55f04ccfd0f.[1600].jpeg',
      title2:'Reservas al 7347388 ó 3345789'
    },
    {
      title: 'City on Winter',
      imageUrl:
        'https://www.universodelasaludanimal.com/wp-content/uploads/sites/61/2022/09/Vacina-para-gado-na-mao-de-um-veterinario-que-esta-na-frente-de-duas-vacas.jpg',
      title2:'Reservas al 7347388 ó 3345789'
    },
    {
      title: 'Mountains - Clouds',
      imageUrl:
        'https://img.freepik.com/fotos-premium/veterinario-ropa-esteril-controlando-salud-pollos-moderna-granja-avicola_1042628-506531.jpg',
      title2:'Reservas al 7347388 ó 3345789'
    },
  ];

  // Índice del panel activo
  activePanelIndex: number = 0;

  // Función para cambiar el panel activo
  setActivePanel(index: number): void {
    this.activePanelIndex = index;
  }
}
