import Link from 'next/link';

export function Breadcrumb({ items }: { items: { title: string; href?: string }[] }) {
  return <nav className="breadcrumb" aria-label="Đường dẫn"><Link href="/">TÀI LIỆU</Link>{items.map((item, i) => <span key={i}><span className="breadcrumb-divider" aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.title}</Link> : <span aria-current="page">{item.title}</span>}</span>)}</nav>;
}

export function Hero({ title, description, action, mobileTitle, mobileDescription }: { title: string; description: string; action?: { title: string; href: string }; mobileTitle?: string; mobileDescription?: string }) {
  return <header className="hero"><h1>{mobileTitle ? <><span className="desktop-copy">{title}</span><span className="mobile-copy">{mobileTitle}</span></> : title}</h1><p>{mobileDescription ? <><span className="desktop-copy">{description}</span><span className="mobile-copy">{mobileDescription}</span></> : description}</p>{action && <Link className="glass-button" href={action.href}>{action.title}</Link>}</header>;
}

export function CardGrid({ items, compact = false }: { items: { title: string; href: string; description: string; mobileTitle?: string }[]; compact?: boolean }) {
  return <div className={`card-grid${compact ? ' compact-mobile' : ''}`}>{items.map(item => <Link className="doc-card" href={item.href} key={item.href}><h2>{item.mobileTitle ? <><span className="desktop-copy">{item.title}</span><span className="mobile-copy">{item.mobileTitle}</span></> : item.title}<span className="mobile-chevron" aria-hidden="true">›</span></h2><p>{item.description}</p></Link>)}</div>;
}

export function FlowStrip({ title, items, href }: { title: string; items: string[]; href?: string }) {
  return <section className="flow-strip"><h2>{href ? <Link href={href}>{title}</Link> : title}</h2><ol>{items.map((item, i) => <li key={item}>{i > 0 && <span className="flow-connector" aria-hidden="true">→</span>}<span className="flow-chip">{item}</span></li>)}</ol></section>;
}
