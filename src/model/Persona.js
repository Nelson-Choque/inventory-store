export class Persona {
  constructor(
    codPersona,
    nombre,
    apellidos,
    dni,
    direccion,
    telefono,
    email,
    sexo,
    fechaDeNacimiento
  ) {
    this.codPersona = codPersona;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.dni = dni;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.sexo = sexo;
    this.fechaDeNacimiento = fechaDeNacimiento;
  }
}
