const { deploy } = require('sftp-sync-deploy')
require('dotenv').config()

const config = {
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT,
  username: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  localDir: process.env.FTP_LOCAL_DIR,
  remoteDir: process.env.NODE_ENV === 'development' ? process.env.FTP_DIR_STAGE : process.env.FTP_DIR_PROD
}

deploy(config)
  .then(() => {
    console.log('Success!')
  })
  .catch(err => {
    console.error('Error! ', err)
  })
