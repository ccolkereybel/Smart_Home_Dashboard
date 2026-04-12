import "./LightCard.css";

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
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center">
      <div className="px-6 py-4">
        <h3 className="cardtitle">{light.name}</h3>
        <p className="lightstatus">Status: {light.isOn ? "ON" : "OFF"}</p>
        <button onClick={toggleLight} className="button">
          Change Status
        </button>
      </div>
    </div>
  );
}

export default LightCard;
