import React from "react";
import { ClipLoader } from "react-spinners";
import "../styles/Spinner.css";

const CarregandoSpinner = ({ texto = "Carregando...", fullscreen = false }) => {
  return (
    <div className={fullscreen ? "carregando-fullscreen" : "carregando"}>
      <ClipLoader color="#ff9f1c" size={40} />
      <p>{texto}</p>
    </div>
  );
};

export default CarregandoSpinner;
