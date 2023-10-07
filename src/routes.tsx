import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import MealList from "./pages/ReceitaGeral";
import MealListIngr from "./pages/ReceitaIngrediente";
import MealListN from "./pages/ReceitaNome";
import MealListByFirstLetter from "./pages/ReceitaLetra";
import RecipeDetail from "./pages/ReceitaDetalhe";

function RoutesApp() {
  const numberOfMealLists = 10; // Define o número de instâncias de MealList que você deseja renderizar

  const mealListRoutes = [];

  for (let i = 0; i < numberOfMealLists; i++) {
    mealListRoutes.push(
      <Route key={i} path={`/`} element={<MealList />} />
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="ReceitasGrupo">

        <Routes>
          {mealListRoutes}
        </Routes>
        <Routes>
          {mealListRoutes}
          
        </Routes> <Routes>
          {mealListRoutes}
        </Routes>
        <Routes>
          {mealListRoutes}
          
        </Routes>

        </div>

        <Routes>
          <Route path="/ReceitaNome" element={<MealListN/>}/>
          <Route path="/ReceitaIngrediente" element={<MealListIngr/>}/>
          <Route path="/ReceitaLetra" element={<MealListByFirstLetter/>}/>
          <Route path="/receita/:id" element={<RecipeDetail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesApp;
