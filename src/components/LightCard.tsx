type Light = {
  id: string;
  name: string;
  isOn: boolean;
};

type LightCardProps = {
  light: Light;
};

function LightCard({ light }: LightCardProps) {
  return (
    <div>
      <h3>{light.name}</h3>
      <p>Status: {light.isOn ? "ON" : "OFF"}</p>
    </div>
  );
}

export default LightCard;
