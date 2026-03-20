import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner container flex justify-between items-center">
        <div className="logo text-red font-serif">V-TRUST</div>
        <nav className="nav-links flex gap-6">
          <a href="#boicanh">Bối cảnh ∨</a>
          <a href="#thuonghieu">Thương hiệu ∨</a>
          <a href="#gocnhin">Góc nhìn Đảng sử ∨</a>
          <a href="#tramvote">Trạm Vote ∨</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
