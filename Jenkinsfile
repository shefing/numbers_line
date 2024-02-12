#!/usr/bin/env groovy
import groovy.json.JsonSlurperClassic
import jenkins.model.Jenkins;
@Library('jenkins-shared-library')_

TFS_BUILD_CRED_ID = "win_super_admin"

properties([
  parameters([
    string(name: 'PushBRANCH', value: ""),
  ])
])  
 
pipeline { 
      agent { node { label 'devBuilds2' } }
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
              serviceName = 'numbersLine'
              servicePathOnRemoteServer = 'D:/Inetpub/websites/Assets.Apps/library/math/numbersLine'
              serviceDirPath = "${WORKSPACE}/library/math/numbersLine"
              artifactZip = "${WORKSPACE}/${serviceName}.zip"
              artifactVersion = "0.0.${env.BUILD_NUMBER}"
              versioningDirPath = global_getGITVersionDataForComponent(changeset: env.BUILD_NUMBER, componentType: 'Assets.Apps')
              
                dir (serviceDirPath) {

                script= "npm install"
                global_prettyPrintWithHeaderAndFooter header: "Running batch script", body: script
                bat "${script}"

                script= "npm run build"
                global_prettyPrintWithHeaderAndFooter header: "Running batch script", body: script
                bat "${script}"

                // Change all files permission to read-write
                script = "Get-ChildItem ${WORKSPACE} -Recurse | Where-Object {\$_.GetType().ToString() -eq \"System.IO.FileInfo\"} | Set-ItemProperty -Name IsReadOnly -Value \$false"
                global_prettyPrintWithHeaderAndFooter header: "Running powershell script", body: script
                powershell "${script}"
                }
              // Copy versioning dir to service
              //powershell "Copy-Item -Path '${versioningDirPath}' -Destination ${serviceDirPath}/Artifacts/_PublishedWebsites/MyBagAPI -Recurse"

              // Compress artifacts to a single zip file
              //powershell "Compress-Archive -Path  ${serviceDirPath}/Artifacts/_PublishedWebsites/MyBagAPI/* -DestinationPath ${artifactZip}"              
              }
            }
          }

        // stage ('Upload') {
        //   steps {
        //     script {      
        //       global_azDevopsPublishArtifact artifactName: serviceName.toLowerCase(), 
        //         artifactVersion: artifactVersion, 
        //         artifactDescription: "\"{\\\"branch\\\": \\\"${PushBRANCH}\\\"}\"",
        //         artifactPath: artifactZip          
        //     }                        
        //   }
        // }

        // stage ('TriggerDeploy') {
        //   steps {
        //     script {
        //       if(PushBRANCH == 'develop'){
        //         machines = "btesting02"
        //         confType = ""
        //         envName = ""
                            
        //         build job: "Microservice-Deploy", 
        //         parameters: [
        //               string(name: 'SERVICE_NAME', value: serviceName),
        //               string(name: 'ARTIFACT_VERSION', value: artifactVersion),
        //               string(name: 'BRANCH', value: PushBRANCH),
        //               string(name: 'SERVICE_PATH', value: servicePathOnRemoteServer),
        //               string(name: 'MACHINES', value: machines),
        //               string(name: 'ENVIRONMENT', value: envName),
        //               string(name: 'CONF_TYPE', value: confType)
        //               ]
        //       }else if(PushBRANCH.contains('release') || PushBRANCH == 'master' || PushBRANCH.contains('hotfix')){ 
        //         println "Skipping deployment for PREPROD enviroment.."
        //           machines = "BPXX.azure.cet-prod,BPXX.azure.cet-prod,BPXX.azure.cet-prod,BPXX.azure.cet-prod,BPXX.azure.cet-prod,BPXX.azure.cet-prod,BPXX.azure.cet-prod,BPXX.azure.cet-prod"
        //           global_sendEmailNotification(
        //           subject: "RC Build ${serviceName}",
        //           body: "SERVICE_NAME: ${serviceName}\nARTIFACT_VERSION: ${artifactVersion}\nBRANCH: ${PushBRANCH}\nSERVICE_PATH: ${servicePathOnRemoteServer}",
        //           to: 'suhah@cet.ac.il',
        //           )
        //         currentBuild.result = 'SUCCESS'
        //         return
        //       }else{
        //         machines = "btesting02"
        //         confType = ""
        //         envName = ""
                            
        //         build job: "Microservice-Deploy", 
        //         parameters: [
        //           string(name: 'SERVICE_NAME', value: serviceName),
        //           string(name: 'ARTIFACT_VERSION', value: artifactVersion),
        //           string(name: 'BRANCH', value: PushBRANCH),
        //           string(name: 'SERVICE_PATH', value: servicePathOnRemoteServer),
        //           string(name: 'MACHINES', value: machines),
        //           string(name: 'ENVIRONMENT', value: envName),
        //           string(name: 'CONF_TYPE', value: confType)
        //         ]
        //       //  machines = ""//"ApiGW-01.azure.cet-prod,ApiGW-02.azure.cet-prod,MS-01.azure.cet-prod,MS-02.azure.cet-prod"                                          
        //       //  confType = "appsetting"
        //       //  envName = ""
        //       //  break
        //       }
        //     }
        //   }
        // }  
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
            powershell "az repos pr set-vote --id ${pullRequestId} --vote approve"
          }
        } else {
        return
        }
      }    
    }       
	failure {
      script {
        if (params.DISABLE_NOTIFICATION) {
          println "failure"
        } else {
          global_sendEmailNotification to: developerEmail, subject: "${JOB_NAME} - Failed", body: "BUILD URL: ${BUILD_URL}"
          if (status == 'active') {
            withCredentials([string(credentialsId: 'az_devops_personal_access_token', variable: 'TOKEN')]){
              env.AZURE_DEVOPS_EXT_PAT = "$TOKEN"
              powershell "az repos pr set-vote --id ${pullRequestId} --vote reject"
            }
          } else {
            return
          }	
        }			
      }
	  }
  }
}    
 
def setBuildDescription (branch, version) {
  currentBuild.description = "branch: ${branch}\nversion: ${version}"            
}