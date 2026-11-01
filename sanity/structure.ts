import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("PartyBazaar")
    .items([
      S.listItem()
        .title("Decoration Kits")
        .child(S.documentTypeList("kit").title("Decoration Kits")),
      S.listItem()
        .title("Occasion Categories")
        .child(S.documentTypeList("category").title("Occasion Categories")),
    ]);
