import { Link } from "react-router-dom";
import "./style.css";

export function Header() {
  return (
    <header className="BarraNav1">
      <div>
        <Link className="Logo" to={'/'}>
          <img src="../Receitas_do_Chef.png" alt="" />
        </Link>
      </div>
      <div className="options">
        <Link className="LinkOption" to={'/ReceitaNome'}>
          Pesquisa por nome
        </Link>
        <Link className="LinkOption" to={'/ReceitaLetra'}>
          Pesquisa por Letra
        </Link>
        <Link className="LinkOption" to={'/ReceitaIngrediente'}>
          Pesquisa por Ingrediente
        </Link>
      </div>
    </header>
  );
}
