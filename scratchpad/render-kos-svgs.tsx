/* Renders the kos/ figure components to raw SVG files for the Figma code-sync.
   Run from the repo root: npx tsx scratchpad/render-kos-svgs.tsx */
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync, mkdirSync } from "fs";
import { createElement } from "react";

import CaptureVolumeChart from "../src/components/case/content/kos/CaptureVolumeChart";
import CaptureBeforeAfter from "../src/components/case/content/kos/CaptureBeforeAfter";
import TrustRowCrop from "../src/components/case/content/kos/TrustRowCrop";
import SystemMap from "../src/components/case/content/kos/SystemMap";
import TechStackMap from "../src/components/case/content/kos/TechStackMap";
import AgentFleet from "../src/components/case/content/kos/AgentFleet";
import RagArchitecture from "../src/components/case/content/kos/RagArchitecture";
import RefusalCrop from "../src/components/case/content/kos/RefusalCrop";
import BranchGraphFigure from "../src/components/case/content/kos/BranchGraphFigure";
import ScoringRecal from "../src/components/case/content/kos/ScoringRecal";
import SystemEvolution from "../src/components/case/content/kos/SystemEvolution";
import GapCatchCard from "../src/components/case/content/kos/GapCatchCard";

const comps: Record<string, React.ComponentType> = {
  CaptureVolumeChart, CaptureBeforeAfter, TrustRowCrop,
  SystemMap, TechStackMap, AgentFleet, RagArchitecture, RefusalCrop, BranchGraphFigure,
  ScoringRecal, SystemEvolution, GapCatchCard,
};

mkdirSync("scratchpad/kos-svg", { recursive: true });

for (const [name, C] of Object.entries(comps)) {
  let svg = renderToStaticMarkup(createElement(C));
  // Resolve CSS font vars to the Figma-installed families
  svg = svg.replace(/var\(--font-geist-mono\),\s*ui-monospace,\s*monospace/g, "Geist Mono, monospace");
  svg = svg.replace(/var\(--font-geist\),\s*sans-serif/g, "Geist, sans-serif");
  // Sans-serif text nodes: convert the inline style to a presentation attribute
  svg = svg.replace(/style="font-family:Geist, sans-serif"/g, 'font-family="Geist"');
  // Strip the root <svg> layout style (width:100% etc.) — Figma sizes from viewBox
  svg = svg.replace(/(<svg[^>]*?)\s*style="[^"]*"/, "$1");
  // Every remaining <text> without an explicit family inherits the mono default
  svg = svg.replace(/<text (?![^>]*font-family)/g, '<text font-family="Geist Mono" ');
  writeFileSync(`scratchpad/kos-svg/${name}.svg`, svg);
  console.log(name, svg.length);
}
