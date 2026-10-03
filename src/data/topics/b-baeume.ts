import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 3d: access times, m-way search trees, B-trees with insertion, deletion and their cost. */
export const bBaeume = topic({
  id: 'b-baeume',
  chapter: '3d',
  title: 'Mehrwegbäume und B-Bäume',
  summary:
    'Zugriffszeiten, m-Wege-Suchbaum, B-Baum der Klasse k, Splitten, Ausgleichen, Mischen, Kosten.',
  definitions: [
    {
      id: 'zugriffszeit',
      title: 'Zugriffszeit-Dilemma',
      ref: '3d · Access Time – Dilemma',
      statement: r`Das **Suchen** (Positionieren) einer Information auf einem Speichermedium dauert oft viel länger als das **Lesen**:

- HDD: ca. 8–10 ms Zugriffszeit, aber nur ca. 0,025 ms zum Lesen eines 4-KB-Blocks
- SSD: ca. 0,03 ms Zugriffszeit gegen ca. 0,001 ms Lesezeit

Folgerung für Bäume: **Zugriffe auf einzelne Blöcke sind teuer**, die Datenübertragung ist billig. Also die **Höhe minimieren** – durch großen **Fan-out** (viele Teilbäume pro Knoten).`,
      note: r`Wie im Telefonbuch: Müller, Max zu finden dauert fast so lange, wie die ganze Seite zu lesen. Ein Binärbaum speichert nur einen Schlüssel pro Knoten – auf Sekundärspeicher kostet jeder Knoten einen vollen Plattenzugriff.`,
    },
    {
      id: 'm-wege-suchbaum',
      title: 'm-Wege-Suchbaum',
      ref: '3d · Definition of m-Way Search Tree',
      statement: r`Ein **$m$-Wege-Suchbaum** ist ein Baum, in dem alle Knoten einen Grad $\le m$ haben. Er ist leer oder jeder Knoten hat die Form

~~~
b | P0 | K1 D1 | P1 | K2 D2 | P2 | … | Kb Db | Pb
~~~

- $b$ ist die Zahl der Schlüssel im Knoten, $b < m$ (also höchstens $m - 1$ Schlüssel und $m$ Zeiger)
- die Schlüssel sind aufsteigend sortiert: $K_i < K_{i+1}$
- alle Schlüssel im Teilbaum von $P_0$ sind kleiner als $K_1$
- für alle Schlüssel $S$ im Teilbaum von $P_i$ gilt $K_i < S < K_{i+1}$ ($1 \le i < b$)
- alle Schlüssel im Teilbaum von $P_b$ sind größer als $K_b$
- die Teilbäume der $P_i$ sind selbst $m$-Wege-Suchbäume`,
      note: r`Verallgemeinerung des binären Suchbaums ($m = 2$). $D_i$ sind die Daten zum Schlüssel oder Zeiger darauf – der Baum dient als **Index**. Problem: **kein Balancierungsmechanismus** – Blätter auf verschiedenen Ebenen, schlechte Speicherausnutzung, kann zur Liste entarten.`,
    },
    {
      id: 'b-baum',
      title: 'B-Baum der Klasse k',
      ref: '3d · B-Tree of Class k (Order k)',
      statement: r`Ein **B-Baum der Klasse $k$** ist ein Mehrwegbaum mit:

- **jeder Pfad** von der Wurzel zu einem Blatt hat die **gleiche Länge**;
- jeder Knoten außer Wurzel und Blättern hat **mindestens $k + 1$ Kinder**;
- die Wurzel ist ein Blatt oder hat **mindestens 2 Kinder**;
- jeder Knoten hat **höchstens $2k + 1$ Kinder**;
- jedes Blatt hat höchstens $2k$ Einträge und – außer wenn die Wurzel ein Blatt ist – mindestens $k$.

Kurz: Jeder Knoten außer der Wurzel enthält zwischen $k$ und $2k$ Schlüssel.`,
      note: r`Die wohl am weitesten verbreitete Datenstruktur der Praxis (Bayer und McCreight, 1972). Knoten werden auf die Blockgröße des Speichers abgestimmt – Fan-outs von 50 und mehr, extrem flache Bäume, kurze Zugriffspfade.`,
    },
    {
      id: 'ueberlauf-unterlauf',
      title: 'Überlauf und Unterlauf',
      ref: '3d · Insertion in a B-Tree / Deletion and Merging',
      statement: r`- **Voller Knoten**: hat seine maximale Kapazität von $2k$ Schlüsseln erreicht.
- **Überlauf** (overflow): ein weiterer, $(2k+1)$-ter Schlüssel passt nicht mehr → der Knoten wird **gesplittet**.
- **Unterlauf** (underflow): nach einem Löschen hat ein Knoten weniger als die Mindestzahl $k$ → **Ausgleichen** oder **Mischen**.`,
    },
    {
      id: 'belegungsgrad',
      title: 'Belegungsgrad',
      ref: '3d · Overflow Handling (Splitting) General',
      statement: r`Enthält ein Knoten $b$ Einträge bei maximal $2k$, so ist sein **Belegungsgrad** (utilization factor)

$$\beta = \frac{b}{2k}.$$

Splitfaktor 2 (eine volle Seite wird auf zwei verteilt): $\beta = 50\,\%$ in den betroffenen Seiten nach dem Split.

Splitten erst, wenn $m = 2$ benachbarte Seiten voll sind (zwei volle auf drei verteilen): $\beta = \frac{2 \cdot 2k}{3 \cdot 2k} \approx 66{,}7\,\%$.`,
      note: r`Der B-Baum mit doppeltem Überlauf heißt **B\*-Baum**: Bei Überlauf wird zuerst versucht, Schlüssel an nicht volle Nachbarn abzugeben. Vollerer Baum, aber mehr Reorganisation. Im **B+-Baum** stehen die Daten nur in den Blättern, innere Knoten enthalten nur Wegweiser.`,
    },
  ],
  theorems: [
    {
      id: 'kapazitaet-m-wege',
      title: 'Knoten- und Schlüsselzahl im m-Wege-Suchbaum',
      ref: '3d · Definition of m-Way Search Tree (2)',
      statement: r`Knotenzahl im vollständigen Baum der Höhe $h \ge 1$:

$$N = \sum_{i=0}^{h-1} m^i = \frac{m^h - 1}{m - 1}$$

Maximale Schlüsselzahl:

$$n_{max} = N \cdot (m - 1) = m^h - 1$$

Völlig entarteter Baum (lineare Liste): $n = N = h$.`,
      note: r`$n = N = h$: ein Knoten pro Ebene und nur ein Schlüssel pro Knoten – obwohl $m - 1$ Platz hätten. Der schlechteste Fall, den erst der B-Baum ausschließt.`,
    },
    {
      id: 'knotengroesse',
      title: 'Knotengröße und Klasse k',
      ref: '3d · B-Tree of Class k',
      statement: r`Ein Knoten der Länge $L$ enthält ein Zählfeld $b$ (Länge $L_b$), Einträge fester Länge (Schlüssel $L_K$, Daten $L_D$) und Zeiger (Länge $L_P$). Die maximale Zahl der Einträge ist

$$b_{max} = \left\lfloor \frac{L - L_b - L_P}{L_K + L_D + L_P} \right\rfloor = 2k.$$`,
      note: r`Zu $b$ Einträgen gehören $b + 1$ Zeiger: einer ganz links und einer nach jedem Eintrag – deshalb wird ein $L_P$ vorab abgezogen. $2k$ Einträge → höchstens $2k + 1$ Kinder.`,
    },
    {
      id: 'einfuegen',
      title: 'Einfügen und Splitten im B-Baum',
      ref: '3d · Insertion in a B-Tree',
      statement: r`- Eingefügt wird immer in einem **Blatt** (an der sortiert passenden Stelle).
- Die ersten $2k$ Schlüssel füllen die Wurzel.
- Der $(2k+1)$-te Schlüssel verursacht einen **Überlauf** → **Split**:

~~~
[ K1 … Kk | Kk+1 | Kk+2 … K2k+1 ]

              [ Kk+1 ]              ← wandert in den Elternknoten
             /        \
   [ K1 … Kk ]      [ Kk+2 … K2k+1 ]
~~~

- die ersten $k$ Schlüssel bleiben im linken Knoten
- die letzten $k$ Schlüssel kommen in einen neuen rechten Knoten
- der **mittlere Schlüssel** $K_{k+1}$ steigt als Trennschlüssel in den **Elternknoten** auf`,
      note: r`Dadurch kann der Elternknoten selbst überlaufen und muss gesplittet werden – notfalls bis zur Wurzel. Wird die Wurzel gesplittet, entsteht eine neue Wurzel: Der B-Baum wächst **nach oben**, deshalb bleiben alle Blätter auf derselben Ebene.`,
    },
    {
      id: 'loeschen-ausgleichen',
      title: 'Löschen: Ausgleichen (Rotation)',
      ref: '3d · Deletion in B-Trees (1), (2)',
      statement: r`Ziel: die Mindestbelegung $k$ trotz Löschen erhalten. Hat der Knoten nach dem Löschen nur noch $k - 1$ Schlüssel und der **Nachbarknoten mehr als $k$**:

- der Randschlüssel des Nachbarn (z. B. sein größter, $K_b'$) rotiert in den **Elternknoten**,
- der bisherige **Trennschlüssel** $K_n$ aus dem Elternknoten wandert in den zu kleinen Knoten – der hat damit wieder $k$ Schlüssel.

Um wiederholtes Ausgleichen zu vermeiden, kann man mehrere Schlüssel rotieren, bis beide Knoten **etwa gleich viele** haben.`,
      note: r`Der Schlüssel wandert nie direkt von Nachbar zu Nachbar, sondern immer **über den Elternknoten** – sonst stimmte der Trennschlüssel nicht mehr.`,
    },
    {
      id: 'loeschen-mischen',
      title: 'Löschen: Mischen (Konkatenation)',
      ref: '3d · Deletion and Merging',
      statement: r`Verursacht das Löschen einen Unterlauf und hat der Nachbarknoten **genau $k$** Schlüssel, würde Ausgleichen dort einen Unterlauf erzeugen. Dann wird **gemischt**:

Die $k$ Schlüssel des einen Knotens, der **Trennschlüssel** aus dem Elternknoten und die $k - 1$ Schlüssel des anderen Knotens kommen in **einen** Knoten – zusammen $k + 1 + (k - 1) = 2k$ Schlüssel.`,
      note: r`Der Elternknoten verliert einen Schlüssel und einen Zeiger – und kann dadurch selbst unterlaufen (Fortsetzung nach oben). Mischen ist die Umkehrung des Splits; verliert die Wurzel ihren letzten Schlüssel, schrumpft der Baum um eine Ebene.`,
    },
    {
      id: 'kosten',
      title: 'Kosten im B-Baum',
      ref: '3d · Cost Analysis: Insertion (write) and Search (fetch)',
      statement: r`Gezählt werden Seitenzugriffe: Lesen (fetch, $f$) und Schreiben (write, $w$), bei Höhe $h$.

**Suchen:** $f_{min} = 1$ (Schlüssel in der Wurzel), $f_{max} = h$ (im Blatt), $f_{avg} \approx h$.

**Einfügen:**

- ohne Split: $w_{min} = 1$ (nur das Blatt wird geschrieben)
- Split bis zur Wurzel: $f_{max} = h$, $w_{max} = 2h + 1$

Splitwahrscheinlichkeit: $p_{split} < \frac{1}{k}$. Jedes Einfügen schreibt eine Seite, ein Split zwei weitere:

$$w_{avg} = 1 + 2 \cdot p_{split} < 1 + \frac{2}{k}$$

**Löschen:** wie beim Einfügen – bei großem $k$ ist der Zusatzaufwand vernachlässigbar.`,
      note: r`Bei großem Fan-out liegt die große Mehrheit der Schlüssel auf der untersten Ebene, deshalb $f_{avg} \approx h$ (für $k = 100$, $h = 3$: zwischen 2,99 und 2,995). $2h + 1$: auf jeder der $h$ Ebenen entstehen zwei Seiten, dazu die neue Wurzel. Die Folie nennt für das Einfügen ohne Split auch $f_{min} = 1$ – das gilt, solange die Wurzel selbst das Blatt ist; sonst wird bis zum Blatt gelesen. Aus einem vollen Knoten kann man $k$ Schlüssel löschen, bevor reorganisiert werden muss.`,
    },
  ],
  claims: [
    {
      id: 'blaetter-ebene',
      statement: r`In einem B-Baum liegen alle Blätter auf derselben Ebene.`,
      holds: true,
      reason: r`Jeder Pfad von der Wurzel zu einem Blatt hat die gleiche Länge – der Baum wächst durch Splitten der Wurzel nach oben, nicht nach unten.`,
    },
    {
      id: 'm-wege-balanciert',
      statement: r`Ein $m$-Wege-Suchbaum ist immer balanciert.`,
      holds: false,
      reason: r`Er hat keinen Balancierungsmechanismus: Blätter können auf verschiedenen Ebenen liegen, und im schlimmsten Fall entartet er zur Liste ($n = N = h$).`,
    },
    {
      id: 'max-kinder',
      statement: r`In einem B-Baum der Klasse $k = 2$ hat jeder Knoten höchstens 5 Kinder.`,
      holds: true,
      reason: r`Höchstens $2k = 4$ Schlüssel und damit $2k + 1 = 5$ Zeiger.`,
    },
    {
      id: 'wurzel-minimum',
      statement: r`Auch die Wurzel eines B-Baums der Klasse $k$ muss mindestens $k$ Schlüssel enthalten.`,
      holds: false,
      reason: r`Die Wurzel ist die Ausnahme: Sie ist ein Blatt oder hat mindestens 2 Kinder, also mindestens **einen** Schlüssel. Nach dem ersten Split enthält sie genau einen.`,
    },
    {
      id: 'median-hoch',
      statement: r`Beim Split wandert der mittlere Schlüssel $K_{k+1}$ in den Elternknoten.`,
      holds: true,
      reason: r`Die ersten $k$ Schlüssel bleiben links, die letzten $k$ gehen nach rechts, der mittlere wird neuer Trennschlüssel im Elternknoten – der dadurch selbst überlaufen kann.`,
    },
    {
      id: 'mischen-wann',
      statement: r`Bei einem Unterlauf wird immer mit dem Nachbarknoten gemischt.`,
      holds: false,
      reason: r`Zuerst wird **ausgeglichen** (Rotation über den Elternknoten), wenn der Nachbar mehr als $k$ Schlüssel hat. Gemischt wird nur, wenn der Nachbar genau $k$ Schlüssel hat.`,
    },
    {
      id: 'binaer-sekundaer',
      statement: r`Für Daten auf Sekundärspeicher ist ein AVL-Baum besser geeignet als ein B-Baum, weil er strenger balanciert ist.`,
      holds: false,
      reason: r`Ein Binärbaum speichert einen Schlüssel pro Knoten und braucht $\Oh(\log_2 n)$ Zugriffe – jeder ein voller Plattenzugriff. Der B-Baum packt viele Schlüssel in einen Block und ist dadurch extrem flach.`,
    },
    {
      id: 'max-schluessel',
      statement: r`Ein vollständiger 4-Wege-Suchbaum der Höhe 3 enthält höchstens 63 Schlüssel.`,
      holds: true,
      reason: r`$n_{max} = m^h - 1 = 4^3 - 1 = 63$: 21 Knoten mit je 3 Schlüsseln.`,
    },
    {
      id: 'split-haeufig',
      statement: r`In einem B-Baum der Klasse $k = 100$ führt im Mittel weniger als jedes hundertste Einfügen zu einem Split.`,
      holds: true,
      reason: r`$p_{split} < \frac{1}{k} = \frac{1}{100}$. Deshalb ist $w_{avg} < 1 + \frac{2}{k} = 1{,}02$ Schreibzugriffe.`,
    },
    {
      id: 'suche-im-knoten',
      statement: r`Innerhalb eines Knotens stehen die Schlüssel aufsteigend sortiert.`,
      holds: true,
      reason: r`$K_i < K_{i+1}$ gehört zur Definition. Im Knoten wird dann sequenziell (oder binär) gesucht; die Schlüssel dienen zugleich als Wegweiser zu den Teilbäumen.`,
    },
  ],
  problems: [
    {
      id: 'einfuegen-b-baum',
      title: 'Einfügen in einen B-Baum der Klasse 2',
      source: 'nach 3d · Insertion in a B-Tree',
      points: 7,
      task: r`Füge $10, 20, 30, 40, 50, 60, 70, 80$ in dieser Reihenfolge in einen leeren B-Baum der Klasse $k = 2$ ein. Zeichne den Baum nach jedem Split.`,
      solution: r`$k = 2$: höchstens 4, mindestens 2 Schlüssel pro Knoten (außer Wurzel).

**10, 20, 30, 40:** die Wurzel ist voll: @@[10 20 30 40]@@.

**50:** Überlauf @@[10 20 30 40 50]@@ → Split, der mittlere Schlüssel 30 steigt auf:

~~~
          [30]
         /    \
  [10 20]      [40 50]
~~~

**60, 70:** rechtes Blatt wird voll: @@[40 50 60 70]@@.

**80:** Überlauf @@[40 50 60 70 80]@@ → Split, 60 steigt in die Wurzel:

~~~
            [30 60]
          /    |    \
  [10 20]  [40 50]  [70 80]
~~~

Alle Blätter liegen auf derselben Ebene; jedes hat genau $k = 2$ Schlüssel.`,
    },
    {
      id: 'loeschen-ausgleich',
      title: 'Löschen mit Ausgleichen',
      source: 'nach 3d · Deletion in B-Trees (2), (3)',
      points: 7,
      task: r`Ausschnitt aus einem B-Baum der Klasse $k = 3$:

~~~
               [ … 25 38 … ]
              /      |
[14 15 18 21 23]   [26 31 33]
~~~

Lösche 33. Zeige (a) das Ausgleichen mit einem einzelnen Schlüssel und (b) das Ausgleichen, bis beide Blätter etwa gleich viele Schlüssel haben.`,
      solution: r`Nach dem Löschen bleibt @@[26 31]@@ – nur 2 Schlüssel, weniger als $k = 3$: Unterlauf. Der linke Nachbar hat 5 Schlüssel, also mehr als $k$ → Ausgleichen.

**(a) Rotation 1:** 23 steigt in den Elternknoten, der Trennschlüssel 25 wandert nach rechts unten.

~~~
               [ … 23 38 … ]
              /      |
   [14 15 18 21]   [25 26 31]
~~~

**(b) Rotation 2:** noch einmal – 21 steigt auf, 23 wandert herunter.

~~~
               [ … 21 38 … ]
              /      |
      [14 15 18]   [23 25 26 31]
~~~

Jetzt haben die Blätter 3 und 4 Schlüssel. Die restlichen Knoten bleiben unverändert.`,
    },
    {
      id: 'loeschen-mischen',
      title: 'Löschen mit Mischen',
      source: 'nach 3d · Deletion and Merging',
      points: 6,
      task: r`B-Baum der Klasse $k = 2$:

~~~
            [30 60]
          /    |    \
  [10 20]  [40 50]  [70 80]
~~~

Lösche 40. Warum hilft Ausgleichen nicht, und wie sieht der Baum danach aus?`,
      solution: r`Nach dem Löschen bleibt @@[50]@@ – ein Schlüssel, weniger als $k = 2$: Unterlauf.

Beide Nachbarn haben genau $k = 2$ Schlüssel. Gäbe einer einen ab, hätte er selbst einen Unterlauf → **Mischen**, z. B. mit dem linken Nachbarn: dessen 2 Schlüssel, der Trennschlüssel 30 und der verbliebene Schlüssel 50 kommen in einen Knoten ($k + 1 + (k - 1) = 4$ Schlüssel).

~~~
               [60]
              /    \
  [10 20 30 50]    [70 80]
~~~

Die Wurzel hat einen Schlüssel verloren – für die Wurzel ist das erlaubt (mindestens 2 Kinder). (Mischen mit dem rechten Nachbarn ergäbe @@[30]@@ über @@[10 20]@@ und @@[50 60 70 80]@@.)`,
    },
    {
      id: 'klasse-berechnen',
      title: 'Klasse und Kapazität berechnen',
      source: 'nach 3d · B-Tree of Class k',
      points: 6,
      task: r`Ein Knoten soll in einen Block von $L = 4096$ Byte passen. Es gilt $L_b = 2$, $L_P = 4$, $L_K = 8$, $L_D = 88$ Byte.

- (a) Bestimme $b_{max}$ und die Klasse $k$.
- (b) Wie viele Kinder hat ein Knoten höchstens, wie viele mindestens (innerer Knoten, nicht Wurzel)?
- (c) Wie viele Schlüssel fasst der Baum bei Höhe 3 höchstens?
- (d) Wie viele Seiten werden beim Einfügen im schlimmsten Fall geschrieben, wie viele im Mittel höchstens?`,
      solution: r`**(a)** $b_{max} = \left\lfloor \frac{4096 - 2 - 4}{8 + 88 + 4} \right\rfloor = \left\lfloor \frac{4090}{100} \right\rfloor = 40 = 2k$, also $k = 20$.

**(b)** Höchstens $2k + 1 = 41$ Kinder, mindestens $k + 1 = 21$.

**(c)** Jeder Knoten voll: $1 + 41 + 41^2 = 1723$ Knoten mit je 40 Schlüsseln, also $41^3 - 1 = 68\,920$ Schlüssel.

**(d)** Schlimmster Fall (Split bis zur Wurzel): $w_{max} = 2h + 1 = 7$ Seiten. Im Mittel $w_{avg} < 1 + \frac{2}{k} = 1{,}1$.`,
    },
    {
      id: 'vier-wege',
      title: 'Einfügen in einen 4-Wege-Suchbaum',
      source: 'nach 3d · Example: Inserting into a 4-Way Search Tree',
      points: 5,
      task: r`Füge in einen leeren 4-Wege-Suchbaum (ohne Balancierung) nacheinander ein: $30, 50, 80$, dann $10, 15, 60, 90$, dann $20, 5$. Beschreibe den Baum. Was fällt im Vergleich zum B-Baum auf?`,
      solution: r`$m = 4$: höchstens 3 Schlüssel und 4 Zeiger pro Knoten.

- **30, 50, 80** füllen die Wurzel: @@[30 50 80]@@.
- **10, 15**: kleiner als 30 → neuer Kindknoten unter $P_0$: @@[10 15]@@.
- **60**: zwischen 50 und 80 → Kind unter $P_2$: @@[60]@@. **90**: größer als 80 → Kind unter $P_3$: @@[90]@@.
- **20**: unter $P_0$ → @@[10 15 20]@@, jetzt voll.
- **5**: kleiner als 30, dann kleiner als 10 → der Knoten ist voll, also neuer Kindknoten unter dessen $P_0$: @@[5]@@.

~~~
              [30 50 80]
            /     |    |   \
   [10 15 20]     –  [60]  [90]
   /
 [5]
~~~

Die Blätter liegen auf verschiedenen Ebenen, Knoten sind teils fast leer: kein Split, kein Ausgleich. Der B-Baum hätte den vollen Knoten gesplittet und wäre gleichmäßig gewachsen.`,
    },
  ],
});
