import express from "express";

const router = express.Router();
export default router;

//Returns a list of plans for the current user.
router.get('/plan', (req, res) => {
  res.send({
    plan_id: 1,
    program_id: 4505,
    program_type: "MS",
    concentration_id: 3
  });
});


// POST /plan/ - Creates a new plan for a specified program
router.post('/plan', (req, res) => {
  res.send({
    "plan_id": 5
  });
});


//get a plan form user
router.get('/plan/:plan_id', (req, res) =>{
  res.send({
    
      "program_id": 3,
      "program_type": "MS",
      "concentration_id": 7
    

  });
});

//put an updated plan
router.put('/plan/:plan_id', (req,res) =>{
  res.send();
});


//Deleted a plan for the current user.
router.delete('/plan/:plan_id',(req, res) => {
  res.send();
});


//GET /plan/{plan_id}/courses`
router.get('/plan/:plan_id',(req, res ) => {
  res.send({
    "name": "string", 
    "course_number": 4056, 
    "units": 4, 
    "crosslisted": 53, 
    "prerequisites": [
      {
        "needed": 3, 
        "courses:": [12, 52, 236] 
      }
    ],
    "offered": ["F", "W", "SP", "SU"], 
    "description": "course description",
  
  
  });
});
