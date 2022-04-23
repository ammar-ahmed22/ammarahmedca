import dotenv from "dotenv";
dotenv.config({path: "./config.env"});
import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
            user: "apikey",
            pass: process.env.SENDGRID_API_KEY
        }
    })

    const mailOptions = {
        from: "ammar.ahmed2203@gmail.com",
        to: options.to,
        subject: options.subject,
        html: options.html
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log(err)
        }else{
            console.log(info);
        }
    })
}


export default sendEmail;