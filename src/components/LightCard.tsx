type Light = {
  id: string;
  name: string;
  isOn: boolean;
};

type LightCardProps = {
  light: Light;
  refresh: () => void;
};

function LightCard({ light, refresh }: LightCardProps) {
  const toggleLight = () => {
    fetch(
      `http://192.168.0.201/api/REMOVED/lights/${light.id}/state`,
      {
        method: "PUT",
        body: JSON.stringify({
          on: !light.isOn,
        }),
      },
    ).then(() => {
      refresh();
    });
  };
  return (
    <div>
      <h3>{light.name}</h3>
      <p>Status: {light.isOn ? "ON" : "OFF"}</p>
      <button onClick={toggleLight}>Change Status</button>
    </div>
  );
}

export default LightCard;
