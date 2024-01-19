import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be atleast 3 character" })
    .max(255, { message: "Username must not be more that 255 character" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email" })
    .min(10, { message: "Email can not be less than 3 character" })
    .max(100, { message: "Email can not be more than 100 character" }),
  phone: z
    .string({ required_error: "Phone no is required" })
    .trim()
    .min(10, { message: "Phone no must be of 10 digit" })
    .max(10, { message: "Phone no must be of 10 digit" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password should be atleast 6 character" })
    .max(30, { message: "Password can not be more that 30 character" }),
});

export default registerSchema;
