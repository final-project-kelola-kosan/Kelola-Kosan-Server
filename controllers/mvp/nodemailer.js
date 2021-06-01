const {User} = require("../../models");
const nodemailer = require('nodemailer');
let ownerEmail = "muhammadihsan076@gmail.com";
const senderEmail = "simpleCoders@outlook.com";
const senderPassword = "maestro82"; // outlook password

module.exports = {
    sendMail: async (subject, text, to = ownerEmail) => {
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
            attachments: [{
                filename: 'Report.pdf',
                path: __dirname + "/Report.pdf"
            }]
        };

        transporter.sendMail(message, () => {
            console.log(message);
        });
        } catch (e) {
            console.log(e)
        }
    },
};