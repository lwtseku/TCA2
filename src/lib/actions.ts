import { executeAction } from "./executeAction";
import { schema } from "./schema";
import db from "./db";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      try {
        const emailUp = formData.get("email") as string;
        const passwordUp = formData.get("password") as string;
        const user_idUp = formData.get("user_id") as string;
        const school_yearUp = formData.get("school_year")
          ? Number(formData.get("school_year"))
          : null;
        const roleUp = formData.get("role") as string;
        const nameUp = formData.get("name") as string;

        // Validate input data
        const validatedData = schema.parse({
          email: emailUp,
          password: passwordUp,
        });

        // Insert new user into database
        await db.users.create({
          data: {
            email: validatedData.email.toLowerCase(),
            password: validatedData.password, // Ensure you hash the password before storing
            user_id: user_idUp,
            school_year: school_yearUp,
            role: roleUp,
            name: nameUp,
          },
        });
      } catch (error) {
        console.error("Error while signing up:", error);
        throw new Error("Sign-up failed. Please try again.");
      }
    },
    successMessage: "Signed up successfully",
  });
};

export { signUp };
