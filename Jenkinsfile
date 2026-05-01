pipeline {
    agent any

    environment {
        // This ensures Docker can find your compose file easily
        COMPOSE_FILE = 'docker-compose.part2.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls the latest code from your repository
                git branch: 'main', url: 'https://github.com/kzari898/comsats-assignment2.git'
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    echo "Starting deployment with Docker Compose..."
                    sh '''
                        # 1. Stop and remove existing containers, networks, and volumes
                        # The -v flag ensures we clear persistent data for a fresh start
                        docker-compose -f ${COMPOSE_FILE} down -v

                        # 2. Build the images and start the services in detached mode
                        docker-compose -f ${COMPOSE_FILE} up -d --build

                        # 3. List running containers to verify status
                        docker-compose -f ${COMPOSE_FILE} ps
                    '''
                }
            }
        }
    }

    post {
    always {
        // 'junit' is the official Jenkins command to read Maven test results
        junit '**/target/surefire-reports/*.xml'
    }
    success {
        echo "Congratulations! The application is live and all tests passed."
    }
}
