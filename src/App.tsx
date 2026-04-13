import { useEffect, useState } from 'react'
import LightCard from './components/LightCard'
import './App.css'

type Light = {
    id: string
    name: string
    isOn: boolean
}

type HueLight = {
    name: string
    state: {
        on: boolean
    }
}

const customLightNames: Record<string, string> = {
    '1': 'Den Light 1',
    '2': 'Den Light 2',
    '3': 'Kitchen Light 1',
    '4': 'Kitchen Light 2',
    '5': 'Living Room Light 1',
    '6': 'Living Room Light 2',
    '7': 'Bathroom Hallway Light 1',
    '8': 'Bathroom Hallway Light 2',
    '9': 'Front Hallway Light 1',
    '10': 'Front Hallway Light 2',
}

function App() {
    const [lights, setLights] = useState<Light[]>([])
    const fetchLights = () => {
        fetch(
            'http://192.168.0.201/api/REMOVED/lights'
        )
            .then((res) => res.json())
            .then((data: Record<string, HueLight>) => {
                const shaped: Light[] = Object.entries(data).map(
                    ([id, light]: [string, HueLight]) => ({
                        id,
                        name: customLightNames[id] || light.name,
                        isOn: light.state.on,
                    })
                )
                setLights(shaped)
            })
    }
    useEffect(() => {
        fetchLights()
    }, [])
    return (
        <>
            <h1 className="page-title">Welcome!</h1>
            <h2 className="page-subtitle">Smart Home dashboard</h2>
            <div className="lightcontrolssize">
                <h3 className="lightcontrolstitle">Light Controls</h3>
                <div className="lightcontrolsgrid">
                    {lights.map((light) => (
                        <LightCard
                            key={light.id}
                            light={light}
                            refresh={fetchLights}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
