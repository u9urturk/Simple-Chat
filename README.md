## Updates  17.09.2024 02.10

### Chat Application - WebSocket Integration and Session Management Improvements

This update includes the following improvements and new features:

- **WebSocket Integration:** The WebSocket connection is now initiated only after user login and when the `ChatPage` is loaded.
- **Session Management:** User sessions are better managed through `UserContext`. WebSocket connections automatically open and close during login and logout.
- **JWT and Cookie Management:** The backend properly parses and sends the JWT token as a secure cookie. Axios requests ensure tokens are sent securely in the frontend.
- **User ID Management:** Default values are now assigned for `uid` and `username` in chat messages when user information is missing, improving system robustness.
- **Error Handling:** More reliable error catching and logging mechanisms have been added for session information and token-related issues.

With this update, the application is more secure and stable in terms of both security and performance.
