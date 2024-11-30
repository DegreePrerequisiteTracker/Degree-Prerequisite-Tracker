export interface GEAreas {
  area: string; // primary key
  name: string;
}

export interface CourseSets {
  set_number: number; // primary key
}

export interface GESubareas {
  subarea: string /* primary key */;
  name: string | null;
  area: string /* foreign key to ge_areas.area */;
}

export interface Colleges {
  prefix: string; // primary key
  name: string;
}

export interface CourseRequisites {
  set_number: number; // primary key
  course_set_number: number; // foreign key to course_sets.set_number
  type: "prerequisite" | "corequisite" | "recommended" | "concurrent";
}

export interface Departments {
  id: number; // primary key
  name: string;
}

export interface Programs {
  id: number; // primary key
  name: string;
  department_id: number; // foreign key to departments.id
  type: "BS" | "BA" | "BFA" | "BArch" | "BLA";
}

export interface Concentrations {
  id: number; // primary key
  program_id: number; // foreign key to programs.id
  name: string;
}

export interface CourseStringRequisiteSets {
  id: number; // primary key
  set_number: number; // foreign key to course_requisites.set_number
  requirement: string;
}

export interface Subjects {
  prefix: string; // primary key
  department_id: number | null; // foreign key to departments.id
  name: string;
}

export interface GECourses {
  id: number; // primary key
  course_set_number: number; // foreign key to course_sets.set_number
  ge_subarea: string; // foreign key to ge_subareas.subarea
}

export interface Courses {
  id: number; // primary key
  prefix: string; // foreign key to subjects.prefix
  number: number;
  name: string;
  description: string;
  min_units: number | null;
  max_units: number;
  fall: boolean;
  winter: boolean;
  spring: boolean;
  summer: boolean;
  set_number: number; // foreign key to course_sets.set_number
  uscp: boolean;
  gwr: boolean;
}

export interface ProgramRequirements {
  requirement_group: number; // primary key
  min_units: number | null;
  max_units: number;
  program_id: number; // foreign key to programs.id
  header: string;
}

export interface UserPlans {
  id: number; // primary key
  graduation_date: string | null;
  concentration_id: number; // foreign key to concentrations.id
  program_id: number; // foreign key to programs.id
  user_id: string;
}

export interface ProgramRequirementSets {
  set_number: number; // primary key
  requirement_group: number; // foreign key to program_requirements.requirement_group
}

export interface ProgramRequirementCourses {
  id: number; // primary key
  set_number: number; // foreign key to program_requirement_sets.set_number
  course_set_number: number; // foreign key to course_sets.set_number
}

export interface ProgramRequirementGEs {
  id: number; // primary key;
  requirement_group: number; // foreign key to program_requirements.requirement_group;
  ge_subarea: string; // foreign key to ge_subareas.subarea;
  different_prefixs: number | null;
}

export interface CourseRequisiteSets {
  id: number; // primary key
  set_number: number; // foreign key to course_requisites.set_number
  course_set_number: number; // foreign key to course_sets.set_number
}

export interface UserCourseHistory {
  user_id: number; // primary key
  course_id: number; // foreign key to courses.id
  in_progress: boolean;
}
