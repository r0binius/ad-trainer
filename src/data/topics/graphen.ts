import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 2a: graphs and their vocabulary, paths, Eulerian and Hamiltonian graphs, planarity. */
export const graphen = topic({
  id: 'graphen',
  chapter: '2a',
  title: 'Graphen – Definitionen',
  summary:
    'Graph und Digraph, Grad, Teilgraphen, Pfade und Zyklen, Euler, Hamilton, Wegegraph, planare Graphen.',
  definitions: [
    {
      id: 'graph',
      title: 'Graph (ungerichtet)',
      ref: '2a · Graphentheorie und Definition eines Graphen',
      statement: r`Ein **Graph** $G = (V, E)$ besteht aus

- einer Menge $V = \{v_1, \dots, v_n\}$ von **Knoten** (vertices) und
- einer Menge $E \subseteq V \times V$ von **Kanten** (edges).`,
      note: r`Abstraktion des Königsberger Brückenproblems: Stadtteile als Knoten, Brücken als Kanten; Größe und Lage sind unwichtig. Oft schließt man Mehrfachkanten aus (**einfache Graphen**) – immer angeben, ob sie erlaubt sind.`,
    },
    {
      id: 'digraph',
      title: 'Gerichteter Graph (Digraph)',
      ref: '2a · gerichtete Graphen',
      statement: r`Ein **gerichteter Graph** (Digraph) $G = (V, A)$ besteht aus einer Menge $V$ von Knoten und einer Menge $A$ von **Pfeilen** (arrows):

$$A \subseteq \{(v_k, v_j) \mid v_k \in V,\ v_j \in V\}$$

Die Knotenpaare sind **geordnet**: Ein Pfeil $(v_k, v_j)$ führt von $v_k$ nach $v_j$, aber nicht umgekehrt.`,
    },
    {
      id: 'adjazent-inzident',
      title: 'Adjazent, inzident, Nachbarn, Vorgänger, Nachfolger',
      ref: '2a · Weitere Begriffe und Definitionen (1)',
      statement: r`- Zwei **Knoten** heißen **adjazent**, wenn sie durch eine Kante verbunden sind.
- Eine **Kante**, die einen Knoten $v_k$ berührt, heißt für diesen Knoten **inzident**.
- $v_j$ ist **Nachbar** von $v_k$, wenn beide adjazent sind. $N(v_k)$ ist die Menge aller Nachbarn.

Im Digraphen:

- **Vorgänger** (predecessor): $P(v_k) := \{v_j \mid (v_j, v_k) \in A\}$
- **Nachfolger** (successor): $S(v_k) := \{v_j \mid (v_k, v_j) \in A\}$
- $N(v_k) := P(v_k) \cup S(v_k)$`,
      note: r`Adjazent = Knoten zu Knoten, inzident = Kante zu Knoten. Ein Graph ist vollständig beschrieben durch $N(v)$ für alle Knoten, ein Digraph durch $P(v)$ **oder** $S(v)$ für alle Knoten.`,
    },
    {
      id: 'grad',
      title: 'Grad eines Knotens',
      ref: '2a · Weitere Begriffe und Definitionen (2)',
      statement: r`Der **Grad** $d(v)$ (degree) eines Knotens ist die Anzahl der inzidenten Kanten; **Schlingen zählen doppelt**.

Im Digraphen:

- **Außengrad** $d^+(v_k)$: Anzahl der ausgehenden Pfeile $(v_k, v_j) \in A$
- **Innengrad** $d^-(v_k)$: Anzahl der eingehenden Pfeile $(v_j, v_k) \in A$
- $d(v_k) = d^+(v_k) + d^-(v_k)$

Knoten mit $d(v) = 0$ heißen **isolierte Knoten**.`,
      note: r`Jeder Pfeil geht irgendwo aus und kommt irgendwo an: $\sum_i d^+(v_i) = \sum_i d^-(v_i) = |A|$. Im ungerichteten Graphen ist die Summe aller Grade $2 \cdot |E|$.`,
    },
    {
      id: 'regulaer-vollstaendig',
      title: 'Regulärer und vollständiger Graph, Clique',
      ref: '2a · Weitere Begriffe und Definitionen (3)',
      statement: r`- Ein Graph heißt **regulär**, wenn alle Knoten den gleichen Grad haben: $\exists x \in \N\ \forall v \in V : d(v) = x$.
- In einem **vollständigen** (vollvermaschten) Graphen ist jeder Knoten mit jedem anderen verbunden.
- Eine **Clique** ist ein vollständiger Teilgraph.`,
      note: r`Der vollständige Graph $K_n$ hat $\frac{n(n-1)}{2}$ Kanten und ist $(n-1)$-regulär.`,
    },
    {
      id: 'teilgraph-untergraph',
      title: 'Teilgraph und Untergraph',
      ref: '2a · Weitere Begriffe und Definitionen (3), (4)',
      statement: r`Ein **Teilgraph** $G' = (V', E')$ von $G$ entsteht durch Entfernen von **Knoten und Kanten**: $V' \subseteq V$ und $E' \subseteq E$. Wer einen Knoten entfernt, muss auch dessen inzidente Kanten entfernen.

Ein **Untergraph** (Partialgraph) entsteht nur durch Entfernen von **Knoten** (samt inzidenter Kanten); alle übrigen Kanten bleiben:

$$E' = \{(v, w) \mid v, w \in V' \wedge (v, w) \in E\}$$`,
      note: r`Jeder Untergraph ist ein Teilgraph – aber **nicht** jeder Teilgraph ein Untergraph: Im Teilgraphen dürfen Kanten zwischen verbliebenen Knoten fehlen.`,
    },
    {
      id: 'isomorph',
      title: 'Isomorphe Graphen',
      ref: '2a · Weitere Begriffe und Definitionen (5)',
      statement: r`Zwei Graphen $G_1 = (V_1, E_1)$ und $G_2 = (V_2, E_2)$ sind **isomorph**, wenn es eine **bijektive** Abbildung $\phi : V_1 \to V_2$ gibt mit

$$(v, w) \in E_1 \iff (\phi(v), \phi(w)) \in E_2.$$`,
      note: r`Isomorphe Graphen haben dieselben graphentheoretischen Eigenschaften: Knotenzahl, Kantenzahl, gleich viele Knoten jedes Grades. Das ist **notwendig**, aber nicht hinreichend. Zwei vollständige Graphen gleicher Knotenzahl sind immer isomorph.`,
    },
    {
      id: 'pfad',
      title: 'Pfad, knoteneinfach, kanteneinfach, Länge',
      ref: '2a · Pfade (Wege) in Graphen',
      statement: r`Ein **Pfad** $p$ ist eine Folge $p = w_1, w_2, \dots, w_k$ von Knoten mit $(w_i, w_{i+1}) \in E$ für $1 \le i < k$. $w_1$ ist der Anfangs-, $w_k$ der Endknoten.

- **knoteneinfach**: jeder Knoten kommt in $p$ nur einmal vor
- **kanteneinfach** (Kantenzug): jede Kante kommt in $p$ nur einmal vor
- **Länge** $|p| = k - 1$: die Anzahl der **Kanten**, nicht der Knoten`,
      note: r`Jeder knoteneinfache Pfad ist auch kanteneinfach, aber nicht umgekehrt: $v_1, v_2, v_3, v_4, v_2, v_5$ benutzt $v_2$ zweimal, aber keine Kante doppelt.`,
    },
    {
      id: 'zyklus',
      title: 'Zyklus und azyklischer Graph',
      ref: '2a · Pfade in Graphen (3)',
      statement: r`Ein **Zyklus** (geschlossener Pfad, Kreis) ist ein Pfad, bei dem Anfangs- und Endknoten gleich sind.

- **kanteneinfacher Zyklus**: alle Kanten kommen nur einmal vor
- **knoteneinfacher Zyklus**: alle Knoten kommen nur einmal vor – mit Ausnahme des Anfangsknotens

Ein gerichteter Graph heißt **azyklisch**, wenn in ihm keine Zyklen existieren (DAG, directed acyclic graph).`,
      note: r`Anwendung Prozessabhängigkeiten: Ein Zyklus (A wartet auf B, B auf E, E auf A) bedeutet **Deadlock**. Ist der Abhängigkeitsgraph azyklisch, funktioniert der Prozess.`,
    },
    {
      id: 'zusammenhaengend',
      title: 'Zusammenhängend, Komponente',
      ref: '2a · Weitere Definitionen',
      statement: r`Knoten, zwischen denen ein Pfad existiert, heißen **verbundene Knoten**.

Sind in einem Graphen **beliebige Knotenpaare** verbunden, heißt der Graph **zusammenhängend**.

Ein nicht zusammenhängender Graph besteht aus zwei oder mehr **Komponenten**, die selbst zusammenhängende Graphen sind (auch ein isolierter Knoten ist eine Komponente).`,
    },
    {
      id: 'wegegraph',
      title: 'Wegegraph',
      ref: '2a · Anwendung: Erreichbarkeit (2) – Wegegraph',
      statement: r`Im **Wegegraphen** $G^+ = (V, A^+)$ zum Graphen $G = (V, A)$ existiert zwischen zwei Knoten $u$ und $v$ genau dann ein Pfeil, wenn in $G$ ein Pfad von $u$ nach $v$ existiert:

$$A^+ = \{(u, v) \mid \exists\, p = u, \dots, v \text{ in } G \text{ und } |p| \ge 1\}$$`,
      note: r`Beantwortet die **Erreichbarkeit** (Routing, Garbage Collection). Die Pfeile aus $G$ sind schon enthalten (triviale Pfade). Eine **Schlinge** $(v, v)$ gibt es in $G^+$ genau dann, wenn $v$ auf einem Zyklus liegt – so findet man Zyklen.`,
    },
    {
      id: 'planar',
      title: 'Planarer Graph, planare Einbettung',
      ref: '2a · Planare Einbettung',
      statement: r`Eine **Einbettung** bildet Knoten auf Punkte der Ebene $\R^2$ und Kanten auf Kurven ab. Sie ist **planar**, wenn

- keine zwei Knoten an der gleichen Position liegen,
- alle Kanten **Jordan-Kurven** sind (berühren/schneiden sich selbst nicht) und
- keine zwei Jordan-Kurven sich berühren oder schneiden – außer an gemeinsamen Endpunkten.

Ein Graph, der eine planare Einbettung **hat**, ist ein **planarer Graph**.`,
      note: r`Planar ist eine Eigenschaft des Graphen, nicht der Zeichnung: Derselbe Graph kann mit und ohne Kreuzungen gezeichnet sein. Kanten müssen keine Geraden sein. Anwendungen: Leiterplatten, Landkarten färben (4 Farben genügen immer).`,
    },
    {
      id: 'markierung',
      title: 'Knoten- und Kantenmarkierung, Gewicht',
      ref: '2a · Knotenmarkierung und Kantenmarkierung',
      statement: r`Sei $S$ eine beliebige nichtleere Wertemenge.

- Eine **Knotenmarkierung** von $G = (V, E)$ ist eine Abbildung $f : V \to S$ (z. B. Städtenamen).
- Eine **Kantenmarkierung** ist eine Abbildung $g : E \to S$ (z. B. Entfernungen).

Für eine Kante $e = (u, v)$ heißt $g(e)$ das **Gewicht** von $e$.`,
      note: r`Gewichte stehen meist für Entfernungen oder Kapazitäten. Klassische Fragen in kantenmarkierten Graphen: **Wegeprobleme** (kürzester Pfad) und **Flussprobleme** (maximaler Fluss).`,
    },
  ],
  theorems: [
    {
      id: 'euler',
      title: 'Eulersche Graphen',
      ref: '2a · Eulersche Graphen',
      statement: r`Die **Eulersche Linie** (Eulerscher Kreis) eines Graphen ist der **kanteneinfache Zyklus, der alle Kanten umfasst**. Ein **Eulerscher Graph** ist ein Graph, in dem eine Eulersche Linie existiert.

**Satz:** Ein **zusammenhängender** Graph $G$ ist genau dann ein Eulerscher Graph, wenn **alle Knoten in $G$ einen geraden Grad** haben.`,
      note: r`Idee: Zu jedem Hinweg in einen Knoten braucht es einen unbenutzten Rückweg. In Königsberg haben alle vier Knoten ungeraden Grad → kein Rundweg. Ein offener Weg über alle Kanten („nur ein Eulerscher Weg“) ist schwächer – das Haus vom Nikolaus.`,
    },
    {
      id: 'hamilton',
      title: 'Hamiltonsche Graphen',
      ref: '2a · Hamiltonsche Graphen',
      statement: r`Die **Hamiltonsche Linie** (Hamiltonscher Kreis) eines Graphen ist der **knoteneinfache Zyklus, der alle Knoten umfasst**. Ein **Hamiltonscher Graph** ist ein Graph, zu dem eine Hamiltonsche Linie existiert.

In einem Graphen mit $n$ Knoten hat eine Hamiltonsche Linie die Länge $n$.`,
      note: r`Anders als bei Euler gibt es **keine einfache Charakterisierung** und keinen bekannten polynomialzeit-beschränkten Algorithmus zur Überprüfung. Euler: jede **Kante** genau einmal. Hamilton: jeder **Knoten** genau einmal.`,
    },
    {
      id: 'gradsumme',
      title: 'Gradsummen',
      ref: '2a · Weitere Begriffe und Definitionen (2)',
      statement: r`Im Digraphen gilt

$$\sum_{i=1}^{n} d^+(v_i) = \sum_{i=1}^{n} d^-(v_i) = |A|.$$

Im ungerichteten Graphen gilt $\sum_{v \in V} d(v) = 2 \cdot |E|$.`,
      note: r`Jede Kante ist immer mit zwei Knoten verbunden; jede ausgehende Kante kommt auch irgendwo an. Folge: Die Anzahl der Knoten mit ungeradem Grad ist gerade.`,
    },
    {
      id: 'planaritaet',
      title: 'Testen auf Planarität',
      ref: '2a · Testen auf Planarität',
      statement: r`Jeder **einfache planare** Graph mit mindestens 3 Knoten

- hat höchstens $3 \cdot |V| - 6$ Kanten (folgt aus dem **Eulerschen Polyedersatz** $n - m + f = 2$: Knoten − Kanten + Flächen) – **notwendig, aber nicht hinreichend**;
- enthält weder $K_5$ noch $K_{3,3}$ als Minor.

**Satz von Kuratowski:** Ein Graph ist genau dann planar, wenn er keinen Teilgraphen enthält, der als **Unterteilungsgraph** aus $K_5$ oder $K_{3,3}$ entstanden ist.`,
      note: r`Unterteilungsgraph: eine Kante durch einen neuen Knoten mit zwei Kanten ersetzen (Splitting). $K_5$ hat $10 > 3 \cdot 5 - 6 = 9$ Kanten – „eine Kante zu viel“. $K_{3,3}$ hat nur $9 \le 12$ Kanten und ist trotzdem nicht planar.`,
    },
    {
      id: 'vierfarben',
      title: 'Vier-Farben-Satz',
      ref: '2a · Planare Graphen – Idee',
      statement: r`Färbeproblem: Länder einer Landkarte sind Knoten, gemeinsame Grenzen sind Kanten; benachbarte Knoten sollen unterschiedliche Farben bekommen.

In **planaren** Graphen genügen dafür immer **4 Farben**.`,
      note: r`Landkarten ergeben immer planare Graphen. Für nicht planare Graphen gilt die Schranke nicht: $K_5$ braucht 5 Farben.`,
    },
  ],
  claims: [
    {
      id: 'koenigsberg',
      statement: r`Im Königsberger Brückengraphen gibt es einen Rundweg, der jede der 7 Brücken genau einmal überquert.`,
      holds: false,
      reason: r`Alle vier Knoten haben ungeraden Grad (3, 3, 3, 5). Ein Eulerscher Kreis verlangt in einem zusammenhängenden Graphen überall geraden Grad.`,
      ref: '2a · Eulersche Graphen und Königsberg',
    },
    {
      id: 'knoteneinfach-kanteneinfach',
      statement: r`Jeder knoteneinfache Pfad ist auch kanteneinfach.`,
      holds: true,
      reason: r`Käme eine Kante zweimal vor, kämen auch ihre Endknoten zweimal vor. Die Umkehrung gilt nicht.`,
    },
    {
      id: 'laenge-knoten',
      statement: r`Der Pfad $p = v_2, v_5, v_4$ hat die Länge 3.`,
      holds: false,
      reason: r`Gezählt werden Kanten, nicht Knoten: $|p| = k - 1 = 2$.`,
    },
    {
      id: 'teilgraph-untergraph',
      statement: r`Jeder Teilgraph ist auch ein Untergraph.`,
      holds: false,
      reason: r`Umgekehrt: Jeder Untergraph ist ein Teilgraph. Ein Teilgraph darf zusätzlich Kanten zwischen verbliebenen Knoten weglassen – dann ist er kein Untergraph mehr.`,
    },
    {
      id: 'isomorph-grade',
      statement: r`Zwei Graphen mit gleicher Knotenzahl, gleicher Kantenzahl und gleichen Knotengraden sind isomorph.`,
      holds: false,
      reason: r`Das ist nur notwendig. Gegenbeispiel: ein Sechseck (ein Kreis mit 6 Knoten) und zwei getrennte Dreiecke – je 6 Knoten, 6 Kanten, alle Grade 2, aber nur das Sechseck ist zusammenhängend.`,
    },
    {
      id: 'gradsumme-digraph',
      statement: r`In jedem Digraphen ist die Summe aller Außengrade gleich der Summe aller Innengrade.`,
      holds: true,
      reason: r`Jeder Pfeil trägt genau 1 zum Außengrad seines Startknotens und 1 zum Innengrad seines Zielknotens bei. Beide Summen sind $|A|$.`,
    },
    {
      id: 'schlinge-wegegraph',
      statement: r`Im Wegegraphen $G^+$ eines azyklischen Digraphen $G$ gibt es keine Schlingen.`,
      holds: true,
      reason: r`Eine Schlinge $(v, v) \in A^+$ bräuchte einen nicht trivialen Pfad von $v$ nach $v$ – also einen Zyklus in $G$.`,
      ref: '2a · Zyklen in Graphen und Wegegraphen',
    },
    {
      id: 'kantenschranke-hinreichend',
      statement: r`Ein einfacher Graph mit höchstens $3 \cdot |V| - 6$ Kanten ist planar.`,
      holds: false,
      reason: r`Die Schranke ist notwendig, aber nicht hinreichend. $K_{3,3}$ hat 6 Knoten und $9 \le 12$ Kanten, ist aber nicht planar.`,
    },
    {
      id: 'hamilton-einfach',
      statement: r`Für Hamiltonsche Graphen gibt es – wie für Eulersche – ein einfaches Kriterium über die Knotengrade.`,
      holds: false,
      reason: r`Es gibt keine einfache Charakterisierung Hamiltonscher Graphen und keinen bekannten Algorithmus in Polynomialzeit, der sie überprüft.`,
    },
    {
      id: 'mehrfachkanten',
      statement: r`Ob ein Graph Mehrfachkanten haben darf, hängt von der verwendeten Definition ab und sollte immer angegeben werden.`,
      holds: true,
      reason: r`Es gibt viele unterschiedliche Definitionen von Graphen. Oft werden Mehrfachkanten ausgeschlossen (einfache Graphen); im Computer lassen sie sich aber problemlos darstellen.`,
    },
    {
      id: 'planar-zeichnung',
      statement: r`Ein Graph, der mit sich kreuzenden Kanten gezeichnet ist, ist nicht planar.`,
      holds: false,
      reason: r`Planar heißt, dass eine planare Einbettung **existiert**. Derselbe Graph kann eine Zeichnung mit und eine ohne Kreuzungen haben (z. B. $K_4$).`,
    },
  ],
  problems: [
    {
      id: 'digraph-begriffe',
      title: 'Digraph: Grade, Vorgänger, Wegegraph',
      source: 'nach 2a · Beispiele / Weitere Begriffe',
      points: 6,
      task: r`Gegeben der Digraph $G = (V, A)$ mit $V = \{v_1, \dots, v_5\}$ und

$$A = \{(v_1, v_2), (v_1, v_3), (v_2, v_4), (v_2, v_5), (v_3, v_4), (v_4, v_5)\}.$$

- (a) Gib $d^+$ und $d^-$ aller Knoten an und prüfe die Gradsummen.
- (b) Bestimme $P(v_4)$, $S(v_2)$ und $N(v_2)$.
- (c) Ist $G$ azyklisch? Gib die Pfeilmenge $A^+$ des Wegegraphen an.`,
      solution: r`**(a)** $d^+$: $2, 2, 1, 1, 0$ – Summe 6. $d^-$: $0, 1, 1, 2, 2$ – Summe 6. Beide gleich $|A| = 6$ ✓.

**(b)** $P(v_4) = \{v_2, v_3\}$, $S(v_2) = \{v_4, v_5\}$, $N(v_2) = P(v_2) \cup S(v_2) = \{v_1, v_4, v_5\}$.

**(c)** Ja: Alle Pfeile führen von kleinerem zu größerem Index, es kann keinen Zyklus geben.

$A^+$ enthält $A$ und zusätzlich $(v_1, v_4)$, $(v_1, v_5)$, $(v_3, v_5)$:

- von $v_1$: $v_2, v_3, v_4, v_5$
- von $v_2$: $v_4, v_5$
- von $v_3$: $v_4, v_5$
- von $v_4$: $v_5$

Das sind 9 Pfeile, keine Schlinge – passend zu „azyklisch“.`,
    },
    {
      id: 'euler-hamilton',
      title: 'Euler und Hamilton prüfen',
      source: 'nach 2a · Eulersche / Hamiltonsche Graphen',
      points: 6,
      task: r`Der ungerichtete Graph $G_1$ ist durch Nachbarlisten gegeben:

~~~
1: 2, 3, 4
2: 1, 3, 4
3: 1, 2, 4, 5
4: 1, 2, 3, 5
5: 3, 4
~~~

- (a) Wie viele Kanten hat $G_1$?
- (b) Ist $G_1$ ein Eulerscher Graph?
- (c) Ist $G_1$ ein Hamiltonscher Graph?`,
      solution: r`**(a)** Grade: $3, 3, 4, 4, 2$, Summe 16 $= 2 \cdot |E|$, also $|E| = 8$.

**(b)** Nein. $G_1$ ist zusammenhängend, aber die Knoten 1 und 2 haben ungeraden Grad. (Weil es genau zwei ungerade Knoten sind, gibt es immerhin einen offenen Eulerschen Weg von 1 nach 2.)

**(c)** Ja, zum Beispiel $1, 2, 4, 5, 3, 1$: Alle Kanten $\{1,2\}, \{2,4\}, \{4,5\}, \{5,3\}, \{3,1\}$ existieren, jeder Knoten kommt genau einmal vor, Länge $5 = n$.`,
    },
    {
      id: 'prozess-zyklus',
      title: 'Prozessabhängigkeiten',
      source: 'nach 2a · Anwendung: Prozessabhängigkeiten',
      points: 4,
      task: r`A benötigt Ergebnisse von B und C. B benötigt Ergebnisse von D und E. C benötigt Ergebnisse von B und D. D benötigt keine Ergebnisse. E benötigt Ergebnisse von A und C.

Modelliere das als Digraph (Pfeil „X wartet auf Y“). Funktioniert ein so konstruierter Prozess?`,
      solution: r`Pfeile: $A \to B$, $A \to C$, $B \to D$, $B \to E$, $C \to B$, $C \to D$, $E \to A$, $E \to C$.

Der Prozess funktioniert **nicht**: Der Graph enthält Zyklen, z. B. $A \to B \to E \to A$ (A wartet auf B, B auf E, E auf A) – ein Deadlock. Ein weiterer: $B \to E \to C \to B$.

Wäre der Graph azyklisch, gäbe es eine Reihenfolge, in der alle Prozesse laufen könnten.`,
    },
    {
      id: 'planar-pruefen',
      title: 'Planarität abschätzen',
      source: 'nach 2a · Testen auf Planarität',
      points: 5,
      task: r`Prüfe mit der Kantenschranke, was sich über die Planarität sagen lässt:

- (a) $K_5$
- (b) $K_{3,3}$
- (c) ein einfacher Graph mit 8 Knoten und 20 Kanten
- (d) $K_4$`,
      solution: r`Schranke: höchstens $3 \cdot |V| - 6$ Kanten.

- **(a)** $K_5$: 10 Kanten $> 9$ → **nicht planar**.
- **(b)** $K_{3,3}$: 9 Kanten $\le 12$ → die Schranke sagt nichts. Nach Kuratowski ist $K_{3,3}$ **nicht planar**.
- **(c)** $20 > 3 \cdot 8 - 6 = 18$ → **nicht planar**.
- **(d)** $K_4$: 6 Kanten $\le 6$ → Schranke erfüllt, keine Entscheidung. $K_4$ **ist planar**: als Dreieck mit einem Knoten in der Mitte zeichnen.

Die Schranke kann Planarität nur widerlegen, nie beweisen.`,
    },
  ],
});
