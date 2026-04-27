// Departamentos de El Salvador según Ministerio de Hacienda
export const DEPARTAMENTOS = [
  { codigo: '01', nombre: 'Ahuachapán' },
  { codigo: '02', nombre: 'Santa Ana' },
  { codigo: '03', nombre: 'Sonsonate' },
  { codigo: '04', nombre: 'Chalatenango' },
  { codigo: '05', nombre: 'La Libertad' },
  { codigo: '06', nombre: 'San Salvador' },
  { codigo: '07', nombre: 'Cuscatlán' },
  { codigo: '08', nombre: 'La Paz' },
  { codigo: '09', nombre: 'Cabañas' },
  { codigo: '10', nombre: 'San Vicente' },
  { codigo: '11', nombre: 'Usulután' },
  { codigo: '12', nombre: 'San Miguel' },
  { codigo: '13', nombre: 'Morazán' },
  { codigo: '14', nombre: 'La Unión' },
] as const;

// Municipios de El Salvador (muestra representativa)
// Formato: { depto: código departamento, codigo: código municipio, nombre: nombre }
export const MUNICIPIOS = [
  // Ahuachapán (01)
  { depto: '01', codigo: '01', nombre: 'Ahuachapán' },
  { depto: '01', codigo: '03', nombre: 'Atiquizaya' },

  // Santa Ana (02)
  { depto: '02', codigo: '10', nombre: 'Santa Ana' },
  { depto: '02', codigo: '03', nombre: 'Chalchuapa' },

  // Sonsonate (03)
  { depto: '03', codigo: '11', nombre: 'Sonsonate' },

  // La Libertad (05)
  { depto: '05', codigo: '06', nombre: 'Santa Tecla' },
  { depto: '05', codigo: '01', nombre: 'Antiguo Cuscatlán' },
  { depto: '05', codigo: '11', nombre: 'Colón' },

  // San Salvador (06)
  { depto: '06', codigo: '14', nombre: 'San Salvador' },
  { depto: '06', codigo: '17', nombre: 'Soyapango' },
  { depto: '06', codigo: '08', nombre: 'Mejicanos' },
  { depto: '06', codigo: '07', nombre: 'Ilopango' },

  // Cuscatlán (07)
  { depto: '07', codigo: '01', nombre: 'Cojutepeque' },

  // Usulután (11)
  { depto: '11', codigo: '15', nombre: 'Usulután' },

  // San Miguel (12)
  { depto: '12', codigo: '01', nombre: 'San Miguel' },

  // La Unión (14)
  { depto: '14', codigo: '08', nombre: 'La Unión' },
] as const;

// Función helper para obtener municipios de un departamento
export const getMunicipiosByDepartamento = (codigoDepartamento: string) => {
  return MUNICIPIOS.filter(m => m.depto === codigoDepartamento);
};

// Función helper para obtener nombre de departamento
export const getDepartamentoNombre = (codigo: string) => {
  return DEPARTAMENTOS.find(d => d.codigo === codigo)?.nombre || '';
};

// Función helper para obtener nombre de municipio
export const getMunicipioNombre = (
  codigoDepartamento: string,
  codigoMunicipio: string
) => {
  return (
    MUNICIPIOS.find(
      m => m.depto === codigoDepartamento && m.codigo === codigoMunicipio
    )?.nombre || ''
  );
};
