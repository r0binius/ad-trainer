import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 2b, first part: storing graphs, depth-first and breadth-first search, topological sorting. */
export const traversierung = topic({
  id: 'traversierung',
  chapter: '2b',
  title: 'Graphen – Traversierung',
  summary:
    'Adjazenzmatrix und -listen, Tiefen- und Breitensuche, partielle Ordnung, topologische Sortierung.',
  definitions: [
    {
      id: 'adjazenzmatrix',
      title: 'Adjazenzmatrix',
      ref: '2b · Darstellung: Adjazenzmatrix',
      statement: r`Eine $n \times n$-Matrix bei $n = |V|$ Knoten mit

$$a_{ij} = \begin{cases} 1 & \text{falls } (v_i, v_j) \in E \\ 0 & \text{sonst} \end{cases}$$

Statt „1“ können auch die Kantengewichte $g((v_i, v_j))$ stehen, falls kein Gewicht 0 ist.`,
      note: r`Bei ungerichteten Graphen **symmetrisch**. Speicherbedarf $\Oh(|V|^2)$ – sinnvoll für **dicht besetzte** Graphen.`,
    },
    {
      id: 'adjazenzlisten',
      title: 'Adjazenzlisten',
      ref: '2b · Darstellung: Adjazenzlisten',
      statement: r`Pro Knoten eine Liste seiner **Nachbarn** (im Digraphen: seiner **Nachfolger**) – also $|V|$ Listen.

~~~
graph = {
    1: [2, 3, 4],
    2: [1, 3, 4],
    3: [1, 2, 4, 5],
    4: [1, 2, 3, 5],
    5: [3, 4]
}
~~~`,
      note: r`Speicherbedarf $\Oh(|V| + |E|)$ – platzsparend für **dünn besetzte** Graphen ($|E|$ viel kleiner als $|V|^2$) und die natürliche Grundlage der Traversierung.`,
    },
    {
      id: 'traversierung',
      title: 'Traversierung und Markierung',
      ref: '2b · Besuchen des Graphen – Traversierung',
      statement: r`**Traversieren** = Aufzählen / Besuchen / Inspizieren aller Knoten bzw. Kanten. Ein **Traversierungsalgorithmus** ruft systematisch eine Operation auf jedem Knoten auf (z. B. Ausgabe des Knotenschlüssels).

Dazu werden Knoten **markiert**: anfangs sind alle unbesucht; @@visit()@@ setzt die Markierung, @@unvisit()@@ löscht sie, @@visited()@@ prüft sie.

Die Reihenfolge, in der die Knoten besucht werden, heißt **Traversierungsreihenfolge**.`,
      note: r`Die Markierung verhindert Mehrfachbesuche und Endlosschleifen in Zyklen. Traversierung ist Grundlage für Erreichbarkeit, Zusammenhang, Zyklenerkennung.`,
    },
    {
      id: 'warteschlange',
      title: 'Warteschlange (Queue)',
      ref: '2b · Einschub: Warteschlange/Queue',
      statement: r`Eine spezielle Liste: Einfügen ausschließlich am **Ende**, Entnehmen ausschließlich am **Anfang** – **FIFO** (first in, first out).

- @@enqueue(x)@@: fügt $x$ hinten an (Python: @@append(x)@@)
- @@dequeue()@@: holt das vorderste Element und liefert es zurück (Python: @@pop(0)@@ oder @@popleft()@@)
- @@front()@@: liefert das vorderste Element, ohne es zu entfernen`,
      note: r`Gegenstück: der Stapel (LIFO). BFS arbeitet mit der Warteschlange, DFS mit Rekursion (also implizit mit einem Stapel).`,
    },
    {
      id: 'partielle-ordnung',
      title: 'Partielle Ordnung',
      ref: '2b · Partielle Ordnung auf azyklischen Graphen',
      statement: r`Eine **partielle Ordnung** (Halbordnung) $(M, \le)$ besteht aus einer Menge $M$ und einer **reflexiven, transitiven** Ordnungsrelation $\le$. Eine **strenge** partielle Ordnung ist **irreflexiv** und transitiv ($<$).

Zwei Elemente stehen entweder in einer Vorher/Nachher-Beziehung – oder sie sind **unvergleichbar**.

Azyklische Digraphen beschreiben partielle Ordnungen: Mit $A^* = A^+ \cup \{(v, v) \mid v \in V\}$ ist

$$v_j \le_G v_k \iff (v_j, v_k) \in A^*.$$`,
      note: r`Beispiel Anziehen: Unterhose vor Hose, Socken vor Schuhe – aber Hemd und Socken sind unvergleichbar. Überprüfung auf Zyklen ⇔ Überprüfung auf partielle Ordnung; ein Zyklus wäre ein Deadlock.`,
    },
    {
      id: 'topologische-sortierung',
      title: 'Topologische Sortierung',
      ref: '2b · Topologisches Sortieren',
      statement: r`Eine Anordnung der Elemente einer partiell geordneten Menge $(M, \le)$ in eine Folge $m_1, m_2, \dots, m_k$ heißt **topologische Sortierung**, wenn für beliebige $1 \le i < j \le k$ gilt:

- entweder ist $m_i \le m_j$,
- oder $m_i$ und $m_j$ sind unvergleichbar.

Sie ist eine **Linearisierung**, die mit der Halbordnung verträglich ist.`,
      note: r`Anschaulich: alle Knoten auf eine waagerechte Linie legen, sodass **alle Pfeile von links nach rechts** zeigen. Existiert genau dann, wenn der Graph azyklisch ist; meist gibt es mehrere.`,
    },
  ],
  theorems: [
    {
      id: 'dfs',
      title: 'Tiefensuche (DFS)',
      ref: '2b · Tiefensuche (DFS)',
      statement: r`~~~
DFS(Knoten k):
  besuche k
  für jeden Nachbarn n von k:
    falls n noch nicht besucht ist:
      DFS(n)
~~~

Geht erst so **tief** wie möglich und kehrt dann zurück (Rekursion).`,
      note: r`Die Kanten, die zu einem noch nicht besuchten Knoten führen, bilden einen **aufspannenden Teilgraphen**. Für jede Komponente muss DFS neu gestartet werden. Kommt man zu einem schon besuchten Knoten zurück, hat man einen Zyklus gefunden.`,
    },
    {
      id: 'bfs',
      title: 'Breitensuche (BFS)',
      ref: '2b · Breitensuche (BFS)',
      statement: r`~~~
BFS(Knoten k):
  Warteschlange W mit Inhalt (k)
  solange W nicht leer:
    nimm ersten Knoten f aus W und entferne ihn aus W
    besuche f
    für jeden Nachbarn n von f:
      falls n nicht besucht und n nicht in W:
        W = W + (n)
~~~

Besucht die Knoten **Ebene für Ebene**, nach wachsendem Abstand vom Startknoten.`,
      note: r`Die Prüfung „$n \notin W$“ verhindert, dass ein Knoten doppelt in der Warteschlange landet. BFS liefert kürzeste Wege in **ungewichteten** Graphen (→ Moore).`,
    },
    {
      id: 'laufzeit-suche',
      title: 'Laufzeit von DFS und BFS',
      ref: '2b · Laufzeitbetrachtung',
      statement: r`- alle Knoten auf „nicht besucht“ setzen: $\Oh(|V|)$
- im Verlauf alle Knoten besuchen: $\Oh(|V|)$
- im Verlauf alle Kanten einmal betrachten: $\Oh(|E|)$ – sie führen entweder zu einem unbesuchten Knoten (rekursiver Aufruf bzw. Warteschlange) oder zu einem besuchten (keine Aktion)

Zusammen:

$$\Oh(|V| + |E|) = \Oh(\max(|V|, |E|))$$`,
      note: r`Meist gibt es mehr Kanten als Knoten, dann $\Oh(|E|)$. Gilt nur für gute Implementierungen – mit Adjazenzlisten. Mit einer Adjazenzmatrix kostet schon das Finden der Nachbarn $\Oh(|V|)$ pro Knoten.`,
    },
    {
      id: 'topsort-top-down',
      title: 'Topologisches Sortieren: top down',
      ref: '2b · Beispiel: top down',
      statement: r`Solange $G$ nicht leer ist:

- finde einen Knoten $v$ mit Eingangsgrad $d^-(v) = 0$
- lösche $v$ mit allen inzidenten Pfeilen aus $G$
- speichere die gelöschten Knoten in dieser Reihenfolge

Aufwand: Im ungünstigsten Fall findet man den nächsten Knoten mit Eingangsgrad 0 immer zuletzt → $\Oh(|V|^2)$.`,
      note: r`Gibt es mehrere Knoten mit $d^-(v) = 0$, darf man frei wählen – daher mehrere gültige Sortierungen. Findet man keinen, obwohl $G$ nicht leer ist, enthält $G$ einen Zyklus.`,
    },
    {
      id: 'topsort-bottom-up',
      title: 'Topologisches Sortieren: bottom up',
      ref: '2b · Beispiel: bottom up',
      statement: r`Von allen Knoten mit Eingangsgrad 0 aus eine **DFS** starten und **rückwärts** Besuchsnummern vergeben, vom tiefsten Knoten aus beginnend.

~~~
markiere alle v in V als unbesucht
z = |V|
für alle v in V:
  falls d-(v) = 0: topSort(v)

topSort(Knoten v):
  visit(v)
  für alle Nachfolger k von v:
    falls unvisited(k): topSort(k)
  TS[v] = z
  z = z - 1
~~~

Aufwand: Suche nach den Startknoten $\Oh(|V|)$ plus DFS → insgesamt $\Oh(\max(|V|, |A|))$.`,
      note: r`Ein Knoten bekommt seine Nummer erst, **nachdem** alle seine Nachfolger nummeriert sind – also eine kleinere als sie. Etwas komplizierter, aber besser als top down.`,
    },
  ],
  claims: [
    {
      id: 'matrix-symmetrisch',
      statement: r`Die Adjazenzmatrix eines ungerichteten Graphen ist symmetrisch.`,
      holds: true,
      reason: r`Eine ungerichtete Kante zwischen $v_i$ und $v_j$ erzeugt sowohl $a_{ij} = 1$ als auch $a_{ji} = 1$.`,
    },
    {
      id: 'matrix-duenn',
      statement: r`Für dünn besetzte Graphen ist die Adjazenzmatrix die platzsparendste Darstellung.`,
      holds: false,
      reason: r`Die Matrix braucht immer $|V|^2$ Einträge. Für dünn besetzte Graphen sind Adjazenzlisten mit $\Oh(|V| + |E|)$ besser; die Matrix lohnt sich bei dicht besetzten.`,
    },
    {
      id: 'bfs-stapel',
      statement: r`Die Breitensuche verwaltet die noch zu besuchenden Knoten in einem Stapel (LIFO).`,
      holds: false,
      reason: r`BFS nutzt eine **Warteschlange** (FIFO). Mit einem Stapel würde zuerst der zuletzt entdeckte Knoten besucht – das ergibt eine Tiefensuche.`,
    },
    {
      id: 'dfs-bfs-gleich',
      statement: r`DFS und BFS haben bei guter Implementierung dieselbe Laufzeit $\Oh(|V| + |E|)$.`,
      holds: true,
      reason: r`Beide besuchen jeden Knoten einmal und betrachten jede Kante einmal. Sie unterscheiden sich nur in der Reihenfolge.`,
    },
    {
      id: 'topsort-eindeutig',
      statement: r`Jeder azyklische Digraph hat genau eine topologische Sortierung.`,
      holds: false,
      reason: r`Unvergleichbare Elemente dürfen in beliebiger Reihenfolge stehen. Ob erst Hemd oder erst Socken – beides ist gültig.`,
    },
    {
      id: 'topsort-zyklus',
      statement: r`Für einen Digraphen mit einem Zyklus gibt es keine topologische Sortierung.`,
      holds: true,
      reason: r`Auf einem Zyklus müsste jeder Knoten vor sich selbst stehen. Top down findet irgendwann keinen Knoten mit Eingangsgrad 0 mehr – ein Deadlock.`,
    },
    {
      id: 'top-down-besser',
      statement: r`Das Top-down-Verfahren ist asymptotisch schneller als das Bottom-up-Verfahren.`,
      holds: false,
      reason: r`Top down: $\Oh(|V|^2)$ im ungünstigsten Fall. Bottom up (DFS mit rückwärts vergebenen Nummern): $\Oh(\max(|V|, |A|))$.`,
    },
    {
      id: 'hemd-socken',
      statement: r`In einer partiellen Ordnung muss für zwei verschiedene Elemente $a, b$ stets $a \le b$ oder $b \le a$ gelten.`,
      holds: false,
      reason: r`Das wäre eine totale Ordnung. In einer partiellen Ordnung dürfen Elemente **unvergleichbar** sein (Hemd und Socken).`,
    },
    {
      id: 'dfs-komponenten',
      statement: r`Ein einziger Aufruf von DFS besucht in einem nicht zusammenhängenden Graphen alle Knoten.`,
      holds: false,
      reason: r`DFS erreicht nur die Komponente des Startknotens. Für jede weitere Komponente muss die Suche an einem noch unbesuchten Knoten neu gestartet werden.`,
    },
  ],
  problems: [
    {
      id: 'dfs-bfs',
      title: 'DFS und BFS durchführen',
      source: 'nach 2b · Tiefensuche / Breitensuche',
      points: 6,
      task: r`Ein ungerichteter Graph ist durch Nachbarlisten gegeben (Nachbarn in dieser Reihenfolge abarbeiten):

~~~
A: B, C
B: A, D, E
C: A, F
D: B
E: B, F
F: C, E
~~~

Gib die Traversierungsreihenfolge für DFS(A) und für BFS(A) an. Notiere bei BFS den Inhalt der Warteschlange $W$ nach jedem Schritt.`,
      solution: r`**DFS(A):** A → B → D (Sackgasse, zurück zu B) → E → F → C (C erreicht über F). Reihenfolge: **A, B, D, E, F, C**.

**BFS(A):**

~~~
besucht   W danach
A         (B, C)
B         (C, D, E)
C         (D, E, F)
D         (E, F)
E         (F)
F         ()
~~~

Reihenfolge: **A, B, C, D, E, F** – erst alle Knoten mit Abstand 1, dann alle mit Abstand 2.`,
    },
    {
      id: 'matrix-aufstellen',
      title: 'Adjazenzmatrix aufstellen',
      source: 'nach 2b · Darstellung: Adjazenzmatrix',
      points: 4,
      task: r`Stelle die Adjazenzmatrix $A_1$ zum Graphen $G_1$ auf:

~~~
1: 2, 3, 4
2: 1, 3, 4
3: 1, 2, 4, 5
4: 1, 2, 3, 5
5: 3, 4
~~~

Woran erkennst du an der Matrix, dass der Graph ungerichtet ist, und wie liest du den Grad eines Knotens ab? Welche Darstellung braucht hier weniger Einträge?`,
      solution: r`$$A_1 = \begin{pmatrix} 0 & 1 & 1 & 1 & 0 \\ 1 & 0 & 1 & 1 & 0 \\ 1 & 1 & 0 & 1 & 1 \\ 1 & 1 & 1 & 0 & 1 \\ 0 & 0 & 1 & 1 & 0 \end{pmatrix}$$

- Ungerichtet: Die Matrix ist **symmetrisch** ($a_{ij} = a_{ji}$).
- Grad von $v_i$ = Summe der Zeile $i$: $3, 3, 4, 4, 2$.
- Matrix: $5^2 = 25$ Einträge. Listen: 16 Einträge (jede der 8 Kanten zweimal). Bei 8 von 10 möglichen Kanten ist der Graph dicht besetzt – der Unterschied ist klein; die Matrix erlaubt dafür den Kantentest in $\Oh(1)$.`,
    },
    {
      id: 'anziehen',
      title: 'Topologisch sortieren: Kleidung anziehen',
      source: 'nach 2b · Beispiel: Prozessabhängigkeiten',
      points: 6,
      task: r`Regeln: Shirt vor Hemd, Unterhose vor Hose, Socken vor Schuhe, Pullover vor Jacke, Hose vor Schuhe, Hemd vor Pullover, Hose vor Jacke.

- (a) Welche Knoten haben Eingangsgrad 0?
- (b) Bestimme top down eine topologische Sortierung.
- (c) Ist „Shirt, Hemd, Pullover, Jacke, Unterhose, Hose, Socken, Schuhe“ gültig?
- (d) Was passiert, wenn die Regel „Jacke vor Hemd“ dazukommt?`,
      solution: r`**(a)** Shirt, Unterhose, Socken.

**(b)** Zum Beispiel: **Shirt, Hemd, Pullover, Unterhose, Hose, Jacke, Socken, Schuhe**. (Nach jedem Löschen wird ein Knoten mit $d^- = 0$ gewählt: Hemd wird frei, sobald Shirt weg ist; Jacke erst, wenn Pullover **und** Hose weg sind; Schuhe erst nach Hose **und** Socken.)

**(c)** Nein: Jacke steht vor Hose, die Regel „Hose vor Jacke“ ist verletzt.

**(d)** Es entsteht der Zyklus Hemd → Pullover → Jacke → Hemd. Der Graph ist nicht mehr azyklisch, es gibt keine topologische Sortierung – ein Deadlock.`,
    },
    {
      id: 'bottom-up',
      title: 'Topologisch sortieren: bottom up',
      source: 'nach 2b · Beispiel: bottom up',
      points: 6,
      task: r`Gegeben der Digraph mit den Pfeilen $(v_1, v_2), (v_1, v_3), (v_2, v_4), (v_2, v_5), (v_3, v_4), (v_4, v_5)$. Führe das Bottom-up-Verfahren aus (Nachfolger in aufsteigender Reihenfolge) und gib $TS[v]$ für alle Knoten sowie die Sortierung an.`,
      solution: r`Einziger Knoten mit $d^- = 0$: $v_1$. Start mit $z = 5$.

- topSort($v_1$) → $v_2$ → $v_4$ → $v_5$: keine Nachfolger, $TS[v_5] = 5$
- zurück in $v_4$: fertig, $TS[v_4] = 4$
- zurück in $v_2$: $v_5$ schon besucht, $TS[v_2] = 3$
- zurück in $v_1$ → $v_3$: $v_4$ schon besucht, $TS[v_3] = 2$
- zurück in $v_1$: $TS[v_1] = 1$

Sortierung: $v_1, v_3, v_2, v_4, v_5$. Kontrolle: Jeder Pfeil zeigt von links nach rechts. (Top down wäre auch $v_1, v_2, v_3, v_4, v_5$ möglich – beide sind gültig.)`,
    },
  ],
});
