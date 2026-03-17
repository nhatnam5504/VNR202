import React from 'react';
import CountUp from '../hooks/CountUp';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMouseTilt } from '../hooks/useMouseTilt';
import './Hero.css';

const Hero = () => {
  const { ref: revealRef, isVisible } = useScrollReveal();
  const tilt1 = useMouseTilt(10);
  const tilt2 = useMouseTilt(10);
  const tilt3 = useMouseTilt(8);

  return (
    <section ref={revealRef} className={`hero container py-10 flex reveal ${isVisible ? 'is-visible' : ''}`}>
      <div className="hero-content flex-col">
        <h1 className="hero-title font-serif">
          <span className="text-red text-shimmer">V-TRUST:</span> TỰ HÀO HÀNG VIỆT
        </h1>
        <h2 className="hero-subtitle font-serif">
          Khát vọng <span className="hl-yellow">Local Brand</span> - Từ Nghị quyết đến <span className="hl-red">Thực tiễn</span>.
        </h2>
        <p className="hero-desc">
          Khi nhắc đến hàng Việt, nhiều người thường chỉ nghĩ đến một lựa chọn tiêu dùng. Nhưng phía sau mỗi đôi giày, chiếc áo hay chiếc xe mang thương hiệu Việt lại là cả một hành trình dài của đổi mới, cạnh tranh và khẳng định vị thế.<br/><br/>
          V-TRUST là một E-Magazine tương tác tái hiện hành trình phát triển của các thương hiệu nội địa dưới góc nhìn của Gen Z. Dự án không chỉ kể câu chuyện thành công của doanh nghiệp, mà còn làm rõ cách công cuộc Đổi mới từ năm 1986 đã tạo ra môi trường để doanh nghiệp Việt phát triển, nâng cao năng lực cạnh tranh và từng bước hội nhập với thế giới.
        </p>
        
        <div className="hero-actions flex items-center gap-8 mt-8">
          <button className="btn btn-yellow" onClick={() => document.getElementById('thuonghieu')?.scrollIntoView({ behavior: 'smooth' })}>
            Khám phá câu chuyện ↓
          </button>
          <a href="#thuonghieu" className="case-study-link text-yellow">Xem Case Study →</a>
        </div>

        <div className="hero-brands mt-8">
          <p className="brands-title">Leading domestic brands in Vietnam</p>
          <div className="brand-logos flex gap-6 items-center">
            <div className="brand-logo-placeholder vinfast-logo font-serif reveal-child stagger-1 animate-float" style={{ animationDelay: '0s' }}>VINFAST</div>
            <div className="brand-logo-placeholder bitis-logo font-serif reveal-child stagger-2 animate-float" style={{ animationDelay: '0.4s' }}>BITI'S HUNTER</div>
            <div className="brand-logo-placeholder coolmate-logo font-serif reveal-child stagger-3 animate-float" style={{ animationDelay: '0.8s' }}>COOLMATE</div>
          </div>
        </div>
      </div>

      <div className="hero-stats flex-col gap-4">
        <div ref={tilt1.ref} onMouseMove={tilt1.onMouseMove} onMouseLeave={tilt1.onMouseLeave}
          className="stat-card card-yellow hover-scale tilt-card animate-pulse-yellow reveal-child stagger-1"
          data-bg="35">
          <div className="stat-big-num"><CountUp end={35} /></div>
          <div className="stat-label-row">
            <span className="stat-label-unit">NĂM</span>
            <span className="stat-label-tag">ĐỔI MỚI</span>
          </div>
          <p>Từ Đại hội VI (1986) — nền kinh tế bao cấp chuyển sang <span className="hl-bg-yellow">kinh tế thị trường</span>, mở không gian sáng tạo cho doanh nghiệp Việt.</p>
          <div className="stat-line"></div>
        </div>
        <div ref={tilt2.ref} onMouseMove={tilt2.onMouseMove} onMouseLeave={tilt2.onMouseLeave}
          className="stat-card card-yellow top-right hover-scale tilt-card animate-pulse-yellow reveal-child stagger-2"
          data-bg="09">
          <div className="stat-big-num" style={{ fontSize: '3.8rem', letterSpacing: '-2px' }}>20<span className="stat-big-accent">09</span></div>
          <div className="stat-label-row">
            <span className="stat-label-unit">NĂM</span>
            <span className="stat-label-tag">CHIẾN LƯỢC</span>
          </div>
          <p>Bộ Chính trị phát động <span className="hl-red">"Người Việt Nam ưu tiên dùng hàng Việt Nam"</span> — tiếp thêm niềm tin cho Local Brand.</p>
          <div className="stat-line"></div>
        </div>
        <div ref={tilt3.ref} onMouseMove={tilt3.onMouseMove} onMouseLeave={tilt3.onMouseLeave}
          className="stat-card card-yellow full-width flex justify-between hover-scale tilt-card reveal-child stagger-3"
          data-bg="→">
          <div className="stat-text-left">
            <h3 className="stat-title">BƯỚC NHẢY VỌT</h3>
            <p>Từ chỗ chủ yếu gia công, bị lép vế trước hàng ngoại, nhiều thương hiệu Việt hôm nay đã biết xây dựng bản sắc, đổi mới mô hình kinh doanh, làm chủ truyền thông và từng bước vươn ra thị trường rộng lớn hơn.</p>
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
