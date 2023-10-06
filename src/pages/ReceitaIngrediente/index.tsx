import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importe o componente Link do React Router

function MealListIngr() {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ingredient, setIngredient] = useState("chicken");

  useEffect(() => {
    const fetchReceitas = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );

        if (response.data.meals && Array.isArray(response.data.meals)) {
          setMeals(response.data.meals);
        } else {
          console.error("Resposta da API não contém o que você solicitou");
        }
      } catch (error) {
        console.error("Erro na busca de dados na API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceitas();
  }, [ingredient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  return (
    <div> 
      <h1>Receitas por Ingrediente</h1>
      <div className='ImputNome'>
        <input
          type="text"
          placeholder="Digite um ingrediente"
         
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
                <li className="ListaReceitaNome" key={meal.idMeal}>
                  <h2>{meal.strMeal}</h2>
                  <div className='ElementosReceita'>
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
    </div>
  );
}

export default MealListIngr;
