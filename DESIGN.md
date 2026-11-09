---
name: TalentX
description: One connected hiring platform, drawn as a single thin green line through a warm-white page.
colors:
  green: "#178C7D"
  action-green: "#127A6D"
  deep-green: "#105D55"
  ink: "#172321"
  mute: "#5F6D67"
  warm-white: "#FCFCFA"
  white: "#FFFFFF"
  pale-green: "#F3F8F6"
  soft-green: "#E8F3F0"
  tint-green: "#D3E7E2"
  hairline: "#E8ECE9"
typography:
  hero:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "clamp(58px, 5.9vw, 92px)"
    fontWeight: 500
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  statement:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "clamp(52px, 6.1vw, 96px)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "clamp(44px, 4.4vw, 64px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.01em"
rounded:
  xs: "4px"
  sm: "10px"
  md: "14px"
  lg: "18px"
  xl: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(40px, 5.5vw, 96px)"
  section: "clamp(120px, 13vw, 200px)"
  nav: "76px"
  row: "12px"
  block: "24px"
components:
  button-primary:
    backgroundColor: "{colors.action-green}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "56px"
    padding: "0 28px"
  button-primary-hover:
    backgroundColor: "{colors.deep-green}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "56px"
    padding: "0 28px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  chip:
    backgroundColor: "{colors.pale-green}"
    textColor: "{colors.deep-green}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  chip-new:
    backgroundColor: "{colors.deep-green}"
    textColor: "{colors.white}"
  ui-window:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
  field:
    backgroundColor: "{colors.warm-white}"
    rounded: "{rounded.sm}"
    padding: "9px 14px"
---

# Design System: TalentX

## Overview

**Creative North Star: "The Connection Line"**

One hairline green path, drawn from the logo's circle, runs the length of the page and joins candidate, job and decision. Everything else is quiet: warm white and pure white grounds, pale green fields, ink type, and a single green accent. Type and geometry carry the layout; the product is shown as white, hairline-bordered fragments and panels with green status marks, not as boxed screenshots in a card grid.

The voice is calm and confident. Display type is large, tightly tracked, and set at medium weight, with real italic (light, deep green) for the one word that needs emphasis. Structure comes from 1px rules, with an ink rule used to open lists, rather than from boxes and fills. Motion is slow-in, long-out (one expo-style ease) and tied to scroll.

**Key Characteristics:**
- One accent (green) on neutral warm and white grounds; deeper green for emphasis.
- Satoshi only, 300 to 700, tight negative tracking at display sizes.
- Hairline rules, circles, arcs and pills; no heavy fills.
- Product UI is synthetic sample data, white with hairline borders and soft green-tinted shadows.
- Desktop only, light only.

## Colors

A restrained green-and-paper palette: one teal-green family on warm neutrals, with green carrying every signal.

### Primary
- **Connection Green** (`colors.green`): the line itself, rings, paths, dots, bars, focus outline, selection, active marks.
- **Action Green** (`colors.action-green`): filled buttons and the active step number; slightly deeper than Connection Green for white-text contrast.
- **Deep Green** (`colors.deep-green`): emphasis text, italics, scores, hover state for primary buttons, solid circle in the hero, logo-adjacent marks.

### Neutral
- **Ink** (`colors.ink`): headings, body, ghost button, the heavy rule that opens lists.
- **Mute** (`colors.mute`): secondary copy, labels, captions.
- **Warm White** (`colors.warm-white`): default page ground, field background.
- **White** (`colors.white`): alternating section ground, product UI surfaces.
- **Pale Green** (`colors.pale-green`): window title bars, sidebars, chips, kanban columns, one full section ground.
- **Soft Green** (`colors.soft-green`): bar tracks, the roles tint panel, the moment section ground.
- **Tint Green** (`colors.tint-green`): window dots, inactive chart bars, avatar fill, scrollbar thumb.
- **Hairline** (`colors.hairline`): every 1px divider and card border.

### Named Rules
**The One Accent Rule.** Green is the only hue. Status, progress and emphasis are expressed in green and deep green; a second hue is not introduced for new surfaces.
**The Hairline Rule.** Separation is a 1px Hairline or, to open a list, a 1px Ink rule. Fills (Pale, Soft) are for grounds and tracks, not for stacking boxes.

## Typography

**Display, Body and Label Font:** Satoshi (system-ui, sans-serif fallback), self-hosted at 300, 400, 500, 700 plus italics at 300, 400, 500.

**Character:** A single geometric-humanist sans doing every job. Hierarchy comes from size, weight (500 display, 700 titles and labels) and tracking, never from a second family.

### Hierarchy
- **Hero** (500, clamp 58-92px, 0.99): first-viewport headline, tracking -0.04em.
- **Statement / Moment / CTA** (500, clamp 52-96px, 1 to 1.02): full-width statements, same -0.04em tracking.
- **Headline** (500, clamp 44-64px, 1.04): section titles, -0.035em; role names go up to 66px at -0.04em.
- **Title** (700, 20-22px, -0.02em): step names, capability names, panel titles.
- **Body** (400, 17px, 1.55): default; lede 18-20px at 1.6 in Mute, capped near 36-46ch.
- **Label** (700, 12-13px, 0.01em, sentence case): table heads, field labels, column heads. Not uppercase.
- **UI text** (500-700, 13-15.5px): inside product mockups and nav links.

### Named Rules
**The Real Italic Rule.** Emphasis is the true Satoshi italic (300, deep green) on a single word per headline. No faux slant, no extra face.
**The Outline Numeral Rule.** Step numerals are 300 weight, outline-stroked, and fill with Action Green when active.

## Layout

Single-column editorial flow with asymmetric two-column splits (about 4.2/7.8, 4.6/7.4, 5/7 fr) alternating text and product panel. Content sits in a wrap capped at 1680px with a fluid gutter (40px to 96px). Sections breathe at 120px to 200px vertical padding. The nav is a fixed 76px three-column grid (logo, centered links, actions). The hero and process stage are full-viewport; the roles block uses a 12-column grid with ruled cells. The Connection Line is a 1px vertical rule at half the gutter, filling green as the page scrolls. Spacing inside product mockups is tight (6 to 14px rows) against the generous outer rhythm. Desktop only; no mobile breakpoints exist in the build.

## Elevation & Depth

Mostly flat, with hairline borders for structure. Only floating surfaces (product windows, dropdowns, hero fragments) carry a shadow, always soft, offset downward, with a strongly negative spread and a green-tinted rgba so the shadow reads as ambient light rather than an edge.

### Shadow Vocabulary
- **Fragment** (`box-shadow: 0 22px 40px -28px rgba(16,93,85,.35)`): hero fragments.
- **Dropdown** (`box-shadow: 0 18px 40px -22px rgba(16,93,85,.28)`; org list `0 24px 40px -24px rgba(16,93,85,.4)`): menus.
- **Window** (`box-shadow: 0 30px 60px -44px rgba(16,93,85,.45)` up to `0 50px 90px -60px rgba(16,93,85,.55)`): product windows, larger window larger shadow.
- **Selection ring** (`box-shadow: inset 0 0 0 1px` in green or line): selected row, ghost button outline (1.5px ink).

### Named Rules
**The Green Shadow Rule.** Shadows are tinted deep green, low-opacity, negative-spread. No black shadows and no hard offset shadows.

## Shapes

Circles and pills dominate, echoing the logo: pill buttons, chips and role pills (999px), round avatars, dots and ring graphics. Containers use soft radii stepped by size: 10px fields and rows, 14px fragments, 18-20px windows, 4px for bars and focus. Hairline concentric circles, arcs and paths are the decorative language. Hairline strokes are 1 to 1.5px.

## Components

### Buttons
- **Shape:** full pill (999px), 56px tall (small variant 42px), 28px side padding, 700 weight.
- **Primary:** Action Green fill, white text, arrow icon that slides 5px right on hover.
- **Hover / Focus:** fill deepens to Deep Green over 0.4s; press scales to .98; focus is a 2px green outline with 3px offset.
- **Ghost:** transparent with a 1.5px inset Ink ring; fills Ink with white text on hover.

### Chips
- **Style:** Pale Green fill, Hairline border, Deep Green 12 to 12.5px text, pill.
- **State:** `g` is Soft Green with no border; `new` is solid Deep Green with white text; add-tag is dashed and transparent.

### Cards / Containers (product UI)
- **Corner Style:** 14 to 20px by size.
- **Background:** White, with Pale Green title bars and sidebars, 44px bar with three tint dots.
- **Shadow Strategy:** see Elevation; one Green Shadow per window.
- **Border:** 1px Hairline.
- **Internal Padding:** 20 to 30px for windows, 9 to 14px for rows and fields.

### Inputs / Fields
- **Style:** Warm White fill, 1px Hairline border, 10px radius, 9px 14px padding, 12px bold Mute label above. Fields are display mockups, not live inputs.
- **Focus:** global 2px green outline.

### Navigation
- Fixed 76px bar, transparent until scrolled, then 94% Warm White with a Hairline bottom border. Links are 15px 500 Ink with a 1.5px green underline that scales in from the left. Dropdown panels are 320px white, 16px radius, 10px-radius rows that tint Pale Green on hover.

### Connection Line (signature)
A 1px Hairline vertical rule that fills green top to bottom as the page scrolls, ending in an 11px ringed dot. It joins the sections and is the page's single continuous gesture.

### Step Rail
Four steps on a 1px hairline that fills green; ringed marker per step, outline numeral, 22px title. Active step goes to full ink and Action Green numeral.

### Lists with ink rules
Capability, tab and role lists open with a 1px Ink rule and separate rows with 1px Hairline; tab text moves from Mute to Ink and indents 14px when active.

## Do's and Don'ts

### Do:
- **Do** use Connection Green as the only hue, Deep Green for emphasis, Action Green for filled controls.
- **Do** separate with 1px Hairline rules; open lists with a 1px Ink rule.
- **Do** set display type at 500 weight with -0.035 to -0.04em tracking, and use real Satoshi italic (300, Deep Green) for one emphasised word.
- **Do** use pills for buttons and chips, circles for avatars and markers, 10 to 20px radii for containers.
- **Do** keep product UI white with hairline borders, green status marks, and a green-tinted negative-spread shadow.
- **Do** use the single expo-out ease (`cubic-bezier(.16,1,.3,1)`) at 0.3 to 0.6s for state transitions.
- **Do** keep sample product data marked as sample.

### Don't:
- **Don't** wrap sections in a grid of identical bordered cards.
- **Don't** introduce a second accent hue for new work; the existing amber insight dot is a one-off.
- **Don't** use black or hard-offset shadows.
- **Don't** add a second typeface or faux italics.
- **Don't** use gradient text, glass blur, or heavy fills in place of rules.
