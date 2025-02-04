import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()



// Apply CORS middleware
app.use(cors({
    origin: 'https://seva-hub.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
 
// Additional headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://seva-hub.vercel.app');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import organisationRouter from './routes/organisation.routes.js'
import eventRouter from './routes/event.routes.js'
// import healthcheckRouter from "./routes/healthcheck.routes.js"


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/organisation", organisationRouter)
app.use("/api/v1/events", eventRouter)


// http://localhost:8000/api/v1/users/register

export { app }