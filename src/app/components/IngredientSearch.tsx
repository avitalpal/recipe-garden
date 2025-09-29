import { Recipe } from "@/app/types";

type MatchResult = {
  recipe: Recipe;
  missing: string[];          // ingredients the user doesn't have (after checking substitutes)
  usedSubstitutes: Record<string,string>; // e.g. { butter: "margarine" }
  matchType: "perfect"|"near"|"no";
};

function findMatches(recipes: Recipe[], pantry: string[]): MatchResult[] {
  const pantrySet = new Set(pantry.map(p => p.toLowerCase()));
  const results: MatchResult[] = [];

  for (const r of recipes) {
    const missing: string[] = [];
    const usedSubstitutes: Record<string,string> = {};

    for (const ing of r.ingredients) {
      const name = ing.name.toLowerCase();
      if (pantrySet.has(name)) continue;

      // check substitutes defined in recipe
      const subs = r.substitutes?.[name] ?? [];
      const foundSub = subs.find(s => pantrySet.has(s.toLowerCase()));
      if (foundSub) {
        usedSubstitutes[name] = foundSub;
        continue;
      }

      // not found nor substitute
      missing.push(name);
    }

    const matchType = missing.length === 0 ? "perfect" : (missing.length <= 2 ? "near" : "no");
    results.push({ recipe: r, missing, usedSubstitutes, matchType });
  }

  // sort: perfect first, then near (fewest missing), then others
  return results.sort((a,b) => {
    if (a.matchType === b.matchType) return a.missing.length - b.missing.length;
    if (a.matchType === "perfect") return -1;
    if (b.matchType === "perfect") return 1;
    if (a.matchType === "near") return -1;
    return 1;
  });
}

export default findMatches;