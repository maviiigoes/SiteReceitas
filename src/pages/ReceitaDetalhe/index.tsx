import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./styleReceitaDetalhe.css"

interface Recipe {
  strYoutube: string;
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: { ingredient: string; measure: string }[];
}

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

        if (response.data && response.data.meals && Array.isArray(response.data.meals)) {
          const meal = response.data.meals[0];
          const ingredients = [];

          // Loop para coletar ingredientes e medidas
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim() !== '') {
              ingredients.push({ ingredient, measure });
            }
          }

          // Defina o estado com os dados da receita formatados
          setRecipe({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strInstructions: meal.strInstructions,
            ingredients,
            strYoutube: meal.strYoutube
          });
        } else {
          console.error('Resposta da API não contém a propriedade "meals" ou não é um array válido.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <div className="RecipeDetail">
      {recipe ? (
        <div>
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3>Ingredientes:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.measure} {ingredient.ingredient}
              </li>
            ))}
          </ul>
          <h3>Instruções:</h3>
          <p>{recipe.strInstructions}</p>
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
            Ver vídeo no YouTube
          </a>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default RecipeDetail;
