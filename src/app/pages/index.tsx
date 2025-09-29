// pages/index.tsx (or src/app/page.tsx if using App Router)
"use client"; // Add this for client-side functionality

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Changed from "next/router"
import Link from "next/link";
import { Recipe } from "@/app/types";
import RecipeCard from "@/app/components/RecipeCard";
import { db } from "@/app/lib/firebase";

export default function Home() {
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    const categories = ["Desserts", "Breads", "Savory"];
    const cuisines = ["Italian", "American", "French"];

    // Fetch all recipes from Firebase
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipesCollection = collection(db, "recipes");
                const recipesSnapshot = await getDocs(recipesCollection);
                const recipesData: Recipe[] = recipesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Recipe));

                setRecipes(recipesData);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) return <p className="p-6">Loading recipes...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-green-600">Recipe Garden 🌿</h1>
            <p className="mb-6">Curated with love, handwritten + online.</p>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="What do you want to cook?"
                className="border p-2 w-full rounded mb-6"
            />

            {/* Table of Contents */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">📚 Table of Contents</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-bold">By Category</h3>
                        <ul>
                            {categories.map((c) => (
                                <li key={c}><Link href={`/recipes?category=${c}`}>{c}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold">By Cuisine</h3>
                        <ul>
                            {cuisines.map((c) => (
                                <li key={c}><Link href={`/recipes?cuisine=${c}`}>{c}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Featured Recipes */}
            <section>
                <h2 className="text-xl font-semibold mb-2">✨ All Recipes</h2>
                <div className="grid md:grid-cols-2 gap-4 text-black">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} onClick={() => router.push(`/recipes/${recipe.id}`)} className="cursor-pointer">
                            <RecipeCard recipe={recipe} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}