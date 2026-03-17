import React from 'react';
import CountUp from '../hooks/CountUp';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Hero.css';

const Hero = () => {
  const { ref: revealRef, isVisible } = useScrollReveal();

  return (
    <section ref={revealRef} className={`hero container py-10 flex reveal ${isVisible ? 'is-visible' : ''}`}>
      <div className="hero-content flex-col">
        <h1 className="hero-title font-serif">
          <span className="text-red">V-TRUST:</span> TỰ HÀO HÀNG VIỆT
        </h1>
        <h2 className="hero-subtitle font-serif">
          Khát vọng <span className="hl-yellow">Local Brand</span> - Từ Nghị quyết đến <span className="hl-red">Thực tiễn</span>.
        </h2>
        <p className="hero-desc">
          Khi niềm tin không chỉ là khẩu hiệu. Cùng Gen Z giải mã hành trình vươn mình của các thương hiệu nội địa và tầm nhìn xây dựng nền kinh tế độc lập, tự chủ trong kỷ nguyên số.
        </p>
        
        <div className="hero-actions flex items-center gap-8 mt-8">
          <button className="btn btn-yellow">
            Khám phá câu chuyện ↓
          </button>
          <a href="#casestudy" className="case-study-link text-yellow">View Case Study</a>
        </div>

        <div className="hero-brands mt-8">
          <p className="brands-title">Leading domestic brands in Vietnam</p>
          <div className="brand-logos flex gap-6 items-center">
            {/* SVG Placeholders for Brands */}
            <div className="brand-logo-placeholder vinfast-logo font-serif">VINFAST</div>
            <div className="brand-logo-placeholder bitis-logo font-serif">BITI'S HUNTER</div>
            <div className="brand-logo-placeholder coolmate-logo font-serif">COOLMATE</div>
          </div>
        </div>
      </div>

      <div className="hero-stats flex-col gap-4">
        <div className="stat-card card-yellow hover-scale">
          <h3 className="stat-number"><CountUp end={35} /> <span>năm</span></h3>
          <p>Đổi Mới, từ một nền kinh tế bao cấp đến <span className="hl-bg-yellow">khát vọng vươn ra biển lớn</span>.</p>
          <div className="stat-line"></div>
        </div>
        <div className="stat-card card-yellow top-right hover-scale">
          <h3 className="stat-number">năm <span><CountUp end={2009} /></span></h3>
          <p>Bộ Chính trị chính thức phát động cuộc vận động <span className="hl-red">"Người Việt Nam ưu tiên dùng hàng Việt Nam"</span>.</p>
          <div className="stat-line"></div>
        </div>
        <div className="stat-card card-yellow full-width flex justify-between hover-scale">
          <div className="stat-text-left">
            <h3 className="stat-title">BƯỚC NHẢY VỌT</h3>
            <p>Kinh tế tư nhân ngày càng khẳng định vai trò là một động lực quan trọng của nền kinh tế.</p>
          </div>
          <div className="stat-chart">
            <div className="bar bar-1"></div>
            <div className="bar bar-2"></div>
            <div className="bar bar-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
