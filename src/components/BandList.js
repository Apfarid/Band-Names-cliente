import React, { useEffect, useState } from "react";

const BandList = ({ data, votar, borrarBand, editarBand }) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const cambioNombre = (e, id) => {
    const nuevoNombre = e.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const onPerdioFoco = (id, nombre) => {
    //TODO: Dispara el evento de socket
    editarBand(id, nombre);
  };

  const crearRows = () => {
    return bands.map((map) => (
      <tr key={map.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(map.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={map.name}
            onChange={(e) => cambioNombre(e, map.id)}
            onBlur={() => onPerdioFoco(map.id, map.name)}
          />
        </td>
        <td>
          <h3>{map.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => borrarBand(map.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};

export default BandList;
