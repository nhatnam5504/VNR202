import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './PollSection.css';

const PollSection = () => {
  const [voted, setVoted] = useState(false);
  const { ref: revealRef, isVisible } = useScrollReveal();

  // Poll options
  const options = [
    "VinFast - Bứt phá công nghệ toàn cầu",
    "Biti's Hunter - Chuyển mình từ di sản",
    "Coolmate - Tiền phong kinh tế xanh",
    "Một Local Brand khác mà tôi tâm đắc!"
  ];

  return (
    <section ref={revealRef} className={`poll-section container py-20 reveal ${isVisible ? 'is-visible' : ''}`} id="tramvote">
      <div className="poll-header flex justify-between items-center mb-10">
        <h2 className="poll-title font-serif">
          <span className="text-red">TRẠM "CHECK-VAR":</span> GEN Z<br /> CHỌN GÌ?
        </h2>
        <p className="poll-subtitle">
          Bạn vừa đi qua hành trình bứt phá của 3 thương hiệu Việt. Dưới góc nhìn của một Gen Z, cái tên nào đã thực sự chạm đến niềm tin của bạn và thể hiện rõ nhất tinh thần "Đổi mới"?
        </p>
      </div>

      <div className="poll-card bg-gray flex-col items-center">
        <h3 className="poll-question text-center mb-8">
          Thương hiệu nào dưới đây khiến bạn tự hào nhất về năng lực 'Đổi mới' và tinh thần tự chủ của kinh tế Việt Nam?
        </h3>

        {!voted ? (
          <div className="poll-options">
            {options.map((option, index) => (
              <button 
                key={index}
                className="btn btn-yellow poll-btn hover-float"
                onClick={() => setVoted(true)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="poll-results text-center">
            <h3 className="text-red">Cảm ơn bạn đã tham gia bình chọn!</h3>
            <p>Sự lựa chọn của bạn góp phần khẳng định niềm tin vào hàng Việt.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PollSection;
