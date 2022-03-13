import React, { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }
  //Crear state para mantener el listado de Citas
  const [listaCitas, setListaCitas] = useState(citasIniciales);
  //Funcion que toma las citas del Formulario y las guarda en el state
  const crearCita = (cita) => {
    setListaCitas([...listaCitas, cita]);
  };
  //Funcion para eliminar Cita
  const eliminarCita = (id) => {
    let newListaCitas = listaCitas.filter((citas) => citas.id !== id);
    setListaCitas(newListaCitas);
  };

  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(listaCitas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
}, [listaCitas] );

  return (
    <>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>

          <div className="one-half column">
            {listaCitas.length === 0 ? (
              <h2>No hay Citas agendadas</h2>
            ) : (
              <h2>Administra tus citas</h2>
            )}
            {listaCitas.map((cita) => {
              return (
                <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
