import { useEffect, useState } from "react";
import LightCard from "./components/LightCard";
import "./App.css";

type Light = {
  id: string;
  name: string;
  isOn: boolean;
};

type HueLight = {
  name: string;
  state: {
    on: boolean;
  };
};

function App() {
  const [lights, setLights] = useState<Light[]>([]);
  const fetchLights = () => {
    fetch(
      "http://192.168.0.201/api/REMOVED/lights",
    )
      .then((res) => res.json())
      .then((data: Record<string, HueLight>) => {
        const shaped: Light[] = Object.entries(data).map(
          ([id, light]: [string, HueLight]) => ({
            id,
            name: light.name,
            isOn: light.state.on,
          }),
        );
        setLights(shaped);
      });
  };
  useEffect(() => {
    fetchLights();
  }, []);
  return (
    <>
      <h1>SmartHome Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {lights.map((light) => (
          <LightCard key={light.id} light={light} refresh={fetchLights} />
        ))}
      </div>
    </>
  );
}

export default App;
