function random_num(min:number, max:number):number {
  return Math.round(min + Math.random() * (max - min));
}

function idUnique():string {
  return ('' + new Date().getTime()).substring(7);
}

function formatDate(isoString:string) {
  const date = new Date(isoString); // Convierte el string ISO en un objeto Date
  const day = String(date.getUTCDate()).padStart(2, '0'); // Día con dos dígitos
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mes con dos dígitos (los meses son base 0)
  const year = date.getUTCFullYear(); // Año

  //return `${day}/${month}/${year}`;
  return `${month}/${day}/${year}`;
}

function idUniqueBasee36() {
  const value = Math.random().toString(36).substring(2, 7);
  return value.toUpperCase();
}


function calcularEdadDetallada(fechaNacimiento:string):string {
  const hoy = new Date(); // Fecha actual
  const nacimiento = new Date(fechaNacimiento); // Fecha de nacimiento

  // Asegúrate de que la fecha de nacimiento es válida
  if (isNaN(nacimiento.getTime())) {
    return "Fecha inválida";
  }

  // Validar que la fecha de nacimiento no sea futura
  if (nacimiento > hoy) {
    return "La fecha de nacimiento no puede ser futura";
  }

  // Calcular diferencia en milisegundos
  const diferencia = hoy.getTime() - nacimiento.getTime();
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  // Si tiene menos de un mes (aproximadamente 30 días)
  if (dias < 30) {
    return `${dias} días`;
  }

  // Calcular meses completos
  let meses = (hoy.getMonth() + 12 * hoy.getFullYear()) - 
              (nacimiento.getMonth() + 12 * nacimiento.getFullYear());
  
  // Ajustar si el día del mes actual es menor que el día de nacimiento
  if (hoy.getDate() < nacimiento.getDate()) {
    meses--;
  }

  // Si tiene menos de un año
  if (meses < 12) {
    return `${meses} meses`;
  }

  // Calcular años
  const años = Math.floor(meses / 12);
  return `${años} años`;
}
function calcularEdadF_Nac_F_Actula(fechaNacimiento: string ,fechaActual:string): string {
  const hoy = new Date(fechaActual); // Fecha actual
  const nacimiento = new Date(fechaNacimiento); // Fecha de nacimiento

  // Asegúrate de que la fecha de nacimiento es válida
  if (isNaN(nacimiento.getTime())) {
    return 'Fecha inválida';
  }

  // Validar que la fecha de nacimiento no sea futura
  if (nacimiento > hoy) {
    return 'La fecha de nacimiento no puede ser futura';
  }

  // Calcular diferencia en milisegundos
  const diferencia = hoy.getTime() - nacimiento.getTime();
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  // Si tiene menos de un mes (aproximadamente 30 días)
  if (dias < 30) {
    return `${dias} días`;
  }

  // Calcular meses completos
  let meses =
    hoy.getMonth() +
    12 * hoy.getFullYear() -
    (nacimiento.getMonth() + 12 * nacimiento.getFullYear());

  // Ajustar si el día del mes actual es menor que el día de nacimiento
  if (hoy.getDate() < nacimiento.getDate()) {
    meses--;
  }

  // Si tiene menos de un año
  if (meses < 12) {
    return `${meses} meses`;
  }

  // Calcular años
  const años = Math.floor(meses / 12);
  return `${años} años`;
}


function incrementNro(nro: number) {
  nro++;
  return nro;
}

export {
  random_num,
  idUnique,
  formatDate,
  idUniqueBasee36,
  calcularEdadDetallada,
  calcularEdadF_Nac_F_Actula,
  incrementNro
};
