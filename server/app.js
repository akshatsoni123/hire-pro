const express =require("express");
const app=express();
const PORT = process.env.PORT || 7895;
const dotenv=require("dotenv");
const cors=require("cors");
dotenv.config();
const connectToDB=require("./db/db");
const cookieParser=require("cookie-parser");
const { auth } = require('express-openid-connect');
const fs=require("fs");
const path = require("path");
const asyncHandler = require('express-async-handler');

const User  = require("./models/userModel");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.client_id,
  issuerBaseURL: process.env.issuer_Base_Url,
  routes:{
    postLogoutRedirect: process.env.CLIENT_URL,
    callback: "/callback",
    logout: "/logout",
    login: "/login",
  },
  session: {
    cookie: {
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    }
  }
};
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended :true}));
app.use(auth(config));

//function to check  if user exists in db
const ensureUserinDB=asyncHandler(async(user)=>{
    try {
        const exists=await User.findOne({auth0Id: user.sub});
        if(!exists){
            //create a newUseer
            const newUser=new User({
                auth0Id:user.sub,
                email:user.email,
                name:user.name,
                role:"jobseeker",
                profilePicture:user.picture,
            })
            await newUser.save();
            console.log("User created in db",user);
        }
        else{
            console.log("User already exists in db ",exists);
        }
    } catch (error) {
        console.log("Error chekcing user in db due to "+error.message);
    }
})
 
app.get('/', async (req, res) => {
    if (req.oidc.isAuthenticated()) {
      try {
        console.log("Hi Lok");
        await ensureUserinDB(req.oidc.user);
        return res.redirect(process.env.CLIENT_URL);  // Redirect after ensuring the user is in the DB
      } catch (error) {
        console.error("Error ensuring user in DB:", error);
        return res.status(500).send("Internal Server Error");
      }
    } else {
      return res.status(401).send("User Not Logged in");  // If the user is not authenticated
    }
  });
  
  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true,
}));

app.get('/api/seed', async (req, res) => {
  try {
    const Job = require("./models/jobModel");
    const MockAi = require("./models/interview_Model");
    const User = require("./models/userModel");
    const { v4: uuidv4 } = require("uuid");

    let user = await User.findOne({ email: "adityasuryawanshi234@gmail.com" });
    if (!user) {
      user = await User.findOne({});
    }

    const jobs = [
      {
        title: "Senior Full Stack Engineer",
        location: "San Francisco, CA (Remote)",
        salary: 140000,
        salaryType: "Year",
        negotiable: true,
        jobType: ["Full-Time", "Remote"],
        description: "We are looking for an experienced Full Stack Engineer to lead the development of our core web applications using React, Node.js, and MongoDB.",
        tags: ["React", "Node.js", "MongoDB", "Engineering"],
        skills: ["JavaScript", "React", "Node.js", "System Design"],
        createdBy: user._id,
      },
      {
        title: "Product Designer (UI/UX)",
        location: "New York, NY",
        salary: 110000,
        salaryType: "Year",
        negotiable: false,
        jobType: ["Full-Time", "Hybrid"],
        description: "Join our design team to create beautiful, intuitive interfaces for our millions of users. Must be proficient in Figma and user research methodologies.",
        tags: ["Design", "UI/UX", "Figma", "Product"],
        skills: ["Figma", "Prototyping", "User Research", "Wireframing"],
        createdBy: user._id,
      },
      {
        title: "DevOps Engineer",
        location: "London, UK (Remote)",
        salary: 95000,
        salaryType: "Year",
        negotiable: true,
        jobType: ["Contract", "Remote"],
        description: "Seeking a DevOps specialist to maintain and optimize our CI/CD pipelines, Kubernetes clusters, and AWS infrastructure.",
        tags: ["DevOps", "AWS", "Kubernetes", "Infrastructure"],
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        createdBy: user._id,
      },
      {
        title: "Data Scientist",
        location: "Berlin, Germany",
        salary: 90000,
        salaryType: "Year",
        negotiable: true,
        jobType: ["Full-Time", "On-site"],
        description: "We are looking for a Data Scientist to build predictive models and analyze large datasets to drive business insights.",
        tags: ["Data", "Python", "Machine Learning", "Analytics"],
        skills: ["Python", "SQL", "Machine Learning", "Data Visualization"],
        createdBy: user._id,
      }
    ];

    await Job.insertMany(jobs);

    const mockInterviews = [
      {
        name: user.name,
        email: user.email,
        mockId: uuidv4(),
        jobtitle: "Senior Full Stack Engineer",
        jobdescription: "React, Node.js, MongoDB, System Design",
        jobexperience: "5",
        json_mock_response: JSON.stringify([
          { question: "Can you explain how React's Virtual DOM works?", answer: "React uses a virtual representation of the UI..." },
          { question: "How do you handle scaling a Node.js application?", answer: "Using clustering, load balancing, and microservices..." }
        ]),
      }
    ];

    await MockAi.insertMany(mockInterviews);
    res.send("Seeded jobs and interviews successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//routes
const routeFiles = fs.readdirSync("./routes"); // List all files in the 'routes' directory
routeFiles.forEach((file) => {
    if (path.extname(file) === ".js") { // Ensure it's a JavaScript file
      const route = require(`./routes/${file}`); // Use require to load route
      app.use("/api", route); // Add the route to the Express app with '/api' prefix
    }
  });

/*
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
*/


connectToDB();
app.listen(PORT , ()=> console.log("App is running on "+PORT));