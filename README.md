# Algorithmen & Datenstrukturen – Prüfungstrainer

Ein Lerntrainer für die Vorlesung Algorithmen & Datenstrukturen (Foliensätze 1a bis 3d): Rekursion,
Komplexität, Sortierverfahren, Graphen und Bäume. Definitionen, Verfahren und Sätze,
Wahr-oder-falsch-Aussagen und klausurnahe Aufgaben mit Musterlösung, dazu Wiederholung in wachsenden
Abständen, Nachschlagen und eine Prüfungssimulation.

Entstanden aus dem Mathe-2-Trainer: Lernablauf (erst zeigen, dann abfragen, bis es zweimal sitzt),
Wiederholungsplanung (FSRS), Architektur und Aussehen sind übernommen. Neu sind die Inhalte und
Code-Blöcke im Text, für Pseudocode, gezeichnete Bäume und Ablauftabellen. Der Trainer ist eine
Web-App, die als eine einzige HTML-Datei gebaut wird und auch auf dem Handy läuft.

## Was drin ist

| Bereich          | Was er tut                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------ |
| Lernen           | Pro Foliensatz vier Decks. Neue Definitionen und Verfahren werden gezeigt, dann abgefragt. |
| Wiederholen      | Was gewusst wurde, kommt nach FSRS wieder: kurz vor dem Vergessen.                         |
| Wahr oder falsch | Aussagen beurteilen, mit Begründung oder Gegenbeispiel. Wird automatisch bewertet.         |
| Aufgaben         | Klausurnahe Aufgaben, den Beispielen der Folien nachgebaut, mit Tipp und Musterlösung.     |
| Nachschlagen     | Volltextsuche über alles, mit Filter nach Kapitel und Art.                                 |
| Prüfung          | Zufällige Aufgaben auf Zeit, danach Selbstkorrektur mit Punkten und Auswertung je Kapitel. |
| Tutor (optional) | Als veröffentlichtes Claude-Artifact: eigene Antwort prüfen oder etwas erklären lassen.    |

Alles lässt sich mit der Tastatur bedienen (Leertaste, 1–4, W/F, T, S, Esc); die Tasten stehen an den
Knöpfen und in den Einstellungen.

## Inhalte ergänzen

Ein Kapitel ist eine Datei in `src/data/topics/`. Texte sind Rich Text: Absätze durch Leerzeilen,
Listen mit `- `, `**fett**`, Formeln als TeX zwischen `$…$` oder `$$…$$`, kurzer Code zwischen
`@@…@@` und Code-Blöcke zwischen zwei Zeilen `~~~` (Einrückung und Leerzeilen bleiben erhalten). Die
Texte stehen in `String.raw`, damit Backslashes nicht verdoppelt werden müssen – deshalb darf im Text
nie `${` und nie ein Backtick stehen. `\Oh` ergibt das O der O-Notation.

Hashing (Kapitel 4 der Vorlesung) fehlt noch: eine neue Datei anlegen und in `src/data/topics.ts`
eintragen.

`pnpm test` rendert jede Formel einmal mit MathJax und schlägt fehl, wenn eine nicht lesbar ist oder
eine ID doppelt vorkommt. IDs nicht nachträglich ändern: der Fortschritt hängt an ihnen.

## Aufbau

```
src/
├─ domain/      rein funktional, ohne Vue: content (Typen, Suche, Rich Text), practice (Sitzung als
│               Elm-Modell, Lern- und Wiederholstrategie), scheduling (FSRS), progress, exam
├─ data/        die Kapitel
├─ platform/    MathJax, Speicher (localStorage, im Artifact zusätzlich pro Konto), Tutor
├─ stores/      Pinia: Fortschritt
├─ composables/ useProgram (Elm-Laufzeit), usePracticeSession, useHotkeys
├─ features/    library, practice, lookup, exam, settings
└─ components/  Bausteine ohne eigene Logik
```

## Befehle

| Befehl       | Zweck                                       |
| ------------ | ------------------------------------------- |
| `pnpm dev`   | Entwicklungsserver                          |
| `pnpm build` | baut `dist/index.html`, eine einzelne Datei |
| `pnpm test`  | Tests, darunter: jede Formel ist lesbar     |
| `pnpm lint`  | ESLint                                      |

## Lizenz

[GPL-3.0-or-later](LICENSE). Die Inhalte folgen den Foliensätzen von Prof. Dr. Jörg Daubert und Prof.
Dr. Lamya Abdullah (Sommersemester 2026); Formulierungen, Aufgaben und Lösungen sind eigene und ohne
Gewähr.
