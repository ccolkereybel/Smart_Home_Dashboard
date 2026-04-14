import './LightCard.css'
import { Lightbulb } from 'lucide-react'

type Light = {
    id: string
    name: string
    isOn: boolean
}

type LightCardProps = {
    light: Light
    onToggle: (id: string) => void
}

function LightCard({ light, onToggle }: LightCardProps) {
    return (
        <div
            className="light-squares light-toggle-btn"
            onClick={() => {
                onToggle(light.id)
            }}
        >
            <h3 className="card-title">{light.name}</h3>
            <Lightbulb
                size={24}
                className={light.isOn ? 'bulb-on' : 'bulb-off'}
            />
        </div>
    )
}

export default LightCard
