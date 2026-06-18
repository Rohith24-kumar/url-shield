pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Rohith24-kumar/url-shield.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'CI=false npm run build'
            }
        }

        stage('Start Backend') {
            steps {
                dir('backend') {
                    sh 'node server.js &'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
