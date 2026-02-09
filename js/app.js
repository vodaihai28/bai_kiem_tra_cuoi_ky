// Giả định mảng dữ liệu (Bạn cần có dữ liệu thật trong file)
const movies = [
    { id: 1, title: "Hành động 1", genre: "Hành động", year: 2024, poster: "/images/OIP (1).webp", desc: "Mô tả phim...", director: "Đạo diễn A" },
    { id: 2, title: "Tình cảm 1", genre: "Lãng mạn", year: 2023, poster: "/images/6a1e8bec80a469fa30b5.jpg", desc: "Mô tả phim...", director: "Đạo diễn B" },
    // Thêm các phim khác ở đây
];

const movieGrid = document.getElementById('movie-grid');
const genreFilters = document.getElementById('genre-filters');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

// 1. Hiển thị danh sách phim
function displayMovies(data) {
    movieGrid.innerHTML = data.map(movie => `
        <div class="movie-card" onclick="openModal(${movie.id})">
            <img src="${movie.poster}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <p>${movie.year}</p>
        </div>
    `).join('');
}

// 2. Tự động tạo Checkbox Thể loại
function initGenres() {
    const genres = [...new Set(movies.map(m => m.genre))];
    genreFilters.innerHTML = genres.map(g => `
        <label><input type="checkbox" class="genre-cb" value="${g}"> ${g}</label><br>
    `).join('');
}

// 3. Logic Lọc kết hợp (Search + Checkbox)
function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenres = Array.from(document.querySelectorAll('.genre-cb:checked')).map(cb => cb.value);

    const filtered = movies.filter(movie => {
        const matchSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
        return matchSearch && matchGenre;
    });

    displayMovies(filtered);
}

// 4. Debounce cho tìm kiếm
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedFilter = debounce(filterMovies, 300);

// Sự kiện
searchInput.addEventListener('input', debouncedFilter);
genreFilters.addEventListener('change', filterMovies);

// 5. Dark Mode & LocalStorage
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load theme từ LocalStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// 6. Modal Chi tiết
function openModal(id) {
    const movie = movies.find(m => m.id === id);
    const modal = document.getElementById('movie-modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <img src="${movie.poster}" style="width:200px">
        <h2>${movie.title}</h2>
        <p><strong>Năm:</strong> ${movie.year}</p>
        <p><strong>Thể loại:</strong> ${movie.genre}</p>
        <p><strong>Đạo diễn:</strong> ${movie.director}</p>
        <p>${movie.desc}</p>
    `;
    modal.style.display = "block";
}

document.querySelector('.close-btn').onclick = () => {
    document.getElementById('movie-modal').style.display = "none";
};

// Khởi chạy
initGenres();
displayMovies(movies);