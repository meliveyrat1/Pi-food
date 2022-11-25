import React from "react";
import "./Paginado.css";

export default function Paginado({ recipesPerPage, currentPage, allRecipes, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
     
      <div className="paginado">
        {pageNumber &&
          pageNumber.map((number) => (
            <button
              className="number"
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}

      </div>


        {/* <div className='flechas-container'>
        {
          currentPage > 1 ? <button className='flechas' onClick={() => paginado(currentPage - 1)}> ❮ </button> :
            <button className='flechas' disabled> ❮ </button>
        }
        {
          currentPage < pageNumber.length ? <button className='flechas' onClick={() => paginado(currentPage + 1)}> ❯ </button> :
            <button className='flechas' disabled> ❯ </button>
        }
      </div>  */}
    </nav>
  );
}
