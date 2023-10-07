import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import "./styleReceitaGeral.css"

function MealList() {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchRandomMeal = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");

        if (response.data && response.data.meals && Array.isArray(response.data.meals)) {
          setMeals(response.data.meals);
          setLoading(false);
        } else {
          console.error('Resposta da API não contém a propriedade "meals" ou não é um array válido.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        setLoading(false); 
      }
    };

    fetchRandomMeal();
  }, []);

  return (
    <>
      <div className='ReceitasContainer'>
        <div className='ReceitasAleatorias'>
       
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ul>
              {meals.map((meal: any) => (
                <li key={meal.idMeal}>
                  <div className='Titulo'>
                  <h2>{meal.strMeal}</h2>
                  </div>
                  <div className='textoImg'>
                    <Link to={`/receita/${meal.idMeal}`}>
                      <img src={meal.strMealThumb} alt={meal.strMeal} />
                    </Link>
                    <h4>{meal.strInstructions.slice(0, 150  )}...</h4>
                  </div>
                  <a className='Linkyt' href={meal.strYoutube}>YouTube</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default MealList;
