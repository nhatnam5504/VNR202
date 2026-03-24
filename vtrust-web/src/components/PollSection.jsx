import React, { useEffect, useMemo, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './PollSection.css';

const POLL_OPTIONS = [
  { id: 'vinfast', label: 'VinFast — Bứt phá công nghệ toàn cầu', shortLabel: 'VinFast' },
  { id: 'bitis', label: 'Biti’s Hunter — Chuyển mình từ di sản', shortLabel: 'Biti’s Hunter' },
  { id: 'coolmate', label: 'Coolmate — Thích ứng kinh tế số', shortLabel: 'Coolmate' },
  { id: 'other', label: 'Một Local Brand khác mê hơn và cá tính hơn', shortLabel: 'Local Brand khác' }
];

const SLOT_MS = 2 * 60 * 1000;

const getCurrentSlot = () => Math.floor(Date.now() / SLOT_MS);

const createSeededRng = (seed) => {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

const computeSynchronizedResults = (slot) => {
  const rng = createSeededRng(20260320 + slot * 7919);
  const growthStep = slot % 21;
  const totalVotes = 5 + growthStep;

  const weights = {
    vinfast: 0.44 + rng() * 0.06,
    bitis: 0.28 + rng() * 0.05,
    coolmate: 0.18 + rng() * 0.05,
    other: 0.1 + rng() * 0.03
  };

  const minimumEach = 1;
  const baseTotal = minimumEach * POLL_OPTIONS.length;
  const remainder = Math.max(0, totalVotes - baseTotal);

  const normalized = {
    vinfast: weights.vinfast,
    bitis: weights.bitis,
    coolmate: weights.coolmate,
    other: weights.other
  };

  const weightSum = Object.values(normalized).reduce((sum, value) => sum + value, 0);
  Object.keys(normalized).forEach((key) => {
    normalized[key] /= weightSum;
  });

  let vinfast = minimumEach + Math.floor(remainder * normalized.vinfast);
  let bitis = minimumEach + Math.floor(remainder * normalized.bitis);
  let coolmate = minimumEach + Math.floor(remainder * normalized.coolmate);
  let other = minimumEach + Math.floor(remainder * normalized.other);

  let allocated = vinfast + bitis + coolmate + other;
  while (allocated < totalVotes) {
    if (vinfast <= bitis) {
      vinfast += 1;
    } else if (bitis <= coolmate) {
      bitis += 1;
    } else {
      vinfast += 1;
    }
    allocated += 1;
  }

  while (allocated > totalVotes) {
    if (other > 1) {
      other -= 1;
    } else if (coolmate > 1) {
      coolmate -= 1;
    } else if (bitis > 1) {
      bitis -= 1;
    } else if (vinfast > 1) {
      vinfast -= 1;
    }
    allocated -= 1;
  }

  vinfast = Math.max(vinfast, bitis + 1);
  bitis = Math.max(bitis, coolmate + 1);

  other = totalVotes - vinfast - bitis - coolmate;
  if (other < 1) {
    const need = 1 - other;
    const takeFromCoolmate = Math.min(need, Math.max(0, coolmate - 1));
    coolmate -= takeFromCoolmate;
    const remainingNeed = need - takeFromCoolmate;
    if (remainingNeed > 0) {
      bitis -= Math.min(remainingNeed, Math.max(0, bitis - coolmate - 1));
    }
    other = totalVotes - vinfast - bitis - coolmate;
  }

  const countMap = {
    vinfast,
    bitis,
    coolmate,
    other
  };

  return POLL_OPTIONS.map((option) => ({
    ...option,
    votes: countMap[option.id],
    percent: Math.round((countMap[option.id] / totalVotes) * 100)
  }));
};

const PollSection = () => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [slot, setSlot] = useState(getCurrentSlot());
  const { ref: revealRef, isVisible } = useScrollReveal();

  const results = useMemo(() => computeSynchronizedResults(slot), [slot]);
  const totalVotes = useMemo(() => results.reduce((sum, item) => sum + item.votes, 0), [results]);

  useEffect(() => {
    let intervalId;

    const syncSlot = () => {
      setSlot(getCurrentSlot());
    };

    const delayToNextSlot = SLOT_MS - (Date.now() % SLOT_MS) + 30;
    const timeoutId = window.setTimeout(() => {
      syncSlot();
      intervalId = window.setInterval(syncSlot, SLOT_MS);
    }, delayToNextSlot);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <section ref={revealRef} className={`poll-section container py-20 flex flex-col items-center reveal ${isVisible ? 'is-visible' : ''}`} id="binhchon">
      <div className="poll-header flex justify-between items-center mb-10">
        <h2 className="poll-title font-serif" id="quiz-focus-checkvar-title">
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

        <div className="poll-options">
          {POLL_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`btn btn-yellow poll-btn hover-float ${selectedVote === option.id ? 'selected' : ''}`}
              onClick={() => setSelectedVote(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {selectedVote ? (
          <div className="poll-vote-note text-center">
            Bạn đã chọn: <strong>{POLL_OPTIONS.find((option) => option.id === selectedVote)?.shortLabel}</strong>
          </div>
        ) : null}

        <div className="poll-actions">
          <button className="btn poll-toggle-btn" onClick={() => setShowResults((prev) => !prev)}>
            {showResults ? 'Ẩn kết quả bình chọn' : 'Xem kết quả bình chọn'}
          </button>

          {selectedVote ? (
            <button className="btn poll-reset-btn" onClick={() => setSelectedVote(null)}>
              Suy nghĩ lại
            </button>
          ) : null}
        </div>

        {showResults ? (
          <div className="poll-results-panel">
            <h4 className="poll-results-title">Kết quả yêu thích hiện tại</h4>
            <p className="poll-results-meta">
              Tổng lượt vote mô phỏng: <strong>{totalVotes}</strong> | 
            </p>

            <div className="poll-results-list">
              {results.map((item) => (
                <div key={item.id} className={`poll-result-item ${selectedVote === item.id ? 'is-user-choice' : ''}`}>
                  <div className="poll-result-head">
                    <span>{item.shortLabel}</span>
                    <span>{item.votes} vote ({item.percent}%)</span>
                  </div>
                  <div className="poll-result-track">
                    <div className="poll-result-fill" style={{ width: `${item.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PollSection;
