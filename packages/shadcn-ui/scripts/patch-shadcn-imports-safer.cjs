// Run: node scripts/patch-shadcn-imports.js
const fs = require("fs");
const path = require("path");

const pkgRoot = path.join(__dirname, "..");
const srcRoot = path.join(pkgRoot, "src");
const exts = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"];
const pkgName = "@repo/shadcn-ui";

function walk(dir, cb) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, cb);
    else if (ent.isFile() && exts.includes(path.extname(ent.name))) cb(full);
  }
}

function findTargetImportFile(relPathWithoutExt) {
  // try exact file, then index files
  const candidates = exts.flatMap((e) => [
    path.join(srcRoot, relPathWithoutExt + e),
    path.join(srcRoot, relPathWithoutExt, "index" + e)
  ]);
  for (const c of candidates) if (fs.existsSync(c)) return c;
  return null;
}

walk(srcRoot, (file) => {
  let s = fs.readFileSync(file, "utf8");
  let updated = s;

  // 1) Rewrite imports starting with "src/..." -> prefer local relative if target exists, otherwise to package name
  updated = updated.replace(/(['"])src\/([^'"]+)\1/g, (m, q, p) => {
    const target = findTargetImportFile(p);
    if (target) {
      let rel = path.relative(path.dirname(file), target).replace(/\\/g, "/");
      rel = rel.replace(/\.(ts|tsx|js|jsx|mjs|cjs)$/, "");
      if (!rel.startsWith(".")) rel = "./" + rel;
      return `${q}${rel}${q}`;
    }
    return `${q}${pkgName}/${p}${q}`;
  });

  // 2) Rewrite existing package-scoped imports back to relative when they point to a file inside this package
  updated = updated.replace(new RegExp(`(['"])${pkgName}\\/([^'"]+)\\1`, "g"), (m, q, p) => {
    const target = findTargetImportFile(p);
    if (target) {
      let rel = path.relative(path.dirname(file), target).replace(/\\/g, "/");
      rel = rel.replace(/\.(ts|tsx|js|jsx|mjs|cjs)$/, "");
      if (!rel.startsWith(".")) rel = "./" + rel;
      return `${q}${rel}${q}`;
    }
    return `${q}${pkgName}/${p}${q}`;
  });

  if (updated !== s) {
    fs.writeFileSync(file, updated, "utf8");
    console.log("Patched:", path.relative(process.cwd(), file));
  }
});
