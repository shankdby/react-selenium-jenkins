pipeline {
    agent any

    environment {
        CI = 'true'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                echo '=== STAGE 1: CHECKOUT - fetching the React project from GitHub ==='
                checkout scm
                bat 'dir'
            }
        }

        stage('Environment Check') {
            steps {
                echo '=== STAGE 2: ENVIRONMENT CHECK - locating Node.js, npm and Chrome ==='
                bat '''
                    @echo off
                    ver
                    set "NPM_DIR="
                    if exist "C:\\Program Files\\nodejs\\node.exe" set "NPM_DIR=C:\\Program Files\\nodejs"
                    if not defined NPM_DIR if exist "C:\\Program Files (x86)\\nodejs\\node.exe" set "NPM_DIR=C:\\Program Files (x86)\\nodejs"
                    if not defined NPM_DIR exit /b 1
                    echo Detected Node.js directory: %NPM_DIR%
                    "%NPM_DIR%\\node.exe" --version
                    call "%NPM_DIR%\\npm.cmd" --version
                    echo %NPM_DIR%> node_dir.txt
                    if exist "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" echo CHROME FOUND
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '=== STAGE 3: INSTALL - installing React, Selenium WebDriverJS, Mocha and Chai ==='
                bat '''
                    @echo off
                    set /p NPM_DIR=<node_dir.txt
                    set "PATH=%NPM_DIR%;%PATH%"
                    call npm install --no-audit --no-fund
                '''
            }
        }

        stage('Build React Application') {
            steps {
                echo '=== STAGE 4: BUILD - producing the production build of the React app ==='
                bat '''
                    @echo off
                    set /p NPM_DIR=<node_dir.txt
                    set "PATH=%NPM_DIR%;%PATH%"
                    call npm run build
                '''
            }
        }

        stage('Start App & Run Selenium Tests') {
            steps {
                echo '=== STAGE 5: TEST - serving the app and running the Selenium UI tests ==='
                bat '''
                    @echo off
                    set /p NPM_DIR=<node_dir.txt
                    set "PATH=%NPM_DIR%;%PATH%"
                    if not exist reports mkdir reports
                    call npm run test:e2e
                '''
            }
        }
    }

    post {
        always {
            junit testResults: 'reports/junit-react.xml', allowEmptyResults: true
            archiveArtifacts artifacts: 'reports/*.xml', allowEmptyArchive: true
        }
        success { echo "REACT SELENIUM PIPELINE SUCCESS - build #${env.BUILD_NUMBER}" }
        failure { echo 'REACT SELENIUM PIPELINE FAILED - check the console output above.' }
    }
}
