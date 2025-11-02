// File: scripts/patch-shadcn-imports.js
// Run: node scripts/patch-shadcn-imports.js
const fs = require("fs");
const path = require("path");

//console.log("Current dir is ", __dirname);
const root = path.join(__dirname, "..", "src");
//console.log("Root is ", root);
const exts = new Set([".ts", ".tsx", ".js", ".jsx"]);

function walk(dir, cb) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walk(full, cb);
    else if (name.isFile() && exts.has(path.extname(name.name))) cb(full);
  }
}

const importPattern = /(['"])src\/([^'"]+)\1/g;

walk(root, (file) => {
  let s = fs.readFileSync(file, "utf8");
  const updated = s.replace(importPattern, (m, q, p) => `${q}@repo/shadcn-ui/${p}${q}`);
  if (updated !== s) {
    fs.writeFileSync(file, updated, "utf8");
    console.log("Patched:", path.relative(process.cwd(), file));
  }
});
