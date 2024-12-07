/* eslint-disable */
import { faker } from "@faker-js/faker";
import sql from "./database.js";

interface User {
  id: string;
  email: string;
}

const programCourses: Record<number, number[]> = {};

const programs = await sql<{ id: number }[]>`SELECT id FROM programs`.then((it) => it.map((it) => it.id));
for (const programId of programs) {
  const courses = await sql<{ id: number }[]>`
    SELECT courses.id FROM courses
    JOIN subjects ON courses.prefix = subjects.prefix
    JOIN programs ON subjects.department_id = programs.department_id
    WHERE programs.id = ${programId}
  `.then((it) => it.map((it) => it.id));

  programCourses[programId] = courses;
}

async function generateUsers() {
  for (let i = 0; i < 200000; i += 500) {
    const users: User[] = [];
    for (let j = 0; j < 500; j++) {
      users.push({ id: crypto.randomUUID(), email: faker.internet.email() });
    }
    await sql`INSERT INTO auth.users ${sql(users)} ON CONFLICT DO NOTHING`;
  }
}

async function generatePlans() {
  await sql.begin(async (sql) => {
    const users = await sql<User[]>`SELECT id, email FROM auth.users`;
    const programs = await sql<{ id: number }[]>`SELECT id FROM programs`.then((it) => it.map((it) => it.id));

    const plans = [];
    for (const user of users) {
      const numPlans = Math.floor(Math.random() * 2) + 1;

      for (let i = 0; i < numPlans; i++) {
        const program = programs[Math.floor(Math.random() * programs.length)];

        plans.push({
          user_id: user.id,
          program_id: program,
          graduation_date: faker.date.future(),
        });
      }
    }

    for (let i = 0; i < plans.length; i += 500) {
      await sql`INSERT INTO user_plans ${sql(plans.slice(i, i + 500))}`;
    }
  });
}

async function generateCourses() {
  const programs = Object.keys(programCourses);

  await sql.begin(async (sql) => {
    const users = await sql<{ id: string; programs: number[] }[]>`
      SELECT auth.users.id, ARRAY_AGG(user_plans.program_id) AS programs FROM auth.users
      JOIN user_plans ON auth.users.id = user_plans.user_id
      GROUP BY auth.users.id
    `;

    const courses = [];
    for (let i = 0; i < 3; i++) {
      for (const user of users) {
        if (i === 2 && Math.random() > 0.5) continue;

        let program = user.programs[Math.floor(Math.random() * user.programs.length)];

        let userCourses: number[];
        // 90% chance of having a course in their desired program's department
        // 10% chance of having an out of department course
        if (Math.random() <= 0.9) {
          userCourses = programCourses[program];
        } else {
          program = Number(
            programs.filter((it) => Number(it) !== program)[Math.floor(Math.random() * (programs.length - 1))],
          );
          console.log(program);
          userCourses = programCourses[program];
        }

        const course = userCourses[Math.floor(Math.random() * userCourses.length)];

        courses.push({ course_id: course, user_id: user.id });
      }
    }

    for (let i = 0; i < courses.length; i += 500) {
      await sql`INSERT INTO user_course_history ${sql(courses.slice(i, i + 500))} ON CONFLICT DO NOTHING`;
    }
  });
}

await generateUsers();
await generatePlans();
await generateCourses();

await sql.end();
