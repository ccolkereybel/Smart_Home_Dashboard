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
        <h3 className="font-bold text-xl mb-2 text-center">{light.name}</h3>
        <p className="text-gray-700 text-base text-center">
          Status: {light.isOn ? "ON" : "OFF"}
        </p>
        <button
          onClick={toggleLight}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
          rounded text-gray-700 text-base"
        >
          Change Status
        </button>
      </div>
    </div>
  );
}

export default LightCard;
