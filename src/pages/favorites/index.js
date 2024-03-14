import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

function Favorites() {
  const { favorites } = useContext(GlobalContext);
  console.log("Favorites", favorites);
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favorites && favorites.length > 0 ? (
        favorites.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            No favorites yet. Add some recipes.
          </p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
