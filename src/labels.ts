import type { DeckId, Item } from '@/domain/content/types';

/** What each deck is called. */
export const deckTitles: Readonly<Record<DeckId, string>> = {
  definitions: 'Definitionen',
  theorems: 'Verfahren und Sätze',
  claims: 'Wahr oder falsch',
  problems: 'Aufgaben',
};

/** What each kind of item is called. */
export const kindLabels: Readonly<Record<Item['kind'], string>> = {
  definition: 'Definition',
  theorem: 'Verfahren / Satz',
  claim: 'Wahr oder falsch?',
  problem: 'Aufgabe',
};

/** What a statement being tested asks for. */
export const kindPrompts: Readonly<Record<'definition' | 'theorem', string>> = {
  definition: 'Wie lautet die Definition?',
  theorem: 'Wie geht das Verfahren, was sagt der Satz – mit Voraussetzungen und Aufwand?',
};

/** A day relative to today in words: 0 is today, 1 tomorrow, anything else "in n Tagen". */
export function inDays(days: number): string {
  if (days <= 0) {
    return 'heute';
  }

  return days === 1 ? 'morgen' : `in ${String(days)} Tagen`;
}
