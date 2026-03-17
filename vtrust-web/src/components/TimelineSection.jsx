import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './TimelineSection.css';

const TimelineSection = () => {
  const [activeTab, setActiveTab] = activeTabState();
  const { ref: revealRef, isVisible } = useScrollReveal();

  // We could implement actual tabs data, but for now we'll just hardcode 
  // the design view to match the Figma.

  return (
    <section ref={revealRef} className={`timeline-section reveal ${isVisible ? 'is-visible' : ''}`} id="thuonghieu">
      <div className="container py-20">
        <h2 className="timeline-title text-center font-serif mb-12">
          <span className="text-red">TỰ HÀO LOCAL BRAND:</span> NHỮNG BƯỚC CHÂN TỰ CHỦ
        </h2>

        <div className="tabs flex justify-center gap-4 mb-16">
          <button className={`tab-btn ${activeTab === 'chung' ? 'active' : ''}`} onClick={() => setActiveTab('chung')}>MỤC TIÊU CHUNG</button>
          <button className={`tab-btn ${activeTab === 'vinfast' ? 'active' : ''}`} onClick={() => setActiveTab('vinfast')}>VINFAST</button>
          <button className={`tab-btn ${activeTab === 'bitis' ? 'active' : ''}`} onClick={() => setActiveTab('bitis')}>BITI'S HUNTER</button>
          <button className={`tab-btn ${activeTab === 'coolmate' ? 'active' : ''}`} onClick={() => setActiveTab('coolmate')}>COOLMATE</button>
        </div>

        <div className="timeline-cards flex gap-6">
          <div className="timeline-card card-yellow flex-col hover-scale">
            <div className="timeline-year">
              <span className="line"></span> Năm 2017
            </div>
            <div className="timeline-content">
              <h3>KHÁT VỌNG Ô TÔ VIỆT</h3>
              <p>Khởi công tổ hợp nhà máy hiện đại, biến đầm lầy thành cứ điểm <span className="hl-red">sản xuất ô tô đầu tiên</span> của Việt Nam.</p>
            </div>
          </div>

          <div className="timeline-card card-yellow flex-col hover-scale">
            <div className="timeline-year">
              <span className="line"></span> Năm 2021
            </div>
            <div className="timeline-content">
              <h3>BƯỚC NGOẶT XE ĐIỆN</h3>
              <p>Dừng sản xuất xe xăng, chuyển đổi 100% sang xe điện. Tiên phong nắm bắt xu hướng <span className="hl-red">"kinh tế xanh"</span> toàn cầu.</p>
            </div>
          </div>

          <div className="timeline-card card-yellow flex-col hover-scale">
            <div className="timeline-year">
              <span className="line"></span> Năm 2023
            </div>
            <div className="timeline-content">
              <h3>ĐƯỢC CÔNG NHẬN...</h3>
              <p>Chính thức niêm yết trên sàn Nasdaq (Mỹ), mở đường thâm nhập Mỹ xây dựng nền tảng và <span className="hl-red">hội nhập quốc tế</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// a small custom hook just to satisfy useState in the simplest way
function activeTabState() {
    return useState('vinfast');
}

export default TimelineSection;
