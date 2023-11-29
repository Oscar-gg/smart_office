import { useState } from "react";
import { Layout } from "~/components/layout/layout";
import { UserCard } from "~/components/card/UserCard";
import { api } from "~/utils/api";
import { DeviceCard } from "~/components/card/DeviceCard";
import { RfidCard } from "~/components/card/RfidCard";
import { LogTable } from "~/components/general/LogTable";
import { AdminStatistics } from "~/components/admin/adminStatistics";

// The following messages are supported:
// {"action": "servo", "open": "1"}
// {"action": "setPreferences", "upperBound": "100", "lowerBound": "0", "interval": "1000"}
// {"action": "startWorkTime"}
// {"action": "endWorkTime"}

const cardWrappertw =
  "m-2 flex flex-row flex-wrap rounded-md bg-slate-300 p-2 gap-x-4 gap-y-4 justify-center lg:justify-normal";

export default function MessageDemo() {
  const [pageView, setPageView] = useState<string>("Devices");

  return (
    <Layout>
      <div className="flex w-full flex-col flex-wrap justify-center gap-y-4">
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-blue-200 p-3">
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
          {pageView === "Devices" && <RefetchDeviceButton />}
        </div>
        <div className="w-full pl-2 pr-2">
          <PageSwitch page={pageView} />
        </div>
      </div>
    </Layout>
  );
}

const RefetchDeviceButton = () => {
  const mutation = api.aws.refreshDevices.useMutation({
    onSuccess: (data) => {
      alert(data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <button
      className="rounded-md bg-red-500 p-2
      text-white hover:bg-red-600"
      onClick={() => mutation.mutate()}
    >
      Refresh Devices
    </button>
  );
};

const PageSwitch = ({ page }: { page: string }) => {
  const mutation = api.device.generateData.useMutation({
    onSuccess: (data) => {
      alert(data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  if (page === "Devices") {
    return (
      <>
        <Devices />
        <button
          className="m-2 rounded-md bg-green-400 p-1"
          onClick={() => mutation.mutate()}
        >
          Generate Data
        </button>
      </>
    );
  } else if (page === "Users") {
    return <Users />;
  } else if (page === "RFID") {
    return <RFID />;
  } else if (page === "Logs") {
    return <LogTable />;
  } else if (page === "Statistics") {
    return <AdminStatistics/>;
  } else {
    return <div>Invalid page: {page}</div>;
  }
};

const Devices = () => {
  const { data: deviceIds, isLoading } = api.device.getDeviceIds.useQuery();
  return (
    <div className={cardWrappertw}>
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
  const { data: activeId } = api.session.getActiveUserId.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!userIds || userIds.length === 0) {
    return <div>Users not found</div>;
  }
  return (
    <div className={cardWrappertw}>
      {userIds.map((userId) => (
        <UserCard
          id={userId.id}
          key={userId.id}
          hasSessionActive={userId.id == activeId}
        />
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
    <div className={cardWrappertw}>
      {rfidIds.map((rfidId) => (
        <RfidCard id={rfidId.id_RFID} key={rfidId.id_RFID} />
      ))}
    </div>
  );
};
