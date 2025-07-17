# capitec-assessment: Technical assessment for Capitec Test Automation Engineer post

This project is a Playwright + TypeScript automation framework for testing Web application (Online store), API (regres.in), and database components. It is set up to run across platforms (Windows/macOS/Linux) and uses tags (@ui, @api, @db) to organize tests.

## Clone the Repository:

git clone https://github.com/Mbasa980415/capitec-assessment.git

## Prerequisites:

- Node.js (v18+ recommended)
- npm (comes with Node.js)

## Setup Instructions:

To: - Install all dependencies using npm install
    - Compile TypeScript using tsc
    - Clean all test/build artifacts

use: npm run setup

## Run All Tests:
- npm test

## Run online store (@ui) tests:
- npm run test:OnlineStore

## Run API (@api) tests:
- npm run test:API

## Run database (@db) tests:
- npm run test:Database


## Local setup:
- Create folder in root project named 'environment'
- Create .env file under this folder.

## Variable names under .env file should be:
- BASE_URL
- UI_USERNAME
- UI_PASSWORD

- API_BASE_URL
- API_USERNAME
- API_PASSWORD

- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME

## NB: Database on GitHub is connected to a supabase setup 