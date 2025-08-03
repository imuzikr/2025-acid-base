// 슬라이드 정보
const slides = [
    { id: 'slide_title', title: '표지', number: 1 },
    { id: 'slide_common_properties', title: '산과 염기의 공통적 성질', number: 2 },
    { id: 'slide_definition', title: '산과 염기의 정의', number: 3 },
    { id: 'slide_conductivity', title: '전기 전도성', number: 4 },
    { id: 'slide_indicators_intro', title: '지시약 소개', number: 5 },
    { id: 'slide_indicators_colors', title: '지시약의 색 변화', number: 6 },
    { id: 'slide_neutralization_basic', title: '중화반응 기본 개념', number: 7 },
    { id: 'slide_neutralization_graph', title: '중화반응 그래프와 중화점', number: 8 },
    { id: 'slide_applications', title: '중화반응의 응용', number: 9 },
    { id: 'slide_summary', title: '요약 및 정리', number: 10 }
];

// 현재 슬라이드 ID 가져오기
function getCurrentSlideId() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    const slideId = filename.replace('.html', '');
    return slideId;
}

// 현재 슬라이드 인덱스 가져오기
function getCurrentSlideIndex() {
    const currentId = getCurrentSlideId();
    return slides.findIndex(slide => slide.id === currentId);
}

// 네비게이션 바 생성
function createNavigationBar() {
    const currentIndex = getCurrentSlideIndex();
    
    if (currentIndex === -1) return; // 현재 슬라이드를 찾을 수 없는 경우
    
    const prevSlide = currentIndex > 0 ? slides[currentIndex - 1] : null;
    const nextSlide = currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null;
    
    const navBar = document.createElement('div');
    navBar.className = 'navigation-bar';
    
    // 홈 버튼
    const homeButton = document.createElement('a');
    homeButton.href = 'index.html';
    homeButton.className = 'nav-button home-button';
    homeButton.innerHTML = '<span class="nav-icon">🏠</span> 홈';
    navBar.appendChild(homeButton);
    
    // 이전 버튼
    const prevButton = document.createElement('a');
    if (prevSlide) {
        prevButton.href = `${prevSlide.id}.html`;
        prevButton.className = 'nav-button prev-button';
        prevButton.innerHTML = `<span class="nav-icon">◀</span> ${prevSlide.number}. ${prevSlide.title}`;
    } else {
        prevButton.className = 'nav-button prev-button disabled';
        prevButton.innerHTML = '<span class="nav-icon">◀</span> 이전';
    }
    navBar.appendChild(prevButton);
    
    // 현재 슬라이드 표시
    const currentInfo = document.createElement('div');
    currentInfo.className = 'current-slide';
    currentInfo.textContent = `${slides[currentIndex].number} / ${slides.length}`;
    navBar.appendChild(currentInfo);
    
    // 다음 버튼
    const nextButton = document.createElement('a');
    if (nextSlide) {
        nextButton.href = `${nextSlide.id}.html`;
        nextButton.className = 'nav-button next-button';
        nextButton.innerHTML = `${nextSlide.number}. ${nextSlide.title} <span class="nav-icon">▶</span>`;
    } else {
        nextButton.className = 'nav-button next-button disabled';
        nextButton.innerHTML = '다음 <span class="nav-icon">▶</span>';
    }
    navBar.appendChild(nextButton);
    
    // 슬라이드 목록 버튼
    const listButton = document.createElement('button');
    listButton.className = 'nav-button list-button';
    listButton.innerHTML = '<span class="nav-icon">☰</span> 목록';
    listButton.onclick = toggleSlideList;
    navBar.appendChild(listButton);
    
    // 슬라이드 목록 드롭다운
    const slideList = document.createElement('div');
    slideList.className = 'slide-list';
    slideList.id = 'slide-list';
    
    slides.forEach(slide => {
        const slideItem = document.createElement('a');
        slideItem.href = `${slide.id}.html`;
        slideItem.className = slide.id === slides[currentIndex].id ? 'slide-item active' : 'slide-item';
        slideItem.textContent = `${slide.number}. ${slide.title}`;
        slideList.appendChild(slideItem);
    });
    
    // 네비게이션 바와 슬라이드 목록을 body에 추가
    document.body.appendChild(navBar);
    document.body.appendChild(slideList);
    
    // 키보드 네비게이션 설정
    document.addEventListener('keydown', handleKeyNavigation);
}

// 슬라이드 목록 토글
function toggleSlideList() {
    const slideList = document.getElementById('slide-list');
    slideList.classList.toggle('show');
}

// 키보드 네비게이션 처리
function handleKeyNavigation(event) {
    const currentIndex = getCurrentSlideIndex();
    
    if (currentIndex === -1) return;
    
    switch (event.key) {
        case 'ArrowLeft':
            if (currentIndex > 0) {
                window.location.href = `${slides[currentIndex - 1].id}.html`;
            }
            break;
        case 'ArrowRight':
            if (currentIndex < slides.length - 1) {
                window.location.href = `${slides[currentIndex + 1].id}.html`;
            }
            break;
        case 'Home':
            window.location.href = 'index.html';
            break;
        case 'Escape':
            const slideList = document.getElementById('slide-list');
            if (slideList.classList.contains('show')) {
                slideList.classList.remove('show');
            }
            break;
    }
}

// 페이지 로드 시 네비게이션 바 생성
window.addEventListener('DOMContentLoaded', createNavigationBar);

