"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerSendgridTransport = _interopRequireDefault(require("nodemailer-sendgrid-transport"));

_dotenv["default"].config({
  path: "./config.env"
});

_mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

var sendEmail = function sendEmail(options) {
  var transporter = _nodemailer["default"].createTransport({
    service: "SendGrid",
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY
    }
  });

  var mailOptions = {
    from: "ammar.ahmed2203@gmail.com",
    to: options.to,
    subject: options.subject,
    html: options.html
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

var _default = sendEmail;
exports["default"] = _default;