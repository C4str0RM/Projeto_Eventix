import React from "react";
import { ClipLoader } from "react-spinners";

export const CarregandoSpinner = ({ texto = "Carregando..." }) => (
  <div className="carregando">
    <ClipLoader color="#ff9f1c" size={40} />
    <p>{texto}</p>
  </div>
);

export default CarregandoSpinner;
