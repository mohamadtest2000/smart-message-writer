export type Language = "ar" | "en";
export type Dialect = "fusha" | "saudi" | "gulf" | "egyptian" | "levantine";
export type Tone = "formal" | "friendly" | "professional" | "concise" | "emotional" | "funny";
export type Length = "short" | "medium" | "long";

export interface GenerateRequest {
  prompt: string;
  language: Language;
  dialect: Dialect;
  tone: Tone;
  length: Length;
}

export interface RefineRequest {
  text: string;
  action: "rewrite" | "improve" | "shorten" | "lengthen" | "translate";
  language?: Language;
}

export interface SavedMessage {
  id: string;
  prompt: string;
  content: string;
  language: Language;
  dialect: Dialect;
  tone: Tone;
  length: Length;
  createdAt: string;
  favorite: boolean;
}

export interface Template {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  icon: string;
  prompt: string;
  description: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
}
