// components/RecipeCard.tsx
import Link from "next/link";
import { Recipe } from "@/app/types";

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="rounded-2xl shadow p-4 bg-white">
      <h2 className="text-xl font-bold mb-1">{recipe.title}</h2>
      <p className="text-sm text-gray-600">
        {recipe.cuisine} | {recipe.category}
      </p>
      <p className="text-sm">⏱ {totalTime} min ({recipe.difficulty})</p>
      {recipe.season && <p className="text-green-600">🌱 In Season!</p>}
      {recipe.handwrittenFile && (
        <a href={recipe.handwrittenFile} className="text-blue-600 underline">
          🖋 Handwritten
        </a>
      )}
      <Link href={`/recipes/${recipe.id}`} className="block mt-2 text-green-700 font-semibold">
        View Recipe →
      </Link>
    </div>
  );
}
