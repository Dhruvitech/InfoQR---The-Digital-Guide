// Header component for InfoQR: Dynamic based on login status
document.addEventListener('DOMContentLoaded', function() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;

  console.log('Header script loaded');  // Debug

  fetch('api/auth.php?action=login_status')
    .then(response => {
      console.log('Header fetch status:', response.status);  // Debug
      return response.json();
    })
    .then(data => {
      console.log('Header login status:', data);  // Debug: {logged_in: true, user_name: 'ABC'}
      let navHTML = '<nav class="main-nav">';
      navHTML += '<a href="index.html" class="nav-link"><i class="fas fa-home"></i> Home</a>';
      navHTML += '<a href="generate.html" class="nav-link"><i class="fas fa-qrcode"></i> Generate</a>';
      navHTML += '<a href="scan.html" class="nav-link"><i class="fas fa-camera"></i> Scan</a>';
      navHTML += '<a href="review.html" class="nav-link"><i class="fas fa-star"></i> Reviews</a>';
      if (data.logged_in) {
        navHTML += '<a href="profile.html" class="nav-link"><i class="fas fa-user-cog"></i> Profile</a>';  // FIXED: Add Profile to nav for logged-in
      }
      navHTML += '</nav>';

      let authHTML = '';
      if (data.logged_in) {
        // FIXED: Personalized for logged-in (Welcome + Profile + Logout)
        authHTML = `
          <span style="color: white; margin-right: 10px; font-weight: bold;">Welcome, ${data.user_name}!</span>
          <a href="#" class="login-btn" onclick="logout(); return false;" style="background: #28a745;"><i class="fas fa-sign-out-alt"></i> Logout</a>
        `;
      } else {
        // Guest: Login/Register
        authHTML = `
          <a href="login.html" class="login-btn"><i class="fas fa-user"></i> Login</a>
          <a href="register.html" class="register-btn"><i class="fas fa-user-plus"></i> Register</a>
        `;
      }

      headerContainer.innerHTML = `
        <header>
          <div class="logo-container">
            <img src="images/favicon.jpg" alt="InfoQR Logo" class="logo">
            <div class="logo-text">InfoQR : The Digital Guide</div>
          </div>
          ${navHTML}
          <div class="auth-buttons">${authHTML}</div>
        </header>
      `;
      console.log('Header rendered for logged_in:', data.logged_in);  // Debug
    })
    .catch(err => {
      console.error('Header fetch error:', err);  // Debug
      // Fallback to guest header
      headerContainer.innerHTML = `
        <header>
          <div class="logo-container">
            <img src="images/favicon.jpg" alt="InfoQR Logo" class="logo">
            <div class="logo-text">InfoQR : The Digital Guide</div>
          </div>
          <nav class="main-nav">
            <a href="index.html" class="nav-link"><i class="fas fa-home"></i> Home</a>
            <a href="generate.html" class="nav-link"><i class="fas fa-qrcode"></i> Generate</a>
            <a href="scan.html" class="nav-link"><i class="fas fa-camera"></i> Scan</a>
            <a href="review.html" class="nav-link"><i class="fas fa-star"></i> Reviews</a>
          </nav>
          <div class="auth-buttons">
            <a href="login.html" class="login-btn"><i class="fas fa-user"></i> Login</a>
            <a href="register.html" class="register-btn"><i class="fas fa-user-plus"></i> Register</a>
          </div>
        </header>
      `;
    });
});

// FIXED: Global logout function (clears session, redirects to home)
async function logout() {
  try {
    console.log('Logging out...');  // Debug
    const response = await fetch('api/auth.php?action=logout');
    const data = await response.json();
    if (data.success) {
      alert('Logged out successfully!');
      localStorage.removeItem('csrf');  // Clear token
      window.location.href = 'index.html';  // Back to home
    } else {
      alert('Logout error: ' + data.error);
    }
  } catch (err) {
    console.error('Logout error:', err);
    localStorage.removeItem('csrf');
    window.location.href = 'index.html';
  }
}