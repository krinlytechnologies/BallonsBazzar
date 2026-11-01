import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { sanityDataset, sanityProjectId } from "./sanity/lib/env";

export default defineConfig({
  name: "partybazaar",
  title: "BalloonBazaar — PartyBazaar Studio",
  projectId: sanityProjectId || "",
  dataset: sanityDataset,
  basePath: "/admin",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
