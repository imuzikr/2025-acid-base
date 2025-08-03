// 인터랙티브 중화반응 차트 생성 함수
function createInteractiveNeutralizationChart(canvasId, dataType = 'ph') {
  const ctx = document.getElementById(canvasId).getContext('2d');
  
  // 데이터 선택
  const chartData = dataType === 'ph' ? neutralizationData.phData : temperatureData.data;
  const yAxisLabel = dataType === 'ph' ? 'pH' : '온도 (°C)';
  const yAxisKey = dataType === 'ph' ? 'pH' : 'temperature';
  
  // 주요 포인트 데이터
  const keyPoints = neutralizationData.keyPoints;
  
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: yAxisLabel,
          data: chartData.map(point => ({
            x: point.volume,
            y: point[yAxisKey]
          })),
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 8
        },
        {
          label: '주요 포인트',
          data: keyPoints.map(point => ({
            x: point.volume,
            y: dataType === 'ph' ? point.pH : point.temperature
          })),
          backgroundColor: keyPoints.map(point => point.color),
          borderColor: '#2c3e50',
          borderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 12,
          showLine: false,
          pointStyle: 'circle'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: dataType === 'ph' ? 'HCl 50mL + NaOH 50mL 중화적정 곡선' : 'HCl 50mL + NaOH 50mL 중화반응 온도 변화',
          font: {
            size: 18,
            family: 'Noto Sans CJK KR'
          }
        },
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          enabled: false // 커스텀 팝업을 사용하므로 기본 툴팁 비활성화
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'NaOH 부피 (mL)',
            font: {
              size: 14,
              family: 'Noto Sans CJK KR'
            }
          },
          min: 0,
          max: 100
        },
        y: {
          title: {
            display: true,
            text: yAxisLabel,
            font: {
              size: 14,
              family: 'Noto Sans CJK KR'
            }
          },
          min: dataType === 'ph' ? 0 : 24,
          max: dataType === 'ph' ? 14 : 31
        }
      },
      interaction: {
        intersect: false,
        mode: 'point'
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const element = elements[0];
          if (element.datasetIndex === 1) { // 주요 포인트 클릭
            const pointIndex = element.index;
            const keyPoint = keyPoints[pointIndex];
            showPopup(keyPoint, dataType);
          }
        }
      },
      onHover: (event, elements) => {
        event.native.target.style.cursor = elements.length > 0 && elements[0].datasetIndex === 1 ? 'pointer' : 'default';
      }
    }
  });
  
  return chart;
}

// 팝업 창 표시 함수
function showPopup(keyPoint, dataType) {
  // 기존 팝업 제거
  const existingPopup = document.getElementById('neutralization-popup');
  if (existingPopup) {
    existingPopup.remove();
  }
  
  // 팝업 생성
  const popup = document.createElement('div');
  popup.id = 'neutralization-popup';
  popup.className = 'neutralization-popup';
  
  // 지시약 색상 정보 생성
  const indicatorInfo = neutralizationData.indicators.map(indicator => {
    const isInTransition = keyPoint.pH >= indicator.transitionRange[0] && keyPoint.pH <= indicator.transitionRange[1];
    const color = keyPoint.pH < indicator.transitionRange[0] ? indicator.acidColor : 
                  keyPoint.pH > indicator.transitionRange[1] ? indicator.baseColor : '변화 중';
    
    return `
      <div class="indicator-item">
        <span class="indicator-name">${indicator.name}:</span>
        <span class="indicator-color" style="color: ${getColorCode(color)}">${color}</span>
      </div>
    `;
  }).join('');
  
  popup.innerHTML = `
    <div class="popup-content">
      <div class="popup-header">
        <h3>${keyPoint.description}</h3>
        <button class="popup-close" onclick="closePopup()">&times;</button>
      </div>
      <div class="popup-body">
        <div class="info-grid">
          <div class="info-item">
            <strong>NaOH 부피:</strong> ${keyPoint.volume} mL
          </div>
          <div class="info-item">
            <strong>pH:</strong> ${keyPoint.pH}
          </div>
          <div class="info-item">
            <strong>온도:</strong> ${keyPoint.temperature} °C
          </div>
          <div class="info-item">
            <strong>액성:</strong> ${keyPoint.acidity}
          </div>
          <div class="info-item">
            <strong>용액 상태:</strong> ${keyPoint.solution}
          </div>
          <div class="info-item">
            <strong>주요 이온:</strong> ${keyPoint.dominantIons.join(', ')}
          </div>
        </div>
        <div class="indicator-section">
          <h4>지시약 색 변화</h4>
          <div class="indicator-list">
            ${indicatorInfo}
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // 팝업 표시 애니메이션
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
}

// 팝업 닫기 함수
function closePopup() {
  const popup = document.getElementById('neutralization-popup');
  if (popup) {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.remove();
    }, 300);
  }
}

// 색상 코드 변환 함수
function getColorCode(colorName) {
  const colorMap = {
    '빨간색': '#ff4444',
    '노란색': '#ffdd44',
    '파란색': '#4488ff',
    '분홍색': '#ff88cc',
    '무색': '#888888',
    '변화 중': '#aa88ff'
  };
  return colorMap[colorName] || '#333333';
}

// ESC 키로 팝업 닫기
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopup();
  }
});

// 팝업 외부 클릭으로 닫기
document.addEventListener('click', (event) => {
  const popup = document.getElementById('neutralization-popup');
  if (popup && !popup.querySelector('.popup-content').contains(event.target)) {
    closePopup();
  }
});

