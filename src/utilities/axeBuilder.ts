import { Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const rules = [
  'best-practices',
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22aa',
];

export const axeAnalyze = async (page: Page) =>
  new AxeBuilder({ page }).withTags(rules).analyze();
