// Function để bật/tắt menu trên thiết bị di động
function toggleMenu() {
    var x = document.getElementById("tvlttopnav");
    if (x.classList.contains("responsive")) {
        // Nếu menu đang mở, đóng nó lại và loại bỏ transition-delay
        x.classList.remove("responsive");
        // Đặt lại transition-delay cho các section để chúng không hiển thị ngay lập tức khi mở lần sau
        Array.from(x.querySelectorAll(".section")).forEach(function(section) {
            section.style.transitionDelay = '0s';
        });
    } else {
        // Nếu menu đang đóng, mở nó ra và thêm transition-delay
        x.classList.add("responsive");
        // Thêm transition-delay cho từng section để tạo hiệu ứng trượt mượt mà
        Array.from(x.querySelectorAll(".section")).forEach(function(section, index) {
            section.style.transitionDelay = (index * 0.05) + 's'; // Mỗi mục trễ 0.05s
        });
    }
}

// Function để đánh dấu mục menu đang hoạt động (active)
document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại của trang
    const navLinks = document.querySelectorAll('.topnav .section a'); // Chọn tất cả các link trong navbar

    navLinks.forEach(link => {
        // Lấy href của link và chuẩn hóa (loại bỏ dấu '/' ở cuối nếu có)
        let linkHref = link.getAttribute('href');
        if (linkHref) { // Đảm bảo linkHref tồn tại
            linkHref = linkHref.replace(/\/$/, ""); // Loại bỏ dấu '/' ở cuối

            // So sánh đường dẫn hiện tại với href của link
            // Nếu đường dẫn hiện tại là '/' (trang chủ), và linkHref cũng là '/' (hoặc không có href nhưng là link chơi cờ)
            if (currentPath === '/' && (linkHref === '' || link.querySelector('.bx.bxs-chess'))) {
                link.classList.add('active'); // Thêm class 'active' cho link trang chủ
            } else if (currentPath.includes(linkHref) && linkHref !== '') {
                // Nếu đường dẫn hiện tại chứa linkHref và linkHref không rỗng
                // Ví dụ: currentPath = "/blog/post-1", linkHref = "/blog"
                link.classList.add('active'); // Thêm class 'active'
            }
        }
    });

    // Thêm hoặc điều chỉnh lắng nghe sự kiện cho nút ngôn ngữ nếu cần
    const langButton = document.querySelector('.lang');
    if (langButton) {
        langButton.addEventListener('click', function() {
            // Logic chuyển đổi ngôn ngữ ở đây
            // Ví dụ: alert('Chức năng chuyển đổi ngôn ngữ chưa được triển khai.'); đc viết by dung201000000
        });
    }
});
// Function để bật/tắt menu trên thiết bị di động (giữ nguyên, nhưng lưu ý nó sẽ không hoạt động với bố cục bottom nav cố định mới)
function toggleMenu() {
    var x = document.getElementById("tvlttopnav");
    if (x.classList.contains("responsive")) {
        x.classList.remove("responsive");
        Array.from(x.querySelectorAll(".section")).forEach(function(section) {
            section.style.transitionDelay = '0s';
        });
    } else {
        x.classList.add("responsive");
        Array.from(x.querySelectorAll(".section")).forEach(function(section, index) {
            section.style.transitionDelay = (index * 0.05) + 's';
        });
    }
}

// Function để đánh dấu mục menu đang hoạt động (active) và thêm hiệu ứng ánh sáng theo chuột
document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại của trang
    const navLinks = document.querySelectorAll('.topnav .section a'); // Chọn tất cả các link trong navbar

    navLinks.forEach(link => {
        // --- Logic đánh dấu active (giữ nguyên) ---
        let linkHref = link.getAttribute('href');
        if (linkHref) { // Đảm bảo linkHref tồn tại
            linkHref = linkHref.replace(/\/$/, ""); // Loại bỏ dấu '/' ở cuối

            // So sánh đường dẫn hiện tại với href của link
            if (currentPath === '/' && (linkHref === '' || link.querySelector('.bx.bxs-chess'))) {
                link.classList.add('active'); // Thêm class 'active' cho link trang chủ
            } else if (currentPath.includes(linkHref) && linkHref !== '') {
                link.classList.add('active'); // Thêm class 'active'
            }
        }
        // --- Kết thúc Logic đánh dấu active ---


        // --- NEW: JavaScript cho hiệu ứng ánh sáng theo chuột ---
        link.addEventListener('mousemove', function(e) {
            // Lấy kích thước và vị trí của phần tử link
            const rect = this.getBoundingClientRect();

            // Tính toán vị trí chuột tương đối so với phần tử (từ góc trên bên trái của phần tử)
            const x = e.clientX - rect.left; // Vị trí x trong phần tử
            const y = e.clientY - rect.top;  // Vị trí y trong phần tử

            // Đặt các thuộc tính CSS tùy chỉnh (custom properties) cho phần trăm x và y
            // Các giá trị này sẽ được CSS sử dụng để định vị radial-gradient
            this.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            this.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });

        link.addEventListener('mouseleave', function() {
            // Đặt lại các thuộc tính tùy chỉnh khi chuột rời khỏi phần tử
            // Để hiệu ứng ánh sáng trở lại trạng thái mặc định (hoặc biến mất)
            // Đặt về 50% 50% để gradient trở lại giữa nếu cần, hoặc bạn có thể xóa chúng.
            this.style.setProperty('--mouse-x', '50%'); 
            this.style.setProperty('--mouse-y', '50%'); 
        });
        // --- Kết thúc JavaScript mới cho hiệu ứng ánh sáng theo chuột ---
    });

    // Thêm hoặc điều chỉnh lắng nghe sự kiện cho nút ngôn ngữ nếu cần
    const langButton = document.querySelector('.lang');
    if (langButton) {
        langButton.addEventListener('click', function() {
            // Logic chuyển đổi ngôn ngữ ở đây
            // Ví dụ: alert('Chức năng chuyển đổi ngôn ngữ chưa được triển khai.');
        });
    }
});