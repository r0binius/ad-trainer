import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 3c: AVL trees, balance factors, the four rotation cases, deletion. */
export const avl = topic({
  id: 'avl',
  chapter: '3c',
  title: 'AVL-Bäume',
  summary:
    'AVL-Kriterium, Balancefaktor, Rotationen LL, RR, LR und RL, Löschen mit Rebalancierung.',
  definitions: [
    {
      id: 'avl-baum',
      title: 'AVL-Baum und AVL-Kriterium',
      ref: '3c · AVL-Trees (Adelson-Velsky and Landis)',
      statement: r`Ein **AVL-Baum** ist ein **1-balancierter binärer Suchbaum**. **AVL-Kriterium:** Für **alle** Knoten $x$ gilt

$$\bigl|\, h(B_L(x)) - h(B_R(x)) \,\bigr| \le 1.$$

Die Höhen des linken und rechten Teilbaums unterscheiden sich an keinem Knoten um mehr als 1.`,
      note: r`Eingeführt 1962 von Adelson-Velski und Landis – die erste selbstbalancierende Datenstruktur. Rekursiv: Sind $B_L$ und $B_R$ AVL-Bäume der Höhe $m$ oder $m + 1$, ist auch der zusammengesetzte Baum ein AVL-Baum (Höhe $m + 1$ oder $m + 2$). Auch die Teilbäume jedes Knotens sind AVL-Bäume.`,
    },
    {
      id: 'balancefaktor',
      title: 'Balancefaktor',
      ref: '3c · Insertion into an AVL Tree',
      statement: r`Der **Balancefaktor** eines Knotens $x$ ist

$$BF(x) = h(B_L(x)) - h(B_R(x)).$$

Im AVL-Baum ist $BF(x) \in \{-1, 0, +1\}$ für jeden Knoten. Der aktuelle Balancefaktor wird im Knoten gespeichert.`,
      note: r`Ein leerer Teilbaum hat Höhe 0. Vorzeichen merken: **links minus rechts** – positiv heißt linkslastig, negativ rechtslastig. Nach dem Einfügen in einen gültigen AVL-Baum kann ein verletzter Balancefaktor nur $\pm 2$ sein.`,
    },
    {
      id: 'rotationsknoten',
      title: 'Die Knoten X, Y und Z bei der Rebalancierung',
      ref: '3c · Rotations in AVL Trees – Re-balancing (1)',
      statement: r`- $Y$: der **neu eingefügte** Knoten
- $X$: der Knoten mit **verletztem AVL-Kriterium** – der zu $Y$ **nächstgelegene** Vorfahre mit $BF(X) = \pm 2$ auf dem Pfad zur Wurzel
- $Z$: der **Rotationsknoten** (pivot) – das Kind von $X$ auf der Seite, in die eingefügt wurde; bei der Einfachrotation rückt er an die Stelle von $X$`,
      note: r`Rebalanciert wird immer am **untersten** verletzten Knoten. Die Teilbäume von $X$ sind selbst balanciert – sonst wäre dort schon rotiert worden. Die Buchstaben sind Variablen, nicht Knoteninhalte.`,
    },
    {
      id: 'rotationstypen',
      title: 'Die vier Rotationstypen',
      ref: '3c · Rotations in AVL Trees – Re-balancing (1)',
      statement: r`Der Typ benennt, **wohin** $Y$ relativ zu $X$ eingefügt wurde:

- **LL**: in den linken Teilbaum des linken Teilbaums von $X$ → **Rechtsrotation**
- **RR**: in den rechten Teilbaum des rechten Teilbaums von $X$ → **Linksrotation**
- **LR**: in den rechten Teilbaum des linken Teilbaums von $X$ → **Doppelrotation**: erst Linksrotation, dann Rechtsrotation
- **RL**: in den linken Teilbaum des rechten Teilbaums von $X$ → **Doppelrotation**: erst Rechtsrotation, dann Linksrotation`,
      note: r`Der Name ist der Weg von $X$ zur Einfügestelle – die Rotation geht in die Gegenrichtung. Gerader Weg (LL, RR): Einfachrotation. Zickzack (LR, RL): Doppelrotation.`,
    },
    {
      id: 'randknoten',
      title: 'Randknoten und Halbblatt',
      ref: '3c · Deletion',
      statement: r`- **Randknoten** (boundary node): ein Knoten mit **höchstens einem** Kind (0 oder 1).
- **Halbblatt** (half-leaf): ein Knoten mit **genau einem** Kind.`,
      note: r`Das Löschen im AVL-Baum wird immer auf das Löschen eines Randknotens zurückgeführt.`,
    },
  ],
  theorems: [
    {
      id: 'einfachrotation',
      title: 'Einfachrotation (Fall LL und RR)',
      ref: '3c · AVL Trees – Systematic Analysis of Cases (1)–(3)',
      statement: r`**Fall LL → Rechtsrotation** an $X$ mit Rotationsknoten $Z = B_L(X)$:

~~~
        X                Z
       / \              / \
      Z   B3    →     B1   X
     / \              |   / \
   B1   B2            Y  B2  B3
    |
    Y
~~~

- $B_L(X) := B_2$ (der rechte Teilbaum von $Z$ wandert zu $X$)
- $B_R(Z) := X$
- der Vorgänger von $X$ zeigt jetzt auf $Z$

**Fall RR → Linksrotation**: spiegelbildlich – $B_R(X) := B_2$, $B_L(Z) := X$.`,
      note: r`Bild der Folien: Man „greift“ den Baum am Rotationsknoten und hebt ihn an; $X$ fällt zur anderen Seite herunter. Der mittlere Teilbaum $B_2$ wechselt den Elternknoten – die Suchbaumordnung $B_1 < Z < B_2 < X < B_3$ bleibt erhalten.`,
    },
    {
      id: 'doppelrotation',
      title: 'Doppelrotation (Fall LR und RL)',
      ref: '3c · AVL Trees – Systematic Analysis of Cases (4)',
      statement: r`**Fall LR** – $Y$ wurde in den rechten Teilbaum des linken Kindes $Z$ von $X$ eingefügt; $V$ sei die Wurzel dieses Teilbaums:

~~~
        X                 X                 V
       / \               / \              /   \
      Z   B4            V   B4           Z     X
     / \       →       / \       →      / \   / \
   B1   V             Z   B3          B1  B2 B3  B4
       / \           / \
     B2   B3       B1   B2
~~~

- **1. Linksrotation** an $Z$ (hebt $V$ an)
- **2. Rechtsrotation** an $X$ (hebt $V$ noch einmal an)

**Fall RL**: spiegelbildlich – erst Rechtsrotation am rechten Kind, dann Linksrotation an $X$.`,
      note: r`Eine Einfachrotation würde das Zickzack nur auf die andere Seite kippen. Der Zwischenzustand nach dem ersten Schritt ist noch „ungültig“. Am Ende steht der **mittlere** der drei Schlüssel $Z < V < X$ oben.`,
    },
    {
      id: 'einfuegen',
      title: 'Einfügen in einen AVL-Baum',
      ref: '3c · Summary of Rotations',
      statement: r`- wie im binären Suchbaum einfügen
- auf dem Pfad vom neuen Knoten zur Wurzel die Balancefaktoren neu berechnen
- am **ersten** Knoten $X$ mit $BF = \pm 2$ rotieren (LL, RR, LR oder RL)

Nach der Rotation hat der rotierte Teilbaum wieder **dieselbe Höhe wie vor dem Einfügen** – daher ist **höchstens eine (Doppel-)Rotation** nötig.

Kosten: $\Oh(\log n)$.`,
      note: r`Der Rotationstyp folgt aus den Balancefaktoren von $X$ und seinem Kind $Z$: gleiche Vorzeichen ($+2, +1$ oder $-2, -1$) → Einfachrotation; verschiedene → Doppelrotation.`,
    },
    {
      id: 'loeschen',
      title: 'Löschen im AVL-Baum',
      ref: '3c · Deletion',
      statement: r`Das Löschen wird auf das Löschen eines **Randknotens** zurückgeführt:

- **Blatt** → löschen
- **Halbblatt** → durch die Wurzel seines einzigen Teilbaums ersetzen
- **innerer Knoten** $X$ mit zwei Teilbäumen → Ersatzknoten suchen (größter Knoten in $B_L(X)$ oder kleinster in $B_R(X)$), mit $X$ tauschen, dann $X$ als Randknoten löschen

Danach die Balancefaktoren auf dem **ganzen Pfad bis zur Wurzel** prüfen und rebalancieren. Anders als beim Einfügen können **mehrere Rotationen** nötig sein.`,
      note: r`Idee: Löschen wie Einfügen auf der gegenüberliegenden Seite behandeln. Der Ersatzknoten ist der am weitesten **rechts** stehende Knoten des linken Teilbaums – nicht der tiefste. Manchmal kann man nach dem Löschen zwischen Einfach- und Doppelrotation wählen (wenn das Kind $Z$ den Balancefaktor 0 hat).`,
    },
    {
      id: 'kosten',
      title: 'Kosten und Einordnung',
      ref: '3c · Final Words on Search Trees',
      statement: r`Im AVL-Baum kosten **Einfügen, Löschen und Suchen** jeweils $\Oh(\log n)$ – auch im schlimmsten Fall.

Ein AVL-Baum mit $n$ Schlüsseln lässt sich in $\Oh(n \log n)$ aufbauen.`,
      note: r`Das AVL-Kriterium garantiert eine Höhe in $\Oh(\log n)$, und jede Rotation ändert nur konstant viele Zeiger. Andere balancierte Bäume: Rot-Schwarz-Bäume (auch Höhe), gewichtsbalancierte Bäume, Splay-Bäume (balancieren auch beim Suchen). Optimale Suchbäume: $\Oh(n^3)$ (Hu-Tucker, nicht prüfungsrelevant).`,
    },
  ],
  claims: [
    {
      id: 'bf-vorzeichen',
      statement: r`Ein Knoten mit leerem linken Teilbaum und einem einzelnen rechten Kind hat den Balancefaktor $-1$.`,
      holds: true,
      reason: r`$BF = h(B_L) - h(B_R) = 0 - 1 = -1$.`,
    },
    {
      id: 'rr-rechtsrotation',
      statement: r`Der Fall RR wird durch eine Rechtsrotation behoben.`,
      holds: false,
      reason: r`RR heißt: eingefügt rechts-rechts von $X$, der Baum ist rechtslastig. Behoben wird das durch eine **Linksrotation**. Die Rechtsrotation gehört zum Fall LL.`,
    },
    {
      id: 'eine-rotation',
      statement: r`Nach dem Einfügen eines Knotens in einen AVL-Baum genügt höchstens eine Einfach- oder Doppelrotation.`,
      holds: true,
      reason: r`Die Rotation stellt die Höhe des Teilbaums von vor dem Einfügen wieder her – weiter oben ändert sich kein Balancefaktor mehr.`,
    },
    {
      id: 'loeschen-eine-rotation',
      statement: r`Auch nach dem Löschen genügt im AVL-Baum immer höchstens eine Rotation.`,
      holds: false,
      reason: r`Nach einer Rotation kann der Teilbaum niedriger sein als vorher – dann wird weiter oben ein anderer Knoten unbalanciert. Es muss bis zur Wurzel geprüft werden; mehrere Rotationen sind möglich.`,
    },
    {
      id: 'avl-ist-suchbaum',
      statement: r`Die Suche im AVL-Baum verwendet denselben Algorithmus wie im gewöhnlichen binären Suchbaum.`,
      holds: true,
      reason: r`AVL-Bäume sind binäre Suchbäume. Nur Einfügen und Löschen müssen angepasst werden, damit das AVL-Kriterium erhalten bleibt.`,
    },
    {
      id: 'nur-wurzel',
      statement: r`Für einen AVL-Baum genügt es, dass sich an der Wurzel die Höhen von linkem und rechtem Teilbaum um höchstens 1 unterscheiden.`,
      holds: false,
      reason: r`Das Kriterium muss für **alle** Knoten gelten. Zwei gleich hohe, aber in sich entartete Teilbäume ergäben sonst einen „AVL-Baum“ mit linearer Höhe.`,
    },
    {
      id: 'unterster-knoten',
      statement: r`Rebalanciert wird an dem verletzten Knoten, der dem neu eingefügten Knoten auf dem Pfad zur Wurzel am nächsten liegt.`,
      holds: true,
      reason: r`Das ist der Knoten $X$. Seine Teilbäume sind selbst noch balanciert; und nach der Rotation dort stimmen auch alle Knoten darüber wieder.`,
    },
    {
      id: 'ersatz-tiefster',
      statement: r`Beim Löschen eines inneren Knotens $X$ nimmt man als Ersatz den tiefsten Knoten des linken Teilbaums.`,
      holds: false,
      reason: r`Man nimmt den **größten** (am weitesten rechts stehenden) Knoten von $B_L(X)$ oder den kleinsten (am weitesten links stehenden) von $B_R(X)$ – nicht den tiefsten.`,
    },
    {
      id: 'vollstaendig',
      statement: r`Jeder AVL-Baum ist ein vollständiger Binärbaum.`,
      holds: false,
      reason: r`Das AVL-Kriterium erlaubt Höhenunterschiede von 1 an jedem Knoten. Schon ein Baum mit Wurzel und nur einem Kind ist ein AVL-Baum, aber nicht vollständig.`,
    },
  ],
  problems: [
    {
      id: 'einfuegen-rr-rl',
      title: 'Einfügen mit RR und RL',
      source: 'nach 3c · Rotations in AVL Trees – Re-balancing',
      points: 8,
      task: r`Füge $10, 20, 30, 40, 50, 25$ in dieser Reihenfolge in einen leeren AVL-Baum ein. Nenne bei jeder Verletzung den Knoten $X$, den Rotationstyp und die Rotation(en), und zeichne den Baum am Ende.`,
      solution: r`- **10, 20**: kein Problem.
- **30**: $BF(10) = -2$, eingefügt rechts-rechts → **RR**, Linksrotation an 10. Wurzel 20, Kinder 10 und 30.
- **40**: kein Problem ($BF(30) = -1$, $BF(20) = -1$).
- **50**: $BF(30) = -2$ → **RR**, Linksrotation an 30. Unter 20 hängt rechts jetzt 40 mit den Kindern 30 und 50.
- **25**: landet als linkes Kind von 30. $BF(20) = 1 - 3 = -2$, eingefügt im linken Teilbaum des rechten Teilbaums → **RL**: erst Rechtsrotation an 40 (30 steigt, 40 wird sein rechtes Kind), dann Linksrotation an 20.

~~~
          30
        /    \
      20      40
     /  \       \
   10    25      50
~~~`,
    },
    {
      id: 'einfuegen-ll-lr',
      title: 'Einfügen mit LL und LR',
      source: 'nach 3c · Systematic Analysis of Cases',
      points: 6,
      task: r`Füge $50, 40, 30, 10, 20$ in einen leeren AVL-Baum ein. Welche Rotationstypen treten auf?`,
      solution: r`- **50, 40**: kein Problem.
- **30**: $BF(50) = +2$, eingefügt links-links → **LL**, Rechtsrotation an 50. Wurzel 40, Kinder 30 und 50.
- **10**: linkes Kind von 30, kein Problem.
- **20**: rechtes Kind von 10. $BF(30) = +2$, eingefügt im rechten Teilbaum des linken Teilbaums → **LR**: erst Linksrotation an 10 (20 steigt), dann Rechtsrotation an 30.

~~~
        40
       /  \
     20    50
    /  \
  10    30
~~~

Der mittlere Schlüssel 20 von $10 < 20 < 30$ steht oben.`,
    },
    {
      id: 'sortiert-einfuegen',
      title: 'Sortierte Folge: Suchbaum gegen AVL-Baum',
      source: 'nach 3b · Special Cases / 3c',
      points: 6,
      task: r`Füge $1, 2, 3, 4, 5, 6, 7$ in dieser Reihenfolge ein – einmal in einen gewöhnlichen binären Suchbaum, einmal in einen AVL-Baum. Vergleiche Höhe und mittlere Suchtiefe. Wie viele Rotationen braucht der AVL-Baum?`,
      solution: r`**Binärer Suchbaum:** entartet zur Liste, Höhe 7, $asd = \frac{7 + 1}{2} = 4$.

**AVL-Baum:** vier Linksrotationen, alle vom Typ RR:

- nach 3: an 1 → Wurzel 2
- nach 5: an 3 → 4 mit Kindern 3 und 5
- nach 6: an 2 → Wurzel 4
- nach 7: an 5 → 6 mit Kindern 5 und 7

~~~
        4
      /   \
     2     6
    / \   / \
   1   3 5   7
~~~

Vollständiger Baum der Höhe 3, $asd = \frac{1 + 4 + 12}{7} = \frac{17}{7} \approx 2{,}43$.`,
    },
    {
      id: 'loeschen-rotation',
      title: 'Löschen mit Rebalancierung',
      source: 'nach 3c · Deletion',
      points: 6,
      task: r`~~~
        40
       /  \
     20    50
    /  \
  10    30
~~~

Lösche 50. Welcher Knoten ist danach unbalanciert, und wie wird rebalanciert? Gibt es mehr als eine Möglichkeit?`,
      hint: r`Behandle das Löschen wie ein Einfügen auf der gegenüberliegenden Seite – und sieh dir den Balancefaktor von 20 an.`,
      solution: r`50 ist ein Blatt und wird direkt gelöscht. Danach ist $BF(40) = 2 - 0 = +2$ → $X = 40$, $Z = 20$ mit $BF(20) = 0$.

Weil $BF(Z) = 0$ ist, passen beide Sichtweisen („10 wurde eingefügt“ = LL, „30 wurde eingefügt“ = LR):

**Einfachrotation** (Rechtsrotation an 40):

~~~
      20
     /  \
   10    40
        /
      30
~~~

**Doppelrotation** (Linksrotation an 20, Rechtsrotation an 40):

~~~
      30
     /  \
   20    40
  /
10
~~~

Beide Bäume erfüllen das AVL-Kriterium. Danach bis zur Wurzel weiterprüfen – hier ist der rotierte Knoten schon die Wurzel.`,
    },
  ],
});
