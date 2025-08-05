import { readFileSync } from "node:fs";

try {
  const fileContent = readFileSync("db.json", "utf-8");
  console.log(fileContent);
} catch (error) {
  console.error("error reading file:", error);
}
