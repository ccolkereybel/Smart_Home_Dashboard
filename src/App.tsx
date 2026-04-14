import { useEffect, useState } from 'react'
import LightCard from './components/LightCard'
import './App.css'
import { mockLights } from './data/mockLights'

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

const API_KEY = import.meta.env.VITE_HUE_API_KEY
const BRIDGE_IP = import.meta.env.VITE_HUE_BRIDGE_IP
const BASE_URL = `http://${BRIDGE_IP}/api/${API_KEY}`
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

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
        if (USE_MOCK) {
            setLights(mockLights)
            return
        }
        fetch(`${BASE_URL}/lights`)
            .then((res) => res.json())
            .then((data: Record<string, HueLight>) => {
                const shaped: Light[] = Object.entries(data).map(
                    ([id, light]) => ({
                        id,
                        name: customLightNames[id] || light.name,
                        isOn: light.state.on,
                    })
                )
                setLights(shaped)
            })
    }

    const toggleLight = (id: string) => {
        if (USE_MOCK) {
            setLights((prev) =>
                prev.map((light) =>
                    light.id === id ? { ...light, isOn: !light.isOn } : light
                )
            )
            return
        }

        const light = lights.find((l) => l.id === id)

        fetch(`${BASE_URL}/lights/${id}/state`, {
            method: 'PUT',
            body: JSON.stringify({
                on: !light?.isOn,
            }),
        }).then(fetchLights)
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
                            onToggle={toggleLight}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
