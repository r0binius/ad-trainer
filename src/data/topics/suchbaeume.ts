import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 3b: binary search, binary search trees and their operations, search cost, balance. */
export const suchbaeume = topic({
  id: 'suchbaeume',
  chapter: '3b',
  title: 'Suchbäume',
  summary: 'Binäre Suche, binärer Suchbaum, Suchen, Einfügen, Löschen, Suchkosten, Balance.',
  definitions: [
    {
      id: 'suchbaum',
      title: 'Binärer Suchbaum',
      ref: '3b · Binary Search Trees',
      statement: r`Ein (natürlicher) **binärer Suchbaum** $B$ ist ein Binärbaum, der entweder leer ist oder in dem jeder Knoten einen **Schlüssel** enthält, sodass gilt:

- existiert ein linker Teilbaum $B_L$, sind **alle** Schlüssel darin **kleiner** als der Schlüssel der Wurzel von $B$;
- existiert ein rechter Teilbaum $B_R$, sind **alle** Schlüssel darin **größer** als der Schlüssel der Wurzel von $B$;
- $B_L$ und $B_R$ sind selbst binäre Suchbäume.

Kurz: $K_L < K_V < K_R$.`,
      note: r`Die Schlüssel sind eindeutig und total geordnet. Die Bedingung gilt für **ganze Teilbäume**, nicht nur für die direkten Kinder. Der Baum erlaubt effiziente Suche und – per Inorder – sortierte Verarbeitung.`,
    },
    {
      id: 'entartet',
      title: 'Entarteter Baum',
      ref: '3b · Maximum and Minimum Average Search Depth',
      statement: r`Ein binärer Suchbaum heißt **entartet** (degeneriert, skewed), wenn er zu einer **linearen Liste** geworden ist: Jeder Knoten hat höchstens ein Kind.

Dann ist die Höhe $n$ und die Suche kostet $\Oh(n)$.`,
      note: r`Entsteht zum Beispiel, wenn man eine **bereits sortierte** Liste einfügt ($x, t, p, h, d, a$ oder umgekehrt). Die Form des Baums hängt von der Einfügereihenfolge ab.`,
    },
    {
      id: 'suchkosten',
      title: 'Mittlere Suchkosten',
      ref: '3b · Cost of Basic Operations',
      statement: r`Mittlere Suchtiefe = mittlere Zahl der Vergleiche bei erfolgreicher Suche: Man „sucht“ alle $n$ Knoten, summiert die Vergleiche und teilt durch $n$.

$$asd = \frac{\sum_{i=1}^{n} \bigl(\text{Ebene}(\text{Knoten}_i) + 1\bigr)}{n}$$

Annahme: Alle Schlüssel werden gleich häufig gesucht.`,
      note: r`Kann die Suche auch erfolglos enden, müssen zusätzlich die Suchtiefen bis zu den null-Zeigern berücksichtigt werden. Die Kosten jeder Operation sind durch die **Höhe** des Baums beschränkt.`,
    },
    {
      id: 'balance-masse',
      title: 'Maße für Balance',
      ref: '3b · Cost of Reorganization and Measures of Balance',
      statement: r`Zwei Möglichkeiten, „fast ausgeglichen“ zu definieren:

- den **Höhenunterschied** der beiden Teilbäume jedes Knotens beschränken ($k$-balanciert; mit $k = 1$: AVL-Baum)
- den **Gewichtsunterschied** der Teilbäume beschränken (Gewicht = Anzahl der Blätter)`,
      note: r`Ein immer maximal ausgeglichener Baum müsste sehr oft komplett umgebaut werden ($\Oh(n)$). Besser ein Kompromiss: gute Balance bei billiger Reorganisation – Ziel ist Suche **und** Reorganisation in $\Oh(\log n)$.`,
    },
  ],
  theorems: [
    {
      id: 'binaere-suche',
      title: 'Binäre Suche im sortierten Array',
      ref: '3b · Motivation: Binary Search',
      statement: r`~~~
def binarySearch(A, S):          # A ist sortiert
    left = 0
    right = len(A) - 1
    while left <= right:
        center = left + (right - left) // 2
        if A[center] == S:
            return center
        if A[center] > S:
            right = center - 1
        else:
            left = center + 1
    return -1
~~~

Jeder Vergleich halbiert den Suchbereich: $\Oh(\log_2 n)$ Schleifendurchläufe – gegenüber $\Oh(n)$ bei linearer Suche. Einmaliges Sortieren vorab kostet $\Oh(n \log n)$.`,
      note: r`Probleme des Arrays: Löschen hinterlässt Lücken, Einfügen verlangt Vergrößern und Neu-Sortieren. Verkettete Listen helfen nicht – sie haben keinen Index. Der Suchbaum verbindet binäre Suche mit dynamischem Einfügen und Löschen.`,
    },
    {
      id: 'suchen',
      title: 'Suchen im binären Suchbaum',
      ref: '3b · Search for Key "K"',
      statement: r`~~~
def search(self, K):
    if self.key is K:
        return self
    if self.key < K:
        if self.right is None:
            return None
        return self.right.search(K)
    if self.left is None:
        return None
    return self.left.search(K)
~~~

Immer an der Wurzel beginnen: @@root.search(K)@@. Ist der Knotenschlüssel kleiner als $K$, rechts weiter, sonst links.`,
      note: r`Die Prüfungen auf @@None@@ sind die Abbruchbedingung (Basisfall): Ohne sie stürzt die Suche nach einem nicht vorhandenen Schlüssel ab. Kosten: ein Pfad von der Wurzel abwärts, also höchstens die Höhe.`,
    },
    {
      id: 'einfuegen',
      title: 'Einfügen in den binären Suchbaum',
      ref: '3b · Insertion of Key "K"',
      statement: r`**Suche** nach $K$ – und hänge $K$ dort an, **wo die Suche erfolglos endet**.

~~~
def insert(self, K):
    if self.key is K:
        return self                  # K existiert schon
    if self.key < K:
        if self.right is None:
            self.right = Tree(K)     # hier einfügen
            return self.right
        return self.right.insert(K)
    if self.left is None:
        self.left = Tree(K)          # hier einfügen
        return self.left
    return self.left.insert(K)
~~~

**Baum aufbauen:** mit dem leeren Baum beginnen und alle Schlüssel nacheinander einfügen.`,
      note: r`Neue Knoten werden immer **Blätter**. Die Struktur hängt von der Einfügereihenfolge ab: $h, d, t, a, p, x$ ergibt einen ausgeglichenen Baum, $x, t, p, h, d, a$ eine Liste.`,
    },
    {
      id: 'loeschen',
      title: 'Löschen im binären Suchbaum',
      ref: '3b · Deletion',
      statement: r`Die komplexeste Operation – drei Fälle:

- **Fall 1:** Knoten $x$ ist ein **Blatt** → direkt löschen.
- **Fall 2:** $x$ hat **genau einen** nicht leeren Teilbaum → $x$ löschen und durch seinen Teilbaum ersetzen.
- **Fall 3:** $x$ hat **zwei** nicht leere Teilbäume → suche den **kleinsten rechten** Nachfolger $k_r$ (kleinster Schlüssel im rechten Teilbaum, Inorder-Nachfolger) oder den **größten linken** Vorgänger $g_l$ (größter Schlüssel im linken Teilbaum). Ersetze $x$ durch $k_r$ bzw. $g_l$ und lösche diesen an seiner ursprünglichen Position.`,
      note: r`$k_r$ findet man: einmal nach rechts, dann so weit wie möglich nach links. Er hat höchstens ein (rechtes) Kind, sein Löschen ist also Fall 1 oder 2. Oft wird gar nicht gelöscht, sondern nur **als gelöscht markiert** und später aufgeräumt (Garbage Collection).`,
    },
    {
      id: 'kosten',
      title: 'Kosten der Grundoperationen',
      ref: '3b · Cost of Basic Operations',
      statement: r`In einem Baum mit $n$ Knoten:

- **sequenzielle Verarbeitung** (Traversierung): $\Oh(n)$
- **Suchen**, **Einfügen**, **Löschen**: durch die **Höhe** beschränkt

Die Höhe liegt zwischen den Extremen:

- **entartet** (Liste): Höhe $n$ → $\Oh(n)$, $asd_{worst} = \frac{n+1}{2}$
- **ausgeglichen**: Höhe $\approx \log_2 n$ → $\Oh(\log n)$`,
      note: r`Die „Kapazität“ eines Baums der Höhe $h$ ist $2^h - 1$ – wie die mit $h$ Bit darstellbaren Werte. Ein „zufällig“ aufgebauter Suchbaum liegt im Mittel knapp 40 % über den bestmöglichen Suchkosten. Fazit: entartete Bäume vermeiden.`,
    },
    {
      id: 'sortierte-ausgabe',
      title: 'Sortierte Verarbeitung per Inorder',
      ref: '3b · Sequential Processing',
      statement: r`Alle Schlüssel in sortierter Reihenfolge verarbeiten:

- **aufsteigend**: Inorder-Traversierung L V R
- **absteigend**: gespiegelte Inorder-Traversierung R V L`,
      note: r`Folgt direkt aus $K_L < K_V < K_R$. Damit lassen sich Suchbäume auch zum Sortieren nutzen (Tree Sort).`,
    },
  ],
  claims: [
    {
      id: 'nur-kinder',
      statement: r`Ein Binärbaum ist ein Suchbaum, sobald bei jedem Knoten das linke Kind kleiner und das rechte Kind größer ist als der Knoten selbst.`,
      holds: false,
      reason: r`Die Bedingung gilt für **alle** Schlüssel der Teilbäume. Gegenbeispiel: Wurzel 50, linkes Kind 30, dessen rechtes Kind 60 – lokal in Ordnung, aber 60 steht im linken Teilbaum von 50.`,
    },
    {
      id: 'reihenfolge',
      statement: r`Die Form eines binären Suchbaums hängt nur von der Menge der Schlüssel ab, nicht von der Einfügereihenfolge.`,
      holds: false,
      reason: r`$h, d, t, a, p, x$ ergibt einen ausgeglichenen Baum der Höhe 3, $x, t, p, h, d, a$ eine lineare Liste der Höhe 6.`,
    },
    {
      id: 'inorder-sortiert',
      statement: r`Die Inorder-Traversierung eines binären Suchbaums liefert die Schlüssel in aufsteigender Reihenfolge.`,
      holds: true,
      reason: r`Inorder besucht erst den linken Teilbaum (alles Kleinere), dann den Knoten, dann den rechten Teilbaum (alles Größere) – rekursiv in jedem Teilbaum.`,
    },
    {
      id: 'suche-immer-log',
      statement: r`Die Suche in einem binären Suchbaum mit $n$ Knoten kostet immer $\Oh(\log n)$.`,
      holds: false,
      reason: r`Nur im ausgeglichenen Baum. Im entarteten Baum (lineare Liste) kostet sie $\Oh(n)$.`,
    },
    {
      id: 'neues-blatt',
      statement: r`Ein neu eingefügter Schlüssel wird im binären Suchbaum immer ein Blatt.`,
      holds: true,
      reason: r`Eingefügt wird dort, wo die Suche auf einen leeren Teilbaum stößt – der neue Knoten hat also zunächst keine Kinder.`,
    },
    {
      id: 'ersatzknoten',
      statement: r`Beim Löschen eines Knotens mit zwei Teilbäumen kann man ihn durch den größten Schlüssel seines linken Teilbaums ersetzen.`,
      holds: true,
      reason: r`Der größte linke Vorgänger $g_l$ ist größer als alle übrigen Schlüssel links und kleiner als alle rechts – die Suchbaumeigenschaft bleibt erhalten. Ebenso geht der kleinste rechte Nachfolger $k_r$.`,
    },
    {
      id: 'binaere-suche-liste',
      statement: r`Binäre Suche funktioniert auf einer verketteten Liste genauso effizient wie auf einem Array.`,
      holds: false,
      reason: r`Listen haben keinen Index: Das mittlere Element lässt sich nicht in $\Oh(1)$ ansprechen.`,
    },
    {
      id: 'asd-worst',
      statement: r`Für einen entarteten Suchbaum mit $n = 106$ Knoten ist die mittlere Suchtiefe $53{,}5$.`,
      holds: true,
      reason: r`In der Liste braucht der $i$-te Knoten $i$ Vergleiche: $asd = \frac{1 + 2 + \dots + n}{n} = \frac{n+1}{2} = 53{,}5$.`,
    },
    {
      id: 'markieren',
      statement: r`Wird ein Knoten nur als gelöscht markiert, kann die Suche ihn einfach ignorieren, als wäre er nicht im Baum.`,
      holds: false,
      reason: r`Er wird zwar nicht mehr als Treffer gemeldet, bleibt aber als **Wegweiser** im Baum: Die Suche muss weiter mit seinem Schlüssel vergleichen, um links oder rechts abzubiegen.`,
    },
  ],
  problems: [
    {
      id: 'aufbauen',
      title: 'Suchbaum aufbauen und traversieren',
      source: 'nach 3b · Creating a Binary Tree',
      points: 7,
      task: r`Füge die Schlüssel $50, 30, 70, 20, 40, 60, 80, 35, 45, 65$ in dieser Reihenfolge in einen leeren binären Suchbaum ein.

- (a) Zeichne den Baum und gib seine Höhe an.
- (b) Gib Preorder, Inorder und Postorder an.
- (c) Berechne die mittlere Suchtiefe.`,
      solution: r`**(a)**

~~~
              50
           /      \
         30        70
        /  \      /  \
      20    40  60    80
           /  \   \
         35   45   65
~~~

Höhe 4 (Ebenen 0 bis 3).

**(b)**

- Preorder: $50, 30, 20, 40, 35, 45, 70, 60, 65, 80$
- Inorder: $20, 30, 35, 40, 45, 50, 60, 65, 70, 80$ (sortiert)
- Postorder: $20, 35, 45, 40, 30, 65, 60, 80, 70, 50$

**(c)** $asd = \frac{1 \cdot 1 + 2 \cdot 2 + 4 \cdot 3 + 3 \cdot 4}{10} = \frac{29}{10} = 2{,}9$ Vergleiche. Besser geht es mit 10 Knoten nicht: Die Ebenen 0 bis 2 sind voll.`,
    },
    {
      id: 'loeschen-faelle',
      title: 'Löschen: alle drei Fälle',
      source: 'nach 3b · Deletion – Cases',
      points: 7,
      task: r`~~~
              50
           /      \
         30        70
        /  \      /  \
      20    40  60    80
           /  \   \
         35   45   65
~~~

Lösche nacheinander 20, 60 und 30. Nenne jeweils den Fall und beschreibe den Baum danach. Verwende in Fall 3 den kleinsten rechten Nachfolger.`,
      solution: r`**20 löschen – Fall 1** (Blatt): einfach entfernen; 30 hat nur noch das rechte Kind 40.

**60 löschen – Fall 2** (ein Teilbaum): 60 wird durch seinen Teilbaum, also 65, ersetzt; 65 ist jetzt linkes Kind von 70.

**30 löschen – Fall 2** – nach dem ersten Schritt hat 30 nur noch den rechten Teilbaum: 40 rückt an die Stelle von 30.

~~~
              50
           /      \
         40        70
        /  \      /  \
      35    45  65    80
~~~

**Zum Vergleich – 30 im ursprünglichen Baum (Fall 3):** kleinster rechter Nachfolger ist 35 (von 30 einmal rechts zu 40, dann links). 35 ersetzt 30 und wird an seiner alten Stelle (als Blatt) gelöscht: 35 hat dann links 20 und rechts 40, und 40 hat nur noch das rechte Kind 45. Alternativ ginge der größte linke Vorgänger 20.`,
    },
    {
      id: 'beste-schlechteste',
      title: 'Beste und schlechteste Suchkosten',
      source: 'nach 3b · Return to Average Access Cost',
      points: 6,
      task: r`Ein binärer Suchbaum enthält $n = 106$ Schlüssel.

- (a) Wie hoch ist er mindestens, wie hoch höchstens?
- (b) Berechne $asd_{worst}$.
- (c) Berechne $asd_{best}$: fülle die Ebenen von oben nach unten.`,
      solution: r`**(a)** Mindestens $\lceil \log_2(107) \rceil = 7$ Ebenen ($2^6 - 1 = 63 < 106 \le 127 = 2^7 - 1$), höchstens 106 (entartet).

**(b)** $asd_{worst} = \frac{n + 1}{2} = 53{,}5$.

**(c)** Ebenen 0 bis 5 fassen $1 + 2 + 4 + 8 + 16 + 32 = 63$ Knoten; die restlichen 43 liegen auf Ebene 6 und brauchen je 7 Vergleiche:

$$1 \cdot 1 + 2 \cdot 2 + 4 \cdot 3 + 8 \cdot 4 + 16 \cdot 5 + 32 \cdot 6 + 43 \cdot 7 = 1 + 4 + 12 + 32 + 80 + 192 + 301 = 622$$

$asd_{best} = \frac{622}{106} \approx 5{,}87$.

**Hinweis:** Die Folie nennt als Summe 714 und damit $asd_{best} = 6{,}73$. Die dort aufgeführten Summanden ergeben aber 622 – der Rechenweg ist derselbe, nur die Addition stimmt nicht. Im Zweifel den Rechenweg hinschreiben.`,
    },
    {
      id: 'binaere-suche-trace',
      title: 'Binäre Suche verfolgen',
      source: 'nach 3b · Motivation: Binary Search',
      points: 4,
      task: r`Verfolge @@binarySearch(A, 5)@@ für $A = [1, 2, 3, 4, 5, 6, 7, 8]$. Gib in jedem Durchlauf left, right, center und den Vergleich an. Wie viele Durchläufe braucht die Suche höchstens bei 8 Elementen?`,
      solution: r`~~~
left  right  center  A[center]  Vergleich
0     7      3       4          4 < 5  → left = 4
4     7      5       6          6 > 5  → right = 4
4     4      4       5          Treffer → Index 4
~~~

Drei Durchläufe. Höchstens sind es bei 8 Elementen 4 (z. B. bei der Suche nach 8 oder nach einem fehlenden Wert) – der Bereich schrumpft 8 → 4 → 2 → 1, also $\lfloor \log_2 8 \rfloor + 1$.`,
    },
  ],
});
