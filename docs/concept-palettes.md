# Concept site palettes

The colour palettes for the three Straat Studio concept sites. Ndlovu Electrical and Fazila's Kitchen
use theirs now. Thandeka Hair Studio is not built yet, so its palette is saved here for later.

Each concept has its own look, and none of them reuses the Straat Studio navy and yellow.

## Rules for all three

1. **WhatsApp green is not a button colour.** WhatsApp buttons use the site's own brand colour. The green
   (#25D366) appears only as the small WhatsApp icon inside those buttons, and as the floating WhatsApp button.
2. **Every text and button colour pair passes WCAG AA** (4.5:1 for normal text, 3:1 for large text and for
   interface parts such as borders and focus rings). Where a palette colour fails, only the shade that
   carries text is adjusted. The palette colour itself stays for decoration.
3. **Contrast was measured, not guessed.** The built sites were audited in a real browser: every visible text
   element against its real background, on every page, at desktop and phone width, with the mobile menu open.
4. **Fonts, layouts, photos, labels and wording are separate from colour.** A recolour changes colours only.

## 1. Ndlovu Electrical (built, Business package)

| Role | Colour | Notes |
| --- | --- | --- |
| Graphite | #1E2328 | Text, dark sections, header rule, footer, focus ring |
| Safety orange | #FF6B1A | Fills only: buttons, step numbers, stripe, bar links. Text on it is graphite |
| White | #FFFFFF | Page background |
| Light grey | #F0F2F3 | Alternate sections, panels |

Derived and adjusted shades:

| Use | Colour | Contrast |
| --- | --- | --- |
| Graphite text on orange (buttons) | #1E2328 on #FF6B1A | 5.56:1. White on orange is only 2.85:1, so buttons use graphite text |
| Orange used as text on white or light grey | #BE4300 | 5.26:1 on white, 4.68:1 on light grey. Plain #FF6B1A is 2.85:1 and 2.54:1 |
| Orange on graphite (bar links, dark section labels) | #FF6B1A on #1E2328 | 5.56:1 |
| Orange hover | #FF8442 | Graphite text on it is 6.51:1 |
| Muted text | #4A535B | 7.84:1 on white, 6.98:1 on light grey |
| Text on graphite | #D7DCE0 | 11.46:1 |
| WhatsApp icon chip | green #25D366 on graphite | 7.98:1. Green straight on orange is only 1.44:1, so the icon sits on a small graphite chip |
| Focus ring | graphite on light, white on dark | Orange would be 2.85:1 on white |

## 2. Fazila's Kitchen (built, Catalogue package)

| Role | Colour | Notes |
| --- | --- | --- |
| Cocoa | #3B2320 | Text, dark sections, footer, concept bar |
| Cream | #FBF5EE | Page background |
| Dusty rose | #B85C6E | Brand colour for borders and decoration |
| Gold | #C99A3B | Small touches: logo ring, section labels and step numbers on cocoa, bar links, label borders |

Derived and adjusted shades:

| Use | Colour | Contrast |
| --- | --- | --- |
| Rose that carries text (buttons, prices, labels) | #A5485A | White on it 5.72:1, on cream 5.28:1, on the rose tint 4.59:1. Pure #B85C6E gives 4.38:1 with white and 4.05:1 on cream |
| Rose hover | #924150 | White on it 6.79:1 |
| Rose tint (section background) | #F3E3DF | 12% dusty rose mixed into cream. Cocoa on it 11.65:1 |
| Gold tint (section background, label chips) | #F1E3CA | 20% gold mixed into cream. Cocoa on it 11.46:1 |
| Muted text | #6B534D | 6.53:1 on cream, 5.68:1 on the rose tint |
| Gold text | only on cocoa | 5.64:1 on cocoa. On cream it is 2.37:1, so gold is never text on a light background |
| Text on cocoa | #EBDDD3 | 10.93:1 |
| WhatsApp icon chip | green #25D366 on cocoa | 7.32:1. Green straight on rose is only 2.21:1 |
| Non-WhatsApp primary buttons | cocoa fill, cream text | 13.40:1. They differ from the rose WhatsApp buttons so the two never sit side by side in the same colour |

## 3. Thandeka Hair Studio (not built yet)

| Role | Colour | Notes |
| --- | --- | --- |
| Ink | #16161A | Text, dark sections, footer |
| Bone | #F6F2EC | Page background |
| Brass | #A8834A | Accent |

Contrast measured now, so the build starts from known numbers:

| Pair | Contrast | Verdict |
| --- | --- | --- |
| Ink on bone, or bone on ink | 16.18:1 | Passes |
| Brass on ink | 5.16:1 | Passes: brass works as text on dark sections |
| Ink text on a brass button | 5.16:1 | Passes: use ink text on brass buttons |
| Brass as text on bone | 3.13:1 | Fails for normal text. Use #886A3C (4.51:1) for brass text on bone |
| White or bone text on a brass button | 3.49:1 and 3.13:1 | Fails for normal text. Do not use |

The same WhatsApp rule applies: brass buttons with ink text, a small green WhatsApp icon on an ink chip,
and green only on the floating button. Re-run the browser contrast audit once the site is built.

## What real South African sites use (checked November 2026)

The palettes were compared with real sites, read in a real browser. Nothing was copied. The comparison is a
sanity check, and none of it contradicted the palettes.

- **Electricians (7 sites).** Dark charcoal or slate with white or light grey is nearly universal. Three use an
  orange or amber call-to-action. Two use blue and one uses red.
  electrician-pretoria.com, waynetelectrical.co.za, dadoumatubaelectriciansplumstead.yolasite.com,
  wizardelectricianspretoria.yolasite.com, the-good-electrician.yolasite.com,
  vpc-gpelectricians-co-za.pages.dev, electricianscenturion.yolasite.com.
- **Home bakers (6 sites).** Four use a cream background very close to #FBF5EE, with dark chocolate-brown text.
  Accents are warm: terracotta, orange, pink, and one dusty rose-brown.
  tessasbakery.co.za, ohmycake.co.za, aunty-bevs-delights.ensiglo.com, kayls-sweet-treats.ensiglo.com,
  joniques-creations.ensiglo.com, whisk-bakery.onrender.com (this last one looks like a demo site).
- Several of these sites are built on template platforms. Two further bakery sites (chateaugateaux.co.za and
  cakesbylynn.co.za) did not load and were left out.
