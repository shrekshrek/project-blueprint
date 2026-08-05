# Interaction and adaptive routing

## Conversation ownership

`plan-project` is the conversation manager. Specialist actions and support roles produce bounded results; the manager explains recommendations, reconciles disagreements, and asks the user for decisions.

The manager accepts three entry styles:

- `guided`: lead the user through the next highest-value decision;
- `context-dump`: ingest substantial context, summarize it, and ask only for material gaps;
- `best-guess`: propose a labeled draft with assumptions and request correction.

Persist these as `guided`, `context_dump`, and `best_guess` in machine-readable state.

## Planning state

Track at least:

- project mode: `greenfield`, `rebaseline`, or `review`;
- current scope and optional parent scope;
- confirmed decisions, assumptions, deferred decisions, exclusions, and conflicts;
- completed and applicable actions;
- open blockers and validation actions;
- artifact and view decisions;
- latest recommendation and paused/resume point;
- blueprint approval, development authorization, and handoff status.

Also decide artifact density before generating files. Prefer merged artifacts when one owner and one review audience can understand them together. Split only for a real boundary such as independent ownership, subsystem depth, specialized review, or a separately evolving contract. Reassess density after review and remove duplicate restatements before handoff.

## Next-action selection

Do not force the nine actions into a fixed sequence. Rank unresolved decisions using:

- impact on value, safety, cost, or rework;
- uncertainty and evidence conflict;
- irreversibility of data, contract, or organizational choices;
- cross-module or cross-subsystem reach;
- whether the decision blocks the next safe implementation choice.

Recommend one decision cluster and explain why it comes next. The user may accept, redirect, defer, skip, return to an earlier decision, or finish early.

## Interaction loop

1. Ingest the invocation and existing blueprint without repeating answered questions.
2. Summarize current truth, assumptions, conflicts, and scope.
3. Select the next action and explain the expected decision.
4. Let the action propose a professional draft before asking for missing input.
5. Ask one high-impact question, or a tightly related small batch when context makes that more efficient.
6. Show the resulting `confirmed`, `assumption`, `deferred`, and `out_of_scope` changes.
7. Obtain correction or confirmation, persist state, and recommend the next action.
8. Pause safely on request and record the exact resume point.

## Stop conditions

Planning may stop when the next development decision is safe, not when every possible artifact exists. Final handoff requires:

- coherent first outcome and non-goals;
- no hidden high-impact blocker;
- explicit owners for core rules and authoritative data;
- sufficient architecture/data views for selected concerns;
- actionable validation for remaining assumptions;
- a first vertical slice and read-first list;
- explicit approval of the blueprint content.

Blueprint approval does not authorize development. After approval, offer a separate development-authorization decision; record it without invoking another workflow automatically.
