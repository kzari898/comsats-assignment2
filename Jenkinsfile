pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/kzari898/comsats-assignment2.git'
      }
    }

    stage('Copy code to host-visible folder') {
      steps {
        sh '''
          rm -rf /host_ws/repo
          mkdir -p /host_ws/repo
          tar -cf - . | (cd /host_ws/repo && tar -xf -)
          ls -la /host_ws/repo | head
          find /host_ws/repo -maxdepth 2 -name package.json -print
        '''
      }
    }

    stage('Compose Up (Part-2)') {
      steps {
        sh '''
          cd /host_ws/repo
          docker-compose -f docker-compose.part2.yml down || true
          docker-compose -f docker-compose.part2.yml up -d
          docker-compose -f docker-compose.part2.yml ps
        '''
      }
    }
  }
}
