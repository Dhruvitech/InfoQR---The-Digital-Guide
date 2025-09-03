// Generate QR
function generateQR() {
  let qrText = document.getElementById("qrText").value;
  let qrResult = document.getElementById("qrResult");
  if (!qrText) {
    qrResult.innerHTML = "<p>Please enter text to generate QR</p>";
    return;
  }
  qrResult.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrText}" alt="QR Code">`;
}

// Dummy Scan with Camera
// function scanCamera() {
//   document.getElementById("scanResult").innerHTML =
//     "<p><b>[Camera scanning feature will be implemented later]</b></p>";
// }

// Dummy Scan with Image
function scanImage(event) {
  document.getElementById("scanResult").innerHTML =
    "<p><b>[Image scanning feature will be implemented later]</b></p>";
}

// Rating
function rateStar(rating) {
  let stars = document.querySelectorAll(".stars i");
  stars.forEach((star, index) => {
    if (index < rating) star.classList.add("active");
    else star.classList.remove("active");
  });
}
