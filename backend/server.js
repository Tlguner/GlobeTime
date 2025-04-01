import express from "express"
import cors from "cors"


const app = express();
app.use(express.json());

app.use(cors()); // Allow CORS if calling from the frontend




app.post("/", async(req,res)=>{
    try {


      const { Country } = req.body;
      console.log("Gelen Country:", Country); // ✅ Doğru şekilde logla
       const response= await fetch(`https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/${Country}`)
        const data= await response.json()
        console.log("Server Console:", data); // ✅ Logs in Node.js terminal

        console.log(data.date)
        console.log(data.time)
        res.json({
          success: true,
          date: data.date,
          time: data.time
        });
        

    } catch (error) {
        console.error(error)
        res.status(500).send("error fetching time")
    }
})


app.get("/",async (req,res)=>{
  res.send(`
    <h1>Test Tolga</h1>
    
  `);
})



const port = 3000;
app.listen(port,()=>{
    console.log("Listening on Port",port)});