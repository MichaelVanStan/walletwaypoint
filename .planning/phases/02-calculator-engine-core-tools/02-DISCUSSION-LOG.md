# Phase 2: Calculator Engine & Core Tools - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-24
**Phase:** 02-calculator-engine-core-tools
**Areas discussed:** Calculator page layout, Input interaction design, What-if comparison UX, Results & chart presentation

---

## Calculator page layout

| Option | Description | Selected |
|--------|-------------|----------|
| Two-column: inputs left, results right | NerdWallet-style. Inputs in fixed sidebar, results + charts in main area. Collapses to stacked on mobile. | ✓ |
| Stacked: inputs top, results below | Simpler layout. Input section at top, scroll down for results. Works identically on all screen sizes. | |
| Tabbed: input tab + results tab | Clean separation. Users fill inputs on one tab, switch to see results. | |

**User's choice:** Two-column: inputs left, results right
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Full content width (~1080px) | Wider than 720px trust pages. Two-column layout needs room. | ✓ |
| Match trust pages (720px) | Consistent width across the site. | |
| You decide | Claude picks optimal width. | |

**User's choice:** Full content width (~1080px)
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky input panel | Inputs stay visible as user scrolls through charts and breakdowns. NerdWallet does this. | ✓ |
| Static — scrolls with page | Simpler implementation. Input panel scrolls away. | |
| You decide | Claude picks based on calculator complexity. | |

**User's choice:** Sticky input panel
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Stacked: inputs first, results below | Natural mobile flow. Fill in inputs, scroll to see results. | ✓ |
| Collapsible inputs with floating button | After initial input, collapse input section. Floating button to jump between. | |
| You decide | Claude picks best mobile UX pattern. | |

**User's choice:** Stacked: inputs first, results below
**Notes:** None

---

## Input interaction design

| Option | Description | Selected |
|--------|-------------|----------|
| Slider + editable number field combo | Each input has slider AND text field. Dragging slider updates number, typing moves slider. | ✓ |
| Sliders only with value labels | Clean, minimal. Slider with value displayed. No manual text entry. | |
| Text fields with +/− steppers | Traditional form inputs with increment/decrement buttons. No sliders. | |

**User's choice:** Slider + editable number field combo
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Gentle inline hints | Soft color change + hint text. Never block unusual values. | ✓ |
| Strict range enforcement | Clamp values to min/max. Text field snaps to valid value. | |
| You decide | Claude picks validation approach. | |

**User's choice:** Gentle inline hints
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Grouped with collapsible sections | Primary inputs always visible, advanced in collapsible section. | ✓ |
| All inputs visible, visually grouped | Show everything with section headers. No hiding. | |
| You decide | Claude picks based on input count per calculator. | |

**User's choice:** Grouped with collapsible sections
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| National averages with contextual labels | Pre-fill with US national averages. Show "US average" label. | ✓ |
| Empty/zero — prompt to enter | Start blank. Results show "Enter your details." | |
| You decide | Claude picks defaults per calculator. | |

**User's choice:** National averages with contextual labels
**Notes:** None

---

## What-if comparison UX

| Option | Description | Selected |
|--------|-------------|----------|
| Toggle "Compare" button adds Scenario B | Default single scenario. Compare button adds second column. | ✓ |
| Always show two scenarios | Both pre-filled. Always visible comparison. | |
| Tab-based: switch between scenarios | Tabs for A, B, Compare view. | |

**User's choice:** Toggle "Compare" button adds Scenario B
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Color-coded delta badges | Green/red badges with +/− amounts next to each result. | ✓ (combined) |
| Side-by-side results table | Clean two-column table. No color coding. | ✓ (combined) |
| You decide | Claude picks diff visualization. | |

**User's choice:** Both — side-by-side table WITH color-coded delta badges, plus Excel/CSV export
**Notes:** User suggested "I think both could be great - perhaps even an excel download". Captured as combined approach with export feature.

| Option | Description | Selected |
|--------|-------------|----------|
| Stacked scenarios with toggle | Toggle between A and B inputs. Stacked result cards. Delta summary at top. | ✓ |
| Horizontal scroll | Both scenarios visible, swipe between. | |
| You decide | Claude picks mobile pattern. | |

**User's choice:** Stacked scenarios with toggle
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| All calculators | Every calculator gets Compare. Engine handles generically. | ✓ |
| Only complex calculators | Mortgage, rent vs buy, retirement, loan repayment only. | |
| You decide | Claude picks based on benefit. | |

**User's choice:** All calculators
**Notes:** None

---

## Results & chart presentation

| Option | Description | Selected |
|--------|-------------|----------|
| Charts as primary visual, numbers below | Big chart at top of results. Key numbers below. Charts tell the story. | ✓ |
| Numbers first, charts as supporting | Key results displayed prominently. Charts secondary. | |
| You decide | Claude picks per calculator. | |

**User's choice:** Charts as primary visual, numbers below
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Conversational summary + action callouts | 1-2 sentence "friendly mentor" summary + 2-3 action callout cards. | ✓ |
| Bullet-point key takeaways | Clean bullet list of facts. No narrative. | |
| You decide | Claude picks interpretation style. | |

**User's choice:** Conversational summary + action callouts
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Expandable detail table | Collapsed by default. Expander opens sortable month/year table. | ✓ |
| Always visible table | Full breakdown always shown. | |
| No table — chart + summary only | Keep it simple. | |

**User's choice:** Expandable detail table
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Clean minimal with brand colors | Smooth curves, no gridlines, blue + teal. Subtle tooltips. Light fill. | ✓ |
| Data-rich with gridlines and labels | Full gridlines, axis labels, data markers. | |
| You decide | Claude picks styling. | |

**User's choice:** Clean minimal with brand colors
**Notes:** None

---

## Claude's Discretion

- Precision math implementation (integer cents vs decimal.js)
- Recharts configuration and responsive sizing
- Calculator YAML/JSON config schema structure
- nuqs URL parameter naming conventions
- Specific default values per calculator
- Input range limits and step sizes
- WebApplication schema markup per calculator
- Result update animation/transitions
- Export format details (CSV structure)
- Slider component implementation

## Deferred Ideas

None — discussion stayed within phase scope
