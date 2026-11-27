'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { packages, platformDocs, repository } from '@/lib/navigation';

type SearchResult = { title: string; href: string; description: string; text: string };
function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [searchError, setSearchError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const closeMenuButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
    const media = matchMedia('(max-width: 740px)');
    const updateMobile = () => { setMobile(media.matches); if (!media.matches) setMenuOpen(false); };
    updateMobile();
    media.addEventListener('change', updateMobile);
    const keydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        dialog.current?.showModal();
        searchInput.current?.focus();
      }
      if (event.key === 'Escape' && menuOpenRef.current) { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); media.removeEventListener('change', updateMobile); };
  }, []);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    document.body.classList.toggle('menu-open', menuOpen);
    if (menuOpen) closeMenuButton.current?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (!menuOpen || event.key !== 'Tab' || !sidebar.current) return;
      const focusable = Array.from(sidebar.current.querySelectorAll<HTMLElement>('a[href], button')).filter(el => el.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', trapFocus);
    return () => { document.body.classList.remove('menu-open'); document.removeEventListener('keydown', trapFocus); };
  }, [menuOpen]);

  function closeMenu() { setMenuOpen(false); menuButton.current?.focus(); }
  function toggleTheme() {
    const value = !dark;
    document.documentElement.dataset.theme = value ? 'dark' : 'light';
    setDark(value);
    try { localStorage.setItem('pq-theme', value ? 'dark' : 'light'); } catch { /* Reading remains available without storage. */ }
  }
  async function loadSearch() {
    if (index.length) return;
    try {
      const response = await fetch('/search-index.json');
      if (!response.ok) throw new Error('Search unavailable');
      setIndex(await response.json());
      setSearchError(false);
    } catch { setSearchError(true); }
  }
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const results = terms.length ? index.map(item => ({ item, score: terms.reduce((score, term) => score + (normalize(item.title).includes(term) ? 10 : 0), 0) }))
    .filter(({ item }) => terms.every(term => normalize(item.title + ' ' + item.text).includes(term)))
    .sort((a, b) => b.score - a.score).slice(0, 12).map(({ item }) => item) : [];
  function navLink(title: string, href: string, nested = false) {
    const active = pathname === href || pathname === href.slice(0, -1);
    return <Link key={href} href={href} className={`nav-link${active ? ' active' : ''}${nested ? ' nested' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{title}</Link>;
  }
  const section = pathname.startsWith('/packages') ? 'Package' : pathname.startsWith('/templates') ? 'Mẫu' : pathname.startsWith('/diagrams') ? 'Sơ đồ' : pathname.startsWith('/docs') || pathname.startsWith('/platform') ? 'Nền tảng' : 'Tổng quan';

  return <>
    <a className="skip-link" href="#main-content">Đến nội dung chính</a>
    <div className="mobile-bar"><button ref={menuButton} className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="docs-navigation" aria-label="Mở menu tài liệu"><span aria-hidden="true">☰</span><b>PQ</b><span>/</span><span>{section}</span></button><button className="icon-button" onClick={toggleTheme} aria-label={dark ? 'Bật chế độ sáng' : 'Bật chế độ tối'}>{dark ? '☀' : '☾'}</button></div>
    {menuOpen && <button className="menu-overlay" aria-label="Đóng menu" onClick={closeMenu} />}
    <aside ref={sidebar} id="docs-navigation" className={`sidebar${menuOpen ? ' is-open' : ''}`} aria-label="Điều hướng tài liệu" inert={mobile && !menuOpen}>
      <div className="brand-row"><Link className="brand" href="/" onClick={() => setMenuOpen(false)}><span className="brand-mark">PQ</span><span>PR QUALITY</span></Link><button ref={closeMenuButton} className="close-menu icon-button" onClick={closeMenu} aria-label="Đóng menu">×</button></div>
      <p className="portal-label">CỔNG TÀI LIỆU</p>
      <nav>
        <div className="nav-group"><p>BẮT ĐẦU</p>{navLink('Tổng quan', '/')}</div>
        <div className="nav-group"><Link href="/platform/" className="nav-group-title" onClick={() => setMenuOpen(false)}>NỀN TẢNG</Link>
          {[platformDocs[0], platformDocs[1], platformDocs[4], platformDocs[2], platformDocs[3], platformDocs[5]].map(item => navLink(item.title, item.href))}
        </div>
        <div className="nav-group"><p>THAM CHIẾU</p>{navLink('Danh mục package', '/packages/')}
          {pathname.startsWith('/packages') && packages.map(item => navLink(item.title, `/packages/${item.id}/`, true))}
          {navLink('Mẫu tài liệu', '/templates/')}{navLink('Sơ đồ hệ thống', '/diagrams/')}
        </div>
      </nav>
      <div className="sidebar-tools"><button className="search-trigger" onClick={() => { dialog.current?.showModal(); searchInput.current?.focus(); }}><span>Tìm tài liệu</span><kbd>⌘ K</kbd></button><div className="sidebar-bottom"><a href={repository} target="_blank" rel="noreferrer">GitHub</a><button onClick={toggleTheme} className="theme-button" aria-pressed={dark}>{dark ? '☀ Chế độ sáng' : '☾ Chế độ tối'}</button></div></div>
    </aside>
    <main id="main-content" className="main-content" tabIndex={-1}>{children}</main>
    <dialog ref={dialog} className="search-dialog" onToggle={event => { if (event.newState === 'open') void loadSearch(); }} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className="search-header"><label className="sr-only" htmlFor="search-docs">Tìm kiếm tài liệu</label><input ref={searchInput} id="search-docs" placeholder="Tìm kiếm trong tài liệu…" value={query} onChange={event => setQuery(event.target.value)} autoComplete="off" /><button className="icon-button" onClick={() => dialog.current?.close()} aria-label="Đóng tìm kiếm">×</button></div>
      <div className="search-results" aria-live="polite">
        {searchError ? <p>Không tải được tìm kiếm. <button onClick={loadSearch}>Thử lại</button></p> : !query.trim() ? <p>Tìm theo tiêu đề hoặc nội dung. Hỗ trợ tiếng Việt không dấu.</p> : !index.length ? <p>Đang tải tài liệu…</p> : !results.length ? <p>Không tìm thấy tài liệu cho “{query}”.</p> : results.map(item => <Link key={item.href} href={item.href} onClick={() => { dialog.current?.close(); setMenuOpen(false); }}><strong>{item.title}</strong><span>{item.description || 'Mở tài liệu'}</span></Link>)}
      </div>
    </dialog>
  </>;
}
