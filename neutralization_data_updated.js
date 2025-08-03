// 중화반응 데이터 (HCl + NaOH 중화적정)
// 0.1M HCl 50mL에 0.1M NaOH 50mL를 적정하는 경우

const neutralizationData = {
  // pH 변화 데이터 (NaOH 부피에 따른 pH 변화)
  phData: [
    { volume: 0, pH: 1.0, temperature: 25.0 },
    { volume: 5, pH: 1.18, temperature: 25.5 },
    { volume: 10, pH: 1.37, temperature: 26.0 },
    { volume: 15, pH: 1.60, temperature: 26.5 },
    { volume: 20, pH: 1.95, temperature: 27.0 },
    { volume: 25, pH: 2.20, temperature: 27.5 },
    { volume: 30, pH: 2.69, temperature: 28.0 },
    { volume: 35, pH: 3.00, temperature: 28.5 },
    { volume: 40, pH: 3.50, temperature: 29.0 },
    { volume: 45, pH: 4.50, temperature: 29.5 },
    { volume: 49, pH: 5.50, temperature: 29.8 },
    { volume: 49.5, pH: 6.00, temperature: 29.9 },
    { volume: 50.0, pH: 7.00, temperature: 30.0 }, // 중화점
    { volume: 50.5, pH: 8.00, temperature: 29.9 },
    { volume: 51, pH: 9.50, temperature: 29.8 },
    { volume: 55, pH: 11.00, temperature: 29.5 },
    { volume: 60, pH: 11.96, temperature: 29.0 },
    { volume: 65, pH: 12.22, temperature: 28.5 },
    { volume: 70, pH: 12.36, temperature: 28.0 },
    { volume: 75, pH: 12.50, temperature: 27.5 },
    { volume: 80, pH: 12.60, temperature: 27.0 },
    { volume: 85, pH: 12.70, temperature: 26.5 },
    { volume: 90, pH: 12.80, temperature: 26.0 },
    { volume: 95, pH: 12.90, temperature: 25.5 },
    { volume: 100, pH: 13.00, temperature: 25.0 }
  ],

  // 주요 포인트 정보
  keyPoints: [
    {
      volume: 0,
      pH: 1.0,
      temperature: 25.0,
      description: "적정 시작점",
      solution: "0.1M HCl 50mL",
      dominantIons: ["H⁺", "Cl⁻"],
      acidity: "강산성",
      color: "#ff4444"
    },
    {
      volume: 25,
      pH: 2.20,
      temperature: 27.5,
      description: "적정 중간점 (50% 중화)",
      solution: "HCl + NaOH (1:1)",
      dominantIons: ["H⁺", "Cl⁻", "Na⁺"],
      acidity: "산성",
      color: "#ff8844"
    },
    {
      volume: 49,
      pH: 5.50,
      temperature: 29.8,
      description: "중화점 직전",
      solution: "거의 중성에 가까운 상태",
      dominantIons: ["H⁺", "Cl⁻", "Na⁺"],
      acidity: "약산성",
      color: "#ffaa44"
    },
    {
      volume: 50.0,
      pH: 7.0,
      temperature: 30.0,
      description: "중화점 (당량점)",
      solution: "NaCl + H₂O",
      dominantIons: ["Na⁺", "Cl⁻"],
      acidity: "중성",
      color: "#44ff44"
    },
    {
      volume: 51,
      pH: 9.50,
      temperature: 29.8,
      description: "중화점 직후",
      solution: "과량의 NaOH",
      dominantIons: ["Na⁺", "Cl⁻", "OH⁻"],
      acidity: "약염기성",
      color: "#4488ff"
    },
    {
      volume: 75,
      pH: 12.50,
      temperature: 27.5,
      description: "과량 염기 상태",
      solution: "NaCl + 과량 NaOH",
      dominantIons: ["Na⁺", "Cl⁻", "OH⁻"],
      acidity: "강염기성",
      color: "#4444ff"
    }
  ],

  // 지시약 정보
  indicators: [
    {
      name: "메틸오렌지",
      transitionRange: [3.1, 4.4],
      acidColor: "빨간색",
      baseColor: "노란색",
      changePoint: 50.0
    },
    {
      name: "브로모티몰블루",
      transitionRange: [6.0, 7.6],
      acidColor: "노란색",
      baseColor: "파란색",
      changePoint: 50.0
    },
    {
      name: "페놀프탈레인",
      transitionRange: [8.2, 10.0],
      acidColor: "무색",
      baseColor: "분홍색",
      changePoint: 50.0
    }
  ]
};

// 온도 변화 데이터
const temperatureData = {
  data: [
    { volume: 0, temperature: 25.0 },
    { volume: 5, temperature: 25.5 },
    { volume: 10, temperature: 26.0 },
    { volume: 15, temperature: 26.5 },
    { volume: 20, temperature: 27.0 },
    { volume: 25, temperature: 27.5 },
    { volume: 30, temperature: 28.0 },
    { volume: 35, temperature: 28.5 },
    { volume: 40, temperature: 29.0 },
    { volume: 45, temperature: 29.5 },
    { volume: 49, temperature: 29.8 },
    { volume: 49.5, temperature: 29.9 },
    { volume: 50.0, temperature: 30.0 }, // 최고 온도 (중화점)
    { volume: 50.5, temperature: 29.9 },
    { volume: 51, temperature: 29.8 },
    { volume: 55, temperature: 29.5 },
    { volume: 60, temperature: 29.0 },
    { volume: 65, temperature: 28.5 },
    { volume: 70, temperature: 28.0 },
    { volume: 75, temperature: 27.5 },
    { volume: 80, temperature: 27.0 },
    { volume: 85, temperature: 26.5 },
    { volume: 90, temperature: 26.0 },
    { volume: 95, temperature: 25.5 },
    { volume: 100, temperature: 25.0 }
  ]
};

