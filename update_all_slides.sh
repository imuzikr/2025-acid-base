#!/bin/bash

# 모든 슬라이드 HTML 파일에 네비게이션 바 스타일과 스크립트를 추가하는 스크립트

# 슬라이드 파일 목록
SLIDES=(
  "slide_common_properties.html"
  "slide_definition.html"
  "slide_conductivity.html"
  "slide_indicators_intro.html"
  "slide_indicators_colors.html"
  "slide_neutralization_basic.html"
  "slide_neutralization_graph.html"
  "slide_applications.html"
  "slide_summary.html"
)

# 각 슬라이드 파일 업데이트
for slide in "${SLIDES[@]}"; do
  echo "Updating $slide..."
  
  # head 태그에 네비게이션 CSS 링크 추가
  sed -i 's/<\/head>/<link rel="stylesheet" href="navigation.css">\n<\/head>/' "$slide"
  
  # body 태그에 패딩 추가 (네비게이션 바 높이만큼)
  sed -i 's/body {/body {\n        padding-bottom: 60px; \/\* 네비게이션 바 높이만큼 여백 추가 \*\//' "$slide"
  
  # body 태그 닫기 전에 네비게이션 JS 스크립트 추가
  sed -i 's/<\/body>/<script src="navigation.js"><\/script>\n<\/body>/' "$slide"
  
  echo "Updated $slide successfully!"
done

echo "All slides have been updated with navigation bar!"

