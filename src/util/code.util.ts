import crypto from "crypto";

const generateCode = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

const hashCode = (otp: string): string => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};



export default {
    generateCode,
    hashCode,
}