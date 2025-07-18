# capitec-assessment: Technical assessment for Capitec Test Automation Engineer post

This project is a Playwright + TypeScript automation framework for testing Web application (Online store), API (regres.in), and database components. It is set up to run across platforms (Windows/macOS/Linux) and uses tags (@ui, @api, @db) to organize tests.

## Clone the Repository:

git clone https://github.com/Mbasa980415/capitec-assessment.git

## Prerequisites:

- Node.js (v18+ recommended)
- npm (comes with Node.js)

## Setup Instructions:
- use: npm run setup

To: - Install all dependencies using npm install
    - Compile TypeScript using tsc
    - Clean all test/build artifacts

## Run All Tests:
- npm test

## Run online store (@ui) tests:
- npm run test:OnlineStore

## Run API (@api) tests:
- npm run test:API

## Run database (@db) tests:
- npm run test:Database

## Playwright report:
- npx playwright show-report
- npx playwright show-report <report name>

## Local setup:
- Create folder named 'environment' in root project 
- Create .env file under this folder.

## Variable names under .env file should be:

//for online Store
- BASE_URL
- UI_USERNAME
- UI_PASSWORD

//For API
- API_BASE_URL
- API_USERNAME
- API_PASSWORD

//For Database
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
