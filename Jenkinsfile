pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/kzari898/comsats-assignment2.git'
      }
    }

    stage('Compose Up (Part-2)') {
      steps {
        sh '''
          pwd
          ls -la
          test -f package.json
          docker-compose -f docker-compose.part2.yml down || true
          docker-compose -f docker-compose.part2.yml up -d --build
          docker-compose -f docker-compose.part2.yml ps
        '''
      }
    }
  }
}
