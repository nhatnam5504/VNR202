import React, { useEffect, useMemo, useRef, useState } from 'react';
import './ScrollQuizGate.css';

const quizSteps = [
  {
    triggerId: 'thuonghieu',
    readId: 'hero-top',
    focusTargetId: 'quiz-focus-hero-2009-strategy',
    readLabel: 'Mở đầu V-TRUST',
    question: 'Để mở khóa hành trình khám phá Gen Z, hãy cho biết một sự kiện quan trọng nào vào Năm 2009 đã tạo thêm niềm tin chiến lược cho các Local Brand Việt?',
    options: [
      { label: 'A. Đại hội đại biểu toàn quốc lần thứ VI được tổ chức.', correct: false },
      { label: 'B. Bộ Chính trị phát động cuộc vận động "Người Việt Nam ưu tiên dùng hàng Việt Nam".', correct: true },
      { label: 'C. Việt Nam chính thức gia nhập Tổ chức Thương mại Thế giới (WTO).', correct: false },
      { label: 'D. VinFast xuất khẩu chiếc ô tô điện đầu tiên sang thị trường Mỹ.', correct: false }
    ],
    hint: 'Gợi ý: xem lại thẻ vàng “NĂM 2009 | CHIẾN LƯỢC” ở Hero Banner.'
  },
  {
    triggerId: 'boicanh',
    readId: 'genz',
    focusTargetId: 'quiz-focus-genz-quality-title',
    readLabel: 'Gen Z đang tiêu dùng thế nào?',
    question: 'Theo phân tích của V-TRUST, Gen Z không hề từ chối hàng Việt. Vậy prerequisites (điều kiện tiên quyết) nào mà một Local Brand cần đáp ứng để thuyết phục họ "chốt đơn" giữa cơn bão hàng ngoại giá rẻ?',
    options: [
      { label: 'A. Giá cả phải là rẻ nhất trên thị trường.', correct: false },
      { label: 'B. Chạy quảng cáo liên tục với các KOL/KOC nổi tiếng.', correct: false },
      { label: 'C. Tập trung vào "Chất lượng thật", thẩm mỹ cao và câu chuyện thương hiệu chân thật.', correct: true },
      { label: 'D. Chỉ bán các sản phẩm mang phong cách hoài cổ.', correct: false }
    ],
    hint: 'Gợi ý: đọc lại phần “Gen Z không từ chối hàng Việt — họ chỉ cần chất lượng thật.”'
  },
  {
    triggerId: 'gocnhin',
    readId: 'thuonghieu',
    activateTab: 'chung',
    focusTargetId: 'quiz-focus-common-goals-block',
    readLabel: 'Mục tiêu chung',
    question: 'V-TRUST xác định 3 trụ cột lớn để doanh nghiệp Việt vươn lên trong nền kinh tế thị trường. "Học hỏi chuẩn mực quốc tế nhưng vẫn giữ được bản sắc Việt" thuộc trụ cột nào dưới đây?',
    options: [
      { label: 'A. Trụ cột 1: Tự chủ cạnh tranh.', correct: false },
      { label: 'B. Trụ cột 2: Đổi mới để tồn tại.', correct: false },
      { label: 'C. Trụ cột 3: Hội nhập không hòa tan.', correct: true },
      { label: 'D. Trụ cột 4: Phát triển bền vững.', correct: false }
    ],
    hint: 'Gợi ý: xem lại phần “MỤC TIÊU CHUNG” và 3 trụ cột trong section Tự hào Local Brand.'
  },
  {
    triggerId: 'binhchon',
    readId: 'binhchon',
    focusTargetId: 'quiz-focus-checkvar-title',
    readLabel: 'TRẠM "CHECK-VAR": GEN Z CHỌN GÌ?',
    question: 'Bạn đã hoàn thành hành trình! Câu hỏi cuối cùng: Sự thành công của các Local Brand hiện đại (VinFast, Coolmate...) được V-TRUST đúc kết là "mùa quả ngọt" đến từ sự gặp gỡ của hai yếu tố nào?',
    options: [
      { label: 'A. Vốn đầu tư nước ngoài dồi dào và thị trường tiêu thụ rộng lớn.', correct: false },
      { label: 'B. Công nghệ tiên tiến và nguồn nhân lực giá rẻ.', correct: false },
      { label: 'C. Đường lối kiến tạo đúng đắn của Đảng & Bản lĩnh kiên cường của doanh nghiệp Việt.', correct: true },
      { label: 'D. Lòng yêu nước của người tiêu dùng và áp lực cạnh tranh toàn cầu.', correct: false }
    ],
    hint: 'Gợi ý: đọc lại phần “TRẠM "CHECK-VAR": GEN Z CHỌN GÌ?” và liên hệ tổng kết về đường lối Đảng cùng nội lực doanh nghiệp Việt.'
  }
];

const ScrollQuizGate = () => {
  const [answered, setAnswered] = useState(() => Array(quizSteps.length).fill(false));
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const [notification, setNotification] = useState('');
  const [isTransitioningWrong, setIsTransitioningWrong] = useState(false);
  const reopenLockRef = useRef({ index: null, until: 0 });
  const notificationTimerRef = useRef(null);

  const activeStep = useMemo(() => {
    if (activeStepIndex === null) return null;
    return quizSteps[activeStepIndex];
  }, [activeStepIndex]);

  useEffect(() => {
    if (activeStepIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }

    return undefined;
  }, [activeStepIndex]);

  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        window.clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const allDone = answered.every(Boolean);
    if (allDone) return undefined;

    const checkGate = () => {
      if (activeStepIndex !== null) return;

      const triggerLine = window.scrollY + window.innerHeight * 0.45;

      for (let i = 0; i < quizSteps.length; i += 1) {
        if (answered[i]) continue;

        const lock = reopenLockRef.current;
        if (lock.index === i && Date.now() < lock.until) {
          break;
        }

        if (lock.index === i && Date.now() >= lock.until) {
          reopenLockRef.current = { index: null, until: 0 };
        }

        const step = quizSteps[i];
        const triggerEl = document.getElementById(step.triggerId);
        if (!triggerEl) continue;

        if (triggerLine >= triggerEl.offsetTop) {
          setActiveStepIndex(i);
          break;
        }

        break;
      }
    };

    checkGate();
    window.addEventListener('scroll', checkGate);
    window.addEventListener('resize', checkGate);

    return () => {
      window.removeEventListener('scroll', checkGate);
      window.removeEventListener('resize', checkGate);
    };
  }, [answered, activeStepIndex]);

  const showNotification = (message) => {
    if (!message) return;

    setNotification(message);

    if (notificationTimerRef.current) {
      window.clearTimeout(notificationTimerRef.current);
    }

    notificationTimerRef.current = window.setTimeout(() => {
      setNotification('');
    }, 2600);
  };

  const animateFocusTarget = (targetId) => {
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    targetEl.classList.remove('quiz-gate-focus');
    void targetEl.offsetWidth;
    targetEl.classList.add('quiz-gate-focus');

    window.setTimeout(() => {
      targetEl.classList.remove('quiz-gate-focus');
    }, 2200);
  };

  const handleWrongAnswer = (step, stepIndex) => {
    if (!step || stepIndex === null) return;

    reopenLockRef.current = { index: stepIndex, until: Date.now() + 3200 };
    setActiveStepIndex(null);

    if (step.activateTab) {
      window.dispatchEvent(new CustomEvent('quiz-open-tab', { detail: { tabKey: step.activateTab } }));
    }

    if (typeof step.openAccordionIndex === 'number') {
      window.dispatchEvent(
        new CustomEvent('quiz-open-accordion', { detail: { index: step.openAccordionIndex } })
      );
    }

    const readEl = document.getElementById(step.readId);
    if (readEl) {
      const top = Math.max(0, readEl.offsetTop - 96);
      window.scrollTo({ top, behavior: 'smooth' });
    }

    window.setTimeout(() => {
      animateFocusTarget(step.focusTargetId);
    }, 650);
  };

  const handleOptionClick = (isCorrect) => {
    if (isTransitioningWrong) return;

    if (isCorrect) {
      setAnswered((prev) => {
        const next = [...prev];
        if (activeStepIndex !== null) {
          next[activeStepIndex] = true;
        }
        return next;
      });
      setActiveStepIndex(null);
      return;
    }

    const currentStep = activeStep;
    const currentIndex = activeStepIndex;

    showNotification(`Bạn trả lời sai. ${currentStep?.hint || ''}`.trim());
    setIsTransitioningWrong(true);

    window.setTimeout(() => {
      handleWrongAnswer(currentStep, currentIndex);
      setIsTransitioningWrong(false);
    }, 720);
  };

  if (!activeStep && !notification) return null;

  return (
    <>
      {notification ? (
        <div className="quiz-gate-toast" role="status" aria-live="polite">
          {notification}
        </div>
      ) : null}

      {activeStep ? (
        <div className="quiz-gate-overlay" role="dialog" aria-modal="true" aria-labelledby="quiz-gate-title">
          <div className="quiz-gate-card">
            <div className="quiz-gate-chip">Checkpoint bắt buộc {activeStepIndex + 1}/4</div>
            <h3 id="quiz-gate-title" className="quiz-gate-title">Trả lời đúng để tiếp tục cuộn</h3>
            <p className="quiz-gate-question">{activeStep.question}</p>

            <div className="quiz-gate-options">
              {activeStep.options.map((option, idx) => (
                <button
                  key={`${activeStepIndex}-${idx}`}
                  type="button"
                  className="quiz-gate-option"
                  disabled={isTransitioningWrong}
                  onClick={() => handleOptionClick(option.correct)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <p className="quiz-gate-hint">
              Nếu chưa chắc, đọc lại: <strong>{activeStep.readLabel}</strong>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ScrollQuizGate;
