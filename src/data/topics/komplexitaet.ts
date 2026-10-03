import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 1b: counting operations, asymptotic bounds, rules for programs, recurrence relations. */
export const komplexitaet = topic({
  id: 'komplexitaet',
  chapter: '1b',
  title: 'Komplexität',
  summary:
    'Operationen zählen, best/worst/average case, O-, Ω- und Θ-Notation, Rekurrenzrelationen.',
  definitions: [
    {
      id: 'komplexitaet',
      title: 'Komplexität eines Algorithmus',
      ref: '1b · Algorithmus für die ersten n Primzahlen',
      statement: r`Unter der **Komplexität** (auch Aufwand oder Kosten) eines Algorithmus versteht man seinen **Ressourcenbedarf**, angegeben in Abhängigkeit von der **Länge $n$ der Eingabe**.

- **Zeitkomplexität**: Ressourcenbedarf Rechenzeit, als Funktion $T(n)$
- **Speicherkomplexität**: Ressourcenbedarf Speicherplatz`,
      note: r`Unbekannte Maschine, unbekannte Daten → nicht messen oder zählen, sondern **berechnen und asymptotisch abschätzen**. Gezählt werden **Elementaroperationen** (Zuweisung, Vergleich, Arithmetik, Arrayzugriff) eines abstrakten Maschinenmodells.`,
    },
    {
      id: 'faelle',
      title: 'Best, worst und average case',
      ref: '1b · Nun, es gibt drei Fälle',
      statement: r`Bei gleicher Problemgröße $n$ kann der Aufwand von den Daten abhängen:

- **Bester Fall** (best case): $T_{best}$
- **Schlimmster Fall** (worst case): $T_{worst}$
- **Durchschnitt** (average case): $T_{avg}$ – braucht eine Annahme über die Verteilung der Eingaben (gewichtetes Mittel; einfachster Fall: Gleichverteilung)

Beispiel @@contains@@ ohne vorzeitigen Abbruch: $T_{best} = 4n$ ($c$ nicht im Array), $T_{worst} = 5n$ (nur $c$ im Array), $T_{avg} = 4n + 0{,}5$ (falls $c$ mit $p = 0{,}5$ gar nicht, sonst genau einmal enthalten).`,
      note: r`Randbetrachtungen: vorzeitiges Abbrechen bei Treffer, Duplikate, **Sortierung** der Eingabe (im sortierten Array kann man früher abbrechen oder direkt springen).`,
    },
    {
      id: 'o-notation',
      title: 'O-Notation (obere Schranke)',
      ref: '1b · Landau-Symbole: O-Notation',
      statement: r`Seien $f, g : \N \to \R^+$. Dann ist

$$\Oh(g) = \{\, f \mid \exists n_0 \in \N,\ \exists c \in \R,\ c > 0 :\ \forall n \ge n_0 :\ f(n) \le c \cdot g(n) \,\}.$$

$\Oh(g)$ ist die **Menge** aller Funktionen, die **höchstens so stark wachsen** wie $g$. Ist $f \in \Oh(g)$, so heißt $f$ durch $g$ **nach oben beschränkt**.`,
      note: r`Zwei Stellschrauben: die Konstante $c$ und der Startpunkt $n_0$ („ab hier“). $f = \Oh(g)$ ist **keine Gleichung** und nur von links nach rechts lesbar – deshalb in der Vorlesung immer $\in$.`,
    },
    {
      id: 'omega-theta',
      title: 'Ω- und Θ-Notation',
      ref: '1b · Landau-Symbole: Ω-Notation, Θ-Notation',
      statement: r`$$\Omega(g) = \{\, h \mid \exists c > 0 :\ \exists n_0 > 0 :\ \forall n > n_0 :\ h(n) \ge c \cdot g(n) \,\}$$

$\Omega(g)$: alle Funktionen, die **mindestens** so stark wachsen wie $g$ (untere Schranke).

$$\Theta(g) = \Oh(g) \cap \Omega(g)$$

$\Theta(g)$: alle Funktionen, die **genauso stark** wachsen wie $g$ – eine **exakte (optimale) Schranke**.`,
      note: r`Es gilt $f \in \Oh(g) \Leftrightarrow g \in \Omega(f)$. $\Theta$ ist hilfreich, aber aufwendiger zu bestimmen.`,
    },
    {
      id: 'wachstumsklassen',
      title: 'Wachstumsklassen und Sprechweise',
      ref: '1b · Sprechweise',
      statement: r`- $\Oh(1)$ **konstant** – Arithmetik, Array-Zugriff
- $\Oh(\log n)$ **logarithmisch** – binäre Suche, Suche im balancierten Baum
- $\Oh(n)$ **linear** – eine Schleife
- $\Oh(n \log n)$ – MergeSort, HeapSort
- $\Oh(n^2)$ **quadratisch** – InsertionSort, 2 geschachtelte Schleifen
- $\Oh(n^3)$ **kubisch** – 3 geschachtelte Schleifen
- $\Oh(n^k),\ k \ge 2$ **polynomiell**
- $\Oh(2^n)$ **exponentiell** – Teilmengen aufzählen
- $n!$ – Permutationen (noch schlimmer)`,
      note: r`Eine Verbesserung der **Wachstumsklasse** nützt weit mehr als das Justieren von Konstanten. Und: je höher die Zeitkomplexität, desto weniger hilft ein schnellerer Rechner.`,
    },
    {
      id: 'rekurrenzrelation',
      title: 'Rekurrenzrelation',
      ref: '1b · Rekurrenzrelation (rekursiv)',
      statement: r`Eine **Rekurrenzrelation** (Differenzengleichung) beschreibt das Laufzeitverhalten $T(n)$ eines **rekursiven** Algorithmus mit zwei Regeln:

- ein **Basisfall** für ein kleines $n$, typischerweise $n = 1$ (Rekursionsanker, Abbruchkriterium)
- ein **generischer Fall**, der $T(n)$ auf Basis von $T(n-1)$ ausdrückt

Beispiel: $T(1) = 1$, $T(n) = 1 + T(n-1)$.`,
      note: r`Ziel ist die **geschlossene Form**: aufrollen (expandieren), raten, per vollständiger Induktion beweisen, dann mit $\Oh$ abschätzen.`,
    },
  ],
  theorems: [
    {
      id: 'eigenschaften-o',
      title: 'Eigenschaften der O-Notation',
      ref: '1b · Folgen und Eigenschaften der O-Notation',
      statement: r`Die O-Notation ist **vergröbernd**:

- Konstanten fallen weg: $\Oh(n) = \Oh\bigl(\tfrac{n}{2}\bigr) = \Oh(17n)$; allgemein $f \in \Oh(g) \Rightarrow c \cdot f \in \Oh(g)$
- Nur der **höchstgradige Term** zählt: $695n^2 + 397n + 6148 \in \Oh(n^2)$
- Sie bildet **obere Schranken**: aus $f \in \Oh(n \log n)$ folgt auch $f \in \Oh(n^2)$
- Die **Basis des Logarithmus** spielt keine Rolle: $\log_b x = \frac{1}{\log_a b} \cdot \log_a x$

Inklusionen:

$$\Oh(1) \subset \Oh(\log n) \subset \Oh(n) \subset \Oh(n \log n) \subset \Oh(n^2) \subset \Oh(n^3) \subset \Oh(2^n) \subseteq \Oh(10^n)$$`,
      note: r`Um etwas Sinnvolles auszusagen, setzt man die Schranke **so eng wie möglich** (optimale Schranke). „$n \in \Oh(n^4)$“ ist wahr, aber nutzlos.`,
    },
    {
      id: 'summen-produktregel',
      title: 'Summen- und Produktregel',
      ref: '1b · Berechnung der Zeitkomplexität',
      statement: r`Seien $T_1(n) \in \Oh(g_1(n))$ und $T_2(n) \in \Oh(g_2(n))$ die Komplexitäten zweier Teilprogramme.

**Summenregel** (hintereinander ausgeführt):

$$T_1(n) + T_2(n) \in \Oh\bigl(g_1(n) + g_2(n)\bigr) = \Oh\bigl(\max(g_1(n), g_2(n))\bigr)$$

**Produktregel** (geschachtelt ausgeführt):

$$T_1(n) \cdot T_2(n) \in \Oh\bigl(g_1(n) \cdot g_2(n)\bigr)$$`,
      note: r`Eine Elementaroperation hat $\Oh(1)$, ebenso jede feste Folge davon. Eine innere Schleife mit **fester** Obergrenze (z. B. 17) hängt nicht von der Problemgröße ab: $\Oh(17n) = \Oh(n)$ – keine der beiden Regeln.`,
    },
    {
      id: 'bedingte-anweisungen',
      title: 'Bedingte Anweisungen und Prozeduren',
      ref: '1b · Bedingte Anweisungen – if / else / case',
      statement: r`**if/else**: Der Test selbst ist konstant. Es gilt $T(n) = T_1(n)$ oder $T(n) = T_2(n)$ – man nimmt den **aufwendigeren (dominanten) Zweig**. Als Abschätzung nach oben geht auch $T(n) < T_1(n) + T_2(n) \in \Oh(g_1(n) + g_2(n))$.

**Prozeduren** werden für sich analysiert und ihre Laufzeit beim Aufruf eingesetzt. Bei **rekursiven** Aufrufen muss eine Rekurrenzrelation gefunden und gelöst werden.`,
      note: r`Sonderfall: In @@for i in 0..n-1: if i == 0: block_1 else: block_2@@ läuft block_1 nur einmal – block_2 ist dominant, Komplexität $\Oh(n \cdot T_{block\_2})$.`,
    },
    {
      id: 'nachweis-o',
      title: 'Nachweis von f ∈ O(g)',
      ref: '1b · Nachweis von f ∈ O(g)',
      statement: r`Zweistufig:

- **geschlossene Form** von $f$ finden
- die **Ungleichung** $f(n) \le c \cdot g(n)$ lösen: ein $c > 0$ und ein $n_0$ angeben, ab dem sie gilt

Beispiel: $f(n) = 3 + 6 + 9 + \dots + 3n = \frac{3n(n+1)}{2}$. Behauptung $f \in \Oh(n^2)$. Mit $c = 3$:

$$\tfrac{3}{2}\,n(n+1) \le 3n^2 \iff n^2 + n \le 2n^2 \iff n \le n^2 \iff 1 \le n$$

Gilt für alle $n \ge 1$, also $n_0 = 1$.`,
      note: r`Es genügt, **ein** passendes Paar $(c, n_0)$ zu finden. Praktischer Trick: jeden niedrigeren Term durch die höchste Potenz nach oben abschätzen.`,
    },
    {
      id: 'vorgehen-rekursion',
      title: 'Aufwandsanalyse rekursiver Algorithmen',
      ref: '1b · Aufwandsanalyse Divide et Impera',
      statement: r`- Aufwand als **rekursive Formel** aus dem Algorithmus bestimmen
- **Aufrollen** (oder Wertetabelle) und eine geschlossene Form „raten“
- die geschlossene Form **beweisen** – in der Regel durch vollständige Induktion
- geschlossene Form mit **O-Notation** abschätzen

Beispiel Fakultät: $T(1) = 1$, $T(n) = 2 + T(n-1)$ → $T(2) = 3$, $T(3) = 5$ → $T(n) = 2n - 1 \in \Oh(n)$.`,
      note: r`Die geratene Form ist erst nach dem Induktionsbeweis gesichert: Verankerung bei $n = 1$, dann Schluss von $n$ auf $n + 1$ durch Einsetzen der Annahme in die Rekursionsformel.`,
    },
    {
      id: 'hanoi-aufwand',
      title: 'Aufwand der Türme von Hanoi',
      ref: '1b · Beispiel: Türme von Hanoi',
      statement: r`Rekursionsformel: $T(1) = 1$, $T(n) = T(n-1) + 1 + T(n-1) = 1 + 2 \cdot T(n-1)$.

Geschlossene Form: $T(n) = 2^n - 1$, also $T(n) \in \Oh(2^n)$.

**Beweis** (vollständige Induktion): $T(1) = 2^1 - 1 = 1$ ✓. Schluss von $n$ auf $n+1$:

$$T(n+1) = 1 + 2 \cdot T(n) = 1 + 2 \cdot (2^n - 1) = 2^{n+1} - 1$$`,
      note: r`Wertetabelle zum Raten: $T = 1, 3, 7, 15, 31$ gegen $2^n = 2, 4, 8, 16, 32$. Die Verdopplung in der Formel ist der Hinweis auf exponentielles Wachstum.`,
    },
    {
      id: 'nichtasymptotisch',
      title: 'Nichtasymptotisches Laufzeitverhalten',
      ref: '1b · Nichtasymptotisches Laufzeitverhalten',
      statement: r`Asymptotische Aussagen gelten erst **ab einem gewissen $n_0$**. Bei kleinen Eingaben spielen die **Konstanten** eine Rolle: Ein Algorithmus mit größerer asymptotischer Komplexität kann für kleine Problemgrößen effizienter sein.

Ein Problem, sechs Algorithmen – jeder ist irgendwo der günstigste:

- $2^n$ für $2 \le n \le 9$
- $n^3$ für $n = 10$
- $10n^2$ für $10 \le n \le 58$
- $100\,n \log_2 n$ für $59 \le n \le 1024$
- $1000\,n$ für $1024 \le n \le 2048$
- $186\,182 \log_2 n$ für $n > 2048$`,
      note: r`Deshalb kombinieren praktische Verfahren (z. B. TimSort) ein asymptotisch gutes Verfahren mit einem einfachen für kleine Teillisten.`,
    },
  ],
  claims: [
    {
      id: 'n3-in-n4',
      statement: r`$n^3 \in \Oh(n^4)$.`,
      holds: true,
      reason: r`$n^3 \le 1 \cdot n^4$ für alle $n \ge 1$. $\Oh(n^4)$ enthält alles, was höchstens so stark wächst wie $n^4$ – auch $n$, $n \log n$, $3n^4$. Nur ist die Schranke nicht eng.`,
      ref: '1b · Landau-Symbole: O-Notation',
    },
    {
      id: 'gleichung',
      statement: r`Die Schreibweise $f = \Oh(g)$ ist eine Gleichung, man darf sie also auch als $\Oh(g) = f$ lesen.`,
      holds: false,
      reason: r`$\Oh(g)$ ist eine **Menge** von Funktionen. $f = \Oh(g)$ ist nur eine Kurzform für $f \in \Oh(g)$ und nur von links nach rechts lesbar.`,
    },
    {
      id: 'basis-logarithmus',
      statement: r`$\Oh(\log_2 n) = \Oh(\log_{10} n)$.`,
      holds: true,
      reason: r`$\log_{10} n = \frac{1}{\log_2 10} \cdot \log_2 n$ – die Basen unterscheiden sich nur um einen konstanten Faktor, und Konstanten eliminiert die O-Notation.`,
    },
    {
      id: 'innere-schleife-17',
      statement: r`Zwei geschachtelte Schleifen haben immer die Komplexität $\Oh(n^2)$.`,
      holds: false,
      reason: r`Nur wenn **beide** von der Problemgröße abhängen. Läuft die innere Schleife fest 17-mal, ist der Aufwand $\Oh(17n) = \Oh(n)$.`,
      ref: '1b · Schleifen geschachtelt',
    },
    {
      id: 'summenregel-max',
      statement: r`Zwei Schleifen hintereinander, eine über $n$ und eine über $m$ Elemente, haben zusammen die Komplexität $\Oh(n \cdot m)$.`,
      holds: false,
      reason: r`Hintereinander → **Summenregel**: $\Oh(n + m) = \Oh(\max(n, m))$. Das Produkt gäbe es nur bei Schachtelung.`,
    },
    {
      id: 'theta-schnitt',
      statement: r`Ist $f \in \Oh(g)$ und $f \in \Omega(g)$, dann ist $f \in \Theta(g)$.`,
      holds: true,
      reason: r`Genau so ist $\Theta$ definiert: $\Theta(g) = \Oh(g) \cap \Omega(g)$ – $f$ wächst genauso stark wie $g$.`,
    },
    {
      id: 'schneller-rechner',
      statement: r`Ein 1000-mal schnellerer Rechner macht einen Algorithmus mit $T(n) = 2^n$ auch für große $n$ praktisch nutzbar.`,
      holds: false,
      reason: r`Der Faktor 1000 ist nur $\approx 2^{10}$: aus $2^{100}$ Jahren werden „nur“ $2^{90}$ Jahre. In derselben Zeit schafft man gerade einmal $n + 10$ statt $n$.`,
      ref: '1b · Effekt eines schnelleren Rechners',
    },
    {
      id: 'omega-dual',
      statement: r`$f \in \Oh(g)$ gilt genau dann, wenn $g \in \Omega(f)$.`,
      holds: true,
      reason: r`$f(n) \le c \cdot g(n)$ ist dasselbe wie $g(n) \ge \tfrac{1}{c} \cdot f(n)$: $g$ ist obere Schranke von $f$ genau dann, wenn $f$ untere Schranke von $g$ ist.`,
    },
    {
      id: 'asymptotisch-immer-besser',
      statement: r`Ein Algorithmus mit $T(n) = 1000n$ ist für jede Eingabegröße schneller als einer mit $T(n) = 10n^2$.`,
      holds: false,
      reason: r`$1000n < 10n^2$ gilt erst für $n > 100$. Für kleine $n$ gewinnt der quadratische Algorithmus – asymptotische Aussagen gelten erst ab einem $n_0$.`,
    },
    {
      id: 'niedergradig',
      statement: r`Für $T_1(n) = n^2 + n + 1$ und $T_2(n) = n^2$ nähert sich $\frac{T_1(n)}{T_2(n)}$ mit wachsendem $n$ dem Wert 1.`,
      holds: true,
      reason: r`Die niedergradigen Terme werden irrelevant: Bei $n = 100$ ist das Verhältnis $1{,}0101$, bei $n = 1000$ nur noch $1{,}001$. Allgemein geht $\frac{an^2 + bn + c}{a'n^2 + b'n + c'}$ gegen $\frac{a}{a'}$.`,
    },
  ],
  problems: [
    {
      id: 'o-nachweis',
      title: 'O-Notation nachweisen',
      source: 'nach 1b · Nachweis von f ∈ O(g)',
      points: 5,
      task: r`Ein Algorithmus verhält sich gemäß $f(n) = 5 + 10 + 15 + \dots + 5n$. Finde die geschlossene Form und weise $f \in \Oh(n^2)$ nach, indem du $c$ und $n_0$ angibst.`,
      hint: r`Klammere 5 aus und nutze die gaußsche Summenformel.`,
      solution: r`$f(n) = 5 \cdot (1 + 2 + \dots + n) = \frac{5n(n+1)}{2}$.

Versuch mit $c = 5$:

$$\tfrac{5}{2}\,n(n+1) \le 5n^2 \iff n^2 + n \le 2n^2 \iff n \le n^2 \iff 1 \le n$$

Das gilt für alle $n \ge 1$. Also $f \in \Oh(n^2)$ mit $c = 5$, $n_0 = 1$.`,
    },
    {
      id: 'schleifen',
      title: 'Komplexität von Schleifen bestimmen',
      source: 'nach 1b · Schleifen',
      points: 6,
      task: r`Gib für jedes Fragment die Komplexität in O-Notation an ($n$ ist die Problemgröße) und nenne die Regel.

~~~
# (a)                          # (c)
for i in range(n):             i = 1
    op()                       while i < n:
for j in range(n):                 op()
    for k in range(n):             i = i * 2
        op()

# (b)                          # (d)
for i in range(n):             for i in range(n):
    for j in range(5):             j = 1
        op()                       while j < n:
                                       op()
                                       j = j * 2
~~~`,
      solution: r`- **(a)** $\Oh(n) + \Oh(n^2) = \Oh(\max(n, n^2)) = \Oh(n^2)$ – Summenregel, innen Produktregel.
- **(b)** $\Oh(5n) = \Oh(n)$ – die innere Schleife hängt nicht von der Problemgröße ab.
- **(c)** $\Oh(\log n)$ – $i$ verdoppelt sich, nach $k$ Durchläufen ist $i = 2^k$, Abbruch bei $2^k \ge n$, also $k \approx \log_2 n$.
- **(d)** $\Oh(n \log n)$ – Produktregel: außen $n$, innen $\log n$.`,
    },
    {
      id: 'rekurrenz-quadrat',
      title: 'Rekurrenz lösen und beweisen',
      source: 'nach 1b · Beweis Rekurrenzrelation',
      points: 7,
      task: r`Gegeben $T(1) = 1$ und $T(n) = T(n-1) + 2n - 1$ für $n > 1$. Rolle auf, rate eine geschlossene Form, beweise sie durch vollständige Induktion und gib die Komplexität an.`,
      hint: r`Berechne $T(2)$, $T(3)$, $T(4)$ und sieh dir die Folge an.`,
      solution: r`**Aufrollen:** $T(2) = 1 + 3 = 4$, $T(3) = 4 + 5 = 9$, $T(4) = 9 + 7 = 16$. Vermutung: $T(n) = n^2$.

**Verankerung:** $T(1) = 1^2 = 1$ ✓

**Schluss von $n$ auf $n+1$:** Nach Formel ist $T(n+1) = T(n) + 2(n+1) - 1$. Annahme einsetzen:

$$T(n+1) = n^2 + 2n + 1 = (n+1)^2$$

Das ist die geschlossene Form für $n + 1$. Also $T(n) = n^2 \in \Oh(n^2)$.`,
    },
    {
      id: 'contains-zaehlen',
      title: 'Operationen zählen: contains',
      source: 'nach 1b · Komplexität von contains',
      points: 5,
      task: r`~~~
for (int i = 0; i < n; i++) {
    if (A[i] == c)
        found = true;
}
~~~

Zähle für die Schleife (ohne Initialisierung) Vergleiche, Arrayzugriffe, Inkremente und Zuweisungen als gleichwertige Operationen. Gib $T_{best}$, $T_{worst}$ und – falls $c$ mit Wahrscheinlichkeit $0{,}5$ gar nicht und sonst genau einmal vorkommt – $T_{avg}$ an. Zu welcher Klasse gehören alle drei?`,
      solution: r`Pro Durchlauf: 2 Vergleiche (@@i < n@@ und @@A[i] == c@@), 1 Arrayzugriff, 1 Inkrement = **4 Operationen**, dazu 1 Zuweisung bei jedem Treffer.

- $T_{best} = 4n$: $c$ ist nicht im Array.
- $T_{worst} = 5n$: jedes Element ist $c$ (z. B. $[3,3,3,3,3,3]$ mit $c = 3$).
- $T_{avg} = 0{,}5 \cdot 4n + 0{,}5 \cdot (4n + 1) = 4n + 0{,}5$.

Alle drei liegen in $\Oh(n)$ – Konstanten und niedergradige Terme fallen weg.`,
    },
    {
      id: 'welcher-algorithmus',
      title: 'Welcher Algorithmus für welches n?',
      source: 'nach 1b · Nichtasymptotisches Laufzeitverhalten',
      points: 4,
      task: r`Für ein Problem stehen A mit $T_A(n) = 100n$ und B mit $T_B(n) = 2n^2$ zur Verfügung. Ab welchem $n$ ist A schneller? Welchen nimmst du für $n = 20$, welchen für $n = 10\,000$ – und was sagt die O-Notation dazu?`,
      solution: r`$100n < 2n^2 \iff 50 < n$. Für $n < 50$ ist B schneller, bei $n = 50$ sind beide gleich, ab $n = 51$ gewinnt A.

- $n = 20$: $T_A = 2000$, $T_B = 800$ → **B**.
- $n = 10\,000$: $T_A = 10^6$, $T_B = 2 \cdot 10^8$ → **A**, 200-mal schneller.

Asymptotisch ist $T_A \in \Oh(n)$ besser als $T_B \in \Oh(n^2)$ – aber das gilt erst ab $n_0 = 50$. Bei kleinen Eingaben entscheiden die Konstanten.`,
    },
  ],
});
