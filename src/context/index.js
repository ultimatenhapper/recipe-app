import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data.data.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavorites(currentItem) {
    let copyFavorites = [...favorites];
    const index = copyFavorites.findIndex((item) => item.id === currentItem.id);
    if (index === -1) {
      copyFavorites.push(currentItem);
    } else {
      copyFavorites.splice(index);
    }

    setFavorites(copyFavorites);
  }

  return (
    <GlobalContext.Provider
      value={{
        favorites,
        handleAddToFavorites,
        handleSubmit,
        loading,
        recipeList,
        searchParam,
        recipeDetails,
        setRecipeDetails,
        setSearchParam,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
