# Deferred Items - Phase 02

Pre-existing lint issues discovered during 02-07 verification. Not in scope for this plan.

## ESLint Errors (pre-existing)

1. **src/app/editorial-standards/page.tsx:89-90** - Unescaped `"` characters (react/no-unescaped-entities)
2. **src/components/calculator/action-callout.tsx:28** - Component created during render (react-hooks/static-components). The `getIcon()` call returns a component reference during render.
3. **src/components/calculator/calculator-shell.tsx:54** - `any` type on params prop (@typescript-eslint/no-explicit-any)
4. **src/components/calculator/calculator-shell.tsx:75** - setState called synchronously in useEffect (react-hooks/set-state-in-effect). The reduced-motion detection sets state in the effect body.
5. **src/lib/calculators/registry.ts:29,51** - `any` type usage (@typescript-eslint/no-explicit-any)

## ESLint Warnings (pre-existing)

6. **src/app/error.tsx:7** - Unused `error` parameter
7. **src/lib/calculators/interpretations.ts:1,26-28** - Unused imports and parameters
8. **src/lib/calculators/math/loan.ts:100** - Unused `maxMonths` variable
9. **src/lib/calculators/math/tax.ts:36** - Unused `STANDARD_DEDUCTIONS` variable

## Hydration Error (pre-existing from Phase 01)

10. **src/components/ui/breadcrumb.tsx:81** / **src/components/layout/breadcrumbs.tsx:55** - `<li>` nested inside `<li>` in BreadcrumbSeparator causes hydration mismatch. The separator component renders as `<li>` but is placed as a child of another `<li>` in the breadcrumb list. Needs HTML structure fix.

## Recharts Console Warnings (cosmetic)

11. **ResponsiveContainer** - "width(-1) and height(-1) of chart should be greater than 0" -- appears in headless Chromium because charts render before the container has a computed size. Does not affect visual rendering in real browsers.
