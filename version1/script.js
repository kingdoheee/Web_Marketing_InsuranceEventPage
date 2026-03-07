document.addEventListener('DOMContentLoaded', () => {
    // Header transition on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal on scroll animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Rolling List Logic
    const rollingList = document.getElementById('rollingList');
    const items = rollingList.innerHTML;
    // Duplicate items for seamless rolling
    rollingList.innerHTML += items + items;

    // Form Handling with Google Sheets Integration
    const consultForm = document.getElementById('consultForm');
    const GAS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // User needs to replace this

    consultForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = consultForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = '처리 중...';
        submitBtn.disabled = true;

        const formData = {
            businessName: consultForm.querySelector('input[placeholder*="회사명"]').value,
            name: consultForm.querySelector('input[placeholder*="성함"]').value,
            phone: consultForm.querySelector('input[type="tel"]').value,
            message: consultForm.querySelector('textarea').value
        };

        try {
            if (GAS_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                // Mock success if URL is not set yet
                console.log('Form Data:', formData);
                alert('테스트 모드: 성공적으로 접수되었습니다. (실제 연동을 위해 GAS URL을 설정해주세요)');
            } else {
                const response = await fetch(GAS_URL, {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                if (result.result === 'success') {
                    alert('성공적으로 접수되었습니다. 전문 보험설계사가 곧 연락드리겠습니다!');
                } else {
                    throw new Error('Server error');
                }
            }
            consultForm.reset();
        } catch (error) {
            alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            console.error('Submission error:', error);
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});
