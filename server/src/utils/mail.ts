import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";

/**
 * Nodemailer transporter
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_GMAIL_USER,
    pass: process.env.SMTP_GMAIL_PASS,
  },
});

/**
 * Reads HTML file
 *
 * @param {string} relativePath - Path to HTML file relative to ./src/utils/mail.ts
 * @returns {string} - HTML file as string
 */
export const readHTML = (relativePath: string): string => {
  return fs.readFileSync(path.resolve(__dirname, relativePath), {
    encoding: "utf-8",
  });
};

/**
 * Gets param names inside email html
 *
 * @param {string} htmlString - HTML file as a string
 * @returns {(string[] | undefined)} - Array of param names or undefined if none.
 */
export const getParamNames = (htmlString: string): string[] | undefined => {
  const paramRegex = /\${{[A-Za-z\-]+}}/gm;
  return htmlString.match(paramRegex)?.map((item) => {
    return item.slice(3, -2);
  });
};

/**
 * Inserts params into html
 *
 * @param {string} htmlString - HTML file as a string
 * @param {Record<string, any>} params - key-value pairs of params
 * @returns {string} - Updated HTML file as a string
 */
export const insertParams = (
  htmlString: string,
  params: Record<string, any>
): string => {
  let copy = htmlString;
  const paramNames = getParamNames(htmlString);
  if (!paramNames) throw new Error("No params");
  Object.keys(params).forEach((param) => {
    if (!paramNames.includes(param))
      throw new Error(`param: ${param} does not exist in html.`);
    copy = copy.replace(`\$\{\{${param}\}\}`, `${params[param]}`);
  });

  return copy;
};

export default transporter;
