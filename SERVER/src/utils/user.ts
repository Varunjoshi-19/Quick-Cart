import crypto from "crypto";

export function HashedPasswordAndSalting(password : string)  {

  const salt = crypto.randomBytes(20).toString("hex");
  const hashpassword = crypto.createHmac("sha256", salt).update(password).digest("hex");

  return { salt, hashpassword };

}