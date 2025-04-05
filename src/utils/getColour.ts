export function getColorById(id: number): string {
  const colors = [
    'Rojo',
    'Verde',
    'Azul',
    'Amarillo',
    'Naranja',
    'Rosa',
    'Morado',
    'Gris',
    'Negro',
    'Blanco',
  ];

  return colors[(id - 1) % 10];
}
