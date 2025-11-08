# AGENTS.md

## Project Structure

- `frontend/src/`: React frontend code. Entry point: `main.tsx`.
- `backend/`: PHP backend code.
  - `app/hooks/`: Route definitions.
    - `ajax.php`: AJAX routes.
    - `api.php`: REST API routes.
  - `app/HTTP/Controller/`: PHP controllers for handling requests.

## Agent Workflow

1. **Planning**
   - Always start with a detailed todo list for the task.
   - Break down complex tasks into actionable steps.
2. **Implementation**
   - Implement one todo at a time.
   - After each step, run lint, syntax check, and tests before proceeding.
3. **Feedback Loop**
   - Use a feedback loop: after each step, review results and clarify requirements if needed.
   - Ask for user feedback early to avoid unnecessary work and overuse of tokens.
   - Adjust plan based on feedback before continuing.

## Conventions

- Keep frontend and backend logic separated.
- Use the provided entry points and route files for new features.
- Follow existing code patterns for controllers and routes.
- Reference key files and folders for examples of project structure and conventions.

## Example

- For a new API endpoint:
  - Add route in `backend/app/hooks/api.php`.
  - Implement logic in a controller under `backend/app/HTTP/Controller/`.
  - Backend Configuration in `backend/app/Config.php`
  - Request validator in `backend/app/HTTP/Requests`
  - Request Middleware in `backend/app/HTTP/Requests`
  - Services in `backend/app/HTTP/Services`
  - Update frontend in `frontend/src/` as needed.
  - Frontend uses antd, typescript

---

**Always plan, implement, lint, check, and test in order. Use feedback to clarify and avoid wasted effort.**
