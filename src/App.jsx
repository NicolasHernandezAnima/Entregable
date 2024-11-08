import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import groceries from "./components/products";

function App() {
  const [carrito, setCarrito] = useState({});

  const agregarAlCarrito = (item) => {
    setCarrito((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        cantidad: (prev[item.id]?.cantidad || 0) + 1,
      },
    }));
  };

  const eliminarUno = (id) => {
    setCarrito((prev) => {
      const newCantidad = prev[id].cantidad - 1;
      if (newCantidad <= 0) {
        const { [id]: _, ...rest } = prev; 
        return rest;
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          cantidad: newCantidad,
        },
      };
    });
  };

  const eliminarTodo = () => {
    setCarrito({}); 
  };

  const calcularTotal = () => {
    return Object.values(carrito)
      .reduce((total, item) => total + item.unitPrice * item.cantidad, 0)
      .toFixed(2);
  };

  return (
    <div className="container">
      <div className="column">
        <h1>Productos disponibles</h1>
        <div>
          {groceries.map((item) => (
            <button
              key={item.id}
              onClick={() => agregarAlCarrito(item)}
              className="itemButton"
            >
              ⨁ {item.name} - ${item.unitPrice.toFixed(2)}
            </button>
          ))}
        </div>
      </div>

      <div className="column">
        <h1>Carrito de compras</h1>
        {Object.keys(carrito).length === 0 ? (
          <p>
            Por favor, seleccione uno o más productos para agregar al carrito.
          </p>
        ) : (
          <>
            <div>
              {Object.values(carrito).map((item) => (
                <button
                  key={item.id}
                  onClick={() => eliminarUno(item.id)}
                  className="itemButton"
                >
                  ⨂ {item.name} - ${item.unitPrice.toFixed(2)} ∘ Cantidad:{" "}
                  {item.cantidad}
                </button>
              ))}
            </div>
            <div className="totalContainer">
              <button className="total">Total: ${calcularTotal()}</button>
              <button onClick={eliminarTodo} className="clearButton">
                Eliminar Todo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
