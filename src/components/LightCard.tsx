import './LightCard.css'
import { Lightbulb } from 'lucide-react'

type Light = {
    id: string
    name: string
    isOn: boolean
}

type LightCardProps = {
    light: Light
    refresh: () => void
}

const API_KEY = import.meta.env.VITE_HUE_API_KEY
const BRIDGE_IP = import.meta.env.VITE_HUE_BRIDGE_IP
const BASE_URL = `http://${BRIDGE_IP}/api/${API_KEY}`

function LightCard({ light, refresh }: LightCardProps) {
    const toggleLight = () => {
        fetch(`${BASE_URL}/lights/${light.id}/state`, {
            method: 'PUT',
            body: JSON.stringify({
                on: !light.isOn,
            }),
        }).then(() => {
            refresh()
        })
    }
    return (
        <div className="light-squares light-toggle-btn" onClick={toggleLight}>
            <h3 className="card-title">{light.name}</h3>
            <Lightbulb
                size={24}
                className={light.isOn ? 'bulb-on' : 'bulb-off'}
            />
        </div>
    )
}

export default LightCard
