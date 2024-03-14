import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

function Home() {
  const { loading, recipeList } = useContext(GlobalContext);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            No recipes to show
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
