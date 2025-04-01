import React,{ useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [Country, setCountry] = useState("");
    const [timeData, setTimeData] = useState(null);

    
    useEffect(() => {
      if (timeData) {
        console.log("response from backend", timeData);
      }
    }, [timeData]);
    


  const handleSubmit = async(e)=>{
    e.preventDefault()
    const pickCountry ={Country}
    console.log(pickCountry)
    
    try {
      const response = await fetch ("http://localhost:3000/",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(pickCountry)
      
    })
    const data = await response.json(); //bu kısımı düzelt backend veri gönder
    

    if (data.success) {
      setTimeData({ time: data.time, date: data.date });
      {console.log("response from state",timeData)}
    }
  } 
  
  catch (error) {
    console.error(error);

  }

  }


   
  return (
    <>
    <h1>test</h1>
      <div>


          <form onSubmit={handleSubmit} >
          <select name="Country" id="Country" onChange={(e)=>{setCountry(e.target.value)}}>
          <option value="">Select a city</option>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
          <option value="Istanbul">Istanbul</option>
          <option value="New York">New York</option>
          </select>
            <button type='submit' disabled={Country===""}>Check Time</button>
          </form>
        
          {timeData && (
            <div>
            <h2>current time:</h2>
            <p>{timeData.date} - {timeData.time}</p>
            </div>
          )}

        </div>

    </>
  )
}

export default App
