import { useRef, useState } from "react";
import { Layout } from "~/components/layout/layout";
import { UserCard } from "~/components/card/UserCard";
import { api } from "~/utils/api";
import { DeviceCard } from "~/components/card/DeviceCard";
import { RfidCard } from "~/components/card/RfidCard";
import { LogTable } from "~/components/general/LogTable";

// The following messages are supported:
// {"action": "servo", "open": "1"}
// {"action": "setPreferences", "upperBound": "100", "lowerBound": "0", "interval": "1000"}
// {"action": "startWorkTime"}
// {"action": "endWorkTime"}

const h2tw = "bg-slate-400 rounded-sm w-fit p-2 ml-auto mr-auto mb-2 mt-2";

export default function MessageDemo() {
  const [pageView, setPageView] = useState<string>("Devices");

  return (
    <Layout>
      <div className="flex w-full flex-col flex-wrap justify-center gap-y-4 ">
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 bg-blue-200 p-3">
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setPageView("Devices")}
          >
            Devices
          </button>
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setPageView("Users")}
          >
            Users
          </button>
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setPageView("RFID")}
          >
            RFID
          </button>
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setPageView("Logs")}
          >
            Logs
          </button>
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setPageView("Statistics")}
          >
            Statistics
          </button>
        </div>
        <div className="m-3">
          <PageSwitch page={pageView} />
        </div>
      </div>
    </Layout>
  );
}

const PageSwitch = ({ page }: { page: string }) => {
  if (page === "Devices") {
    return <Devices />;
  } else if (page === "Users") {
    return <Users />;
  } else if (page === "RFID") {
    return <RFID />;
  } else if (page === "Logs") {
    return <LogTable />;
  } else if (page === "Statistics") {
    return <p>Pending implementation</p>;
  } else {
    return <div>Invalid page: {page}</div>;
  }
};

const Devices = () => {
  const { data: deviceIds, isLoading } = api.device.getDeviceIds.useQuery();
  return (
    <div className="m-3 flex flex-row">
      {isLoading ? (
        <p>Loading...</p>
      ) : deviceIds && deviceIds.length > 0 ? (
        deviceIds.map((deviceId) => (
          <DeviceCard key={deviceId.connectionId} id={deviceId.connectionId} />
        ))
      ) : (
        <p>No devices found</p>
      )}
    </div>
  );
};

const Users = () => {
  const { data: userIds, isLoading } = api.user.getUserIds.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!userIds || userIds.length === 0) {
    return <div>Users not found</div>;
  }
  return (
    <div className="m-2 flex flex-row flex-wrap rounded-md bg-slate-300 p-2">
      {userIds.map((userId) => (
        <UserCard id={userId.id} key={userId.id} />
      ))}
    </div>
  );
};

const RFID = () => {
  const { data: rfidIds, isLoading } = api.rfid.getRFIDIds.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!rfidIds || rfidIds.length === 0) {
    return <div>RFIDs not found</div>;
  }
  return (
    <div className="m-2 flex flex-row flex-wrap rounded-md bg-slate-300 p-2">
      {rfidIds.map((rfidId) => (
        <RfidCard id={rfidId.id_RFID} key={rfidId.id_RFID} />
      ))}
    </div>
  );
};

const Logs = () => {
  const { data: logs, isLoading } = api.log.getLogs.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!logs || logs.length === 0) {
    return <div>Logs not found</div>;
  }

  return (
    <div className="m-2 flex w-fit flex-row flex-wrap rounded-md bg-slate-300 p-2">
      {logs.map((log) => (
        <div key={log.id_log} className="w-fit">
          <p>Id: {log.id_log}</p>
          <p>Message: {log.message}</p>
          <p>Time: {log.createdAt.toLocaleTimeString()}</p>
        </div>
      ))}
    </div>
  );
};

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

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [data, setData] = useState<string>("");

  if (isLoading || !device) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-2 flex flex-row flex-wrap gap-y-2 rounded-md bg-slate-500 p-2">
      <dialog ref={dialogRef}></dialog>
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
            mutation.mutate({ connectionId: deviceId, message: data })
          }
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
