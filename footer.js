document.addEventListener('DOMContentLoaded', function() {
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer style="background: #102765; color: white; text-align: center; padding: 20px; margin-top: 40px;">
        <p>&copy; 2025 InfoQR: The Digital Guide. All rights reserved.</p>
      </footer>
    `;
  }
});