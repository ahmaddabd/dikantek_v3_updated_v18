import { Injectable } from '@nestjs/common';

@Injectable()
export class LanguageService {
  private languages = ['ar', 'en', 'fr']; // اللغات المدعومة

  isValidLanguage(lang: string): boolean {
    return this.languages.includes(lang);
  }
}
