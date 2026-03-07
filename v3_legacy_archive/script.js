document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Header height offset
                    behavior: 'smooth'
                });
            }
        });
    });

    // URL Parameter & UTM Handling
    const urlParams = new URLSearchParams(window.location.search);
    const utmFields = ['source', 'medium', 'campaign'];

    utmFields.forEach(field => {
        const val = urlParams.get(`utm_${field}`);
        if (val) {
            const targetInput = document.getElementById(`utm_${field}`);
            if (targetInput) targetInput.value = val;
        }
    });

    // Record entry URL for context
    const entryUrlInput = document.getElementById('entry_url');
    if (entryUrlInput) entryUrlInput.value = window.location.href;

    // --- Validation & Formatting Logic ---
    const userName = document.getElementById('userName');
    const userBirthday = document.getElementById('userBirthday');
    const userPhone = document.getElementById('userPhone');

    if (userName) {
        userName.addEventListener('input', (e) => {
            const val = e.target.value;
            const hangulRegex = /^[가-힣]*$/;
            if (val.length > 0 && !hangulRegex.test(val)) {
                userName.classList.add('invalid');
            } else {
                userName.classList.remove('invalid');
            }
        });
    }

    if (userBirthday) {
        userBirthday.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = val;
            if (val.length > 0 && val.length !== 6) {
                userBirthday.classList.add('invalid');
            } else {
                userBirthday.classList.remove('invalid');
            }
        });
    }

    if (userPhone) {
        userPhone.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[^0-9]/g, '');
            let formatted = '';

            if (val.length < 4) {
                formatted = val;
            } else if (val.length < 7) {
                formatted = val.substr(0, 3) + '-' + val.substr(3);
            } else if (val.length < 11) {
                formatted = val.substr(0, 3) + '-' + val.substr(3, 3) + '-' + val.substr(6);
            } else {
                formatted = val.substr(0, 3) + '-' + val.substr(3, 4) + '-' + val.substr(7, 4);
            }
            e.target.value = formatted;

            const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
            if (val.length > 0 && !phoneRegex.test(formatted)) {
                userPhone.classList.add('invalid');
            } else {
                userPhone.classList.remove('invalid');
            }
        });
    }

    // Form Handling
    const consultForm = document.getElementById('consultForm');
    const successModal = document.getElementById('successModal');
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKKLssqxNDPEp5g9TBPvyvjm2Ku44S_e8IWoeqm_AK6p8AZWd4Yw23xWYY7tNqrrJ4/exec';

    if (consultForm) {
        consultForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Final check
            const invalidFields = consultForm.querySelectorAll('.invalid');
            if (invalidFields.length > 0) {
                alert('입력 양식을 다시 확인해 주세요.');
                invalidFields[0].focus();
                return;
            }

            // Birthday Length Check
            if (userBirthday && userBirthday.value.length !== 6) {
                userBirthday.classList.add('invalid');
                alert('생년월일 6자리를 정확히 입력해 주세요.');
                userBirthday.focus();
                return;
            }

            // Submit Button Loading State
            const submitBtn = consultForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = '전송 중...';
            submitBtn.disabled = true;

            // Collect Form Data
            const formData = new FormData(consultForm);
            const data = Object.fromEntries(formData.entries());

            // Add metadata for analysis
            data.timestamp = new Date().toLocaleString();
            data.userAgent = navigator.userAgent;

            console.log('Form Submitted with Tracking:', data);

            // Send to Google Sheets
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(() => {
                    // Show Modal
                    if (successModal) {
                        successModal.style.display = 'flex';
                    } else {
                        alert('신청이 완료되었습니다!');
                    }
                    consultForm.reset();
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Scroll Header Background
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (header && window.scrollY > 50) {
            header.style.padding = '10px 0';
        } else if (header) {
            header.style.padding = '0';
        }
    });
});

// Modal Close Function
function closeModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) successModal.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
