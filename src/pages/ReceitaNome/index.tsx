import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import "../styleReceitas.css";

function MealListN() {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mealName, setMealName] = useState('Arrabiata');

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);

        if (response.data.meals && Array.isArray(response.data.meals)) {
          setMeals(response.data.meals);
        } else {
          console.error('Resposta da API não contém a propriedade "meals" ou não é um array válido.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [mealName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealName(e.target.value);
  };

  return (
    <>
      <h1>Resultados de receitas</h1>
      <div className='ImputNome'>
        <input
          type="text"
          placeholder="Digite o nome da receita"
         
          onChange={handleInputChange}
        />
      </div>
      <div className='container-centro'>
        <div className='ReceitasNome'>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ul>
              {meals.map((meal: any) => (
                <li className="ListasReceitasT" key={meal.idMeal}>
                  <h2>{meal.strMeal}</h2>
                  <div className='ElementosReceita'>
                    
                    <Link to={`/receita/${meal.idMeal}`}>
                      <img src={meal.strMealThumb} alt={meal.strMeal} />
                    </Link>
                    <h4>{meal.strInstructions.slice(0, 150)}...</h4>
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

export default MealListN;
