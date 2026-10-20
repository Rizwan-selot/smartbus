# SmartBus Web Application — Design System

Exact replication of SmartBus Manager (Uffizio). Tokens live in `src/styles.css` (`--sb-*`, exposed as Tailwind `*-sb-*` classes). Components live in `src/components/sb/`. Do not redesign; keep the dense, utilitarian look.

## A. Color System
| Token | HEX | Use |
|---|---|---|
| sb-sidebar | #6B6B6B | Main left sidebar |
| sb-sidebar-active | #4F4F4F | Active / hover nav item |
| sb-logo | #F9C80E | Circular logo |
| sb-menu | #5C5C5C | Reports flyout level 1 |
| sb-menu-hover | #4A4A4A | Flyout hover / level 2 |
| sb-header | #3E3E3E | Panel tab bar, report title bar, video header |
| sb-workspace | #E9E9E9 | App background |
| sb-panel | #FFFFFF | Floating panels, grid body |
| sb-group / sb-subgroup | #D6D6D6 / #E6E6E6 | School / branch group rows |
| sb-row-sel | #DFE6FF | Selected trip row |
| sb-grid-head / sb-grid-line | #ECECEC / #D9D9D9 | Table header / borders |
| sb-text / sb-text-dim | #333333 / #555555 | Body / secondary text |
| sb-link | #1F1FD6 | Clickable values (coordinates, Permanent, route names) |
| sb-ok / sb-ok-bg | #2E8B2E / #D4F3CF | Running, Valid |
| sb-done / sb-done-bg | #2A2AD0 / #C9CCFB | Completed, info icons |
| sb-warn / sb-warn-bg | #E08A00 / #FFF0C2 | Upcoming, Idle |
| sb-fail / sb-fail-bg | #E01B1B / #FFCACA | Fail, Stopped |
| sb-inactive-bg | #D3D6FB | Inactive counter |
| sb-total-bg | #D9D9D9 | Total counter |
| sb-badge-ok / sb-badge-fail | #12A012 / #FF0000 | "Start On Time" / "Start Delayed" badges |
| sb-day | #3B5BFD | Active schedule-day box |
| sb-checkpoint | #F0A020 | Checkpoint marker fill (ring #2F6FE0) |
| sb-route | #6A6A6A | Defined route path |
| sb-topline | #1F4F4F | 4px strip at top of window |

Values estimated by eye from screenshots; exact brand HEX values not confirmed.

## B. Typography
- Family: Open Sans (400/500/600/700), fallback Arial.
- Base 12px / 1.4. Small meta 11px; counter labels 9.5px; badges 10.5px/15px.
- Sidebar labels 12px white; flyout items 12.5px.
- Report title 16px regular; grid header 12px semibold; cells 12px/17px.

## C. Layout
- Top strip 4px. Sidebar 90px wide; logo block 96px; nav items 80px tall, icon 24px stroke 1.3.
- Reports flyout: level 1 170px, level 2 180px, rows 40px, starting 72px from top.
- Trips panel: 590px wide, left 10px, top 16px, extends to bottom. Video list panel 410px.
- Tab bar 34px; counters 32px; search row 28px controls.
- Right vehicle panel 168px + 28px collapse toggle; map toolbar 30px buttons to its left.
- Video panel 440px, top-right; each feed 256px tall.
- Report page: 10px padding, header 40px, footer 40px, grid fills remaining.
- Desktop-first (≥1280px). Not optimised for mobile, same as original.

## D. Components
MainSidebar · ModuleTabBar · SummaryStatusCounter · SearchBar · FilterToolbar · GroupRow (school/branch) · TripRow (42px) · VehicleRow + VideoChannelRow (35px) · VehicleDetailsPanel · TripDetails (inside VehicleDetailsPanel) · VideoPlayerPanel · MapContainer · MapToolbar · StatusBadge · DataGrid · ReportHeader · ReportPagination.
- Radius 2–3px max. Shadows: default `shadow`/`shadow-lg` only on floating panels.
- Active tab: white tab rising from dark bar. Hover: darker grey on sidebar/menus.

## E. Tables and Reports
- Two-level header (Schedule Time → From/To), header bg #ECECEC, 32px per level.
- Rows ~78px (wrapped text), no zebra, white cell dividers; fixed column widths, horizontal scroll.
- Expand button: 14px blue square with white plus.
- Schedule days: 7 boxes 17×20px, blue = scheduled, white = off.
- Footer: refresh, XLS (green), PDF (red), search input + column select, rows-per-page, page select, "1-20 (426)".

## F. Maps and Tracking
- Leaflet + OpenStreetMap tiles, full workspace, no default zoom control.
- Route: 8px grey line with thin dashed overlay. Checkpoints: 26px orange circles, blue 3px ring, white number.
- Legend bottom-right: Actual / History / Defined / Route Deviation path. Playback tab top-center.

## G. Video Telematics
- Header "Map + Video" tab, grid icon, close X.
- Feeds stacked; overlay: plate | channel, fps | size | bitrate, school name, status dot (green Active, yellow Idle), resolution, bottom timestamp + coordinates in mono.
- Channel icons: video, live play, playback, snapshot — green when online, red when offline.

## H. Icons
- lucide-react, 14–16px in panels, 24px in sidebar, stroke 1.3 (sidebar) / 2 (panels). Colour follows status tokens.

## I. Consistency Rules
1. Use only `sb-*` tokens; no hardcoded colours, gradients or new radii.
2. New modules reuse the floating panel + map layout or the ReportHeader/DataGrid/ReportPagination stack.
3. Keep density: 12px text, compact rows, no large cards or whitespace.
4. New report pages register in the `REPORT_MENU` of MainSidebar.
5. Update this file whenever tokens or components change.
