import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { BiCheckbox, BiSolidCheckboxChecked } from "react-icons/bi";

import { useState } from "react";
import { Layout } from "~/components/layout/layout";

import { api } from "~/utils/api";

export default function MessageDemo() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
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
            {dataView === "temperature" ? (
              <DisplayTemperature />
            ) : dataView === "light" ? (
              <DisplayLight />
            ) : (
              <p>No data view selected</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

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
    <div className="m-2 flex flex-col flex-wrap rounded-md bg-slate-500 p-2">
      <h2>Nombre: {device?.name ?? "Sin nombre"}</h2>
      <p>Connection ID: {device.connectionId}</p>
      <p>Tipo: {device.type ?? "Sin tipo"}</p>
      <div className="flex flex-col gap-y-3">
        <h2>Enviar mensaje:</h2>
        <input value={data} onChange={(e) => setData(e.target.value)} />
        <button
          className="rounded-md bg-green-300 p-2 w-fit"
          onClick={() =>
            mutation.mutate({ connectionId: deviceId, message: data })
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
        <div key={temperature.id}>
          <p>Temperature: {temperature.value}</p>
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
        <div key={lightMeasure.id}>
          <p>Temperature: {lightMeasure.value}</p>
          <p>Time: {lightMeasure.createdAt.toISOString()}</p>
        </div>
      ))}
    </div>
  );
};
