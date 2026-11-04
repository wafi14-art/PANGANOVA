import id from './dictionaries/id.json';
import en from './dictionaries/en.json';
import { Language } from '@/types';

export const dictionaries = {
  id,
  en,
};

export const defaultLanguage: Language = 'id';

export function getDictionary(lang: Language) {
  return dictionaries[lang] || dictionaries[defaultLanguage];
}

