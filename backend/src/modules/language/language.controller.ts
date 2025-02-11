import { Controller, Post, Body, Req } from '@nestjs/common';
import { LanguageService } from './language.service';
import { StoresService } from '../stores/stores.service';

@Controller('language')
export class LanguageController {
  constructor(
    private readonly languageService: LanguageService,
    private readonly storesService: StoresService,
  ) {}

  @Post('change')
  async changeLanguage(@Req() req, @Body() body: { lang: string }) {
    if (!this.languageService.isValidLanguage(body.lang)) {
      return { error: 'Unsupported language' };
    }

    return this.storesService.updateStoreLanguage(req.store.id, body.lang);
  }
}
