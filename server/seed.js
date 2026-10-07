const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("./models/jobModel");
const MockAi = require("./models/interview_Model");
const User = require("./models/userModel");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB.");

    let user = await User.findOne({});
    if (!user) {
      user = new User({
        auth0Id: "demo_user",
        email: "demo@hirepro.com",
        name: "Demo User",
        role: "jobseeker",
      });
      await user.save();
      console.log("Created demo user.");
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
      },
      {
        title: "Frontend Developer intern",
        location: "Austin, TX (Remote)",
        salary: 4000,
        salaryType: "Month",
        negotiable: false,
        jobType: ["Internship", "Remote"],
        description: "Great opportunity for a junior frontend developer to learn and build production-ready applications with modern web technologies.",
        tags: ["Frontend", "React", "HTML/CSS", "Internship"],
        skills: ["HTML", "CSS", "JavaScript", "React"],
        createdBy: user._id,
      },
      {
        title: "Backend Engineer (Go/Python)",
        location: "Toronto, Canada",
        salary: 130000,
        salaryType: "Year",
        negotiable: true,
        jobType: ["Full-Time", "Hybrid"],
        description: "Build robust, scalable APIs and microservices using Golang and Python to support our rapidly growing user base.",
        tags: ["Backend", "Golang", "Python", "API"],
        skills: ["Golang", "Python", "REST APIs", "PostgreSQL"],
        createdBy: user._id,
      }
    ];

    await Job.insertMany(jobs);
    console.log(`Inserted ${jobs.length} demo jobs.`);

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
      },
      {
        name: user.name,
        email: user.email,
        mockId: uuidv4(),
        jobtitle: "Product Designer",
        jobdescription: "UI/UX, Figma, User Research",
        jobexperience: "3",
        json_mock_response: JSON.stringify([
          { question: "Walk me through your design process.", answer: "I start with user research, then wireframes, high-fidelity prototypes..." },
          { question: "How do you hand off designs to developers?", answer: "I use Figma's inspect tool, provide detailed documentation, and maintain regular communication..." }
        ]),
      },
      {
        name: user.name,
        email: user.email,
        mockId: uuidv4(),
        jobtitle: "DevOps Engineer",
        jobdescription: "AWS, Docker, Kubernetes, CI/CD pipelines",
        jobexperience: "4",
        json_mock_response: JSON.stringify([
          { question: "Explain the difference between Docker and Kubernetes.", answer: "Docker is a containerization platform, while Kubernetes is a container orchestration system..." },
          { question: "How do you secure an AWS VPC?", answer: "Using Security Groups, Network ACLs, private subnets, and IAM roles..." }
        ]),
      }
    ];

    await MockAi.insertMany(mockInterviews);
    console.log(`Inserted ${mockInterviews.length} demo mock interviews.`);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
