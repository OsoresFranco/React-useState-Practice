import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {
// Creación de Hook para recibir datos del Formulario
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

// Funcion para actualizar datos en base al formulario
  const handleChange = e => {
    setCita({
        ...cita,
        [e.target.name]: e.target.value
    })
  }

const [errorMsg, setErrorMsg] = useState(false)

// Extraer los valores (destructuring)
const {mascota, propietario, fecha, hora, sintomas} = cita;

// Función al enviar el formulario
const agendarCita = e =>{
    //Previene el submit automatico (Query String)
    e.preventDefault();

    //Validacion
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
        setErrorMsg(true)
        return;
    }
    setErrorMsg(false)


    //Generar Id (uso de uuid-v4)
    cita.id = uuidv4();

    // Crear Funcion que guarde las citas
    crearCita(cita)
    // Form Reset
    setCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: ""
    })
}

  return (
    <>
      <h2>Crear Cita</h2>
      {errorMsg ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
      <form
        id="formulario"
        onSubmit={agendarCita}
      >
        <label>Nombre de la Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre de tu mascota"
          onChange={handleChange}
          value={mascota}
          required
        />

        <label>Nombre del Propietario</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre y Apellido"
          onChange={handleChange}
          value={propietario}
          required
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleChange}
          value={fecha}
          required
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleChange}
          value={hora}
          required
        />

        <label>Síntomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={handleChange}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agendar Cita
        </button>
      </form>
    </>
  );
};

export default Formulario;
