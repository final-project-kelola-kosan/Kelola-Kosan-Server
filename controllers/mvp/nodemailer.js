const {User} = require("../../models");
const nodemailer = require('nodemailer');
let ownerEmail = "qojack82nasution@gmail.com";
const senderEmail = "rezanasu@outlook.com";
const senderPassword = "maestro82"; // outlook password

async function sendMail(subject, text, to = ownerEmail) {
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
}

async function sendMailTenant(subject, text, to = ownerEmail) {
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

        transporter.sendMail(message, () => {
            console.log(message);
        });
        } catch (e) {
            console.log(e)
        }
}



module.exports = {
    sendMail, sendMailTenant 
};