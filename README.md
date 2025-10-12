# 🧪 OrangeHRM Cypress Automated Tests

Automated end-to-end (E2E) tests for the [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login), built with [Cypress.io](https://www.cypress.io/).  
This suite covers login, dashboard, user management, PIM, leave, recruitment, and “My Info” modules.

---

## 🚀 Project Overview

This repository contains automated UI regression and smoke tests for the **OrangeHRM Demo Application**.  
The goal is to validate critical business workflows such as:

- Authentication (Login / Logout)
- Dashboard visibility and widgets
- User Management (Add / Edit / Delete users)
- Employee Management (PIM)
- Leave requests and approvals
- Recruitment and candidate flow
- “My Info” data editing and validation

---

## 🧱 Tech Stack

- **Language:** JavaScript (ES6)
- **Framework:** [Cypress](https://www.cypress.io/)
- **Browser:** Chrome (headless by default)
- **CI/CD:** GitHub Actions
- **Node.js Version:** ≥ 18.x

---

## 📂 Folder Structure

orangehrm-cypress-tests/
├── cypress/
│ ├── e2e/ # Test files
│ │ ├── login.cy.js
│ │ ├── dashboard.cy.js
│ │ ├── admin_user_management.cy.js
│ │ ├── pim_employee.cy.js
│ │ ├── my_info.cy.js
│ │ ├── leave.cy.js
│ │ └── recruitment.cy.js
│ ├── fixtures/ # Test data
│ │ └── testData.json
│ └── support/ # Commands & hooks
│ ├── commands.js
│ └── e2e.js
├── cypress.config.js # Cypress config
├── package.json
└── README.md

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/oliwialesniak-mate/orangehrm-cypress-tests.git
cd orangehrm-cypress-tests
