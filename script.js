document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check for admin credentials
  if (email === 'admin' && password === 'admin') {
    // Redirect to admin panel
    window.location.href = "admin.html"; // Redirect to the admin panel page
    return; // Stop further execution
  }

  // Send login request to the backend for regular users
  fetch('login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          // Redirect based on the response
          window.location.href = data.redirect;
      } else {
          // Show error message
          Swal.fire({
              title: 'Error!',
              text: data.message,
              icon: 'error',
              confirmButtonText: 'Try Again'
          });
      }
  })
  .catch(error => {
      console.error('Error:', error);
      Swal.fire({
          title: 'Error!',
          text: 'An error occurred. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again'
      });
  });
});
  // Forgot Password Form Submission
  document.getElementById('forgot-password-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('reset-email').value;

    fetch('forgot-password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            Swal.fire({
                title: 'Success!',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Continue'
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    })
    .catch(error => console.error('Error:', error));
});
  // Sign Up Form Submission
  document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    fetch('signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname: fullName, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            Swal.fire({
                title: 'Success!',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Continue'
            }).then(() => {
                window.location.href = 'dashboard.html';
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    })
    .catch(error => console.error('Error:', error));
});