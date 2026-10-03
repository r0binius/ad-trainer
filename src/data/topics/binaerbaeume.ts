import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 3a: trees and their vocabulary, binary trees, traversal, search depth, Huffman coding. */
export const binaerbaeume = topic({
  id: 'binaerbaeume',
  chapter: '3a',
  title: 'Bäume und Binärbäume',
  summary:
    'Baumbegriffe, Höhe und Knotenzahl, Arten von Binärbäumen, Traversierung, Suchtiefe, Huffman-Code.',
  definitions: [
    {
      id: 'baum',
      title: 'Baum',
      ref: '3a · Definition: Tree',
      statement: r`Ein **Baum** ist ein **einfacher, azyklischer, zusammenhängender** Graph (mit ungerichteten Kanten). Bei $n$ Knoten hat er genau $n - 1$ Kanten.

**Gerichteter Baum** (oriented tree): Es gibt einen ausgezeichneten Knoten, die **Wurzel**. Sie legt die Richtung der Kanten implizit fest – alle zur Wurzel hin (in-tree) oder alle von ihr weg (out-tree).`,
      note: r`Bäume sind Abstraktionen von Hierarchien (Stammbäume, Organigramme, Syntaxbäume). In der Informatik wachsen sie nach unten: Wurzel oben, Blätter unten.`,
    },
    {
      id: 'baum-rekursiv',
      title: 'Rekursive Definition des Baums',
      ref: '3a · Recursive Definition of Trees',
      statement: r`Ein gerichteter Wurzelbaum ist eine endliche Menge $B$, die entweder **leer** ist oder:

- es gibt ein ausgezeichnetes Element $w \in B$, die **Wurzel**; sie hat keinen Vorgänger;
- die Elemente $B \setminus \{w\}$ lassen sich in **disjunkte** Mengen $B_1, B_2, \dots, B_m$ zerlegen, von denen jede selbst ein Baum ist.

$B_1, \dots, B_m$ heißen **Teilbäume** (subtrees) von $B$.`,
      note: r`Kurz: Ein Baum ist ein einzelner Knoten – oder eine Wurzel mit einer Menge von Teilbäumen. Deshalb sind Algorithmen auf Bäumen fast immer rekursiv.`,
    },
    {
      id: 'verwandtschaft',
      title: 'Elternknoten, Kinder, Geschwister, Blatt, innerer Knoten',
      ref: '3a · Terminologies (1), (2)',
      statement: r`- **Elternknoten** (Vorgänger) und **Kinder** (Nachfolger): direkt verbundene Knoten benachbarter Ebenen
- **Geschwister** (siblings): Knoten mit demselben Elternknoten
- **Nachkommen** (descendants) von $v$: seine Kinder und rekursiv deren Kinder
- **Grad** (Ordnung) eines Knotens: die Anzahl seiner Kinder (Außengrad)
- **Blatt**: Knoten vom Grad 0
- **innerer Knoten**: alle anderen
- **Ordnung des Baums** (fan-out): der **maximale** Grad aller seiner Knoten`,
      note: r`Jeder Knoten außer der Wurzel hat **genau einen** Elternknoten. Achtung: „Grad“ meint im Baum die Zahl der Kinder, nicht wie im Graphen alle inzidenten Kanten.`,
    },
    {
      id: 'ebene-hoehe',
      title: 'Ebene, Höhe, Gewicht',
      ref: '3a · Terminologies (3)',
      statement: r`- **Ebene** (level) eines Knotens $v$: die Länge des Pfads von der Wurzel zu $v$. Ebene der Wurzel $= 0$; Ebene($v$) $= 1 +$ Ebene des Elternknotens.
- **Höhe** des Baums: **maximale Ebene $+ 1$** – einfach die Anzahl der Ebenen.
- **Gewicht** des Baums: die Anzahl seiner **Blätter**.`,
      note: r`Konvention der Vorlesung: Ein Baum nur aus der Wurzel hat Höhe 1. Andere Quellen zählen die Kanten des längsten Astes (dann Höhe 0) oder verstehen unter Gewicht die Zahl aller Knoten – in der Klausur die Vorlesungskonvention nehmen.`,
    },
    {
      id: 'geordneter-baum',
      title: 'Geordneter Baum, Binärbaum',
      ref: '3a · Ordered Trees / Binary Trees',
      statement: r`In einem **geordneten Baum** bilden die Teilbäume jedes Knotens eine geordnete Menge: erstes Kind, zweites Kind, …

Ein **Binärbaum** ist ein geordneter Baum vom Grad 2: eine endliche Menge, die entweder leer ist oder aus einer Wurzel $w$ und zwei disjunkten Teilmengen besteht, die selbst Binärbäume sind – dem **linken** und dem **rechten Teilbaum**.`,
      note: r`Die Unterscheidung links/rechts ist wesentlich: Ein Knoten mit nur einem linken Kind ist ein anderer Binärbaum als derselbe Knoten mit nur einem rechten Kind. Anwendung geordneter Bäume: Syntaxbäume – Operatoren in den inneren Knoten, Operanden in den Blättern; nicht jeder Operator ist kommutativ.`,
    },
    {
      id: 'aehnlich-aequivalent',
      title: 'Ähnliche und äquivalente Binärbäume',
      ref: '3a · Similarity / Equivalence and Completeness',
      statement: r`- Zwei Binärbäume sind **ähnlich**, wenn sie dieselbe **Struktur** haben.
- Sie sind **äquivalent**, wenn sie ähnlich sind **und** dieselbe Information enthalten.`,
      note: r`Vergleiche Isomorphie bei Graphen: Ähnlichkeit sieht nur auf die Form, Äquivalenz auch auf die Inhalte.`,
    },
    {
      id: 'vollstaendig',
      title: 'Vollständiger, strikter, fast vollständiger Binärbaum',
      ref: '3a · Strict Binary Trees and Almost Complete Trees',
      statement: r`- **Vollständig** (complete, „perfect“): Der Baum enthält die maximal mögliche Knotenzahl für seine Höhe $h$ – jeder Knoten auf Ebene $h - 1$ ist ein Blatt, jeder Knoten darüber hat einen nicht leeren linken und rechten Teilbaum.
- **Strikt** (full, proper): Jeder Knoten hat **0 oder 2** Kinder – nie genau eines.
- **Fast vollständig** (almost complete): Alle Ebenen bis auf die letzte sind voll, die letzte ist **von links nach rechts** gefüllt; Blätter fehlen höchstens ganz rechts.`,
      note: r`Vollständige Bäume sind strikt, aber nicht umgekehrt. Strikt ist eine lokale Bedingung (pro Knoten), fast vollständig eine globale (Ebenen). Vorsicht bei den englischen Begriffen: Die Übersichtstabelle der Folien nennt den vollen Baum „perfect“ und den links aufgefüllten „complete“.`,
    },
    {
      id: 'ausgeglichen',
      title: 'Ausgeglichener (balancierter) Binärbaum',
      ref: '3a · Balanced Binary Trees',
      statement: r`In einem **ausgeglichenen** Binärbaum gibt es ein $k \ge 0$, sodass

- jedes Blatt auf Ebene $k$ oder $k + 1$ liegt und
- jeder Knoten auf einer Ebene kleiner als $k$ den Grad 2 hat.

Wie fast vollständig – nur dürfen die Blätter der untersten Ebene **irgendwo** fehlen.

Höhenbasierte Sicht: Für jeden Knoten unterscheiden sich die Höhen von linkem und rechtem Teilbaum um höchstens 1; die Höhe ist $\Oh(\log n)$.`,
      note: r`Vollständig ⇒ fast vollständig ⇒ ausgeglichen, aber nicht umgekehrt. „Complete“ = schön nach links gepackt (Form), „balanced“ = nicht zu hoch, nicht schief (Höhe).`,
    },
    {
      id: 'suchtiefe',
      title: 'Mittlere Suchtiefe (average search depth)',
      ref: '3a · Average Search Depth',
      statement: r`Maß für die Güte der Suche in einem Binärbaum mit $n$ Knoten:

$$asd = \frac{\sum_{i=1}^{n} \bigl(\text{Ebene}(\text{Knoten}_i) + 1\bigr)}{n}$$

Mit Gewichten (Zugriffswahrscheinlichkeiten $p$):

$$asd = \sum_{i=1}^{n} \bigl(\text{Ebene}(\text{Knoten}_i) + 1\bigr) \cdot p(\text{Knoten}_i)$$`,
      note: r`Ebene $+ 1$ = Anzahl der Vergleiche bis zu diesem Knoten. Günstig: „schwere“ (häufig gesuchte) Knoten nahe der Wurzel, „leichte“ weiter unten – die Idee hinter Huffman.`,
    },
    {
      id: 'faedelung',
      title: 'Fädelung (threading)',
      ref: '3a · Threading and Traversal',
      statement: r`**Fädelung** ermöglicht die Traversierung eines Binärbaums **ohne Rekursion oder Stapel**: Zusätzliche Zeiger (threads) verweisen auf den nächsten Knoten in der gewählten Ordnung (Pre-, In- oder Postorder).

Dazu werden die **NULL-Zeiger** genutzt: Ein Binärbaum mit $n$ Knoten hat $2n$ Zeiger, von denen nur $n - 1$ benutzt werden – $n + 1$ sind null.

**Rechtsfädelung** verkettet in der Ordnung selbst, **Linksfädelung** in der gespiegelten Ordnung (VRL, RVL, RLV).`,
      note: r`Ein zusätzliches Bit (Flag) pro Zeiger unterscheidet Baumzeiger von Fädelungszeigern. Bei Preorder sind Fäden an inneren Knoten redundant – sie laufen parallel zu den Baumzeigern.`,
    },
    {
      id: 'praefixcode',
      title: 'Codebaum und präfixfreier Code',
      ref: '3a · Code Tree',
      statement: r`Ein Code lässt sich statt als Tabelle als **Binärbaum** darstellen: links = 0, rechts = 1, die Zeichen stehen in den **Blättern**. Der Pfad von der Wurzel zum Blatt ist das Codewort.

Bei Codes **variabler Länge** darf kein Codewort **Präfix** eines anderen sein. Stehen die Zeichen nur in den Blättern, ist das garantiert: Beim Lesen der Bits erreicht man entweder ein Blatt (Zeichen fertig) oder nicht.`,
      note: r`Je kürzer der Pfad zu einem Blatt, desto kürzer der Code. Für A, C, G, T genügen 2 Bit fest (28 Bit für AGCTGCCGCTACGC statt 70 Bit mit 5-Bit-Code) – mit variabler Länge 26.`,
    },
  ],
  theorems: [
    {
      id: 'knotenzahl',
      title: 'Höhe, Ordnung und Knotenzahl',
      ref: '3a · Height, Order, and Number of Nodes',
      statement: r`Ein Baum der Höhe $h$ und Ordnung $k$ hat höchstens

$$N(h, k) = \frac{k^h - 1}{k - 1}$$

Knoten. Für Binärbäume ($k = 2$): höchstens $N(h) = 2^h - 1$ Knoten.

Umgekehrt für vollständige Binärbäume: $\text{Höhe} = \log_2(\text{Knoten} + 1)$, allgemein aufrunden.`,
      note: r`Die Formel ist die geometrische Summe $1 + k + k^2 + \dots + k^{h-1}$, Ebene für Ebene gezählt. Binär: 1, 3, 7, 15, 31, 63, 127 Knoten bei Höhe 1 bis 7. Für $k = 3$: 1, 4, 13, 40.`,
    },
    {
      id: 'traversierung',
      title: 'Traversierung von Binärbäumen',
      ref: '3a · Traversal of Binary Trees',
      statement: r`Drei Schritte: Wurzel besuchen (V), linken Teilbaum durchlaufen (L), rechten Teilbaum durchlaufen (R). Mit der Konvention „L vor R“ bleiben drei Ordnungen:

- **Preorder** – V L R (NLR)
- **Inorder** – L V R (LNR)
- **Postorder** – L R V (LRN)

~~~
def inorder(t):
    if t is None: return
    inorder(t.left)
    visit(t)
    inorder(t.right)
~~~`,
      note: r`Der Name sagt, **wann** die Wurzel besucht wird. Beim Syntaxbaum liefert Preorder die Präfix-, Inorder die Infix- und Postorder die Postfix-Schreibweise. Beim Suchbaum liefert Inorder die Schlüssel sortiert.`,
    },
    {
      id: 'verkettete-darstellung',
      title: 'Verkettete Darstellung',
      ref: '3a · Computer Representation: Linked Representation',
      statement: r`Jeder Knoten speichert seinen Schlüssel und **zwei Referenzen** – auf den linken und den rechten Teilbaum.

~~~
class Tree:
    def __init__(self, key, left = None, right = None):
        self.key = key
        self.left = left
        self.right = right

root = Tree("root")
~~~`,
      note: r`Höchste Flexibilität – wichtig bei dynamischen Änderungen. Bäume sind die Datenstruktur hinter vielen Algorithmen mit $\Oh(\log n)$ oder $\Oh(n \log n)$.`,
    },
    {
      id: 'huffman',
      title: 'Huffman-Codierung',
      ref: '3a · Huffman Coding',
      statement: r`Nimmt man die **Häufigkeiten** der Zeichen als Gewichte der Blätter, liefert ein Baum mit **minimaler mittlerer Suchtiefe** einen optimalen Code. Konstruktion (Greedy, „Merge-Technik“):

~~~
Initialisierung: jedes Zeichen bildet einen eigenen Baum
                 (nur Wurzel) mit seiner Häufigkeit als Gewicht
solange die Anzahl der Bäume > 1:
  fasse die zwei Bäume mit den kleinsten Gewichten
  zu einem neuen Baum zusammen (neue Wurzel, linker
  und rechter Teilbaum)
  die neue Wurzel bekommt die Summe der beiden Gewichte
~~~

Aufwand: $\Oh(n \log n)$ für $n$ verschiedene Zeichen.`,
      note: r`Häufige Zeichen landen nahe der Wurzel und bekommen kurze Codes. Bei gleichen Gewichten darf man frei wählen – die Bäume unterscheiden sich, die Gesamtlänge nicht. Der Codebaum (das **Codebuch**) muss mit gespeichert oder übertragen werden. Anwendung: ZIP, Fax (Huffman über die Lauflängen der RLE-Codierung).`,
    },
    {
      id: 'rle',
      title: 'Lauflängencodierung (RLE)',
      ref: '3a · Example application of Huffman codes',
      statement: r`**Run-Length Encoding** komprimiert aufeinanderfolgende gleiche Symbole, indem es den **Wert und seine Anzahl** speichert:

~~~
WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWW…   →   12W 1B 12W 3B 24W 1B 14W …
~~~`,
      note: r`Faxgerät (vereinfacht): Seite rastern, zwei Symbole W und B, RLE – und dann ein Huffman-Baum über die Häufigkeiten der Lauflängen-Symbole.`,
    },
  ],
  claims: [
    {
      id: 'kanten',
      statement: r`Ein Baum mit $n$ Knoten hat genau $n - 1$ Kanten.`,
      holds: true,
      reason: r`Jeder Knoten außer der Wurzel hat genau einen Elternknoten, also genau eine Kante nach oben.`,
    },
    {
      id: 'hoehe-wurzel',
      statement: r`Nach der Konvention der Vorlesung hat ein Baum, der nur aus der Wurzel besteht, die Höhe 0.`,
      holds: false,
      reason: r`Höhe = maximale Ebene $+ 1$ = Anzahl der Ebenen. Die Wurzel liegt auf Ebene 0, also Höhe 1. (Höhe 0 ergäbe die alternative Definition über Kanten.)`,
    },
    {
      id: 'max-knoten',
      statement: r`Ein Binärbaum der Höhe 5 hat höchstens 31 Knoten.`,
      holds: true,
      reason: r`$N(h) = 2^h - 1 = 2^5 - 1 = 31$.`,
    },
    {
      id: 'strikt-vollstaendig',
      statement: r`Jeder strikte Binärbaum ist vollständig.`,
      holds: false,
      reason: r`Umgekehrt. Ein strikter Baum verlangt nur 0 oder 2 Kinder pro Knoten – die Blätter dürfen auf ganz verschiedenen Ebenen liegen.`,
    },
    {
      id: 'ausgeglichen-fast-vollstaendig',
      statement: r`Jeder fast vollständige Binärbaum ist ausgeglichen.`,
      holds: true,
      reason: r`Fast vollständig ist die strengere Bedingung: Die Blätter der letzten Ebene müssen links stehen. Ausgeglichen erlaubt Lücken an beliebiger Stelle der untersten Ebene.`,
    },
    {
      id: 'null-zeiger',
      statement: r`In einem Binärbaum mit $n$ Knoten in verketteter Darstellung sind genau $n + 1$ Zeiger null.`,
      holds: true,
      reason: r`Es gibt $2n$ Zeiger. Jeder Knoten außer der Wurzel wird von genau einem Zeiger referenziert, also sind $n - 1$ benutzt und $2n - (n - 1) = n + 1$ null.`,
    },
    {
      id: 'inorder-wurzel-zuerst',
      statement: r`Bei der Inorder-Traversierung wird die Wurzel zuerst besucht.`,
      holds: false,
      reason: r`Inorder ist L V R: erst der linke Teilbaum, dann die Wurzel, dann der rechte. Die Wurzel zuerst besucht Preorder (V L R).`,
    },
    {
      id: 'praefix',
      statement: r`Bei einem Code variabler Länge darf kein Codewort Präfix eines anderen Codeworts sein.`,
      holds: true,
      reason: r`Sonst wäre das Dekodieren nicht eindeutig. Ein Codebaum mit den Zeichen nur in den Blättern erfüllt die Bedingung automatisch.`,
    },
    {
      id: 'huffman-haeufig-lang',
      statement: r`Im Huffman-Baum bekommen seltene Zeichen die kürzesten Codewörter.`,
      holds: false,
      reason: r`Die leichtesten Bäume werden zuerst zusammengefasst und landen deshalb am tiefsten. Häufige Zeichen bleiben nahe der Wurzel und bekommen kurze Codes.`,
    },
    {
      id: 'binaer-links-rechts',
      statement: r`Ein Knoten mit nur einem linken Kind und derselbe Knoten mit nur einem rechten Kind sind als Binärbäume verschieden.`,
      holds: true,
      reason: r`Im Binärbaum ist die Unterscheidung zwischen linkem und rechtem Teilbaum wesentlich – auch wenn einer der beiden leer ist.`,
    },
    {
      id: 'gewicht',
      statement: r`Das Gewicht eines Baums ist in der Vorlesung die Anzahl aller seiner Knoten.`,
      holds: false,
      reason: r`Das Gewicht ist die Anzahl der **Blätter**. (Manche Quellen zählen alle Knoten – die Folien weisen ausdrücklich darauf hin.)`,
    },
  ],
  problems: [
    {
      id: 'begriffe-ablesen',
      title: 'Begriffe am Baum ablesen',
      source: 'nach 3a · Terminologies',
      points: 5,
      task: r`~~~
          A
        / | \
       B  C  D
          |
          E
        / | \
       F  G  H
~~~

Gib an: Blätter, innere Knoten, Geschwister von G, Ebene von F, Höhe, Gewicht und Ordnung des Baums. Wie viele Knoten könnte ein Baum dieser Höhe und Ordnung höchstens haben?`,
      solution: r`- Blätter: B, D, F, G, H
- innere Knoten: C, E (und die Wurzel A)
- Geschwister von G: F und H
- Ebene von F: Ebene(E) $+ 1 = 3$
- Höhe: maximale Ebene $+ 1 = 4$
- Gewicht: 5 (Anzahl der Blätter)
- Ordnung: 3 (maximaler Grad; A und E haben je 3 Kinder)

$N(4, 3) = \frac{3^4 - 1}{3 - 1} = 40$ Knoten – der Baum hat nur 8.`,
    },
    {
      id: 'syntaxbaum',
      title: 'Syntaxbaum traversieren',
      source: 'nach 3a · Traversal of Binary Trees',
      points: 6,
      task: r`Zeichne den Syntaxbaum zum Ausdruck $(a + b) \cdot (c - d \div e)$ und gib die Knoten in Preorder, Inorder und Postorder an.`,
      solution: r`~~~
          ·
        /   \
       +     -
      / \   / \
     a   b c   ÷
              / \
             d   e
~~~

- **Preorder** (V L R): $\cdot \; + \; a \; b \; - \; c \; \div \; d \; e$
- **Inorder** (L V R): $a \; + \; b \; \cdot \; c \; - \; d \; \div \; e$
- **Postorder** (L R V): $a \; b \; + \; c \; d \; e \; \div \; - \; \cdot$

Inorder verliert die Klammern – ohne sie wäre der Ausdruck ein anderer. Pre- und Postorder sind auch ohne Klammern eindeutig.`,
    },
    {
      id: 'huffman-bauen',
      title: 'Huffman-Code konstruieren',
      source: 'nach 3a · Huffman Coding',
      points: 8,
      task: r`Ein Text besteht aus den Zeichen E, N, S, T, R mit den Häufigkeiten

~~~
E: 8    N: 5    S: 3    T: 2    R: 1
~~~

- (a) Konstruiere den Huffman-Baum und gib die Codewörter an (links 0, rechts 1).
- (b) Wie viele Bit braucht der Text? Vergleiche mit einem Code fester Länge.
- (c) Wie groß ist die gewichtete mittlere Suchtiefe?`,
      hint: r`Immer die zwei leichtesten Bäume zusammenfassen: zuerst R und T.`,
      solution: r`**(a)** Zusammenfassen: R(1) + T(2) = 3 → S(3) + RT(3) = 6 → N(5) + 6 = 11 → E(8) + 11 = 19.

~~~
        19
       /  \
      E    11
     (8)  /  \
         N    6
        (5)  / \
            S   3
           (3) / \
              R   T
~~~

Codewörter: E = 0, N = 10, S = 110, R = 1110, T = 1111. (Links/rechts darf man vertauschen – die Längen bleiben.)

**(b)** $8 \cdot 1 + 5 \cdot 2 + 3 \cdot 3 + 2 \cdot 4 + 1 \cdot 4 = 39$ Bit. Feste Länge: 5 Zeichen brauchen 3 Bit, also $19 \cdot 3 = 57$ Bit.

**(c)** $\frac{39}{19} \approx 2{,}05$ Bit pro Zeichen.`,
    },
    {
      id: 'dna',
      title: 'DNA-Sequenz codieren',
      source: 'nach 3a · Data Encoding / Code Tree',
      points: 6,
      task: r`Die Sequenz AGCTGCCGCTACGC soll binär gespeichert werden.

- (a) Wie viele Bit braucht ein 5-Bit-Code (ganzes Alphabet), wie viele ein fester 2-Bit-Code?
- (b) Bestimme die Häufigkeiten und konstruiere den Huffman-Baum. Wie viele Bit braucht die Sequenz damit?
- (c) Warum steht C im Baum höher als A?`,
      solution: r`**(a)** 14 Zeichen: $14 \cdot 5 = 70$ Bit bzw. $14 \cdot 2 = 28$ Bit.

**(b)** Häufigkeiten: A 2, G 4, C 6, T 2.

T(2) + A(2) = 4 → G(4) + 4 = 8 → C(6) + 8 = 14.

Codelängen: C 1 Bit, G 2 Bit, A und T je 3 Bit.

$6 \cdot 1 + 4 \cdot 2 + 2 \cdot 3 + 2 \cdot 3 = 26$ Bit.

**(c)** C ist das häufigste Zeichen. Je kürzer der Pfad von der Wurzel zum Blatt, desto kürzer der Code – also gehört das „schwerste“ Zeichen nach oben. Dazu kommt in der Praxis noch das Codebuch.`,
    },
    {
      id: 'suchtiefe-berechnen',
      title: 'Mittlere Suchtiefe berechnen',
      source: 'nach 3a · Average Search Depth',
      points: 4,
      task: r`Ein Binärbaum hat 1 Knoten auf Ebene 0, 2 auf Ebene 1, 4 auf Ebene 2 und 4 auf Ebene 3. Berechne die mittlere Suchtiefe. Ist der Baum vollständig? Welche Höhe hat er?`,
      solution: r`$$asd = \frac{1 \cdot (0+1) + 2 \cdot (1+1) + 4 \cdot (2+1) + 4 \cdot (3+1)}{11} = \frac{1 + 4 + 12 + 16}{11} = \frac{33}{11} = 3$$

Höhe 4 (vier Ebenen). Vollständig wäre er erst mit $2^4 - 1 = 15$ Knoten – auf Ebene 3 fehlen 4 Knoten.`,
    },
  ],
});
