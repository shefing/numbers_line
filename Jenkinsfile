#!/usr/bin/env groovy
import groovy.json.JsonSlurperClassic
import jenkins.model.Jenkins;
@Library('jenkins-shared-library')_

TFS_BUILD_CRED_ID = "win_super_admin"

properties([
  parameters([
    string(name: 'PushBRANCH', value: ""),
    booleanParam(name: 'Delpoy', defaultValue: false, description: 'Do you wish to deploy the service to devENV?'),
  ])
])  
 
pipeline { 
      agent { node { label 'Ansible-IT' } }
      options {
        buildDiscarder(logRotator(numToKeepStr: '30'))
        disableConcurrentBuilds()
        timestamps()
        skipDefaultCheckout()
      }

      stages{                
        stage('Prep') {
          steps {
            cleanWs()
            script{
              if(params.PushBRANCH == ''){
                    jsn = new JsonSlurperClassic().parseText(PAYLOAD)
                    developerEmail = jsn['resource']['lastMergeCommit']['committer']['email']
                    status = jsn['resource']['status']
                    pullRequestId = jsn['resource']['pullRequestId']
                    nairobiservicename = jsn['resource']['repository']['name']
                    print nairobiservicename
                    projectid = jsn['resource']['repository']['project']['name']
                    print projectid
                    println status
                    println pullRequestId
                    switch(status){
                      case 'active':
                        jsn = new JsonSlurperClassic().parseText(PAYLOAD)
                        PushBRANCH = jsn['resource']['sourceRefName'].trim().replace("refs/heads/","")
                        break
                      case 'completed':
                        jsn = new JsonSlurperClassic().parseText(PAYLOAD)
                        PushBRANCH = jsn['resource']['targetRefName'].trim().replace("refs/heads/","")
                        nametag = jsn['resource']['title']
                        print nametag
                        objectid = jsn['resource']['lastMergeSourceCommit']['commitId']
                        print objectid
                        break
                    }
              }else{
                PushBRANCH = params.PushBRANCH
                nairobiservicename = params.servicename
                developerEmail = 'Toc-Team@cet.ac.il'
                status = 'completed'
              }
              println developerEmail
              println PushBRANCH    
            }
          }
        }   

        stage ("Checkout"){
          steps {
            checkout([
            $class: 'GitSCM',
            branches: [[name: "*/${PushBRANCH}"]], 
            doGenerateSubmoduleConfigurations: false,
            extensions: [], 
            submoduleCfg: [], 
            userRemoteConfigs: [[credentialsId: '1d641054-6340-40a3-932d-8d01029eafaf', url: 'https://CET-Tech@dev.azure.com/CET-Tech/Assets/_git/CetAssets']]])
          }
        }

        stage ('Build'){
          steps {
            script { 
              serviceName = 'numbersline'
              servicePathOnRemoteServer = 'D:/Inetpub/websites/Assets.Apps/library/math/numbersLine'
              serviceDirPath = "${WORKSPACE}/library/math/numbersLine"
              artifactZip = "${WORKSPACE}/${serviceName}.zip"
              artifactVersion = "0.0.${env.BUILD_NUMBER}"
              
                dir (serviceDirPath) {

                script= "npm install"
                global_prettyPrintWithHeaderAndFooter header: "Running batch script", body: script
                sh "${script}"

                script= "npm run build"
                global_prettyPrintWithHeaderAndFooter header: "Running batch script", body: script
                sh "${script}"
                }
                dir ("${WORKSPACE}/library/math/numbersLine/dist/NumberLinesTemplate"){
                sh "zip -r ${serviceName}.zip *"
                sh "unzip -l ${serviceName}.zip"
                }                
              }
            }
          }

         stage ('Upload') {
           steps {
             script {      
              withCredentials([string(credentialsId: 'az_devops_personal_access_token', variable: 'TOKEN')]) {
                env.AZURE_DEVOPS_EXT_PAT = "$TOKEN"
                publishCmd = "az artifacts universal publish --organization 'https://dev.azure.com/CET-Tech/' --feed 'artifacts-feed' --name ${serviceName} --version ${artifactVersion} --description ${PushBRANCH} --path ${WORKSPACE}/library/math/numbersLine/dist/NumberLinesTemplate/${serviceName}.zip"
                println "${publishCmd}"
                sh "${publishCmd}"
              }         
             }                        
           }
         }

        stage ('TriggerDeploy') {
          when {
          expression {params.Delpoy}
          }
          steps {
            script {
              machines = "btesting02"
              confType = ""
              envName = ""
                          
              build job: "Microservice-Deploy", 
              parameters: [
                    string(name: 'SERVICE_NAME', value: serviceName),
                    string(name: 'ARTIFACT_VERSION', value: artifactVersion),
                    string(name: 'BRANCH', value: PushBRANCH),
                    string(name: 'SERVICE_PATH', value: servicePathOnRemoteServer),
                    string(name: 'MACHINES', value: machines),
                    string(name: 'ENVIRONMENT', value: envName),
                    string(name: 'CONF_TYPE', value: confType)
                    ]
                    //  machines = ""//"ApiGW-01.azure.cet-prod,ApiGW-02.azure.cet-prod,MS-01.azure.cet-prod,MS-02.azure.cet-prod"                                          
                    //  confType = "appsetting"
                    //  envName = ""
                    //  break

              // sync sevice to kub testing cluster
              build job: "WindowsNodeServiceDeploy",
              parameters: [
                    string(name: 'SERVICE_NAME', value: 'SecurityManagerWeb'),
                    string(name: 'artifactVersion', value: artifactVersion),
                    string(name: 'ENVIRONMENT_TYPE', value: 'Testing'),
              ]
                    
            }
          }
        }
      }

  post {
		always {
      setBuildDescription (PushBRANCH, artifactVersion)                    	
      }

    success {
      script{
        if (status == 'active') {
          withCredentials([string(credentialsId: 'az_devops_personal_access_token', variable: 'TOKEN')]){
            env.AZURE_DEVOPS_EXT_PAT = "$TOKEN"
            sh "az repos pr set-vote --id ${pullRequestId} --vote approve"
          }
        } else {
        return
        }
      }    
    }       
	failure {
      script {
          println "failure"
          if (status == 'active') {
            withCredentials([string(credentialsId: 'az_devops_personal_access_token', variable: 'TOKEN')]){
              env.AZURE_DEVOPS_EXT_PAT = "$TOKEN"
              sh "az repos pr set-vote --id ${pullRequestId} --vote reject"
            }
          } else {
            return
          }	
        }			
      }
  }
}
def setBuildDescription (branch, version) {
  currentBuild.description = "branch: ${branch}\nversion: ${version}"            
}