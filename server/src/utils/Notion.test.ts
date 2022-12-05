import { mergeListItems } from "./Notion";
import { isContentArray } from "../types/typeGuards";
import fs from "fs";
import path from "path";

let mockData: any[];

test("mock blog data is read correctly", () => {
  const data = fs.readFileSync(
    path.resolve(__dirname, "./testing-data/blog-unmerged.json"),
    "utf-8"
  );
  mockData = JSON.parse(data);

  console.log(mockData);

  expect(Array.isArray(mockData)).toBe(true);
});

test("list items are merged correctly", () => {
  if (isContentArray(mockData)) {
    const merged = mergeListItems(mockData);

    console.log(merged);
  }
});
