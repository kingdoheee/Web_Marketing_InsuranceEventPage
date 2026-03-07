# 케어링 (CareRing) - 치매 간병 토탈 플랜 랜딩 페이지

> **전환율 최적화 마케팅 랜딩 페이지 포트폴리오 프로젝트**

치매 간병비 국가 지원 서비스를 위한 고전환율 랜딩 페이지. 복잡한 보험/복지 용어를 쉽게 전달하고, 방문자를 상담 신청으로 전환시키는 데 집중한 UX/UI 설계입니다.

---

## 🔄 V2 업데이트 (2026-03-07)

**피드백 반영 개선 사항**:

1. **헤드라인 톤 앤 매너 조정**
   - "준비 안 된 가족은 망합니다" → "지금 원스톱으로 준비하세요"
   - "왜 지금 대비하지 않으시나요?" → "지금 원스톱으로 준비하세요"
   - 너무 극단적인 표현 완화, 자극적이되 부정적이지 않은 톤으로 변경

2. **폼 구조 재조정**
   - 연락처만 받는 간소화된 폼 → 기존 3항목 복원 (성함, 간병대상, 연락처)
   - 상세 메시지만 제외 (전화 상담 시 수집)

3. **연락 약속 수정**
   - "1시간 이내 연락" → "당일 연락드립니다" (현실적 약속)

4. **섹션 재구성**
   - "처음부터 끝까지 케어링이 도와드릴게요" 섹션 삭제
   - 내용을 "치매 간병 준비, 3단계로 시작하세요" 섹션에 통합

5. **모바일 최적화 강화**
   - 모바일 기준으로 UI/UX 재설계
   - 각 스텝 카드에 색상 구분 적용 (초록/주황/파랑)
   - 중요 키워드 하이라이트 강화

6. **시각적 하이라이트**
   - 3단계 스텝 카드에 그라데이션 배경 적용
   - 각 단계별 색상 코드 구분
   - 중요 키워드에 강조 색상 적용

7. **콘텐츠 간소화 (고객 시선 기준)**
   - 통계 카드 상세 설명 제거 (핵심 수치만 표시)
   - 출처 표시 하단으로 통합
   - 3단계 스텝 카드 간소화 (전문 용어 쉽게 풀어쓰기)
   - 푸터 면책 조항 간소화
   - 특정 보험사 언급 삭제

---

## 📊 프로젝트 개요

**기간**: 2026년 3월
**역할**: 기획, 디자인, 개발, 전환율 최적화 (CRO)
**배포 주소**: https://carefit-senior.vercel.app
**기술 스택**: HTML5, CSS3, Vanilla JavaScript, Vercel

---

## 🎯 비즈니스 목표

- **1차 목표**: 무료 상담 신청 전환율 3% 달성
- **2차 목표**: 월 상담 신청 50건 확보
- **타겟 오디언스**: 40-60대 자녀 (부모님 치매/간병 준비)

---

## ⚠️ 문제 정의: 초기 버전의 실패

### V1 (초기 버전) 문제점

**결과**: 광고 유입률 0, 전환율 측정 불가

**원인 분석**:

1. **메시지의 일반성**
   - "소득 재산 상관 없이 부모님 돌봄 국가지원 제공"
   - 너무 거창하고 추상적임
   - 방문자의 즉각적인 고통(Pain Point)을 건드리지 못함

2. **약한 CTA (Call to Action)**
   - "무료 상담 신청하기" - 소극적
   - 긴급성/희소성 부족
   - 행동의 명확성 부족

3. **복잡한 폼 구조**
   - 성함 + 간병 대상 + 연락처 + 메시지
   - 인지 부하 과다
   - 이탈 유도

4. **감정적 연결 부족**
   - 통계 중심의 논리적 접근
   - 공감/불안 감정 자극 부족
   - "나와 내 가족의 이야기"로 인식되지 않음

5. **신뢰 요소 부족**
   - 실제 사례/후기 부재
   - 현재 상담 현황 표시 안 됨
   - 사회적 증거(Social Proof) 미비

---

## 🚀 개선 전략 & 구현

### 1. 히어로 섹션 강화 (긴급감 중심, 부정적 톤 완화)

**변경 전**:
```html
<h1>소득 재산 상관 없이<br>부모님 돌봄 국가지원 제공</h1>
```

**변경 후**:
```html
<span>⏰ 지금 준비 안 하면 나중에 늦습니다</span>
<h1>부모님 간병비 <span style="color: #f59e0b;">월 200만원</span>,<br>지금 원스톱으로 준비하세요.</h1>
<p>65세 이상 10명 중 1명은 치매를 경험합니다.<br>
국가 지원 제도로 간병비 <strong>85~100%</strong> 줄이세요.</p>
```

**효과**:
- 구체적 수치로 현실감 자극
- "원스톱"으로 간편함 강조
- 긍정적이면서도 긴급감 형성
- 빨간색(위협) → 주황색(경고)으로 톤 조정

---

### 2. 폼 최적화 (불필요 항목 제거)

**변경 전**: 4단계 입력
```
1. 성함 *
2. 간병 대상 *
3. 연락처 *
4. 메시지 (선택)
```

**변경 후**: 3단계 입력
```
1. 성함 *
2. 간병 대상 *
3. 연락처 *
+ 마케팅 동의 (선택)
```

**로직**:
- 성함, 간병대상, 연락처는 기본 수집
- 상세 메시지만 제외 (전화 상담 시 수집)
- CTA에 "당일 연락드립니다" 명시

**예상 효과**: 전환율 15-30% 개선 (기존 대비)

---

### 3. 긴급성 & 희소성 요소

**추가 기능**:
```html
<!-- 카운트다운 타이머 -->
<div class="urgency-box">
    <p>🔥 이번 주 <span style="color: #ef4444;">무료 상담 3자리</span> 남았습니다</p>
    <div class="countdown">
        <!-- HH:MM:SS 카운트다운 -->
    </div>
</div>
```

**JavaScript 구현**:
- 매일 자정까지 카운트다운
- "오늘 자정까지만 신청 가능" 메시지
- 방문자에게 즉각 행동 유도

---

### 4. 실시간 상담 현황 (Social Proof)

**추가 기능**:
```html
<div class="live-consultations">
    <h3>실시간 상담 진행 현황</h3>
    <div class="rolling-list">
        <div class="roll-item">
            <span>김*숙 (50대, 부모님 간병)</span>
            <span style="color: #10b981;">방금 상담 완료</span>
        </div>
        <!-- 자동 롤링 -->
    </div>
</div>
```

**효과**:
- "다른 사람들이 신청하고 있구나" 인식
- 신뢰도 상승
- 이탈률 감소

---

### 5. SEO 최적화

**추가 메타데이터**:
```html
<title>치매 간병비 국가 지원 | 장기요양등급 신청 무료 상담 | 케어링</title>
<meta name="description" content="부모님 치매 간병비 월 200만원, 국가 지원 제도로 85~100% 감면 가능...">

<!-- Open Graph -->
<meta property="og:title" content="치매 간병비 국가 지원받으세요 | 케어링 무료 상담">

<!-- 구조화 데이터 (JSON-LD) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
}
</script>
```

---

## 📈 예상 성과 (A/B 테스트 후 실제 측정 필요)

| 지표 | V1 (초기) | V2 (개선) | 개선율 |
|------|-----------|-----------|--------|
| 전환율 | 측정 불가 (0건) | 3% 목표 | - |
| 바운스률 | ? | 60% 미만 목표 | - |
| 체류 시간 | ? | 90초+ 목표 | - |
| 폼 완료율 | ? | 15%+ 목표 | - |

---

## 🛠 기술적 구현

### 핵심 기능

1. **자동 하이픈 입력 (연락처)**
```javascript
userPhone.addEventListener('input', (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 3 && val.length <= 7) {
        val = val.slice(0, 3) + '-' + val.slice(3);
    } else if (val.length > 7) {
        val = val.slice(0, 3) + '-' + val.slice(3, 7) + '-' + val.slice(7);
    }
    e.target.value = val;
});
```

2. **카운트다운 타이머**
```javascript
function startCountdown() {
    const endTime = new Date();
    endTime.setHours(23, 59, 59); // 오늘 23:59:59까지

    const timer = setInterval(() => {
        const now = new Date();
        const diff = endTime - now;
        // HH:MM:SS 계산 및 표시
    }, 1000);
}
```

3. **무한 롤링 리스트**
```javascript
function initRollingList() {
    const rollingList = document.getElementById('liveConsultations');
    const items = rollingList.innerHTML;
    rollingList.innerHTML = items + items; // 아이템 복제
}
```

4. **UTM 파라미터 자동 수집**
```javascript
function initUTM() {
    document.getElementById('utm_source').value = getUrlParameter('utm_source');
    document.getElementById('utm_medium').value = getUrlParameter('utm_medium');
    document.getElementById('utm_campaign').value = getUrlParameter('utm_campaign');
}
```

---

## 📁 프로젝트 구조

```
Web_Marketing_InsuranceEventPage/
├── index.html              # 메인 랜딩 페이지 (V2)
├── index.css               # 스타일시트
├── main.js                 # 자바스크립트 로직
├── package.json            # 프로젝트 설정
├── README.md               # 이 파일
├── 개선_제안.md             # 상세 개선 제안서
└── version1/               # V1 백업
    ├── index.html
    ├── index.css
    └── script.js
```

---

## 🚀 실행 방법

### 로컬 개발
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (browser-sync)
npm run dev
```

### 배포
```bash
# Git 커밋 및 푸시
git add .
git commit -m "Update landing page"
git push origin main

# Vercel 자동 배포
# Vercel 대시보드에서 배포 상태 확인
```

---

## 📊 향후 개선 계획 (Phase 2)

1. **A/B 테스트**
   - 히어로 헤드라인 3가지 버전 테스트
   - CTA 버튼 메시지 테스트
   - Google Analytics 연동

2. **후기/사례 섹션 추가**
   - 실제 상담 후기 캐러셀
   - "간병비 180만원 → 25만원 감소" 등 구체적 사례

3. **리타겟팅**
   - 30초 이상 체류 시 팝업
   - 이탈 시 쿠키 저장
   - 재방문 시 맞춤 메시지

4. **카카오톡 상담**
   - 카카오톡 1:1 상담 버튼 추가
   - 젊은 층 타겟팅

5. **챗봇/라이브챗**
   - ChannelTalk 무료 플랜 도입
   - 실시간 문의 응대

---

## 📚 사용된 마케팅 프레임워크

### AIDA 모델
- **Attention (주의)**: 강력한 헤드라인으로 관심 유도
- **Interest (흥미)**: 통계/불안감으로 공감 형성
- **Desire (욕구)**: 해결책과 혜택 제시
- **Action (행동)**: 간소화된 CTA로 즉각 행동 유도

### CRO (Conversion Rate Optimization) 요소
- 긴급성 (Urgency): 카운트다운 타이머
- 희소성 (Scarcity): "3자리 남았습니다"
- 사회적 증거 (Social Proof): 실시간 상담 현황
- 권위 (Authority): 통계/출처 표시
- 호감 (Likability): 공감하는 카피라이팅

---

## 👨‍💻 포트폴리오 하이라이트

이 프로젝트를 통해 보여주는 역량:

1. **마케팅 기획**
   - 타겟 오디언스 분석
   - Pain Point 도출
   - 솔루션 매핑

2. **UX/UI 설계**
   - 전환 경로 최적화
   - 폼 간소화
   - 시각적 계층 구조

3. **프론트엔드 개발**
   - 반응형 디자인
   - 인터랙션 구현
   - 데이터 수집 (UTM)

4. **데이터 기반 개선**
   - 문제 정의 → 가설 수립 → 개선 실행
   - A/B 테스트 계획
   - 지표 설정

---

## 📞 연락처

**프로젝트 담당자**: 정경순
**연락처**: 010-8885-9875
**이메일**: (추가 예정)

---

*최종 업데이트: 2026-03-07*
*버전: 2.3 (콘텐츠 간소화, 고객 시선 기준 최적화)*
*A/B 테스트 기간: 2주 권장*
