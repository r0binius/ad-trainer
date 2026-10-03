import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 1c: the sorting problem, families of sorting algorithms, SelectionSort, TimSort. */
export const sortieren = topic({
  id: 'sortieren',
  chapter: '1c',
  title: 'Sortierverfahren',
  summary:
    'Sortierproblem und Schlüssel, Einteilung der Verfahren, SelectionSort, TimSort, Komplexitäten.',
  definitions: [
    {
      id: 'schluessel',
      title: 'Schlüssel (key)',
      ref: '1c · Daten und Schlüssel',
      statement: r`Der **Schlüssel** ist der Teil eines Datensatzes, **nach dem sortiert** (und beim Sortieren **verglichen**) wird – z. B. der Nachname oder die Matrikelnummer eines Studierenden.

Der Datensatz bleibt, wo er ist: Sortiert werden nur die Schlüssel, und diese **verweisen** auf den Datensatz. Es kann mehrere Schlüssel geben.`,
      note: r`Nicht mit Primär- und Sekundärschlüsseln aus Datenbanken verwechseln. Warum sortieren? User Interfaces, schnellere Datenbankabfragen (JOIN), Duplikate finden – etwa 25 % der Rechenzeit.`,
    },
    {
      id: 'sortierproblem',
      title: 'Sortierproblem',
      ref: '1c · Sortierproblem',
      statement: r`**Eingabe:** eine Folge von $n$ Elementen (Datensätzen) $S_1, S_2, \dots, S_n$, jedes mit einem Schlüssel $K_i$, $i \in [1, n]$. Schlüssel lassen sich vergleichen: „$K_i < K_j$?“.

**Ausgabe:** die sortierte Folge, also eine **Permutation** $\Psi$, die jedem Schlüssel eine neue Position zuweist, mit

$$K_{\Psi(1)} \le K_{\Psi(2)} \le \dots \le K_{\Psi(n)}.$$`,
      note: r`Sortieren heißt: unter allen $n!$ Permutationen eine finden, die die Schlüssel aufsteigend ordnet. Bogosort nimmt das wörtlich und würfelt, bis es passt.`,
    },
    {
      id: 'einteilung',
      title: 'Einteilung der Sortierverfahren',
      ref: '1c · Sortierverfahren / Algorithmen',
      statement: r`- **Hardwarebasiert**: Systolic Arrays
- **Vergleichsbasiert**:
- – Transposition: Bubble Sort
- – Einfügen: Insertion Sort, Tree Sort
- – Prioritätsschlangen: **Selection Sort**, Heap Sort
- – Teile und Herrsche: Quick Sort, Merge Sort
- – Diminishing Increment: Shell Sort
- **Adressbasiert**: Proxmap Sort, Radix Sort`,
      note: r`Gemeinsame Basis der vergleichsbasierten Verfahren: eine Folge von **Vergleichs- und Tauschoperationen** auf einem Array, das in einen sortierten und einen unsortierten Teil zerfällt (bei Teile und Herrsche abschnittsweise).`,
    },
    {
      id: 'run',
      title: 'Run',
      ref: '1c · TimSort – Idee',
      statement: r`Ein **Run** ist ein bereits sortierter zusammenhängender Teil einer Liste. TimSort geht die Liste einmal durch und identifiziert die Runs – das kostet $\Oh(n)$.`,
      note: r`Reale Daten sind oft teilweise sortiert. Ein absteigend sortierter Run wird einfach **umgedreht** ($\Oh(n)$), statt ihn neu zu sortieren.`,
    },
  ],
  theorems: [
    {
      id: 'selectionsort',
      title: 'SelectionSort',
      ref: '1c · SelectionSort – Code',
      statement: r`**Idee:** Finde das kleinste Element der unsortierten Liste und füge es an die sortierte Liste an.

- Kandidat = 1. Element der unsortierten Liste
- Rest der unsortierten Liste nach kleinerem durchsuchen → neuer Kandidat
- 1. Element der unsortierten Liste mit dem Kandidaten **vertauschen**
- sortierte Liste um 1 nach rechts erweitern, wiederholen

~~~
def selectionSort(A):
    n = len(A)
    for i in range(n):
        candidate = i
        for j in range(i + 1, n):
            if A[j] < A[candidate]:
                candidate = j
        A[i], A[candidate] = A[candidate], A[i]
~~~`,
      note: r`Pro Runde höchstens **eine** Vertauschung, aber immer alle Vergleiche – auch auf einer schon sortierten Liste.`,
    },
    {
      id: 'selectionsort-aufwand',
      title: 'Komplexität von SelectionSort',
      ref: '1c · Komplexitätstheorie',
      statement: r`Runde 1 bei $n$ Elementen: $n - 1$ Vergleiche (immer), bis zu $n$ Zuweisungen des Kandidaten, 1 Vertauschung → $\approx 2n + 1$ Operationen. In jeder Runde wird es weniger (im Mittel etwa die Hälfte), es gibt $n - 1 \approx n$ Runden:

$$\approx n \cdot n = n^2 \quad\Rightarrow\quad \Oh(n^2)$$

Exakt sind es $(n-1) + (n-2) + \dots + 1 = \frac{n(n-1)}{2}$ Vergleiche.`,
      note: r`Zwei geschachtelte, von $n$ abhängige Schleifen → Produktregel. Best, worst und average case liegen alle in $\Oh(n^2)$.`,
    },
    {
      id: 'timsort',
      title: 'TimSort',
      ref: '1c · TimSort – Idee',
      statement: r`In der Praxis werden praktisch immer **Kombinationen** von Sortierverfahren eingesetzt. TimSort (Tim Peters, 2002):

- Sortierte Listen müssen nicht sortiert werden: Liste durchgehen, **Runs** identifizieren ($\Oh(n)$). Vollständig sortiert? → fertig. Absteigend sortiert? → umdrehen.
- Teils sortierte Listen: nicht sortierte Elemente mit **InsertionSort** in die Runs einfügen, …
- … dann die sortierten Runs mit **MergeSort** zusammenfügen.
- Arbeitet mit Teillisten von 32 oder 64 Elementen: InsertionSort ist gut für kleine Listen.`,
      note: r`Genau die Lehre aus „nichtasymptotisches Laufzeitverhalten“: das einfache $\Oh(n^2)$-Verfahren für kleine Stücke, das $\Oh(n \log n)$-Verfahren fürs Zusammenfügen.`,
    },
    {
      id: 'komplexitaeten',
      title: 'Komplexität der Sortierverfahren im Vergleich',
      ref: '1c · Zusammenfassung Komplexität – Vergleich',
      statement: r`Im Durchschnitt:

- Bubble Sort, Insertion Sort, Selection Sort: $\Oh(n^2)$
- Tree Sort, Heapsort, Quicksort, Merge Sort: $\Oh(n \log n)$
- Proxmap Sort: $\Oh(n)$
- Radix Sort: $\Oh(w \cdot n)$ ($w$ = Schlüssellänge)`,
      note: r`Sehr schnelle Algorithmen **tauschen Zeit gegen Speicher**. Die adressbasierten Verfahren vergleichen nicht, sondern rechnen aus dem Schlüssel eine Position aus.`,
    },
  ],
  claims: [
    {
      id: 'selection-sortiert',
      statement: r`Auf einer bereits sortierten Liste braucht SelectionSort nur $\Oh(n)$ Vergleiche.`,
      holds: false,
      reason: r`SelectionSort durchsucht in jeder Runde den ganzen unsortierten Rest – unabhängig von den Daten immer $\frac{n(n-1)}{2}$ Vergleiche, also $\Oh(n^2)$.`,
    },
    {
      id: 'timsort-sortiert',
      statement: r`TimSort erkennt eine bereits vollständig sortierte Liste in $\Oh(n)$ und ist dann fertig.`,
      holds: true,
      reason: r`Ein Durchgang zum Identifizieren der Runs genügt: Besteht die Liste aus einem einzigen Run, muss nichts mehr sortiert werden.`,
    },
    {
      id: 'datensatz-bewegen',
      statement: r`Beim Sortieren müssen die vollständigen Datensätze im Speicher umkopiert werden.`,
      holds: false,
      reason: r`Der Datensatz bleibt, wo er ist. Sortiert werden die Schlüssel, die auf die Datensätze verweisen.`,
    },
    {
      id: 'selection-vertauschungen',
      statement: r`SelectionSort führt pro Runde höchstens eine Vertauschung aus.`,
      holds: true,
      reason: r`Erst wird der kleinste Kandidat gesucht (nur Vergleiche und Zuweisungen des Index), dann einmal getauscht. Insgesamt also höchstens $n - 1$ echte Vertauschungen.`,
    },
    {
      id: 'mergesort-klasse',
      statement: r`MergeSort und QuickSort gehören zur Familie „Teile und Herrsche“ und liegen im Durchschnitt in $\Oh(n \log n)$.`,
      holds: true,
      reason: r`Beide zerlegen die Liste, sortieren die Teile rekursiv und fügen zusammen – die Einteilung und die Komplexitätsübersicht der Folien nennen sie genau so.`,
    },
    {
      id: 'radix-vergleich',
      statement: r`Radix Sort ist ein vergleichsbasiertes Sortierverfahren.`,
      holds: false,
      reason: r`Radix Sort und Proxmap Sort sind **adressbasiert**: Sie vergleichen keine Schlüssel miteinander, sondern nutzen den Schlüssel als Adresse. Dafür brauchen sie zusätzlichen Speicher.`,
    },
    {
      id: 'insertion-kleine-listen',
      statement: r`TimSort verwendet InsertionSort, weil InsertionSort asymptotisch schneller ist als MergeSort.`,
      holds: false,
      reason: r`InsertionSort liegt in $\Oh(n^2)$, MergeSort in $\Oh(n \log n)$. InsertionSort ist aber für **kleine** Listen (32 oder 64 Elemente) wegen kleiner Konstanten gut.`,
    },
  ],
  problems: [
    {
      id: 'selection-trace',
      title: 'SelectionSort von Hand',
      source: 'nach 1c · SelectionSort – Intuition',
      points: 5,
      task: r`Sortiere $A = [5, 2, 8, 1, 9, 3]$ mit SelectionSort (Python-Fassung der Folien). Gib das Array nach jeder Runde der äußeren Schleife an und zähle die Vergleiche insgesamt.`,
      solution: r`~~~
Start:     [5, 2, 8, 1, 9, 3]
i = 0:     [1, 2, 8, 5, 9, 3]    Minimum 1, getauscht mit 5
i = 1:     [1, 2, 8, 5, 9, 3]    Minimum 2 steht schon richtig
i = 2:     [1, 2, 3, 5, 9, 8]    Minimum 3, getauscht mit 8
i = 3:     [1, 2, 3, 5, 9, 8]    Minimum 5 steht schon richtig
i = 4:     [1, 2, 3, 5, 8, 9]    Minimum 8, getauscht mit 9
i = 5:     [1, 2, 3, 5, 8, 9]    nichts mehr zu vergleichen
~~~

Vergleiche: $5 + 4 + 3 + 2 + 1 + 0 = 15 = \frac{6 \cdot 5}{2}$.`,
    },
    {
      id: 'timsort-faelle',
      title: 'TimSort: drei Eingaben',
      source: 'nach 1c · TimSort – Idee',
      points: 4,
      task: r`Beschreibe, wie TimSort mit diesen Eingaben umgeht und was das jeweils kostet:

- (a) $[1, 2, 3, 4, 5, 6, 7, 8]$
- (b) $[8, 7, 6, 5, 4, 3, 2, 1]$
- (c) $[1, 4, 7, 9, 3, 2, 5, 8]$`,
      solution: r`- **(a)** Ein Durchgang findet einen einzigen aufsteigenden Run über die ganze Liste → fertig, $\Oh(n)$.
- **(b)** Ein einziger absteigender Run → umdrehen, $\Oh(n)$.
- **(c)** Teils sortiert: Run $[1, 4, 7, 9]$ wird erkannt; die übrigen Elemente werden (bei so kleinen Stücken) per **InsertionSort** zu sortierten Runs ergänzt, z. B. $[2, 3, 5, 8]$; dann werden die Runs per **MergeSort**-Schritt zusammengefügt: $[1, 2, 3, 4, 5, 7, 8, 9]$. Im allgemeinen Fall $\Oh(n \log n)$.`,
    },
    {
      id: 'verfahren-waehlen',
      title: 'Verfahren einordnen',
      source: 'nach 1c · Zusammenfassung',
      points: 4,
      task: r`Ordne Bubble Sort, Heapsort, Merge Sort, Radix Sort, Insertion Sort und Selection Sort jeweils ihrer Familie zu und gib die durchschnittliche Komplexität an.`,
      solution: r`- Bubble Sort – Transposition – $\Oh(n^2)$
- Insertion Sort – Einfügen – $\Oh(n^2)$
- Selection Sort – Prioritätsschlangen – $\Oh(n^2)$
- Heapsort – Prioritätsschlangen – $\Oh(n \log n)$
- Merge Sort – Teile und Herrsche – $\Oh(n \log n)$
- Radix Sort – adressbasiert (nicht vergleichsbasiert) – $\Oh(w \cdot n)$`,
    },
  ],
});
