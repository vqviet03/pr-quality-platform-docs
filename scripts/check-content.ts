import fs from 'node:fs';
import { allDocuments, renderDocument } from '../src/lib/content';

async function main() {
  const documents = allDocuments();
  await Promise.all(documents.map(doc => renderDocument(doc.file)));
  fs.mkdirSync('public', { recursive: true });
  fs.writeFileSync('public/search-index.json', JSON.stringify(documents.map(({ title, href, description, source }) => ({ title, href, description, text: source.replace(/[#*`|]/g, '') }))));
  console.log(`Validated ${documents.length} Markdown documents and relative links; generated search index.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
