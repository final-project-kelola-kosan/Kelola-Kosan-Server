const nodemailer = require('nodemailer');
const defaultMailingList = "rezanasu@outlook.com";
const senderEmail = "simpleCoders@outlook.com";
const senderPassword = "maestro82"; // gmail app password
module.exports = {
    sendMail: async (subject, text, to = defaultMailingList) => {
        try {
        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
            user: senderEmail,
            pass: senderPassword,
            },
        });

        const message = {
            from: `report sender <${senderEmail}>`,
            to,
            subject,
            text: subject,
            html: text,
        };

        transporter.sendMail(message, () => {});
        } catch (e) {
        // handle errors here
        console.log(e)
        }
    },
};