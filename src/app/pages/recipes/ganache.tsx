// pages/recipes/ganache.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { Recipe } from "@/app/types";

export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query; // e.g. "Ganache"
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Fetch recipe from Firestore
  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", String(id));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data() as Recipe);
        } else {
          console.error("Recipe not found");
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Ingredient checklist toggle
  const toggleCheck = (item: string) => {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Timer logic
  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  if (loading) return <p className="p-6">Loading recipe...</p>;
  if (!recipe) return <p className="p-6">Recipe not found 😢</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <p>{recipe.cuisine} | {recipe.category} | {recipe.difficulty}</p>

      {/* Ingredients Checklist */}
      <section className="my-4">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul>
          {recipe.ingredients?.map((ing) => (
            <li key={ing.name}>
              <label>
                <input
                  type="checkbox"
                  checked={checked.includes(ing.name)}
                  onChange={() => toggleCheck(ing.name)}
                />
                {ing.quantity} {ing.name}
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      <section className="my-4">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <ol className="list-decimal ml-5">
          {recipe.instructions?.map((step, i) => (
            <li key={i} className="mb-1">{step}</li>
          ))}
        </ol>
      </section>

      {/* Timer */}
      <section className="my-4">
        <h2 className="text-xl font-semibold">⏱ Timer</h2>
        <button
          onClick={() => startTimer(60)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Start 1-min Timer
        </button>
        {timeLeft > 0 && <p className="mt-2">Time left: {timeLeft}s</p>}
      </section>

      {/* Conversion Widget Placeholder */}
      <section className="my-4">
        <h2 className="text-xl font-semibold">⚖️ Conversion</h2>
        <p>(e.g., Cups → Grams depending on ingredient)</p>
      </section>
    </div>
  );
}