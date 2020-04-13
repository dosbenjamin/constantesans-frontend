const { deploy } = require('sftp-sync-deploy')
require('dotenv').config()

const config = {
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT,
  username: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  localDir: process.env.FTP_LOCAL_DIR,
  remoteDir: process.env.FTP_PROD_DIR
}

deploy(config)
  .then(() => {
    console.log('Success!')
  })
  .catch(err => {
    console.error('Error! ', err)
  })
