 
        let index = 0;
        const slider = document.getElementById('slider');
        const images = document.querySelectorAll('.slider img');

        function showSlide() {
            if (index >= images.length) index = 0;
            if (index < 0) index = images.length - 1;
            slider.style.transform = `translateX(${-index * 100}%)`;
        }

        function nextSlide() { index++; showSlide(); }
        function prevSlide() { index--; showSlide(); }
        
        // Tự động chuyển sau 3 giây
        setInterval(nextSlide, 3000);
   