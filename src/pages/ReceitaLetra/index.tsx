import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styleReceitaLetra.css";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

function MealListByFirstLetter() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLetter, setSearchLetter] = useState("a");

  useEffect(() => {
    const fetchMealsByLetter = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`
        );

        if (response.data.meals && Array.isArray(response.data.meals)) {
          setMeals(response.data.meals);
          setLoading(false);
        } else {
          console.error("Resposta da API não contém o que você solicitou");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro na busca de dados na API", error);
        setLoading(false);
      }
    };

    fetchMealsByLetter();
  }, [searchLetter]);

  const handleSearchLetterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLetter(event.target.value);
  };

  return (
    <>
      <h1>Receitas por Letra</h1>
      <div className="ImputNome">
        
        <input 
        placeholder="Digite a primeira letra:"
          type="text"
          id="searchLetter"
         
          onChange={handleSearchLetterChange}
        />
      </div>
      <div className='container-centro'> 
        <div className='ReceitasNome'>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ul>
              {meals.map((meal) => (
                <li className="ListaReceitaNome" key={meal.idMeal}>
                  <h2>{meal.strMeal}</h2>
                  <div className="ElementosReceita">
                    {/* Adicione um Link em torno da imagem que aponta para a página de detalhes */}
                    <Link to={`/receita/${meal.idMeal}`}>
                      <img src={meal.strMealThumb} alt={meal.strMeal} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default MealListByFirstLetter;
