export type Ingredient = {
  name: string;
  quantity: string;
};

export interface TimerItem {
  label: string;
  duration: number; // minutes
}

export interface Recipe {
  id?: string;
  title: string;
  cuisine: string; // e.g., "Italian", "Mexican"
  category: string; // e.g., "Dessert", "Main Course"
  prepTime: number; // minutes
  cookTime: number; // minutes
  difficulty?: "Easy" | "Medium" | "Hard";
  ingredients: Ingredient[];
  instructions: string[];
  substitutes?: Record<string, string[]>; // e.g. { butter: ["margarine","oil"] }
  handwrittenFile?: string; // url
  season?: string[]; // e.g. ["spring","summer"]
  timers?: TimerItem[];
  image?: string;
}

export interface Conversion {
  id: string;
  from: string; // "cups"
  to: string;   // "grams"
  ingredient: string; // "flour"
  factor: number;
}
