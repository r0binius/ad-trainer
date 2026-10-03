import type { Topic } from '@/domain/content/types';

import { avl } from './topics/avl';
import { bBaeume } from './topics/b-baeume';
import { binaerbaeume } from './topics/binaerbaeume';
import { graphen } from './topics/graphen';
import { komplexitaet } from './topics/komplexitaet';
import { rekursion } from './topics/rekursion';
import { sortieren } from './topics/sortieren';
import { spannbaeume } from './topics/spannbaeume';
import { suchbaeume } from './topics/suchbaeume';
import { traversierung } from './topics/traversierung';
import { wege } from './topics/wege';

/** Everything the trainer teaches, in the order of the lecture's slide decks (1a to 3d). */
export const topics: readonly Topic[] = [
  rekursion,
  komplexitaet,
  sortieren,
  graphen,
  traversierung,
  spannbaeume,
  wege,
  binaerbaeume,
  suchbaeume,
  avl,
  bBaeume,
];
