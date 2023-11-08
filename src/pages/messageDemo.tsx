import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { BiCheckbox, BiSolidCheckboxChecked } from "react-icons/bi";

import { useState } from "react";
import { Layout } from "~/components/layout/layout";

import { api } from "~/utils/api";

export default function MessageDemo() {
  const { data: deviceIds, isLoading } = api.device.getDeviceIds.useQuery();

  const [dataView, setDataView] = useState<string>("temperature");

  return (
    <Layout>
      <div className="flex w-full flex-col flex-wrap justify-center gap-y-4 bg-blue-200">
        <div className="flex w-1/2 flex-row flex-wrap items-center gap-x-4 p-2">
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setDataView("temperature")}
          >
            Temperature
          </button>
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setDataView("light")}
          >
            Light
          </button>
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setDataView("rfid")}
          >
            RFID
          </button>
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setDataView("movement")}
          >
            Movement
          </button>
        </div>
        <div className="flex flex-row">
          <div className="flex w-1/2 flex-col p-2">
            {isLoading ? (
              <p>Loading...</p>
            ) : deviceIds && deviceIds.length > 0 ? (
              deviceIds.map((deviceId) => (
                <DeviceContainer
                  key={deviceId.connectionId}
                  deviceId={deviceId.connectionId}
                />
              ))
            ) : (
              <p>No devices found</p>
            )}
          </div>
          <div className="flex w-1/2 flex-col p-2">
            <DisplaySwitch type={dataView} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

const DisplaySwitch = ({ type }: { type: string }) => {
  if (type === "temperature") {
    return <DisplayTemperature />;
  } else if (type === "light") {
    return <DisplayLight />;
  } else if (type === "rfid") {
    return <DisplayRFID />;
  } else if (type === "movement") {
    return <DisplayMovement />;
  } else {
    return <div>Opción invalida: {type}</div>;
  }
};

const h2tw = "bg-slate-400 rounded-lg w-fit p-2";
const ptw = "bg-slate-200 rounded-lg w-fit p-2";

const DeviceContainer = ({ deviceId }: { deviceId: string }) => {
  const { data: device, isLoading } = api.device.getDeviceInfo.useQuery({
    connectionId: deviceId,
  });

  const mutation = api.aws.sendMessage.useMutation({
    onSuccess: (data) => {
      alert(data);
    },
  });

  const [data, setData] = useState<string>("");

  if (isLoading || !device) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-2 flex flex-row flex-wrap gap-y-2 rounded-md bg-slate-500 p-2">
      <div className="m-1 flex flex-row gap-x-2">
        <h2 className={h2tw}>Nombre: </h2>
        <p className={ptw}>{device?.name ?? "Sin nombre"}</p>
      </div>
      <div className="m-1 flex flex-row gap-x-2">
        <h2 className={h2tw}>Connection ID: </h2>
        <p className={ptw}>{device.connectionId}</p>
      </div>
      <div className="m-1 flex flex-row gap-x-2">
        <h2 className={h2tw}>Tipo: </h2>
        <p className={ptw}>{device.type ?? "Sin tipo"}</p>
      </div>
      <div className="flex flex-col gap-y-3">
        <h2 className={h2tw}>Enviar mensaje:</h2>
        <input value={data} onChange={(e) => setData(e.target.value)} />
        <button
          className="w-fit rounded-md bg-green-300 p-2"
          onClick={() =>
            mutation.mutate({ connectionId: deviceId, action: data })
          }
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

const DisplayTemperature = () => {
  const { data: temperatures, isLoading } =
    api.sensor.getTemperature.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (!temperatures || temperatures.length === 0) {
    return <p>Temperatures not found</p>;
  }

  return (
    <div className="m-2 flex flex-col flex-wrap rounded-md bg-slate-300 p-2">
      {temperatures.map((temperature) => (
        <div key={temperature.id_temperature}>
          <p>Temperature: {temperature.temp_registered}</p>
          <p>Time: {temperature.createdAt.toISOString()}</p>
        </div>
      ))}
    </div>
  );
};

const DisplayLight = () => {
  const { data: lightMeasurements, isLoading } = api.sensor.getLight.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!lightMeasurements || lightMeasurements.length === 0) {
    return <div>Light measurements not found</div>;
  }

  return (
    <div className="m-2 flex flex-col flex-wrap rounded-md bg-slate-300 p-2">
      {lightMeasurements.map((lightMeasure) => (
        <div key={lightMeasure.id_light}>
          <p>Light after: {lightMeasure.lightAfter}</p>
          <p>Sesion: {lightMeasure.id_sesion}</p>
        </div>
      ))}
    </div>
  );
};

const DisplayRFID = () => {
  const { data: rfidLectures, isLoading } =
    api.sensor.getRFIDLectures.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!rfidLectures || rfidLectures.length === 0) {
    return <div>Rfid lectures not found</div>;
  }

  return (
    <div className="m-2 flex flex-col flex-wrap rounded-md bg-slate-300 p-2">
      {rfidLectures.map((lecture) => (
        <div key={lecture.id_RFID}>
          <p>RFID lecture: {lecture.id_RFID}</p>
          <p>Detections: {lecture.detections}</p>
        </div>
      ))}
    </div>
  );
};

const DisplayMovement = () => {
  const { data: movements, isLoading } = api.sensor.getMovement.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!movements || movements.length === 0) {
    return <div>Movements not found</div>;
  }

  return (
    <div className="m-2 flex flex-col flex-wrap rounded-md bg-slate-300 p-2">
      {movements.map((movement) => (
        <div key={movement.id_movement}>
          <p>Id of movement: {movement.id_movement}</p>
          <p>Trigger time: {movement.triggerTime.toISOString()}</p>
        </div>
      ))}
    </div>
  );
};

// {"action": "servo", "open": "1"}
