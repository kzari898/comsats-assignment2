pipeline {
    agent any

    stages {
        stage('Checkout Application Code') {
            steps {
                dir('app') {
                    git branch: 'main', url: 'https://github.com/kzari898/comsats-assignment2.git'
                }
            }
        }

        stage('Checkout Test Code') {
            steps {
                dir('tests') {
                    git branch: 'main', url: 'https://github.com/kzari898/literati-hub-tests.git'
                }
            }
        }

        stage('Deploy Application') {
            steps {
                dir('app') {
                    sh '''
                        docker stop literati-app || true
                        docker rm literati-app || true
                        docker build -t literati-hub .
                        docker run -d --name literati-app -p 3000:3000 literati-hub
                        sleep 15
                    '''
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                dir('tests') {
                    sh 'docker run --rm --network host -v $(pwd):/workspace -w /workspace markhobson/maven-chrome:jdk-11 mvn test -Dsurefire.failIfNoSpecifiedTests=false'
                }
            }
        }
    }

    post {
        always {
            dir('tests') {
                // This is the standard command that Jenkins understands
                junit '**/surefire-reports/*.xml'
            }
        }
        success {
            echo "BUILD SUCCESSFUL: Application is live in Islamabad and all tests passed!"
        }
        failure {
            echo "BUILD FAILED: One of the steps above failed. Check the logs."
        }
    }
}
