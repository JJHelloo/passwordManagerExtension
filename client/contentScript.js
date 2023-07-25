// Listen for a message from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'AUTOFILL') {
      const { email, password } = request.data;
      
      // Auto-fill the form fields
      const emailField = document.querySelector('input[type="text"]');
      const passwordField = document.querySelector('input[type="password"]');
      
      if (emailField && passwordField) {
        emailField.value = email;
        passwordField.value = password;
      }
    }
  });
  
  // Existing code to listen for form submissions and save the entered username and password
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (event) => {
      const usernameField = form.querySelector('input[type="text"]');
      const passwordField = form.querySelector('input[type="password"]');
      
      if (usernameField && passwordField) {
        const username = usernameField.value;
        const password = passwordField.value;
  
        // Save the username and password to the local storage
        chrome.storage.local.set({username, password}, function() {
          console.log('User data is saved to local storage');
        });
  
        // Send the username and password to the background script
        chrome.runtime.sendMessage({username, password});
      }
    });
  });
  