import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import transporter, { getParamNames, insertParams } from "./utils/mail";
import * as fs from "fs";
import * as path from "path";

const confirmEmail = fs.readFileSync(
  path.resolve(__dirname, "./emails/confirmation-code.html"),
  { encoding: "utf-8" }
);

console.log(getParamNames(confirmEmail));

const updated = insertParams(confirmEmail, { "confirmation-code": 123456 });

(async () => {
  try {
    await transporter.sendMail({
      from: "ammar@ammarahmed.ca",
      to: "a353ahme@uwaterloo.ca",
      subject: "Confirm your email for ammarahmed.ca",
      text: "Plaintext is not supported :(",
      html: updated,
    });

    console.log("sent!");
  } catch (error: any) {
    console.log(error.message);
  }
})();
