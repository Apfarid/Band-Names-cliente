import React, { useEffect, useState } from "react";
import BandAdd from "./components/BandAdd";
import BandList from "./components/BandList";
import io from "socket.io-client";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer);
  const [online, setOnline] = useState(false);
  const [band, setBand] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBand(bands);
    });
  }, [socket]);

  const votar = (id) => {
    socket.emit("votar-banda", id);
  };

  // Borrar banda
  const borrarBand = (id) => {
    socket.emit("barrar-banda", id);
  };

  // Editar banda
  const editarBand = (id, nombre) => {
    socket.emit("editar-banda", { id, nombre });
  };

  // Crear banda
  const crearBand = (nombre) => {
    socket.emit("nueva-banda", { nombre });
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Services status:
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Offline</span>
          )}
        </p>
      </div>
      <h1>BadNames</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          {" "}
          <BandList
            data={band}
            votar={votar}
            borrarBand={borrarBand}
            editarBand={editarBand}
          />
        </div>
        <div className="col-4">
          <BandAdd crearBand={crearBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
