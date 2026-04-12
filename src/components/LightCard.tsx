import './LightCard.css'

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
        <div
            onClick={toggleLight}
            className={`light-squares ${light.isOn ? 'light-on' : 'light-off'}`}
        >
            <h3
                className={`card-title ${light.isOn ? 'title-on' : 'title-off'}`}
            >
                {light.name}
            </h3>
        </div>
    )
}

export default LightCard
