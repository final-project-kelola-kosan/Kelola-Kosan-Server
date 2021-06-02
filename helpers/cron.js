const cron = require('node-cron')
const moment = require('moment')
const {sendMail} = require("../controllers/mvp/nodemailer");

const paymentRemainder = (paymentDate, tenant) => {


  console.log(paymentDate,' standarrt');
  let notyTime = moment(paymentDate)
  console.log(notyTime, 'tanggal pembayaran<<!')
  
  // notyTime
  //   .add(2, 'months')
  //   .subtract(3, 'days')
  // console.log(notyTime, 'notify user for payment')

  const getMonth = moment(notyTime).get('month') + 1
  const getDay = moment(notyTime).date()

  // console.log(getMonth, getDay, 'month to create schedule crone');

  let generateSchedule = `0 9 ${getDay} ${getMonth} *`
  console.log(generateSchedule, 'variable masuk ke cron !!!!!!!!!!!!!!!!!!!!!!!!');

  cron.schedule(generateSchedule, () => {
    console.log('Kirim EMAIL Remainder Pembayaran Kos.....')
    //? codingan email disini
  })

  cron.schedule('* * * * * *', () => {
    console.log('CRON SCHEDULER JALAN');
  })

  return `${notyTime} <<<`
}

const monthlyReport = () => {

  let monthlyReport = moment().endOf('month')


  return monthlyReport
}



module.exports = { paymentRemainder, monthlyReport } 