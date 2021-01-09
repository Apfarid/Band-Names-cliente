import React, { useState } from "react";

const BandAdd = ({ crearBand }) => {
  const [valor, setValor] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (valor.trim().length > 0) {
      //TODO: llamar la funcion para emitir el evento
      crearBand(valor);
      setValor("");
    }
  };

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de la banda"
          value={valor}
          onChange={(ev) => setValor(ev.target.value)}
        />
      </form>
    </>
  );
};

export default BandAdd;
