import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 2b, third part: shortest paths with brute force, Moore, Dijkstra and Bellman-Ford. */
export const wege = topic({
  id: 'wege',
  chapter: '2b',
  title: 'Kürzeste Wege',
  summary:
    'Wegeproblem, Brute Force, Moore, Dijkstra, Optimalitätsprinzip, Bellman-Ford, negative Gewichte.',
  definitions: [
    {
      id: 'kuerzester-weg',
      title: 'Gewicht eines Weges, kürzester Weg, Distanz',
      ref: '2b · (Dijkstra) Formal: Kürzeste Wege',
      statement: r`Das **Gewicht** eines Weges $p = v_1, v_2, \dots, v_k$ in einem Graphen mit Kantenmarkierung $c$ ist die Summe der Gewichte seiner Kanten:

$$c(p) = \sum_{i=1}^{k-1} c((v_i, v_{i+1}))$$

Der **kürzeste Weg** zwischen $u$ und $v$ ist der Weg mit **minimalem Gewicht**; dieses Gewicht heißt **Distanz** zwischen $u$ und $v$.`,
      note: r`In unmarkierten Graphen nimmt man jedes Gewicht implizit als 1 an, dann ist $c(p) = |p|$ (Beispiel: Hops in Computernetzen). Gewichte können Entfernung, Zeit, Kosten oder Risiko bedeuten.`,
    },
    {
      id: 'varianten',
      title: 'Varianten des Wegeproblems',
      ref: '2b II · Main variants of the problem',
      statement: r`- **Single-pair shortest path**: kürzester Weg von $s$ nach $t$
- **Single-source shortest path (SSSP)**: kürzeste Wege von einem Startknoten $s$ zu **allen** anderen Knoten
- **All-pairs shortest path (APSP)**: kürzeste Wege zwischen **allen** Knotenpaaren

Welcher Algorithmus:

- **BFS / Moore** → ungewichtete Graphen (alle Gewichte 1)
- **Dijkstra** → nicht negative Gewichte
- **Bellman-Ford** → auch negative Gewichte`,
    },
    {
      id: 'relaxation',
      title: 'Kantenrelaxation (edge relaxation)',
      ref: '2b II · Approach: Ants – Dijkstra',
      statement: r`Die Kernoperation aller Kürzeste-Wege-Verfahren: Prüfe, ob der Weg über $u$ die bisher bekannte Distanz von $v$ verbessert.

$$d(v) = \min\bigl(d(v),\ d(u) + w(u, v)\bigr)$$

Bei einer Verbesserung wird zusätzlich $u$ als **Vorgänger** von $v$ gemerkt.`,
      note: r`In der Ameisen-Fassung: „Hat die Nachbarstadt eine Kennzahl größer der Summe, streiche die Kennzahl und die Markierung, weise die Summe als neue Kennzahl zu und markiere die Strecke zur aktuellen Stadt.“`,
    },
    {
      id: 'mengen-m1-m2-m3',
      title: 'Die Mengen M₁, M₂, M₃ bei Dijkstra',
      ref: '2b · Nochmal zurück zu Dijkstra',
      statement: r`Jeder Knoten gehört zu genau einer von drei Mengen:

- $M_1$: **gewählte Knoten** – alle $u$, für die der kürzeste Pfad von $s$ nach $u$ schon bekannt ist (settled)
- $M_2$: **Randknoten** – alle $v$, die über eine Kante von einem Knoten aus $M_1$ erreichbar sind (frontier)
- $M_3$: **unerreichte Knoten** – alle anderen`,
      note: r`$M_1$ wächst in jedem Schritt um genau ein Element: den Randknoten mit der kleinsten vorläufigen Distanz. $M_3$ wird nur implizit geführt. Fertig, wenn $M_2$ leer ist.`,
    },
    {
      id: 'label-setting-correcting',
      title: 'Label-Setting und Label-Correcting',
      ref: '2b II · Label-Setting vs. Label-Correcting Algorithms',
      statement: r`**Label-Setting** (z. B. Dijkstra):

- sobald die Distanz eines Knotens festgelegt ist, ist sie **endgültig**
- die Greedy-Wahl ist gültig (Optimalitätsprinzip), verlangt aber **nicht negative** Kantengewichte

**Label-Correcting** (z. B. Bellman-Ford):

- Distanzen können **mehrfach korrigiert** werden, bis nichts mehr besser wird
- funktioniert mit negativen Kantengewichten und erkennt negative Zyklen`,
      note: r`Dijkstra = greedy, endgültige Entscheidungen. Bellman-Ford = iterativ, revidierbare Entscheidungen.`,
    },
    {
      id: 'negativer-zyklus',
      title: 'Negativer Zyklus',
      ref: '2b · Algorithmus von Bellmann-Ford',
      statement: r`Ein **negativer Zyklus** ist ein Zyklus, dessen Kantengewichte in der Summe negativ sind.

Enthält ein Graph einen (vom Start erreichbaren) negativen Zyklus, gibt es **keinen kürzesten Weg**: Mit jeder Runde im Kreis wird der Weg günstiger.`,
      note: r`Folge: Bellman-Ford geht nur mit **gerichteten** Graphen – im ungerichteten wäre jede negative Kante schon ein negativer Zyklus (hin und zurück). In der Praxis selten: beim E-Auto wäre es ein Perpetuum mobile.`,
    },
  ],
  theorems: [
    {
      id: 'brute-force',
      title: 'Brute Force für das Wegeproblem',
      ref: '2b · 1. Ansatz: Brute Force',
      statement: r`Einfachster Algorithmus: **alle Möglichkeiten ausprobieren** (hier per Backtracking). Abschätzung nach oben im vollständigen Graphen: $n$ Städte → $(n-1)!$ verschiedene Wege mit je $(n-1)$ Streckenabschnitten.

$$\Oh(n \cdot n!)$$`,
      note: r`5 Knoten: 120 Strecken. 10 Knoten: 3 628 800. Alle 12 903 Gemeinden Deutschlands: etwa $9{,}88 \cdot 10^{47\,438}$. „Wir können nicht alles ausprobieren.“`,
    },
    {
      id: 'moore',
      title: 'Algorithmus von Moore',
      ref: '2b · Single Source Problem – Algorithmus von Moore',
      statement: r`Kürzeste Wege von einem Startknoten $s$ zu allen anderen – **nur für Kanten mit Gewicht 1**. Im Wesentlichen eine BFS-Traversierung:

~~~
markiere alle Knoten mit Entfernung ∞
markiere Startknoten s mit Entfernung 0
Warteschlange W mit Inhalt (s)
solange W nicht leer:
  nimm ersten Knoten f aus W und entferne ihn aus W
  e = Entfernung(f)
  für jeden Nachbarn n von f:
    falls Entfernung(n) = ∞:
      W = W + (n)
      setze Entfernung(n) = e + 1
~~~

Aufwand: $\Oh(\max(|E|, |V|))$.`,
      note: r`Die Entfernung ∞ dient zugleich als „noch nicht besucht“-Markierung. Einfacher und schneller als Dijkstra – wenn alle Kantengewichte 1 sind, Moore verwenden.`,
    },
    {
      id: 'optimalitaetsprinzip',
      title: 'Optimalitätsprinzip',
      ref: '2b · Nochmal zurück zu Dijkstra',
      statement: r`Für jeden kürzesten Pfad $p = v_1, v_2, \dots, v_k$ von $v_1$ nach $v_k$ ist **jeder Teilpfad** $p' = v_i, \dots, v_j$ mit $1 \le i < j \le k$ ein kürzester Pfad von $v_i$ nach $v_j$.

**Beweis:** Angenommen nicht – dann gäbe es einen kürzeren Pfad $p'' \ne p'$ zwischen $v_i$ und $v_j$. Ersetzt man in $p$ den Teilpfad $p'$ durch $p''$, erhält man einen kürzeren Pfad von $v_1$ nach $v_k$. Widerspruch.`,
      note: r`Darauf beruht die Korrektheit von Dijkstra. Mit **negativen** Kantengewichten kann ein zunächst länger erscheinender Weg später doch der kürzeste werden – die Greedy-Wahl ist dann nicht mehr gültig.`,
    },
    {
      id: 'dijkstra',
      title: 'Algorithmus von Dijkstra',
      ref: '2b II · Dijkstra – Complete Algorithm',
      statement: r`Kürzeste Wege von $s$ zu allen Knoten bei **nicht negativen** Kantengewichten. $g(v)$ ist die bisher beste Distanz.

~~~
für alle v in V: g(v) = ∞
M1 = {s}; M2 = {}; g(s) = 0
für alle Nachbarn v von s:           // Rand initialisieren
  M2 = M2 + {v}; g(v) = c((s, v))

solange M2 nicht leer:
  v = Knoten in M2 mit minimalem g(v)
  M2 = M2 \ {v}; M1 = M1 + {v}       // v ist endgültig
  für alle Nachbarn w von v:
    falls w in M3:
      M2 = M2 + {w}; g(w) = g(v) + c((v, w))
    sonst falls g(w) > g(v) + c((v, w)):
      g(w) = g(v) + c((v, w))        // kürzerer Weg gefunden
~~~`,
      note: r`Ameisen-Bild: Die aktuelle Stadt ist immer die noch nicht rote Stadt mit der **kleinsten Kennzahl**; sie wird rot (endgültig). Es funktioniert auch, wenn ein Knoten zuerst über einen längeren Weg erreicht wird – seine Kennzahl wird später korrigiert, solange er nicht rot ist.`,
    },
    {
      id: 'dijkstra-aufwand',
      title: 'Aufwand und Varianten von Dijkstra',
      ref: '2b · Aufwand / Komplexität von Dijkstra',
      statement: r`Der Aufwand liegt im Wesentlichen bei der **Bestimmung des minimalen Randelements**:

- Rand als **Liste**: $\Oh(|V|^2)$
- Rand als **Vorrangwarteschlange**: $\Oh(|E| \log |V|)$
- alle Kantengewichte 1: besser Moore mit $\Oh(\max(|E|, |V|))$

Varianten:

- **Weg selbst speichern**: zu jedem Knoten den Vorgänger mitführen; diese Kanten bilden einen Spannbaum (Kürzeste-Wege-Baum)
- **nur ein Zielknoten**: abbrechen, sobald er nach $M_1$ versetzt wird`,
      note: r`Bidirektional: Dijkstra von Start und Ziel gleichzeitig laufen lassen und stoppen, sobald ein gemeinsamer Knoten von beiden Seiten endgültig ist.`,
    },
    {
      id: 'bellman-ford',
      title: 'Algorithmus von Bellman-Ford',
      ref: '2b · Algorithmus von Bellmann-Ford',
      statement: r`Löst das Wegeproblem auch mit **negativen Kantengewichten** (gerichteter Graph, keine negativen Zyklen).

~~~
g(s) = 0
für alle anderen Knoten v: g(v) = ∞
führe |V| - 1 mal aus:
  für jeden Pfeil (v, w) in A:
    falls g(w) > g(v) + c((v, w)):
      g(w) = g(v) + c((v, w))
      p(w) = v                       // Vorgänger merken
für jeden Pfeil (v, w) in A:         // Prüfung
  falls g(w) > g(v) + c((v, w)):
    negativer Zyklus gefunden! Abbruch!
~~~

Aufwand: äußere Schleife $|V| - 1$ mal, innere $\Oh(|A|)$ → **$\Oh(|V| \cdot |A|)$**.`,
      note: r`Iteriert über **Kanten**, nicht über Knoten. Warum $|V| - 1$ Runden? Pro Runde wächst der „optimale Weg“ um mindestens eine Kante, und ein zyklenfreier Weg hat höchstens $|V| - 1$ Kanten. Ist danach noch eine Verbesserung möglich, gibt es einen negativen Zyklus.`,
    },
  ],
  claims: [
    {
      id: 'dijkstra-negativ',
      statement: r`Dijkstra liefert auch bei negativen Kantengewichten immer die kürzesten Wege, solange es keinen negativen Zyklus gibt.`,
      holds: false,
      reason: r`Mit negativen Gewichten kann ein Knoten, der schon in $M_1$ (endgültig) ist, nachträglich einen kürzeren Weg bekommen – das korrigiert Dijkstra nicht. Dafür gibt es Bellman-Ford.`,
      ref: '2b II · Dijkstra: Edge Weight Constraints',
    },
    {
      id: 'moore-gewichte',
      statement: r`Der Algorithmus von Moore funktioniert für beliebige positive Kantengewichte.`,
      holds: false,
      reason: r`Nur für Kanten mit Gewicht 1: Er zählt Kanten (BFS-Ebenen). Bei unterschiedlichen Gewichten kann ein Weg mit mehr Kanten kürzer sein.`,
    },
    {
      id: 'teilpfad',
      statement: r`Jeder Teilpfad eines kürzesten Pfades ist selbst ein kürzester Pfad zwischen seinen Endknoten.`,
      holds: true,
      reason: r`Das ist das Optimalitätsprinzip: Gäbe es einen kürzeren Teilpfad, könnte man ihn einsetzen und den Gesamtpfad verkürzen.`,
    },
    {
      id: 'bf-runden',
      statement: r`Bellman-Ford braucht höchstens $|V| - 1$ Durchläufe der äußeren Schleife.`,
      holds: true,
      reason: r`Ein zyklenfreier Weg enthält höchstens $|V| - 1$ Kanten, und pro Durchlauf wächst der schon korrekt berechnete Teil jedes optimalen Wegs um mindestens eine Kante.`,
    },
    {
      id: 'bf-ungerichtet',
      statement: r`Bellman-Ford lässt sich auf ungerichtete Graphen mit negativen Kantengewichten anwenden.`,
      holds: false,
      reason: r`Im ungerichteten Graphen ist jede negative Kante ein negativer Zyklus: immer vor- und zurücklaufen macht den Weg beliebig günstig.`,
    },
    {
      id: 'dijkstra-m1',
      statement: r`Bei Dijkstra wächst die Menge $M_1$ in jedem Schritt um genau einen Knoten.`,
      holds: true,
      reason: r`In jedem Schritt wird der Randknoten mit minimalem $g(v)$ aus $M_2$ nach $M_1$ verschoben. Seine Distanz ist dann endgültig.`,
    },
    {
      id: 'brute-force-polynomiell',
      statement: r`Alle Wege durchzuprobieren hat polynomiellen Aufwand.`,
      holds: false,
      reason: r`Im vollständigen Graphen gibt es $(n-1)!$ Wege mit je $n - 1$ Abschnitten: $\Oh(n \cdot n!)$ – schlimmer als exponentiell.`,
    },
    {
      id: 'dijkstra-pq',
      statement: r`Mit einer Vorrangwarteschlange für den Rand erreicht Dijkstra $\Oh(|E| \log |V|)$.`,
      holds: true,
      reason: r`Der teure Teil ist die Suche nach dem minimalen Randelement. Mit Liste kostet das insgesamt $\Oh(|V|^2)$, mit Vorrangwarteschlange $\Oh(|E| \log |V|)$.`,
    },
    {
      id: 'bf-iteriert-knoten',
      statement: r`Bellman-Ford wählt wie Dijkstra in jedem Schritt den Knoten mit der kleinsten vorläufigen Distanz.`,
      holds: false,
      reason: r`Bellman-Ford iteriert über **alle Kanten**, in jeder Runde, ohne Auswahl. Distanzen dürfen sich mehrfach ändern (label-correcting).`,
    },
    {
      id: 'vorgaenger-spannbaum',
      statement: r`Merkt man sich bei Dijkstra zu jedem Knoten den Vorgänger auf dem kürzesten Weg, bilden diese Kanten einen Spannbaum.`,
      holds: true,
      reason: r`Jeder erreichbare Knoten außer dem Start hat genau einen Vorgänger – $|V| - 1$ Kanten ohne Zyklus. Das muss aber **nicht** der minimale Spannbaum sein.`,
    },
  ],
  problems: [
    {
      id: 'dijkstra-durchfuehren',
      title: 'Dijkstra durchführen',
      source: 'nach 2b · Dijkstra Beispiel',
      points: 8,
      task: r`Gegeben der ungerichtete Graph mit den gewichteten Kanten

~~~
A-B 4    A-C 2    B-C 1    B-D 5    C-D 8
C-E 10   D-E 2    D-F 6    E-F 3
~~~

Bestimme mit Dijkstra die kürzesten Wege von A zu allen Knoten. Gib nach jedem Schritt $M_1$, $M_2$ und die Werte $g$ an, am Ende die Distanzen und den kürzesten Weg nach F.`,
      hint: r`Der erste gewählte Knoten ist C, nicht B – und danach verbessert sich $g(B)$.`,
      solution: r`~~~
gewählt   M1                  M2 mit g
(Start)   {A}                 B:4  C:2
C         {A,C}               B:3  D:10  E:12      B verbessert (2+1)
B         {A,C,B}             D:8  E:12            D verbessert (3+5)
D         {A,C,B,D}           E:10  F:14           E verbessert (8+2)
E         {A,C,B,D,E}         F:13                 F verbessert (10+3)
F         {A,C,B,D,E,F}       leer → fertig
~~~

Distanzen: $A = 0$, $C = 2$, $B = 3$, $D = 8$, $E = 10$, $F = 13$.

Vorgänger: $C \leftarrow A$, $B \leftarrow C$, $D \leftarrow B$, $E \leftarrow D$, $F \leftarrow E$. Kürzester Weg nach F: **A, C, B, D, E, F** mit Gewicht $2 + 1 + 5 + 2 + 3 = 13$.`,
    },
    {
      id: 'moore-durchfuehren',
      title: 'Moore: Entfernungen in Hops',
      source: 'nach 2b · Algorithmus von Moore',
      points: 4,
      task: r`Bestimme mit dem Algorithmus von Moore die Entfernungen aller Knoten von A:

~~~
A: B, C
B: A, D, E
C: A, F
D: B
E: B, F
F: C, E
~~~

Warum genügt hier eine Warteschlange statt der Suche nach dem Minimum?`,
      solution: r`~~~
entnommen   neu markiert        W danach
A (0)       B = 1, C = 1        (B, C)
B (1)       D = 2, E = 2        (C, D, E)
C (1)       F = 2               (D, E, F)
D (2)       –                   (E, F)
E (2)       –                   (F)
F (2)       –                   ()
~~~

Entfernungen: $A = 0$; $B = C = 1$; $D = E = F = 2$.

Bei Gewicht 1 werden die Knoten automatisch in der Reihenfolge wachsender Entfernung in die Warteschlange gestellt – der vorderste hat immer die kleinste. Die Minimumsuche von Dijkstra entfällt, daher $\Oh(\max(|E|, |V|))$.`,
    },
    {
      id: 'bellman-ford-durchfuehren',
      title: 'Bellman-Ford mit negativer Kante',
      source: 'nach 2b · Algorithmus von Bellmann-Ford (2)',
      points: 8,
      task: r`Digraph mit Startknoten $s$ und den Pfeilen in dieser Reihenfolge:

~~~
(s,a) 4    (s,b) 5    (a,c) 2    (b,a) -3    (c,d) 1
~~~

- (a) Führe Bellman-Ford aus und gib $g$ nach jeder Runde an.
- (b) Wie viele Runden sind höchstens nötig? Gibt es einen negativen Zyklus?
- (c) Was würde Dijkstra für $g(c)$ und $g(d)$ liefern?`,
      solution: r`**(a)**

~~~
            s    a    b    c    d
Start       0    ∞    ∞    ∞    ∞
Runde 1     0    2    5    6    7     a: erst 4, dann über b: 5-3 = 2
Runde 2     0    2    5    4    5     c: 2+2 = 4, d: 4+1 = 5
Runde 3     0    2    5    4    5     keine Änderung
~~~

**(b)** Höchstens $|V| - 1 = 4$ Runden. Die Prüfrunde findet keine Verbesserung mehr → kein negativer Zyklus. (Der Graph ist sogar azyklisch.)

**(c)** Dijkstra wählt nach $s$ zuerst $a$ mit $g(a) = 4$ (kleiner als $g(b) = 5$) und legt es fest; dann $b$ mit 5, dann $c$ mit $g(c) = 6$, dann $d$ mit 7. Der bessere Weg $s, b, a$ mit $5 - 3 = 2$ wird nach der Formulierung der Folien zwar noch als kleineres $g(a)$ eingetragen, aber $a$ ist bereits in $M_1$ und wird nicht erneut bearbeitet – $c$ und $d$ bleiben bei **6 und 7 statt 4 und 5**. Die Greedy-Entscheidung war wegen der negativen Kante falsch.`,
    },
    {
      id: 'algorithmus-waehlen',
      title: 'Den passenden Algorithmus wählen',
      source: 'nach 2b II · Path Problem in Graphs',
      points: 4,
      task: r`Welchen Algorithmus nimmst du jeweils, und mit welchem Aufwand?

- (a) wenigste Hops von einem Server zu allen anderen
- (b) schnellste Route im Straßennetz (Fahrzeiten)
- (c) Routenplanung fürs E-Auto, bei der Bergab-Strecken den Akku laden
- (d) Ortsverzeichnis aller Städte einer Karte erstellen`,
      solution: r`- **(a)** Moore (BFS) – alle Gewichte 1, $\Oh(\max(|E|, |V|))$.
- **(b)** Dijkstra – nicht negative Gewichte; $\Oh(|V|^2)$ mit Liste, $\Oh(|E| \log |V|)$ mit Vorrangwarteschlange. Bei nur einem Ziel abbrechen, sobald es in $M_1$ ist.
- **(c)** Bellman-Ford – negative Gewichte, gerichteter Graph, $\Oh(|V| \cdot |A|)$; meldet negative Zyklen.
- **(d)** Kein Wegeproblem: eine Traversierung (DFS oder BFS) genügt, $\Oh(|V| + |E|)$.`,
    },
  ],
});
