console.log("FORM_VERSION: 2.1 (CareTarget & Marketing Aligned)");

// [1] Reveal Animation 로직
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// [2] UTM 및 유입 경로 자동 수집
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function initUTM() {
    document.getElementById('utm_source').value = getUrlParameter('utm_source');
    document.getElementById('utm_medium').value = getUrlParameter('utm_medium');
    document.getElementById('utm_campaign').value = getUrlParameter('utm_campaign');
    document.getElementById('entry_url').value = window.location.href;
}

// [3] 입력 유효성 검사 및 실시간 하이픈
const userName = document.getElementById('userName');
const careTarget = document.getElementById('careTarget');
const userPhone = document.getElementById('userPhone');

// 이름: 한글 여부 실시간 체크 (영어 입력은 허용하되 경고 표시)
userName.addEventListener('input', (e) => {
    const isKorean = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/.test(e.target.value);
    if (isKorean && e.target.value.length > 0) {
        userName.classList.remove('invalid');
    } else if (!isKorean) {
        userName.classList.add('invalid');
    }
});

// 간병 대상: 필수 입력
careTarget.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        careTarget.classList.remove('invalid');
    }
});

// 연락처: 자동 하이픈
userPhone.addEventListener('input', (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 3 && val.length <= 7) {
        val = val.slice(0, 3) + '-' + val.slice(3);
    } else if (val.length > 7) {
        val = val.slice(0, 3) + '-' + val.slice(3, 7) + '-' + val.slice(7);
    }
    e.target.value = val;
    if (val.length === 13) {
        userPhone.classList.remove('invalid');
    }
});

// [4] 폼 제출 로직 (Google Apps Script 연동)
const consultForm = document.getElementById('consultForm');
const GAS_URL = "https://script.google.com/macros/s/AKfycbw6_V__qxRuUYVpcRaqUJRmxfjj3MmnQXQSxq0pQhm6UfWOMy_ljdt0US7MCOlcB-Po/exec"; // 새 URL 업데이트

consultForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // 최종 유효성 체크
    if (!/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(userName.value)) {
        userName.classList.add('invalid');
        isValid = false;
    }
    if (careTarget.value.trim().length === 0) {
        careTarget.classList.add('invalid');
        isValid = false;
    }
    if (userPhone.value.length !== 13) {
        userPhone.classList.add('invalid');
        isValid = false;
    }

    if (!isValid) return;

    // 제출 버튼 상태 변경
    const submitBtn = consultForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerText = "처리 중...";

    const formData = new FormData(consultForm);
    const rawData = Object.fromEntries(formData.entries());

    // 데이터 수집 (시트 열 순서에 맞춰 명시적으로 구성)
    const data = {
        timestamp: new Date().toLocaleString('ko-KR'),
        name: document.getElementById('userName').value,
        careTarget: document.getElementById('careTarget').value,
        phone: document.getElementById('userPhone').value,
        marketing_agree: document.getElementById('marketing_agree').checked ? '동의' : '미동의',
        utm_source: document.getElementById('utm_source').value || 'direct',
        utm_medium: document.getElementById('utm_medium').value || '',
        utm_campaign: document.getElementById('utm_campaign').value || '',
        entry_url: window.location.href
    };

    console.log("Sending aligned data to GAS:", data);

    fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(() => {
            console.log("Submission success");
            openModal();
            consultForm.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
});

// [5] 모달 핸들링
function openModal() {
    document.getElementById('successModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// [6] Sticky CTA Visibility Logic
const mainCta = document.getElementById('mainCta');
const stickyCta = document.querySelector('.mobile-sticky-cta');

if (mainCta && stickyCta) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyCta.classList.remove('visible');
            } else {
                // 상단 버튼이 화면 위로 사라졌을 때만 하단 버튼 표시
                if (entry.boundingClientRect.top < 0) {
                    stickyCta.classList.add('visible');
                }
            }
        });
    }, { threshold: 0 });

    observer.observe(mainCta);
}

// 초기화 호출
window.onload = function () {
    reveal();
    initUTM();
    startCountdown();
    initRollingList();
};

// [7] 카운트다운 타이머
function startCountdown() {
    const endTime = new Date();
    endTime.setHours(23, 59, 59); // 오늘 23:59:59까지

    const timer = setInterval(() => {
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
            clearInterval(timer);
            // 자정이 되면 다음 날로 설정
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(23, 59, 59);
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const timeBoxes = document.querySelectorAll('.time-box');
        if (timeBoxes.length >= 3) {
            timeBoxes[0].textContent = String(hours).padStart(2, '0');
            timeBoxes[1].textContent = String(minutes).padStart(2, '0');
            timeBoxes[2].textContent = String(seconds).padStart(2, '0');
        }
    }, 1000);
}

// [8] 실시간 상담 현황 롤링
function initRollingList() {
    const rollingList = document.getElementById('liveConsultations');
    if (!rollingList) return;

    // 아이템 복제하여 롤링 효과 (최소 2세트 필요)
    const items = rollingList.innerHTML;
    rollingList.innerHTML = items + items;
}

