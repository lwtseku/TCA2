import { executeAction } from "./executeAction";
import { schema } from "./schema";
import db from "./db";

// Sign-up function (unchanged)
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

// Add timetable entry
const addTimetable = async (data: {
  lesson_code: string;
  teacher_id: string;
  weekdays: string;
  start_time: string;
  end_time: string;
  school_year: number;
}) => {
  try {
    const {
      lesson_code,
      teacher_id,
      weekdays,
      start_time,
      end_time,
      school_year,
    } = data;

    const timetable = await db.timetable.create({
      data: {
        lesson_code,
        teacher_id,
        weekdays,
        start_time,
        end_time,
        school_year,
      },
    });

    return timetable;
  } catch (error) {
    console.error("Error while adding timetable:", error);
    throw new Error("Timetable add failed. Please try again.");
  }
};

// Update timetable entry (Edit)
const updateTimetable = async (data: {
  id: number;
  lesson_code: string;
  teacher_id: string;
  weekdays: string;
  start_time: string;
  end_time: string;
  school_year: number;
}) => {
  try {
    const {
      id,
      lesson_code,
      teacher_id,
      weekdays,
      start_time,
      end_time,
      school_year,
    } = data;

    const timetable = await db.timetable.update({
      where: { id },
      data: {
        lesson_code,
        teacher_id,
        weekdays,
        start_time,
        end_time,
        school_year,
      },
    });

    return timetable;
  } catch (error) {
    console.error("Error while updating timetable:", error);
    throw new Error("Timetable update failed. Please try again.");
  }
};

// Delete timetable entry
const deleteTimetable = async (id: number) => {
  try {
    const timetable = await db.timetable.delete({
      where: { id },
    });

    return timetable;
  } catch (error) {
    console.error("Error while deleting timetable:", error);
    throw new Error("Timetable delete failed. Please try again.");
  }
};

// Fetch timetable for teacher or school year
const getTimetable = async (teacher_id?: string, school_year?: number) => {
  try {
    const timetable = await db.timetable.findMany({
      where: {
        ...(teacher_id && { teacher_id }),
        ...(school_year && { school_year }),
      },
      include: {
        lesson: true, // Lesson_list доторх мэдээллийг авах
        teacher: true, // Багшийн мэдээллийг авах
      },
    });

    return timetable;
  } catch (error) {
    console.error("Error fetching timetable:", error);
    throw new Error("Could not fetch timetable.");
  }
};

// Fetch lessons
const getLessons = async () => {
  try {
    const lessons = await db.lesson_list.findMany({
      include: {
        teacher: true, // Багшийн мэдээлэл
      },
    });
    return lessons;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw new Error("Failed to fetch lessons.");
  }
};

// Add new lesson
const addLesson = async (data: {
  lesson_code: string;
  lesson_name: string;
  credits: number;
  description: string | null;
  teacher_id: string;
}) => {
  try {
    const { lesson_code, lesson_name, credits, description, teacher_id } = data;

    const lesson = await db.lesson_list.create({
      data: {
        lesson_code,
        lesson_name,
        credits,
        description,
        teacher_id,
      },
    });

    return lesson;
  } catch (error) {
    console.error("Error adding lesson:", error);
    throw new Error("Failed to add lesson.");
  }
};

// User management functions

// Add new user
const addUser = async (data: {
  user_id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  school_year: number; // Add school_year field
}) => {
  try {
    const { user_id, name, email, password, role, school_year } = data;

    // Add the new user to the database
    const user = await db.users.create({
      data: {
        user_id,
        name,
        email,
        password, // Store plain password (ideally hash it before storing)
        role,
        school_year,
      },
    });

    return user;
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user.");
  }
};

// Update existing user
const updateUser = async (data: {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  school_year: number;
}) => {
  try {
    const { id, user_id, name, email, role, school_year } = data;

    // Update the user in the database
    const user = await db.users.update({
      where: { id },
      data: {
        user_id,
        name,
        email,
        role,
        school_year,
      },
    });

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user.");
  }
};

// Delete user
const deleteUser = async (id: string) => {
  try {
    const user = await db.users.delete({
      where: { id },
    });

    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user.");
  }
};

// Get all users
const getUsers = async () => {
  try {
    const users = await db.users.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users.");
  }
};

export {
  signUp,
  addTimetable,
  getTimetable,
  getLessons,
  addLesson,
  updateTimetable,
  deleteTimetable,
  addUser,
  updateUser,
  deleteUser,
  getUsers,
};
