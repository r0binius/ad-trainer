import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 1a: what an algorithm is, kinds of recursion, divide and conquer, backtracking. */
export const rekursion = topic({
  id: 'rekursion',
  chapter: '1a',
  title: 'Algorithmen und Rekursion',
  summary:
    'Algorithmusbegriff, Arten der Rekursion, Teile und Herrsche, Türme von Hanoi, Backtracking.',
  definitions: [
    {
      id: 'algorithmus',
      title: 'Algorithmus',
      ref: '1a · Beispiel: Pizza',
      statement: r`Ein **Algorithmus** ist ein

- wohldefiniertes,
- endlich beschreibbares,
- schrittweises

**Verfahren** zum Lösen eines Problems oder zur Erfüllung einer Aufgabe.`,
      note: r`Umgangssprachlich das Rezept: Zutaten → **Eingabe**, Zubereitung → **schrittweise Lösung**, Pizza → **Ausgabe**. Kriterien für „gut“: Effizienz, Verständlichkeit/Lesbarkeit, Wartbarkeit.`,
    },
    {
      id: 'geschlossene-form',
      title: 'Geschlossene Form',
      ref: '1a · Beispiel Summation',
      statement: r`Eine **geschlossene Form** drückt ein Ergebnis mit einer **endlichen (festen) Menge an Standardoperatoren** aus – ohne Schleife, Summenzeichen oder Rekursion.

Beispiel (gaußsche Summenformel):

$$\sum_{i=1}^{n} i = 1 + 2 + \dots + n = \frac{n(n+1)}{2}$$`,
      note: r`Drei Varianten von Summation($n$): Schleife, geschlossene Form, Rekursion. Alle erfüllen die Anforderung – welche „besser“ ist, hängt vom Kriterium ab. Geschlossene Formen braucht man später für die Aufwandsanalyse.`,
    },
    {
      id: 'rekursionsarten',
      title: 'Ausprägungen der Rekursion',
      ref: '1a · Die Rekursion',
      statement: r`- **Lineare Rekursion**: ein rekursiver Aufruf im Rumpf der Funktion
- **Baumartige Rekursion**: mehrere rekursive Aufrufe im Rumpf
- **Wechselseitige Rekursion**: zwei Funktionen rufen sich gegenseitig auf
- **Verschachtelte Rekursion**: das Argument des rekursiven Aufrufs wird selbst durch einen rekursiven Aufruf berechnet
- **Endrekursion** (endständig): der rekursive Aufruf ist die letzte Berechnung im Rumpf`,
      note: r`Die **strukturelle Rekursion** folgt der Struktur der Daten (erstes Element verarbeiten, dann der Rest der Liste); über Listen ist sie linear. Fibonacci ist baumartig, Hanoi auch.`,
    },
    {
      id: 'rekursionsanker',
      title: 'Rekursionsanker (Abbruchbedingung)',
      ref: '1a · Teile und Herrsche – Verallgemeinert',
      statement: r`Der **Rekursionsanker** (Basisfall, Abbruchbedingung) ist der Fall, in dem das Problem **direkt** gelöst wird, ohne weiteren rekursiven Aufruf.

Jede Rekursion braucht ihn, und jeder rekursive Aufruf muss sich ihm nähern („kleinere Problemgröße“).`,
      note: r`Teile-in-Streifen($n$): „Wenn $n > 1$, dann teile …, sonst mache nichts“. Ohne den Sonst-Fall würde auch für $n = 1$ noch geteilt. Dazu die **Vorbedingung** $n = 2^i$, $i \in \N$ – sonst geht $\tfrac{n}{2}$ nicht auf (Gegenbeispiel $n = 13$).`,
    },
    {
      id: 'backtracking',
      title: 'Backtracking',
      ref: '1a · Backtracking – Allgemein und Dame',
      statement: r`**Backtracking** löst ein Problem durch systematisches Ausprobieren: Für jedes Teilproblem gibt es nicht eine Lösung, sondern mehrere **Lösungsversuche**. Führt ein Versuch nicht zum Ziel, wird er **zurückgenommen** und der nächste probiert.

~~~
LöseProblem(Teilproblem_X):
  Wenn Problem gelöst:
    Lösung zurückgeben
  Sonst:
    Für alle möglichen Lösungsversuche für Teilproblem_X:
      Mache Lösungsversuch
      LöseProblem(Teilproblem_X + 1)
      Nimm Lösungsversuch wieder zurück
~~~`,
      note: r`Typisch für Spiele und Wegeprobleme. Der Aufwand ist normalerweise **exponentiell** – Backtracking ist die systematische Form von Brute Force.`,
    },
  ],
  theorems: [
    {
      id: 'teile-und-herrsche',
      title: 'Teile und Herrsche (divide et impera)',
      ref: '1a · Teile und Herrsche – Ganz allgemein',
      statement: r`~~~
LöseProblem(Problemgröße):
  Ist das Problem einfach lösbar?
    Löse das Problem direkt
  Sonst
    1. Zerlege das Problem in Teilprobleme (gleichen Typs)
    2. Löse Teilprobleme: LöseProblem(kleinere Problemgröße)
    3. Füge Teillösungen zu Ganzem zusammen
~~~

Meist wird halbiert: kleinere Problemgröße $\approx \tfrac{n}{2}$.`,
      note: r`Drei Zutaten: **direkt lösbarer Basisfall**, **Zerlegung in gleichartige Teilprobleme**, **Zusammenfügen**. Tipp der Folien: Algorithmen so allgemein wie möglich fassen ($n$ Streifen statt 16), um sie wiederverwenden zu können.`,
    },
    {
      id: 'hanoi',
      title: 'Türme von Hanoi',
      ref: '1a · Die Türme von Hanoi – Algorithmus',
      statement: r`$n$ Scheiben sollen einzeln von Stapel $x$ nach Stapel $y$; nie darf eine größere auf einer kleineren liegen. Mit dem Zwischenstapel $z = 6 - x - y$:

- $n - 1$ Scheiben von $x$ nach $z$
- $1$ Scheibe von $x$ nach $y$
- $n - 1$ Scheiben von $z$ nach $y$

~~~
def hanoi(anzahl, x, y):
    if anzahl == 1:
        print("Zug von ", x, " nach ", y)
    else:
        hanoi(anzahl - 1, x, 6 - x - y)
        hanoi(1, x, y)
        hanoi(anzahl - 1, 6 - x - y, y)
~~~`,
      note: r`Die Stapel heißen 1, 2, 3, also ist $1 + 2 + 3 = 6$ und $6 - x - y$ der dritte. Die Bedeutung von $x$, $y$, $z$ wechselt in jeder Runde. Zwei rekursive Aufrufe → baumartige Rekursion, $2^n - 1$ Züge.`,
    },
    {
      id: 'acht-damen',
      title: '8-Damen-Problem mit Backtracking',
      ref: '1a · Backtracking – Dame mit Abbruchbedingung',
      statement: r`8 Damen so auf ein Schachbrett stellen, dass sie sich nicht gegenseitig schlagen können. Idee: **pro Spalte genau eine Dame**; nur freie (unbedrohte) Felder dürfen belegt werden.

~~~
8Damen(Spalte_X):
  Falls Spalte_X = 9:          // Abbruchbedingung
    Ergebnis ausgeben
  Für Zeile_y von 1 bis 8:
    Falls Spalte_X, Zeile_y noch nicht von einer Dame bedroht wird
      Setze Dame in Spalte_X, Zeile_y
      8Damen(Spalte_X + 1)
      Nimm Dame von Spalte_X, Zeile_y wieder zurück
~~~`,
      note: r`Pro Teilproblem (Spalte) gibt es bis zu acht Lösungsversuche; in den hinteren Spalten manchmal gar keinen gültigen – dann geht es zurück. Ohne die Abbruchbedingung würde nie eine Lösung ausgegeben.`,
    },
    {
      id: 'rekursive-folgen',
      title: 'Fakultät und Fibonacci rekursiv',
      ref: '1a · Ähnlich gelagerte Probleme',
      statement: r`- **Fakultät**: $f_n = n \cdot f_{n-1}$, $f_1 = 1$
- **Fibonacci**: $f_n = f_{n-1} + f_{n-2}$, $f_0 = f_1 = 1$

Werte der Fakultät: $1, 2, 6, 24, 120, 720, 5040, 40\,320, 362\,880, \dots$`,
      note: r`Fakultät ist **linear** rekursiv (ein Aufruf), Fibonacci **baumartig** (zwei Aufrufe) – naiv implementiert wächst der Aufwand exponentiell. Weitere rekursive Probleme aus der Informatik: Backtracking, Traversierung im Graph, Wegeprobleme.`,
    },
  ],
  claims: [
    {
      id: 'vorbedingung-streifen',
      statement: r`Der Algorithmus Teile-in-Streifen($n$), der das Papier halbiert und jede Hälfte in $\tfrac{n}{2}$ Streifen teilt, funktioniert für jede natürliche Zahl $n$.`,
      holds: false,
      reason: r`Gegenbeispiel $n = 13$: $\tfrac{13}{2}$ Streifen gibt es nicht. Nötig ist die Vorbedingung $n = 2^i$, $i \in \N$ – und der Basisfall $n = 1$ („mache nichts“).`,
      ref: '1a · Teile und Herrsche – Verallgemeinert',
    },
    {
      id: 'hanoi-zwischenstapel',
      statement: r`Im Hanoi-Algorithmus mit den Stapeln 1, 2, 3 liefert $6 - x - y$ immer den Stapel, der weder Ursprung $x$ noch Ziel $y$ ist.`,
      holds: true,
      reason: r`$1 + 2 + 3 = 6$. Zieht man die beiden benutzten Stapel ab, bleibt die Nummer des dritten: z. B. $x = 1$, $y = 3$ ergibt $z = 2$.`,
    },
    {
      id: 'fakultaet-endrekursiv',
      statement: r`Die Funktion mit Rumpf @@return n * fak(n - 1)@@ ist endrekursiv.`,
      holds: false,
      reason: r`Nach der Rückkehr des rekursiven Aufrufs wird noch **multipliziert** – der Aufruf ist also nicht die letzte Berechnung. Sie ist linear rekursiv, aber nicht endständig.`,
    },
    {
      id: 'fibonacci-baumartig',
      statement: r`Die direkte Umsetzung von $f_n = f_{n-1} + f_{n-2}$ ist eine baumartige Rekursion.`,
      holds: true,
      reason: r`Im Rumpf stehen **zwei** rekursive Aufrufe; die Aufrufe bilden einen Baum. Bei linearer Rekursion gäbe es nur einen.`,
    },
    {
      id: 'alle-varianten-korrekt',
      statement: r`Von den drei Summations-Varianten (Schleife, $\tfrac{n(n+1)}{2}$, Rekursion) ist nur die geschlossene Form ein korrekter Algorithmus.`,
      holds: false,
      reason: r`Alle drei erfüllen die Anforderung „Summation“. Sie unterscheiden sich in **Effizienz**, Lesbarkeit und Wartbarkeit – nicht in der Korrektheit.`,
    },
    {
      id: 'backtracking-zuruecknehmen',
      statement: r`Beim Backtracking wird ein Lösungsversuch nach dem rekursiven Aufruf wieder zurückgenommen, damit der nächste Versuch von einem sauberen Zustand ausgeht.`,
      holds: true,
      reason: r`Genau das ist der Schritt „Nimm Dame von Spalte_X, Zeile_y wieder zurück“. Ohne ihn blieben Damen aus gescheiterten Versuchen auf dem Brett stehen.`,
    },
    {
      id: 'damen-teile-herrsche',
      statement: r`Das 8-Damen-Problem lässt sich wie das Papier-Teilen in unabhängige Hälften zerlegen, die man getrennt löst und dann zusammenfügt.`,
      holds: false,
      reason: r`Die Teilprobleme sind **nicht unabhängig**: Eine Dame in Spalte 1 bedroht Felder in allen anderen Spalten. Deshalb Spalte für Spalte mit Backtracking statt Teile und Herrsche.`,
    },
    {
      id: 'strukturelle-rekursion-linear',
      statement: r`Strukturelle Rekursion über Listen (erstes Element, dann der Rest) ist eine lineare Rekursion.`,
      holds: true,
      reason: r`Pro Aufruf gibt es genau einen rekursiven Aufruf auf dem Rest der Liste – wie bei @@contains-doll?@@.`,
    },
  ],
  problems: [
    {
      id: 'hanoi-drei',
      title: 'Hanoi mit drei Scheiben',
      source: 'nach 1a · Die Türme von Hanoi – Algorithmus (2)',
      points: 5,
      task: r`Gib die Züge an, die @@hanoi(3, 1, 2)@@ ausgibt, in der richtigen Reihenfolge. Wie viele Züge sind es, und wie viele wären es bei 64 Scheiben?`,
      hint: r`Löse zuerst @@hanoi(2, 1, 3)@@, dann der Zug $1 \to 2$, dann @@hanoi(2, 3, 2)@@.`,
      solution: r`@@hanoi(2, 1, 3)@@: $1 \to 2$, $1 \to 3$, $2 \to 3$

@@hanoi(1, 1, 2)@@: $1 \to 2$

@@hanoi(2, 3, 2)@@: $3 \to 1$, $3 \to 2$, $1 \to 2$

Zusammen **7 Züge**: $1{\to}2,\ 1{\to}3,\ 2{\to}3,\ 1{\to}2,\ 3{\to}1,\ 3{\to}2,\ 1{\to}2$.

Allgemein $2^n - 1$ Züge, für $n = 64$ also $2^{64} - 1 \approx 1{,}8 \cdot 10^{19}$.`,
    },
    {
      id: 'rekursion-einordnen',
      title: 'Rekursionsarten erkennen',
      source: 'nach 1a · Die Rekursion',
      points: 4,
      task: r`Ordne jede Funktion einer Ausprägung der Rekursion zu und begründe kurz.

~~~
def a(n):                      def c(n, acc):
    if n <= 1: return 1            if n == 0: return acc
    return a(n-1) + a(n-2)         return c(n - 1, acc + n)

def gerade(n):                 def d(m, n):
    if n == 0: return True         if m == 0: return n + 1
    return ungerade(n - 1)         if n == 0: return d(m - 1, 1)
def ungerade(n):                   return d(m - 1, d(m, n - 1))
    if n == 0: return False
    return gerade(n - 1)
~~~`,
      solution: r`- @@a@@: **baumartig** – zwei rekursive Aufrufe im Rumpf (Fibonacci).
- @@c@@: **linear und endrekursiv** – ein Aufruf, und er ist die letzte Berechnung (das Ergebnis wird im Akkumulator mitgeführt).
- @@gerade@@ / @@ungerade@@: **wechselseitig** – die beiden Funktionen rufen sich gegenseitig auf.
- @@d@@: **verschachtelt** – das Argument des rekursiven Aufrufs wird selbst durch einen rekursiven Aufruf berechnet (Ackermann-Funktion).`,
    },
    {
      id: 'vier-damen',
      title: 'Backtracking: 4 Damen',
      source: 'nach 1a · Backtracking – Dame',
      points: 6,
      task: r`Wende den Damen-Algorithmus auf ein $4 \times 4$-Brett an (Spalte für Spalte, Zeilen jeweils von 1 aufsteigend probieren). Beschreibe den Ablauf bis zur **ersten** Lösung und gib sie als Zeilennummern der Spalten 1 bis 4 an.`,
      hint: r`Mit der Dame in Spalte 1, Zeile 1 gibt es keine Lösung – wo genau scheitert der Versuch?`,
      solution: r`**Spalte 1 = Zeile 1:**

- Spalte 2: Zeilen 1, 2 bedroht → Zeile 3. Spalte 3: alle vier Zeilen bedroht → zurück.
- Spalte 2: Zeile 4. Spalte 3: Zeile 2 frei. Spalte 4: alle bedroht → zurück; Spalte 3 hat keine weitere freie Zeile → zurück; Spalte 2 ist durch → zurück.

**Spalte 1 = Zeile 2:**

- Spalte 2: Zeilen 1, 2, 3 bedroht → Zeile 4.
- Spalte 3: Zeile 1 frei.
- Spalte 4: Zeilen 1, 2 bedroht, Zeile 3 frei → Spalte 5 erreicht, **Lösung**.

Erste Lösung: $(2, 4, 1, 3)$. Die zweite ist ihr Spiegelbild $(3, 1, 4, 2)$.`,
    },
    {
      id: 'streifen-schnitte',
      title: 'Teile-in-Streifen: Anzahl der Schnitte',
      source: 'nach 1a · Teile und Herrsche',
      points: 4,
      task: r`Der Algorithmus Teile-in-Streifen($n$) macht für $n > 1$ einen Schnitt und ruft sich dann für beide Hälften mit $\tfrac{n}{2}$ auf. Stelle die Rekursionsformel für die Anzahl $S(n)$ der Schnitte auf und bestimme $S(16)$. Welche Vorbedingung braucht der Algorithmus?`,
      solution: r`$S(1) = 0$ und $S(n) = 1 + 2 \cdot S\bigl(\tfrac{n}{2}\bigr)$ für $n > 1$.

$S(2) = 1$, $S(4) = 3$, $S(8) = 7$, $S(16) = 15$ – allgemein $S(n) = n - 1$.

Vorbedingung: $n = 2^i$ mit $i \in \N$ (einschließlich $i = 0$, also $n = 1$: nichts zu tun), sonst geht das Halbieren nicht auf.`,
    },
  ],
});
