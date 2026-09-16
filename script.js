document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Falling Flowers Animation ---
    const flowerContainer = document.getElementById('flower-container');
    const FLOWER_COUNT = 12;

    function createFlower() {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        
        // Randomize position, size, and animation duration
        const left = Math.random() * 100; // 0 to 100vw
        const size = Math.random() * 20 + 15; // 15px to 35px
        const duration = Math.random() * 10 + 7; // 7s to 17s (slightly slower)
        const delay = Math.random() * 5; // 0s to 5s delay

        flower.style.left = `${left}vw`;
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;
        flower.style.animationDuration = `${duration}s`;
        flower.style.animationDelay = `${delay}s`;

        // Make flowers more colorful with full spectrum
        const hue = Math.random() * 360; 
        flower.style.filter = `hue-rotate(${hue}deg) drop-shadow(0px 2px 4px rgba(0,0,0,0.1))`;

        flowerContainer.appendChild(flower);

        // Remove and recreate flower after it falls out of view
        setTimeout(() => {
            flower.remove();
            createFlower();
        }, (duration + delay) * 1000);
    }

    // Initialize flowers
    for (let i = 0; i < FLOWER_COUNT; i++) {
        setTimeout(createFlower, Math.random() * 2000); // Stagger initial creation
    }

    // --- 1.5. Flying Butterflies Animation ---
    const butterflyContainer = document.getElementById('butterfly-container');
    const BUTTERFLY_COUNT = 3;

    function createButterfly(index) {
        if (!butterflyContainer) return;
        
        const wrapper = document.createElement('div');
        wrapper.classList.add('butterfly-wrapper');
        
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        
        // Randomize animation path and duration
        const duration = Math.random() * 10 + 20; // 20s to 30s (slow and peaceful)
        const delay = Math.random() * 10; 
        
        // Alternate between path 1 and path 2
        wrapper.style.animation = `fly-path-${index % 2 === 0 ? 1 : 2} ${duration}s linear infinite`;
        wrapper.style.animationDelay = `${delay}s`;
        
        // Randomize color slightly using hue-rotate
        const hue = Math.random() * 360;
        butterfly.style.filter = `hue-rotate(${hue}deg) drop-shadow(0px 2px 4px rgba(0,0,0,0.2))`;
        
        wrapper.appendChild(butterfly);
        butterflyContainer.appendChild(wrapper);
    }

    for (let i = 0; i < BUTTERFLY_COUNT; i++) {
        createButterfly(i);
    }


    // --- 2. Envelope/Letter Logic ---
    const openLetterBtn = document.getElementById('openLetterBtn');
    const envelope = document.getElementById('envelope');
    const bookSection = document.querySelector('.book-section');
    const bgMusic = document.getElementById('bgMusic');
    let isLetterOpen = false;

    openLetterBtn.addEventListener('click', () => {
        isLetterOpen = !isLetterOpen;
        if (isLetterOpen) {
            if (bgMusic) {
                bgMusic.volume = 0.5; // Set volume to 50%
                bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
            }
            envelope.classList.add('open');
            openLetterBtn.textContent = 'Tutup Surat';
        } else {
            envelope.classList.remove('open');
            openLetterBtn.textContent = 'Buka Surat';
        }
    });


    // --- 3. 3D Book Flip Logic ---
    const book = document.getElementById('book');
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentPage = 0;
    const maxPage = pages.length;

    // Initialize z-index and custom property for pages
    pages.forEach((page, index) => {
        page.style.setProperty('--page-index', index);
        // Allow clicking directly on the page to turn it
        page.addEventListener('click', () => {
            if (index === currentPage) {
                goNextPage();
            } else if (index === currentPage - 1) {
                goPrevPage();
            }
        });
    });

    function updateButtons() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === maxPage;
    }

    function goNextPage() {
        if (currentPage < maxPage) {
            // Add flipped class to current page
            pages[currentPage].classList.add('flipped');
            
            // Adjust book position slightly to keep it centered when open
            if (currentPage === 0) {
                book.style.transform = 'translateX(50%)';
            }
            
            currentPage++;
            updateButtons();
        }
    }

    function goPrevPage() {
        if (currentPage > 0) {
            currentPage--;
            
            // Remove flipped class
            pages[currentPage].classList.remove('flipped');
            
            // Re-center book if closing back to cover
            if (currentPage === 0) {
                book.style.transform = 'translateX(0)';
            }
            
            updateButtons();
        }
    }

    prevBtn.addEventListener('click', goPrevPage);
    nextBtn.addEventListener('click', goNextPage);

    // --- 4. Interactive Blooming Flower ---
    const bloomingFlower = document.getElementById('bloomingFlower');
    const flowerHint = document.getElementById('flowerHint');
    if (bloomingFlower) {
        bloomingFlower.addEventListener('click', (event) => {
            event.stopPropagation(); // Mencegah klik menembus ke halaman buku
            bloomingFlower.classList.toggle('bloomed');
            if (bloomingFlower.classList.contains('bloomed')) {
                flowerHint.textContent = 'Bunga Mekar! 🌸';
            } else {
                flowerHint.textContent = 'Sentuh Bunganya!';
            }
        });
    }

    // --- 5. Interactive Cake (Blow Candle) ---
    const flame = document.getElementById('flame');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const cakeContainer = document.getElementById('cakeContainer');
    const cakeTitle = document.getElementById('cakeTitle');
    const cakeHint = document.getElementById('cakeHint');
    
    if (cakeContainer && flame) {
        cakeContainer.addEventListener('click', (event) => {
            event.stopPropagation(); // Mencegah buku berbalik halaman
            
            if (!flame.classList.contains('out')) {
                flame.classList.add('out');
                
                // Tunggu sebentar, lalu redupkan kue dan munculkan pesan
                setTimeout(() => {
                    cakeContainer.classList.add('fade-out');
                    cakeTitle.classList.add('fade-out');
                    cakeHint.classList.add('fade-out');
                    birthdayMessage.classList.add('show');
                }, 600);
            }
        });
    }
    // --- 6. WhatsApp Message Logic ---
    const waSendBtn = document.getElementById('waSendBtn');
    const waMessage = document.getElementById('waMessage');
    const waForm = document.getElementById('waForm');
    
    if (waSendBtn && waMessage && waForm) {
        waForm.addEventListener('click', (event) => {
            event.stopPropagation(); // Mencegah buku terbalik saat mengetik
        });

        waSendBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            const text = waMessage.value.trim();
            if (text) {
                const phoneNumber = '6289503763030'; 
                const encodedText = encodeURIComponent(text);
                const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
                window.open(waUrl, '_blank');
            } else {
                alert('Tulis pesan terlebih dahulu ya!');
            }
        });
    }

});
