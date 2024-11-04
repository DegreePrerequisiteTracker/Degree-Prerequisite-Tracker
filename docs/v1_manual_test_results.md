# Example workflow

User wants to browse the course catalog, and get information for a specific course.

1. `GET /subjects` gets a list of subjects
2. `GET /subjects/{prefix}/courses` select course prefix from the list of subjects, gets a list of all courses in that subject
3. `GET /courses/{courseId}/` select a course id from the list of courses, and get information about a specific course

# Testing results

`curl -X 'GET' https://degree-prerequisite-tracker.onrender.com/subjects/`

```json
[
  {
    "name": "Aerospace Engineering",
    "prefix": "AERO"
  },
  {
    "name": "Agriculture",
    "prefix": "AG"
  },
  {
    "name": "Agribusiness",
    "prefix": "AGB"
  },
  {
    "name": "Agricultural Communication",
    "prefix": "AGC"
  },
  {
    "name": "Agricultural Education",
    "prefix": "AGED"
  },
  {
    "name": "Anthropology",
    "prefix": "ANT"
  },
  {
    "name": "Architectural Engineering",
    "prefix": "ARCE"
  },
  {
    "name": "Architecture",
    "prefix": "ARCH"
  },
  {
    "name": "Art",
    "prefix": "ART"
  },
  {
    "name": "Animal Science",
    "prefix": "ASCI"
  },
  {
    "name": "Astronomy and Astrophysics",
    "prefix": "ASTR"
  },
  {
    "name": "Biology",
    "prefix": "BIO"
  },
  {
    "name": "Biomedical Engineering",
    "prefix": "BMED"
  },
  {
    "name": "Botany",
    "prefix": "BOT"
  },
  {
    "name": "BioResource and Agricultural Engineering",
    "prefix": "BRAE"
  },
  {
    "name": "Business",
    "prefix": "BUS"
  },
  {
    "name": "Child Development",
    "prefix": "CD"
  },
  {
    "name": "Civil Engineering",
    "prefix": "CE"
  },
  {
    "name": "Chemistry",
    "prefix": "CHEM"
  },
  {
    "name": "Chinese",
    "prefix": "CHIN"
  },
  {
    "name": "College of Liberal Arts",
    "prefix": "CLA"
  },
  {
    "name": "Construction Management",
    "prefix": "CM"
  },
  {
    "name": "Communication Studies",
    "prefix": "COMS"
  },
  {
    "name": "Computer Engineering",
    "prefix": "CPE"
  },
  {
    "name": "City and Regional Planning",
    "prefix": "CRP"
  },
  {
    "name": "Computer Science",
    "prefix": "CSC"
  },
  {
    "name": "Dance",
    "prefix": "DANC"
  },
  {
    "name": "Data Science",
    "prefix": "DATA"
  },
  {
    "name": "Dairy Science",
    "prefix": "DSCI"
  },
  {
    "name": "Economics",
    "prefix": "ECON"
  },
  {
    "name": "Environmental Design",
    "prefix": "EDES"
  },
  {
    "name": "Education",
    "prefix": "EDUC"
  },
  {
    "name": "Electrical Engineering",
    "prefix": "EE"
  },
  {
    "name": "English",
    "prefix": "ENGL"
  },
  {
    "name": "Engineering",
    "prefix": "ENGR"
  },
  {
    "name": "Environmental Engineering",
    "prefix": "ENVE"
  },
  {
    "name": "Earth Science",
    "prefix": "ERSC"
  },
  {
    "name": "Ethnic Studies",
    "prefix": "ES"
  },
  {
    "name": "Environmental Sciences",
    "prefix": "ESCI"
  },
  {
    "name": "Early Start English",
    "prefix": "ESE"
  },
  {
    "name": "Early Start Math",
    "prefix": "ESM"
  },
  {
    "name": "Fire Protection Engineering",
    "prefix": "FPE"
  },
  {
    "name": "French",
    "prefix": "FR"
  },
  {
    "name": "Food Science and Nutrition",
    "prefix": "FSN"
  },
  {
    "name": "Geography",
    "prefix": "GEOG"
  },
  {
    "name": "Geology",
    "prefix": "GEOL"
  },
  {
    "name": "German",
    "prefix": "GER"
  },
  {
    "name": "Graphic Communication",
    "prefix": "GRC"
  },
  {
    "name": "Graduate Studies",
    "prefix": "GS"
  },
  {
    "name": "Graduate Studies-Accounting",
    "prefix": "GSA"
  },
  {
    "name": "Graduate Studies-Business",
    "prefix": "GSB"
  },
  {
    "name": "Graduate Studies-Economics",
    "prefix": "GSE"
  },
  {
    "name": "Graduate Studies-Packaging",
    "prefix": "GSP"
  },
  {
    "name": "History",
    "prefix": "HIST"
  },
  {
    "name": "Health",
    "prefix": "HLTH"
  },
  {
    "name": "Honors Contract",
    "prefix": "HNRC"
  },
  {
    "name": "Honors",
    "prefix": "HNRS"
  },
  {
    "name": "Industrial and Manufacturing Engineering",
    "prefix": "IME"
  },
  {
    "name": "Interdisciplinary Studies in Liberal Arts",
    "prefix": "ISLA"
  },
  {
    "name": "Italian",
    "prefix": "ITAL"
  },
  {
    "name": "Industrial Technology and Packaging",
    "prefix": "ITP"
  },
  {
    "name": "Journalism",
    "prefix": "JOUR"
  },
  {
    "name": "Japanese",
    "prefix": "JPNS"
  },
  {
    "name": "Kinesiology",
    "prefix": "KINE"
  },
  {
    "name": "Landscape Architecture",
    "prefix": "LA"
  },
  {
    "name": "Liberal Arts and Engineering Studies",
    "prefix": "LAES"
  },
  {
    "name": "Liberal Studies",
    "prefix": "LS"
  },
  {
    "name": "Materials Engineering",
    "prefix": "MATE"
  },
  {
    "name": "Mathematics",
    "prefix": "MATH"
  },
  {
    "name": "Microbiology",
    "prefix": "MCRO"
  },
  {
    "name": "Mechanical Engineering",
    "prefix": "ME"
  },
  {
    "name": "Marine Science",
    "prefix": "MSCI"
  },
  {
    "name": "Military Science Leadership",
    "prefix": "MSL"
  },
  {
    "name": "Music",
    "prefix": "MU"
  },
  {
    "name": "Natural Resources",
    "prefix": "NR"
  },
  {
    "name": "Physical Education: Men",
    "prefix": "PEM"
  },
  {
    "name": "Physical Education: Women",
    "prefix": "PEW"
  },
  {
    "name": "Philosophy",
    "prefix": "PHIL"
  },
  {
    "name": "Physics",
    "prefix": "PHYS"
  },
  {
    "name": "Plant Sciences",
    "prefix": "PLSC"
  },
  {
    "name": "Political Science",
    "prefix": "POLS"
  },
  {
    "name": "Physical Science",
    "prefix": "PSC"
  },
  {
    "name": "Psychology",
    "prefix": "PSY"
  },
  {
    "name": "Religious Studies",
    "prefix": "RELS"
  },
  {
    "name": "Recreation, Parks and Tourism Administration",
    "prefix": "RPTA"
  },
  {
    "name": "Science and Mathematics",
    "prefix": "SCM"
  },
  {
    "name": "Sociology",
    "prefix": "SOC"
  },
  {
    "name": "Spanish",
    "prefix": "SPAN"
  },
  {
    "name": "Special Education",
    "prefix": "SPED"
  },
  {
    "name": "Soil Science",
    "prefix": "SS"
  },
  {
    "name": "Statistics",
    "prefix": "STAT"
  },
  {
    "name": "Theatre",
    "prefix": "TH"
  },
  {
    "name": "University Studies",
    "prefix": "UNIV"
  },
  {
    "name": "Women's, Gender and Queer Studies",
    "prefix": "WGQS"
  },
  {
    "name": "World Languages and Cultures",
    "prefix": "WLC"
  },
  {
    "name": "Wine and Viticulture",
    "prefix": "WVIT"
  }
]
```

`curl -X 'GET' https://degree-prerequisite-tracker.onrender.com/subjects/CSC/courses/`

```json
[
  {
    "courseId": 1283,
    "courseName": "Fundamentals of Computer Science",
    "courseNumber": 101
  },
  {
    "courseId": 1284,
    "courseName": "Computing for All I",
    "courseNumber": 121
  },
  {
    "courseId": 1285,
    "courseName": "Computing for All II",
    "courseNumber": 122
  },
  {
    "courseId": 1286,
    "courseName": "Introduction to Computing",
    "courseNumber": 123
  },
  {
    "courseId": 1287,
    "courseName": "Special Problems for Undergraduates",
    "courseNumber": 200
  },
  {
    "courseId": 1288,
    "courseName": "Data Structures",
    "courseNumber": 202
  },
  {
    "courseId": 1289,
    "courseName": "Project-Based Object-Oriented Programming and Design",
    "courseNumber": 203
  },
  {
    "courseId": 1290,
    "courseName": "Introduction to Computer Organization",
    "courseNumber": 225
  },
  {
    "courseId": 1291,
    "courseName": "Programming for Engineering Students",
    "courseNumber": 231
  },
  {
    "courseId": 1292,
    "courseName": "Computer Programming for Scientists and Engineers",
    "courseNumber": 232
  },
  {
    "courseId": 1293,
    "courseName": "C and Unix",
    "courseNumber": 234
  },
  {
    "courseId": 1294,
    "courseName": "Discrete Structures",
    "courseNumber": 248
  },
  {
    "courseId": 1295,
    "courseName": "Selected Topics",
    "courseNumber": 290
  },
  {
    "courseId": 1296,
    "courseName": "Professional Responsibilities",
    "courseNumber": 300
  },
  {
    "courseId": 1297,
    "courseName": "Software Engineering without Programming",
    "courseNumber": 304
  },
  {
    "courseId": 1298,
    "courseName": "Individual Software Design and Development",
    "courseNumber": 305
  },
  {
    "courseId": 1299,
    "courseName": "Introduction to Software Engineering",
    "courseNumber": 307
  },
  {
    "courseId": 1300,
    "courseName": "Software Engineering I",
    "courseNumber": 308
  },
  {
    "courseId": 1301,
    "courseName": "Software Engineering II",
    "courseNumber": 309
  },
  {
    "courseId": 1302,
    "courseName": "Computational Thinking for Educators",
    "courseNumber": 312
  },
  {
    "courseId": 1303,
    "courseName": "Teaching Computing",
    "courseNumber": 313
  },
  {
    "courseId": 1304,
    "courseName": "Software Design and Data Structures for Educators",
    "courseNumber": 314
  },
  {
    "courseId": 1305,
    "courseName": "Practical Computer Security for Everyone",
    "courseNumber": 320
  },
  {
    "courseId": 1306,
    "courseName": "Introduction to Computer Security",
    "courseNumber": 321
  },
  {
    "courseId": 1307,
    "courseName": "Cryptography Engineering",
    "courseNumber": 323
  },
  {
    "courseId": 1308,
    "courseName": "Introduction to Privacy: Policy and Technology",
    "courseNumber": 325
  },
  {
    "courseId": 1309,
    "courseName": "Music Programming",
    "courseNumber": 344
  },
  {
    "courseId": 1310,
    "courseName": "Design and  Analysis of Algorithms",
    "courseNumber": 349
  },
  {
    "courseId": 1311,
    "courseName": "Computing for Interactive Arts Capstone I",
    "courseNumber": 350
  },
  {
    "courseId": 1312,
    "courseName": "Systems Programming",
    "courseNumber": 357
  },
  {
    "courseId": 1313,
    "courseName": "Introduction to Networked, Distributed, and Parallel Computing",
    "courseNumber": 364
  },
  {
    "courseId": 1314,
    "courseName": "Introduction to Database Systems",
    "courseNumber": 365
  },
  {
    "courseId": 1315,
    "courseName": "Database Modeling, Design and Implementation",
    "courseNumber": 366
  },
  {
    "courseId": 1316,
    "courseName": "Introduction to Distributed Computing",
    "courseNumber": 369
  },
  {
    "courseId": 1317,
    "courseName": "Game Design",
    "courseNumber": 371
  },
  {
    "courseId": 1318,
    "courseName": "Introduction to Mixed Reality",
    "courseNumber": 377
  },
  {
    "courseId": 1319,
    "courseName": "Interactive Entertainment Engineering",
    "courseNumber": 378
  },
  {
    "courseId": 1320,
    "courseName": "Special Problems",
    "courseNumber": 400
  },
  {
    "courseId": 1321,
    "courseName": "Software Requirements Engineering",
    "courseNumber": 402
  },
  {
    "courseId": 1322,
    "courseName": "Software Construction",
    "courseNumber": 405
  },
  {
    "courseId": 1323,
    "courseName": "Senior Project - Software Deployment",
    "courseNumber": 406
  },
  {
    "courseId": 1324,
    "courseName": "Current Topics in Software Engineering",
    "courseNumber": 409
  },
  {
    "courseId": 1325,
    "courseName": "Software Evaluation",
    "courseNumber": 410
  },
  {
    "courseId": 1326,
    "courseName": "Binary Exploitation: Tools and Techniques",
    "courseNumber": 421
  },
  {
    "courseId": 1327,
    "courseName": "Network Security",
    "courseNumber": 422
  },
  {
    "courseId": 1328,
    "courseName": "Software Security",
    "courseNumber": 424
  },
  {
    "courseId": 1329,
    "courseName": "Wireless Security",
    "courseNumber": 425
  },
  {
    "courseId": 1330,
    "courseName": "Current Topics in Computer Security",
    "courseNumber": 429
  },
  {
    "courseId": 1331,
    "courseName": "Programming Languages",
    "courseNumber": 430
  },
  {
    "courseId": 1332,
    "courseName": "Compiler Construction",
    "courseNumber": 431
  },
  {
    "courseId": 1333,
    "courseName": "Mobile Application Development",
    "courseNumber": 436
  },
  {
    "courseId": 1334,
    "courseName": "Dynamic Web Development",
    "courseNumber": 437
  },
  {
    "courseId": 1335,
    "courseName": "Theory of Computation I",
    "courseNumber": 445
  },
  {
    "courseId": 1336,
    "courseName": "Bioinformatics Algorithms",
    "courseNumber": 448
  },
  {
    "courseId": 1337,
    "courseName": "Computing for Interactive Arts Capstone II",
    "courseNumber": 450
  },
  {
    "courseId": 1338,
    "courseName": "Introduction to Operating Systems",
    "courseNumber": 453
  },
  {
    "courseId": 1339,
    "courseName": "Implementation of Operating Systems",
    "courseNumber": 454
  },
  {
    "courseId": 1340,
    "courseName": "Current Topics in Computer Systems",
    "courseNumber": 458
  },
  {
    "courseId": 1341,
    "courseName": "Knowledge Discovery from Data",
    "courseNumber": 466
  },
  {
    "courseId": 1342,
    "courseName": "Database Management Systems Implementation",
    "courseNumber": 468
  },
  {
    "courseId": 1343,
    "courseName": "Distributed Systems",
    "courseNumber": 469
  },
  {
    "courseId": 1344,
    "courseName": "Introduction to Computer Graphics",
    "courseNumber": 471
  },
  {
    "courseId": 1345,
    "courseName": "Advanced Rendering Techniques",
    "courseNumber": 473
  },
  {
    "courseId": 1346,
    "courseName": "Computer Animation",
    "courseNumber": 474
  },
  {
    "courseId": 1347,
    "courseName": "Real-Time 3D Computer Graphics Software",
    "courseNumber": 476
  },
  {
    "courseId": 1348,
    "courseName": "Scientific and Information Visualization",
    "courseNumber": 477
  },
  {
    "courseId": 1349,
    "courseName": "Current Topics in Computer Graphics",
    "courseNumber": 478
  },
  {
    "courseId": 1350,
    "courseName": "Artificial Intelligence",
    "courseNumber": 480
  },
  {
    "courseId": 1351,
    "courseName": "Knowledge Based Systems",
    "courseNumber": 481
  },
  {
    "courseId": 1352,
    "courseName": "Speech and Language Processing",
    "courseNumber": 482
  },
  {
    "courseId": 1353,
    "courseName": "User-Centered Interface Design and Development",
    "courseNumber": 484
  },
  {
    "courseId": 1354,
    "courseName": "Human-Computer Interaction Theory and Design",
    "courseNumber": 486
  },
  {
    "courseId": 1355,
    "courseName": "Deep Learning",
    "courseNumber": 487
  },
  {
    "courseId": 1356,
    "courseName": "Selected Advanced Topics",
    "courseNumber": 490
  },
  {
    "courseId": 1357,
    "courseName": "Senior Project I",
    "courseNumber": 491
  },
  {
    "courseId": 1358,
    "courseName": "Senior Project II",
    "courseNumber": 492
  },
  {
    "courseId": 1359,
    "courseName": "Cooperative Education Experience",
    "courseNumber": 493
  },
  {
    "courseId": 1360,
    "courseName": "Selected Advanced Laboratory",
    "courseNumber": 496
  },
  {
    "courseId": 1361,
    "courseName": "Research Senior Project I",
    "courseNumber": 497
  },
  {
    "courseId": 1362,
    "courseName": "Research Senior Project II",
    "courseNumber": 498
  },
  {
    "courseId": 1363,
    "courseName": "Directed Study",
    "courseNumber": 500
  },
  {
    "courseId": 1364,
    "courseName": "Software Engineering I",
    "courseNumber": 508
  },
  {
    "courseId": 1365,
    "courseName": "Software Engineering II",
    "courseNumber": 509
  },
  {
    "courseId": 1366,
    "courseName": "Computing Education Research and Practice",
    "courseNumber": 513
  },
  {
    "courseId": 1367,
    "courseName": "Computer Architecture",
    "courseNumber": 515
  },
  {
    "courseId": 1368,
    "courseName": "Computer Security",
    "courseNumber": 521
  },
  {
    "courseId": 1369,
    "courseName": "Advanced Network Security",
    "courseNumber": 522
  },
  {
    "courseId": 1370,
    "courseName": "System Security",
    "courseNumber": 524
  },
  {
    "courseId": 1371,
    "courseName": "Languages and Translators",
    "courseNumber": 530
  },
  {
    "courseId": 1372,
    "courseName": "Theory of Computation II",
    "courseNumber": 540
  },
  {
    "courseId": 1373,
    "courseName": "Advanced Algorithm Design and Analysis",
    "courseNumber": 549
  },
  {
    "courseId": 1374,
    "courseName": "Operating Systems",
    "courseNumber": 550
  },
  {
    "courseId": 1375,
    "courseName": "Database Systems",
    "courseNumber": 560
  },
  {
    "courseId": 1376,
    "courseName": "Computer Networks: Research Topics",
    "courseNumber": 564
  },
  {
    "courseId": 1377,
    "courseName": "Topics in Advanced Data Mining",
    "courseNumber": 566
  },
  {
    "courseId": 1378,
    "courseName": "Distributed Computing",
    "courseNumber": 569
  },
  {
    "courseId": 1379,
    "courseName": "Current Topics in Computer Science",
    "courseNumber": 570
  },
  {
    "courseId": 1380,
    "courseName": "Computer Graphics",
    "courseNumber": 572
  },
  {
    "courseId": 1381,
    "courseName": "Advanced Compute Shaders in Computer Graphics",
    "courseNumber": 574
  },
  {
    "courseId": 1382,
    "courseName": "Artificial Intelligence",
    "courseNumber": 580
  },
  {
    "courseId": 1383,
    "courseName": "Computer Support for Knowledge Management",
    "courseNumber": 581
  },
  {
    "courseId": 1384,
    "courseName": "Computational Linguistics",
    "courseNumber": 582
  },
  {
    "courseId": 1385,
    "courseName": "Advanced Deep Learning",
    "courseNumber": 587
  },
  {
    "courseId": 1386,
    "courseName": "Thesis Seminar",
    "courseNumber": 590
  },
  {
    "courseId": 1387,
    "courseName": "Cooperative Education Experience",
    "courseNumber": 593
  },
  {
    "courseId": 1388,
    "courseName": "Cooperative Education Experience",
    "courseNumber": 594
  },
  {
    "courseId": 1389,
    "courseName": "Cooperative Education Experience",
    "courseNumber": 595
  },
  {
    "courseId": 1390,
    "courseName": "Research in Computer Science I",
    "courseNumber": 596
  },
  {
    "courseId": 1391,
    "courseName": "Research in Computer Science II",
    "courseNumber": 597
  },
  {
    "courseId": 1392,
    "courseName": "Thesis",
    "courseNumber": 599
  }
]
```

`curl -X 'GET' https://degree-prerequisite-tracker.onrender.com/courses/1314`

```json
{
  "prefix": "CSC",
  "number": 365,
  "name": "Introduction to Database Systems",
  "description": "Basic principles of database management systems (DBMS) and of DBMS application development.  DBMS objectives, systems architecture, database models with emphasis on Entity-Relationship and Relational models, data definition and manipulation languages, the Structured Query Language (SQL), database design, application development tools.  Course may be offered in classroom-based or online format.  3 lectures, 1 laboratory."
}
```
