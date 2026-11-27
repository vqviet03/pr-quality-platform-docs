import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Root as MarkdownRoot } from 'mdast';
import type { Root, Element, Text } from 'hast';
import { withBasePath } from './paths';

const handbook = path.join(process.cwd(), 'handbook');

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : entry.name.endsWith('.md') ? [path.relative(handbook, file).split(path.sep).join('/')] : [];
  });
}

export function fileToHref(file: string) {
  if (file === 'index.md') return '/overview/';
  return `/${file.replace(/(?:\/README)?\.md$/, '')}/`;
}

export function allDocuments() {
  return walk(handbook).sort().map(file => {
    const source = fs.readFileSync(path.join(handbook, file), 'utf8');
    const title = source.match(/^# (.+)$/m)?.[1] ?? file;
    const description = source.split('\n').find(line => line.trim() && !/^[#|\-]/.test(line)) ?? '';
    return { file, href: fileToHref(file), title, description, source };
  });
}

function nodeText(node: Element | Text): string {
  if (node.type === 'text') return node.value;
  return node.children.map(child => child.type === 'text' || child.type === 'element' ? nodeText(child) : '').join('');
}

export async function renderDocument(file: string) {
  const doc = allDocuments().find(item => item.file === file);
  if (!doc) throw new Error(`Unknown document: ${file}`);
  const headings: { id: string; text: string; level: number }[] = [];
  const processor = unified().use(remarkParse).use(remarkGfm)
    .use(() => (tree: MarkdownRoot) => {
      visit(tree, 'link', node => {
        if (!node.url || /^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(node.url)) return;
        const [target, suffix = ''] = node.url.split(/(?=[?#])/s, 2);
        if (!target.endsWith('.md')) return;
        const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), decodeURIComponent(target)));
        if (resolved.startsWith('../') || !fs.existsSync(path.join(handbook, resolved))) {
          throw new Error(`Broken Markdown link in ${file}: ${node.url}`);
        }
        node.url = withBasePath(fileToHref(resolved)) + suffix;
      });
      // The page header renders the title; avoid a duplicate h1 in the article.
      tree.children = tree.children.filter(node => node.type !== 'heading' || node.depth !== 1);
    })
    .use(remarkRehype).use(rehypeSanitize).use(rehypeSlug)
    .use(() => (tree: Root) => {
      visit(tree, 'element', node => {
        if (/^h[23]$/.test(node.tagName)) headings.push({ id: String(node.properties.id), text: nodeText(node), level: Number(node.tagName[1]) });
      });
    }).use(rehypeStringify);
  const html = String(await processor.process(doc.source));
  return { ...doc, html, headings };
}
