import { useEffect, useState } from 'react';
import './SectionNavDots.css';

const sections = [
  { id: 'hero-top', label: 'Trang chủ' },
  { id: 'boicanh', label: 'Bối cảnh' },
  { id: 'genz', label: 'Gen Z' },
  { id: 'thuonghieu', label: 'Thương hiệu' },
  { id: 'lichsu', label: 'Lịch sử' },
  { id: 'binhchon', label: 'Bình chọn' },
];

const SectionNavDots = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers = sections.map((sec, idx) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        entries => { if (entries[0].isIntersecting) setActive(idx); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="section-nav-dots" aria-label="Section navigation">
      {sections.map((sec, idx) => (
        <button
          key={sec.id}
          className={`nav-dot ${active === idx ? 'active' : ''}`}
          onClick={() => scrollTo(sec.id)}
          title={sec.label}
          aria-label={sec.label}
        >
          <span className="nav-dot-tooltip">{sec.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default SectionNavDots;
