// =======================================
// PROJECT DATA
// =======================================
const projectsData = [
  {
    id: 1,
    title: 'Website E-commerce Hijab',
    description: 'Proyek ini adalah website e-commerce modern yang berfokus pada penjualan hijab. Dilengkapi fitur manajemen produk, keranjang belanja, dan proses checkout yang mudah. Dibangun dengan HTML, CSS, dan JavaScript.',
    images: ['assets/images/project1-img1.png', 'assets/images/project1-img2.png'],
  },
  {
    id: 2,
    title: 'Aplikasi Pemesanan Tiket Bus Online',
    description: 'Aplikasi mobile untuk pemesanan tiket bus secara online. Memiliki antarmuka yang ramah pengguna (UI/UX) untuk memudahkan pengguna mencari jadwal, memilih kursi, dan melakukan pembayaran. Dikembangkan menggunakan React Native.',
    images: ['assets/images/project2-img1.png', 'assets/images/project2-img2.png'],
  },
  {
    id: 3,
    title: 'Aplikasi Pemesanan Tiket Bioskop Online',
    description: 'Sebuah website interaktif untuk pemesanan tiket bioskop. Pengguna bisa melihat jadwal film, trailer, dan memilih kursi secara real-time. Desainnya dibuat menarik untuk meningkatkan pengalaman pengguna. Dibangun dengan HTML, CSS, dan JavaScript.',
    images: ['assets/images/project3-img1.png', 'assets/images/project3-img2.png'],
  },
];

// =======================================
// GETTING HTML ELEMENTS
// =======================================
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-image');
const prevButton = modal.querySelector('.prev-button');
const nextButton = modal.querySelector('.next-button');
const closeButton = modal.querySelector('.close-button');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const flipButtons = document.querySelectorAll('.flip-button');
const flipCardInner = document.querySelector('.flip-card-inner');

let currentProjectImages = [];
let currentImageIndex = 0;

// =======================================
// MODAL & SLIDESHOW FUNCTIONS
// =======================================
function openModal(project) {
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  currentProjectImages = project.images;
  currentImageIndex = 0;
  updateModalImage();
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function updateModalImage() {
  modalImage.src = currentProjectImages[currentImageIndex];
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
  updateModalImage();
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
  updateModalImage();
}

// =======================================
// EFEK TYPEWRITER
// =======================================
const texts = [
  "Halo, Saya Abdila Asy", 
  "Saya Seorang Mahasiswa", 
  "Pengembang Frontend", 
  "Desainer UI/UX"
];
let count = 0;
let textIndex = 0;
let isDeleting = false;
let hasCycledOnce = false;
const typingTextElement = document.querySelector('.typing-text');
const speed = 100;
const pause = 2000;

function type() {
  if (!typingTextElement) return;

  const currentText = texts[count];
  
  if (isDeleting) {
    typingTextElement.textContent = currentText.substring(0, textIndex - 1);
    textIndex--;
  } else {
    typingTextElement.textContent = currentText.substring(0, textIndex + 1);
    textIndex++;
  }

  if (hasCycledOnce && !isDeleting && textIndex === currentText.length && count === 0) {
    return;
  }

  if (!isDeleting && textIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, pause);
  } else if (isDeleting && textIndex === 0) {
    isDeleting = false;
    count++;
    if (count === texts.length) {
        hasCycledOnce = true;
        count = 0;
    }
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
}

// =======================================
// ACTIVE NAV LINK
// =======================================
function updateActiveLink() {
    let currentSectionId = '';
    
    if (document.location.pathname.includes('index.html') || document.location.pathname === '/') {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(currentSectionId) && currentSectionId !== '') {
            link.classList.add('active');
        } else if (document.location.pathname.includes('contact.html') && link.href.includes('contact.html')) {
            link.classList.add('active');
        }
    });
}

// =======================================
// ABOUT ME FLIP CARD FUNCTIONALITY
// =======================================
if (flipCardInner) {
    flipButtons.forEach(button => {
        button.addEventListener('click', () => {
            flipCardInner.classList.toggle('flipped');
        });
    });
}

// =======================================
// DOM CONTENT LOADED
// =======================================
document.addEventListener('DOMContentLoaded', () => {
  type();

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = parseInt(card.dataset.projectId);
      const selectedProject = projectsData.find(p => p.id === projectId);
      if (selectedProject) openModal(selectedProject);
    });
  });

  closeButton.addEventListener('click', closeModal);
  nextButton.addEventListener('click', showNextImage);
  prevButton.addEventListener('click', showPrevImage);
  window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Call on initial load

  const sectionsToAnimate = document.querySelectorAll('.animate-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sectionsToAnimate.forEach(section => {
    observer.observe(section);
  });
});