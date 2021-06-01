const cron = require('node-cron')
const moment = require('moment')

const paymentRemainder = (paymentDate, tenant) => {
  console.log(moment(),'yyyy');

  let notyTime = moment(paymentDate)
  console.log(notyTime, 'tanggal pembayaran<<!')
  
  notyTime
    .add(1, 'months')
    .subtract(3, 'day')
  console.log(notyTime, 'notify user for payment')
  
  console.log('setiap tanggal', notyTime, 'di noty')

  let generateSchedule = `40 13 ${notyTime.day()} * *`
  console.log(generateSchedule, 'variable masuk ke cron !!!!!!!!!!!!!!!!!!!!!!!!');

  cron.schedule(generateSchedule, () => {
    console.log('JALANN GUYS');
  })

  cron.schedule('* * * * * *', () => {
    console.log('running a task every 5sec');
  })

  return `${notyTime} <<<`
}

const monthlyReport = () => {

  let monthlyReport = moment().endOf('month')

  return monthlyReport
}

module.exports = { paymentRemainder, monthlyReport } 