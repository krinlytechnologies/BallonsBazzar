import { describe, expect, it } from "vitest";
import { buildCategoryListQuery, buildKitBySlugQuery, buildKitListQuery } from "../queries";

describe("buildKitListQuery", () => {
  it("excludes draft documents", () => {
    expect(buildKitListQuery()).toContain('!(_id in path("drafts.**"))');
  });

  it("filters by occasion slug when provided", () => {
    const query = buildKitListQuery("baby-shower");
    expect(query).toContain('"baby-shower" in occasionCategories[]->slug.current');
  });

  it("omits the occasion filter when none is provided", () => {
    const query = buildKitListQuery();
    expect(query).not.toContain("occasionCategories[]->slug.current");
  });

  it("orders featured kits first, then alphabetically", () => {
    expect(buildKitListQuery()).toContain("order(featured desc, name asc)");
  });
});

describe("buildKitBySlugQuery", () => {
  it("filters by the $slug parameter and excludes drafts", () => {
    const query = buildKitBySlugQuery();
    expect(query).toContain("slug.current == $slug");
    expect(query).toContain('!(_id in path("drafts.**"))');
  });
});

describe("buildCategoryListQuery", () => {
  it("excludes drafts and orders by the order field", () => {
    const query = buildCategoryListQuery();
    expect(query).toContain('!(_id in path("drafts.**"))');
    expect(query).toContain("order(order asc)");
  });
});
