const cron = require('node-cron')
const moment = require('moment')
const {sendMailTenant} = require("../controllers/mvp/nodemailer");
const fs = require("fs");

const paymentRemainder = (paymentDate, tenantEmail, tenantName, userData, roomData) => {


  console.log(paymentDate,' standarrt');
  let notyTime = moment(paymentDate)
  console.log(notyTime, 'tanggal pembayaran<<!')
  
  

  const getMonth = moment(notyTime).get('month') + 1
  const getDay = moment(notyTime).date()

  

  let generateSchedule = `0 9 ${getDay} ${getMonth} *`
  console.log(generateSchedule, 'variable masuk ke cron !!!!!!!!!!!!!!!!!!!!!!!!');
  cron.schedule(generateSchedule, () => {
    console.log('Kirim EMAIL Remainder Pembayaran Kos.....')
    //? codingan email disini
    sendMailTenant(`Payment reminder`, "Information", tenantEmail, tenantName, userData, roomData);
  })
  // sendMailTenant(`Payment reminder`, "Information", tenantEmail, tenantName, userData, roomData);

  return `${notyTime} <<<`
}

const monthlyReport = () => {

  let monthlyReport = moment().endOf('month')


  return monthlyReport
}



module.exports = { paymentRemainder, monthlyReport } 