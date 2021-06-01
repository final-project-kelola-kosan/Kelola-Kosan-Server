const { paymentRemainder, monthlyReport } = require('../helpers/cron')

console.log(paymentRemainder('2021-05-03T02:09:52.538Z', 'billy'))

console.log(monthlyReport(), 'kirim email tiap akhir bulan');

