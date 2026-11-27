import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
import { allDocuments } from '../src/lib/content';
import { diagramInfo, siteUrl } from '../src/lib/navigation';
import { basePath } from '../src/lib/paths';

const output = path.resolve('out');
function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const htmlFiles = walk(output).filter(file => file.endsWith('.html'));
const errors: string[] = [];
let checkedLinks = 0;
for (const file of htmlFiles) {
  const $ = load(fs.readFileSync(file, 'utf8'));
  if ($('h1').length !== 1) errors.push(`${file}: expected one h1, found ${$('h1').length}`);
  if ($('html').attr('lang') !== 'vi') errors.push(`${file}: missing Vietnamese document language`);
  $('[href], [src]').each((_, element) => {
    const url = $(element).attr('href') || $(element).attr('src');
    if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url)) return;
    const parsed = new URL(url, `https://docs.invalid${basePath}/${path.relative(output, file)}`);
    const pathname = decodeURIComponent(parsed.pathname);
    const targetPath = basePath && pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname;
    let target = path.join(output, targetPath);
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) { errors.push(`${path.relative(output, file)}: missing target ${url}`); return; }
    if (parsed.hash && target.endsWith('.html')) {
      const targetHtml = load(fs.readFileSync(target, 'utf8'));
      const id = decodeURIComponent(parsed.hash.slice(1));
      if (!targetHtml('[id]').toArray().some(node => targetHtml(node).attr('id') === id)) errors.push(`${path.relative(output, file)}: missing anchor ${url}`);
    }
    checkedLinks++;
  });
}
const documents = allDocuments();
for (const doc of documents) assert.ok(fs.existsSync(path.join(output, doc.href, 'index.html')), `Not exported: ${doc.href}`);
for (const key of Object.keys(diagramInfo)) assert.ok(fs.existsSync(path.join(output, 'diagrams', key, 'index.html')));
const search = JSON.parse(fs.readFileSync(path.join(output, 'search-index.json'), 'utf8'));
assert.equal(search.length, documents.length, 'Search index must include every document');
assert.equal(fs.readFileSync(path.join(output, 'CNAME'), 'utf8').trim(), 'cra-docs.eeslern.com');
assert.ok(fs.existsSync(path.join(output, '.nojekyll')));
assert.ok(fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8').includes(siteUrl));
assert.equal(errors.length, 0, errors.join('\n'));
console.log(`Verified ${htmlFiles.length} HTML files, ${checkedLinks} local links/assets, ${documents.length} searchable documents, diagrams, sitemap and GitHub Pages domain files.`);
