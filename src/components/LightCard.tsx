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

function LightCard({ light, refresh }: LightCardProps) {
    const toggleLight = () => {
        fetch(
            `http://192.168.0.201/api/REMOVED/lights/${light.id}/state`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    on: !light.isOn,
                }),
            }
        ).then(() => {
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
