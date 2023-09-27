import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => {
    return useContext(DataContext);
}

export const DataProvider = ({ children }) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [weatherData,setWeatherData]=useState([]);

    return (
        <DataContext.Provider value={{weatherData,setWeatherData, latitude, setLatitude, longitude, setLongitude }}>
            {children}
        </DataContext.Provider>
    )
};