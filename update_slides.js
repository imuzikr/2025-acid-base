// 모든 슬라이드 HTML 파일에 네비게이션 바 스타일과 스크립트를 추가하는 함수
function updateSlideFiles() {
    const slideFiles = [
        'slide_title.html',
        'slide_common_properties.html',
        'slide_definition.html',
        'slide_conductivity.html',
        'slide_indicators_intro.html',
        'slide_indicators_colors.html',
        'slide_neutralization_basic.html',
        'slide_neutralization_graph.html',
        'slide_applications.html',
        'slide_summary.html'
    ];
    
    slideFiles.forEach(file => {
        // 각 슬라이드 파일 읽기
        fetch(file)
            .then(response => response.text())
            .then(html => {
                // head 태그에 네비게이션 CSS 링크 추가
                const updatedHtml = html.replace('</head>',
                    `<link rel="stylesheet" href="navigation.css">
</head>`);
                
                // body 태그 닫기 전에 네비게이션 JS 스크립트 추가
                const finalHtml = updatedHtml.replace('</body>',
                    `<script src="navigation.js"></script>
</body>`);
                
                // 업데이트된 HTML 저장
                saveUpdatedHtml(file, finalHtml);
            })
            .catch(error => console.error(`Error updating ${file}:`, error));
    });
}

// 업데이트된 HTML을 저장하는 함수
function saveUpdatedHtml(filename, html) {
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', updateSlideFiles);

