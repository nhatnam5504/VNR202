import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './PollSection.css';

const PollSection = () => {
  const [voted, setVoted] = useState(false);
  const { ref: revealRef, isVisible } = useScrollReveal();

  // Poll options
  const options = [
    "VinFast — Bứt phá công nghệ toàn cầu",
    "Biti’s Hunter — Chuyển mình từ di sản",
    "Coolmate — Thích ứng kinh tế số",
    "Một Local Brand khác mê hơn và cá tính hơn"
  ];

  return (
    <section ref={revealRef} className={`poll-section container py-20 flex flex-col items-center reveal ${isVisible ? 'is-visible' : ''}`} id="binhchon">
      <div className="poll-header flex justify-between items-center mb-10">
        <h2 className="poll-title font-serif">
          <span className="text-red">TRẠM "CHECK-VAR":</span><br /> GEN Z CHỌN GÌ?
        </h2>
        <div className="poll-subtitle flex-col gap-4">
          <p>
            Ba thương hiệu tiêu biểu đại diện cho 3 hướng rẽ đổi mới: tái định vị di sản, làm chủ công nghệ lõi và tối ưu tốc độ kinh tế số.
          </p>
          <p className="font-bold text-red">
            Dưới góc nhìn Gen Z, thương hiệu nào thể hiện rõ nhất tinh thần "Đổi mới" và khát vọng tự chủ của Việt Nam?
          </p>
        </div>
      </div>

      <div className="poll-card bg-gray flex flex-col items-center">
        <h3 className="poll-question text-center mb-8">
          Theo bạn, thương hiệu nào dưới đây khiến bạn tự hào nhất về năng lực “Đổi mới” và tinh thần tự chủ của doanh nghiệp Việt?
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
            <h3 className="text-red font-serif mb-4" style={{ fontSize: '2rem' }}>TỰ HÀO HÀNG VIỆT — KHÔNG CHỈ LÀ KHẨU HIỆU</h3>
            <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
              <p className="mb-4">Trong bối cảnh hội nhập, chọn hàng Việt không phải là chối bỏ thế giới, mà là đặt niềm tin vào năng lực nội tại và ủng hộ sự đổi mới, góp phần duy trì nền kinh tế tự chủ.</p>
              <p className="mb-6">Sự vươn lên của các Local Brand khẳng định: doanh nghiệp Việt hoàn toàn có thể cạnh tranh sòng phẳng nếu có bản sắc và chất lượng thật. Ủng hộ hàng Việt giờ đây là một lựa chọn tiêu dùng có hiểu biết, tiêu chuẩn và trách nhiệm.</p>
              <p className="text-red font-bold" style={{ fontSize: '1.2rem' }}>Mỗi lựa chọn của bạn hôm nay cũng là một “lá phiếu” cho tương lai của hàng Việt.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PollSection;
