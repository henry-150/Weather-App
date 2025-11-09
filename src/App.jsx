import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async (city) => {

    try {
      const apiKey = "f00c38e0279b7bc85480c3fe775d518c";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const result = await response.json();
      setWeather(result)
      console.log(result);
    } catch  {
      console.error("error");
    }

  }
  
  const handleKeypress = (e) => {
    if (e.key == "Enter") {
      fetchData(input)
    }
  }
  


  return (
    <>

      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#05051f] gap-2">
        <h1 className='text-white text-2xl mb-10'>🌦️ Weather app</h1>
        <div className="search-bar">
          <input
            type="text"
            className="city-search bg-gray-500 text-white rounded-md"
            placeholder="Enter City Name.."
            name="query"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeypress}
          />
        </div>

        <div className=" flex justify-center items-center gap-1">
          <button className='text-black bg-[#b8fffb] rounded-md p-1' onClick={()=>fetchData(input)} type="button">Search 🔍</button>
        </div>

        <div className="">
          {loading && <div className='text-red-700 text-xl'>Fetching data...</div>}
        </div>

        <div className="">
          {weather && (
            <div className="">
              <div className="text-white ">Weather in {weather.name} 🏢</div>
              <div className="text-white ">☁️Condition : {weather.weather[0].description}</div>
              <div className="text-white "> 🌡️Temprature: {weather.main.temp}</div>
              <div className="text-white ">🌬️Wind speed : {weather.wind.speed}</div>
              <div className="text-white ">💧Humidity : {weather.main.humidity}</div>
            </div>
          )}
        </div>
        
      </div>
    </>
  )
}

export default App