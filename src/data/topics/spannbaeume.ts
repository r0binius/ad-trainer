import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 2b, second part: spanning trees and minimum spanning trees with Kruskal and Prim. */
export const spannbaeume = topic({
  id: 'spannbaeume',
  chapter: '2b',
  title: 'Spannbäume',
  summary: 'Spannbaum, minimaler Spannbaum, Greedy-Prinzip, Algorithmen von Kruskal und Prim.',
  definitions: [
    {
      id: 'spannbaum',
      title: 'Spannbaum',
      ref: '2b · Lösung – Spannbaum erstellen (1)',
      statement: r`Ein Teilgraph $B$ ist ein **Spannbaum** eines Graphen $G$, wenn

- in $B$ **keine Zyklen** existieren und
- $B$ **alle Knoten** von $G$ enthält (und zusammenhängend ist).`,
      note: r`Anwendung Verkabelung: jedes Gerät erreichbar, aber keine Zyklen (im Bus-System problematisch) und kein Kabel zu viel. Ein Spannbaum hat genau $|V| - 1$ Kanten. Zu einem Graphen kann es **mehrere** Spannbäume geben.`,
    },
    {
      id: 'gewicht-spannbaum',
      title: 'Gewicht eines Spannbaums, minimaler Spannbaum',
      ref: '2b · Minimale Spannbäume',
      statement: r`In einem Graphen mit Kantenmarkierung $c$ ist das **Gewicht** eines Spannbaums $B = (V, T)$ die Summe der Gewichte seiner Kanten:

$$c(B) = \sum_{e \in T} c(e)$$

$B$ heißt **minimaler Spannbaum** von $G$, wenn für **jeden** Spannbaum $B' = (V, T')$ von $G$ gilt: $c(B) \le c(B')$.`,
      note: r`„$\le$“, nicht „$<$“: Bei gleichen Kantengewichten kann es mehrere minimale Spannbäume geben. Ziel 3 der Verkabelung: möglichst kurze Kabel.`,
    },
    {
      id: 'greedy',
      title: 'Greedy-Prinzip',
      ref: '2b · Finden minimaler Spannbäume (1) – Kruskal',
      statement: r`**Greedy:** Entscheide aufgrund des Wissens, das **aktuell** vorliegt, und **revidiere diese Entscheidung nie**.`,
      note: r`Effizient im Gegensatz zu Verfahren, die Lösungen ausprobieren, bewerten und gegebenenfalls zurücknehmen (Backtracking). Greedy liefert nicht für jedes Problem das Optimum – für minimale Spannbäume (Kruskal, Prim) und kürzeste Wege ohne negative Gewichte (Dijkstra) aber schon.`,
    },
    {
      id: 'steiner',
      title: 'Steiner-Baum',
      ref: '2b · Zusammenfassung minimale Spannbäume',
      statement: r`Ein **Steiner-Baum** ist ein minimaler Spannbaum auf einem Teilgraphen, der mindestens eine **gegebene Menge von Knoten** enthält – weitere Knoten dürfen mitbenutzt werden, müssen aber nicht.`,
      note: r`„Wir wollen auf jeden Fall Frankfurt, Wiesbaden und Offenbach verbinden und dürfen dabei Kabel durch andere Städte legen.“ Schon diese kleine Änderung der Aufgabe führt zu einem Problem, für das **kein effizienter Algorithmus bekannt** ist – ebenso eine Schranke auf den maximalen Knotengrad.`,
    },
  ],
  theorems: [
    {
      id: 'zyklen-entfernen',
      title: 'Spannbaum durch Entfernen von Zyklen',
      ref: '2b · Lösung – Spannbaum erstellen (1)',
      statement: r`Solange noch mindestens ein Zyklus im Graphen ist: Entferne eine **beliebige** Kante aus dem Zyklus.

**Begründung:** In einem Zyklus ist jeder Knoten von jedem anderen auf mindestens zwei Wegen erreichbar. Nach dem Entfernen einer Kante existiert mindestens einer davon noch – der Graph bleibt zusammenhängend.`,
      note: r`Test auf Zyklen per DFS: Kommt man zu einem besuchten Knoten zurück, ist ein Zyklus gefunden – Aufwand $\Oh(\max(|V|, |E|))$, meist $\Oh(|E|)$. Das Ergebnis ist irgendein Spannbaum, nicht unbedingt ein „guter“.`,
    },
    {
      id: 'kruskal',
      title: 'Algorithmus von Kruskal',
      ref: '2b · Finden minimaler Spannbäume – Kruskal',
      statement: r`Gegeben $G = (V, E)$ mit Markierung $c$; gesucht ein minimaler Spannbaum $B = (V, T)$.

~~~
T = {}
sortiere die Kanten nach ihrem Gewicht
für jede Kante e, beginnend mit dem niedrigsten Gewicht:
  falls T + {e} einen Zyklus bilden würde: verwerfen
  sonst: T = T + {e}
~~~

Fertig, sobald $|V| - 1$ Kanten gewählt sind.

Aufwand: Sortieren der Kanten $\Oh(|E| \log |E|)$, Test auf Zyklen ebenfalls $\Oh(|E| \log |E|)$ → **Gesamtaufwand $\Oh(|E| \log |E|)$**.`,
      note: r`Greedy über **Kanten** (Joseph Kruskal, 1956). Zwischendurch kann $T$ aus mehreren getrennten Teilen bestehen. Der Zyklentest lässt sich als Test auf verschiedene **Komponenten** umsetzen: Liegen beide Endknoten schon in derselben Komponente, entstünde ein Zyklus.`,
    },
    {
      id: 'prim',
      title: 'Algorithmus von Prim',
      ref: '2b · Komplexität minimaler Spannbaum – Kruskal und Prim',
      statement: r`~~~
V' = { beliebiger Anfangsknoten a }
T  = {}
wiederhole |V| - 1 mal:
  e = Kante (u, v) mit u in V' und v nicht in V'
      und minimalem Gewicht c
  V' = V' + {v}
  T  = T + {e}
~~~

Gewählt wird nicht einfach die leichteste Kante, sondern die leichteste, die **genau einen** bereits verbundenen Knoten $u$ hat.

Aufwand mit Vorrangwarteschlange (priority queue): $\Oh(|E| + |V| \log |V|)$.`,
      note: r`**Vorteil:** kein Test auf Zyklen nötig – ein Endknoten ist immer neu. **Nachteil:** zusätzliche Datenstruktur $V'$. Der Baum wächst zusammenhängend von einem Startknoten aus (Greedy über Knoten). Manchmal wird auch Dijkstra als Autor genannt.`,
    },
    {
      id: 'kantenzahl',
      title: 'Kantenzahl im Spannbaum',
      ref: '2b · Komplexität minimaler Spannbaum',
      statement: r`Um einen Graphen mit $|V|$ Knoten zu verbinden, braucht man **genau $|V| - 1$ Kanten**.

In zusammenhängenden Graphen gilt daher $|E| \ge |V| - 1$.`,
      note: r`Deshalb läuft die Schleife bei Prim genau $|V| - 1$ mal, und Kruskal kann nach $|V| - 1$ gewählten Kanten aufhören. Weitere Verbesserungen: Cheriton und Tarjan $\Oh(|E| \log \log |V|)$; für planare Graphen $\Oh(|V|)$.`,
    },
  ],
  claims: [
    {
      id: 'eindeutig',
      statement: r`Zu jedem zusammenhängenden Graphen gibt es genau einen Spannbaum.`,
      holds: false,
      reason: r`Beim Entfernen von Zyklen wird jedes Mal eine **beliebige** Kante gewählt – verschiedene Wahlen führen zu verschiedenen Spannbäumen.`,
    },
    {
      id: 'kanten-n-1',
      statement: r`Jeder Spannbaum eines Graphen mit 8 Knoten hat genau 7 Kanten.`,
      holds: true,
      reason: r`Ein Baum mit $n$ Knoten hat genau $n - 1$ Kanten: weniger, und er wäre nicht zusammenhängend; mehr, und er hätte einen Zyklus.`,
    },
    {
      id: 'kruskal-zusammenhaengend',
      statement: r`Bei Kruskal ist die Kantenmenge $T$ nach jedem Schritt ein zusammenhängender Baum.`,
      holds: false,
      reason: r`Kruskal wählt global die leichteste Kante – $T$ kann zwischendurch aus mehreren getrennten Teilbäumen bestehen. Zusammenhängend wächst der Baum bei **Prim**.`,
    },
    {
      id: 'prim-zyklentest',
      statement: r`Der Algorithmus von Prim braucht keinen Test auf Zyklen.`,
      holds: true,
      reason: r`Jede gewählte Kante verbindet einen Knoten aus $V'$ mit einem Knoten außerhalb – ein Zyklus kann so nicht entstehen. Dafür muss $V'$ mitgeführt werden.`,
    },
    {
      id: 'leichteste-kante',
      statement: r`Die Kante mit dem kleinsten Gewicht in einem Zyklus ist nie Teil eines minimalen Spannbaums.`,
      holds: false,
      reason: r`Umgekehrt: Kruskal nimmt die leichtesten Kanten zuerst. Verworfen wird eine Kante nur, wenn sie mit **bereits gewählten** (leichteren) Kanten einen Zyklus schließt – also die schwerste des Zyklus.`,
    },
    {
      id: 'greedy-revidieren',
      statement: r`Kruskal nimmt eine einmal gewählte Kante später wieder heraus, wenn sich eine bessere findet.`,
      holds: false,
      reason: r`Greedy heißt: Entscheidungen werden nie revidiert. Eine Kante wird einmal betrachtet und endgültig aufgenommen oder verworfen.`,
    },
    {
      id: 'steiner-effizient',
      statement: r`Der Steiner-Baum lässt sich mit Kruskal genauso effizient berechnen wie der minimale Spannbaum.`,
      holds: false,
      reason: r`Schon die kleine Änderung „nur eine Teilmenge der Knoten muss verbunden werden“ ergibt ein Problem, für das kein effizienter Algorithmus bekannt ist.`,
    },
    {
      id: 'kruskal-aufwand',
      statement: r`Der Aufwand von Kruskal wird vom Sortieren der Kanten bestimmt und liegt in $\Oh(|E| \log |E|)$.`,
      holds: true,
      reason: r`Sortieren (z. B. Heapsort) kostet $\Oh(|E| \log |E|)$, der Zyklentest ebenfalls – zusammen $\Oh(|E| \log |E|)$.`,
    },
  ],
  problems: [
    {
      id: 'kruskal-folien',
      title: 'Kruskal durchführen',
      source: 'nach 2b · Finden minimaler Spannbäume (2)',
      points: 7,
      task: r`Ein Graph mit den Knoten 1 bis 8 hat diese Kanten (schon nach Gewicht sortiert):

~~~
(1,2) 5    (3,4) 5    (2,3) 6    (3,6) 7
(4,6) 8    (1,5) 9    (5,6) 11   (5,7) 14
(4,8) 14   (7,8) 16   (2,7) 19   (1,7) 22
~~~

Bestimme mit Kruskal einen minimalen Spannbaum. Gib für jede Kante an, ob sie aufgenommen oder verworfen wird, und das Gesamtgewicht.`,
      solution: r`~~~
(1,2) 5    aufnehmen
(3,4) 5    aufnehmen
(2,3) 6    aufnehmen    verbindet {1,2} mit {3,4}
(3,6) 7    aufnehmen
(4,6) 8    verwerfen    Zyklus 3-4-6
(1,5) 9    aufnehmen
(5,6) 11   verwerfen    Zyklus 5-1-2-3-6
(5,7) 14   aufnehmen
(4,8) 14   aufnehmen    7 Kanten = |V| - 1, fertig
~~~

Die restlichen Kanten $(7,8)$, $(2,7)$, $(1,7)$ würden alle Zyklen schließen.

$T = \{(1,2), (3,4), (2,3), (3,6), (1,5), (5,7), (4,8)\}$ mit Gewicht $5 + 5 + 6 + 7 + 9 + 14 + 14 = 60$.`,
    },
    {
      id: 'prim-kruskal-vergleich',
      title: 'Prim und Kruskal im Vergleich',
      source: 'nach 2b · Kruskal und Prim',
      points: 7,
      task: r`Gegeben der ungerichtete Graph mit den gewichteten Kanten

~~~
A-B 4    A-C 2    B-C 1    B-D 5    C-D 8
C-E 10   D-E 2    D-F 6    E-F 3
~~~

- (a) Bestimme den minimalen Spannbaum mit **Prim**, Start in A. Gib die Reihenfolge der gewählten Kanten an.
- (b) In welcher Reihenfolge wählt **Kruskal** die Kanten?
- (c) Vergleiche Ergebnis und Gewicht.`,
      solution: r`**(a) Prim ab A:**

- $V' = \{A\}$: Kandidaten A-B 4, A-C 2 → **A-C (2)**
- $V' = \{A, C\}$: A-B 4, B-C 1, C-D 8, C-E 10 → **B-C (1)**
- $V' = \{A, B, C\}$: B-D 5, C-D 8, C-E 10 → **B-D (5)**
- $V' = \{A, B, C, D\}$: D-E 2, D-F 6, C-E 10 → **D-E (2)**
- $V' = \{A, \dots, E\}$: E-F 3, D-F 6 → **E-F (3)**

**(b) Kruskal:** B-C (1), A-C (2), D-E (2), E-F (3), A-B (4) verwerfen (Zyklus A-B-C), B-D (5) → fertig mit 5 Kanten.

**(c)** Beide liefern denselben Baum $\{$A-C, B-C, B-D, D-E, E-F$\}$ mit Gewicht $2 + 1 + 5 + 2 + 3 = 13$ – nur die Reihenfolge unterscheidet sich: Prim wächst zusammenhängend, Kruskal hat zwischendurch zwei getrennte Teile ($\{A, B, C\}$ und $\{D, E, F\}$).`,
    },
    {
      id: 'verkabelung',
      title: 'Verkabelung: wie viele Kabel?',
      source: 'nach 2b · Spannbäume – Anwendungsbeispiel Verkabelung',
      points: 4,
      task: r`8 Geräte sollen über ein Bus-System verkabelt werden; es gibt 12 mögliche Kabelkanäle. Jedes Gerät soll erreichbar sein, Zyklen sind nicht erlaubt.

- (a) Wie viele Kanäle werden belegt, wie viele bleiben leer?
- (b) Warum bleibt beim Entfernen einer Kante aus einem Zyklus alles erreichbar?
- (c) Welches zusätzliche Ziel führt zum minimalen Spannbaum?`,
      solution: r`**(a)** Ein Spannbaum mit 8 Knoten hat 7 Kanten – 7 Kanäle belegt, 5 bleiben leer.

**(b)** In einem Zyklus ist jeder Knoten von jedem anderen auf mindestens zwei Wegen erreichbar. Fällt eine Kante weg, bleibt der Weg „außen herum“.

**(c)** Jeder Kabelabschnitt bekommt eine Länge (Kantengewicht); gesucht ist die **kürzeste** Verkabelung – der Spannbaum mit minimaler Summe der Kantengewichte.`,
    },
  ],
});
