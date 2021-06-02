<<<<<<< HEAD
const cron = require('node-cron');
const moment = require('moment');
const { sendMail } = require('../controllers/mvp/nodemailer');

const paymentRemainder = (paymentDate, tenant) => {
  console.log(paymentDate, ' standarrt');
  let notyTime = moment(paymentDate);
  console.log(notyTime, 'tanggal pembayaran<<!');
=======
const cron = require('node-cron')
const moment = require('moment')
const {sendMailTenant} = require("../controllers/mvp/nodemailer");
const fs = require("fs");

//paymentRemainder(duedate, data.email, data.name, userData, roomData)
const paymentRemainder = (paymentDate, tenantEmail, tenantName, userData, roomData) => {
>>>>>>> 4f07a6a4e63fd0c2310a6f8e49d807ab586a8bfc

  // notyTime
  //   .add(2, 'months')
  //   .subtract(3, 'days')
  // console.log(notyTime, 'notify user for payment')

  const getMonth = moment(notyTime).get('month') + 1;
  const getDay = moment(notyTime).date();

  // console.log(getMonth, getDay, 'month to create schedule crone');

<<<<<<< HEAD
  let generateSchedule = `51 19 ${getDay} ${getMonth} *`;
  console.log(
    generateSchedule,
    'variable masuk ke cron !!!!!!!!!!!!!!!!!!!!!!!!'
  );

=======
  let generateSchedule = `0 9 ${getDay} ${getMonth} *`
  console.log(generateSchedule, 'variable masuk ke cron !!!!!!!!!!!!!!!!!!!!!!!!');
>>>>>>> 4f07a6a4e63fd0c2310a6f8e49d807ab586a8bfc
  cron.schedule(generateSchedule, () => {
    console.log('Kirim EMAIL Remainder Pembayaran Kos.....');
    //? codingan email disini
<<<<<<< HEAD
  });

  // cron.schedule('* * * * * *', () => {
  //   // console.log('CRON SCHEDULER JALAN');
  // });
=======
    sendMailTenant(`Payment reminder`, "Information", tenantEmail, tenantName, userData, roomData);
  })
  // sendMailTenant(`Payment reminder`, "Information", tenantEmail, tenantName, userData, roomData);
>>>>>>> 4f07a6a4e63fd0c2310a6f8e49d807ab586a8bfc

  return `${notyTime} <<<`;
};

const monthlyReport = () => {
  let monthlyReport = moment().endOf('month');

  return monthlyReport;
};

module.exports = { paymentRemainder, monthlyReport };
