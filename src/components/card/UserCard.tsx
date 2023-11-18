import { api } from "~/utils/api";
import ValidImage from "../general/ValidImage";
import { RiRadioButtonLine } from "react-icons/ri";

export const UserCard = ({
  id,
  hasSessionActive,
}: {
  id: string;
  hasSessionActive?: boolean;
}) => {
  const { data: userData, isLoading } = api.user.getUserById.useQuery({ id });

  if (isLoading) {
    return (
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <div>Loading...</div>
      </div>
    );
  } else if (!userData) {
    return (
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <div>User not found</div>
      </div>
    );
  }

  const now = new Date();

  const timeDiffMillis = Math.abs(
    now.getTime() - userData.lastRequest.getTime(),
  );

  const timeDiffMinutes = Math.round(timeDiffMillis / 60000);
  console.log(timeDiffMinutes);
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-start gap-x-3 px-4 pb-4 pt-4">
        {timeDiffMinutes < 5 ? (
          <>
            <RiRadioButtonLine className="text-green-500" />
            <p>En página web</p>
          </>
        ) : (
          <>
            <RiRadioButtonLine className="text-gray-500" />
            <p>Última vez: {timeDiffMinutes} minutos</p>
          </>
        )}
        {hasSessionActive && (
          <p className="ml-auto p-2 bg-green-300 rounded-md">
            En oficina
          </p>
        )}
      </div>
      <div className="flex flex-col items-center pb-10">
        <ValidImage
          src={userData?.image ?? "-1"}
          className="h-60 w-60 rounded-full"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userData?.name ?? "Sin nombre"}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          <b>Role:</b> {userData.role ?? "No Role"}
        </span>
        <span className="text-md mt-3 text-gray-600 dark:text-gray-400">
          Preferencias:
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          <b>Temperatura mínima:</b>{" "}
          {userData.Preferences?.temp_val_min ?? "No hay temperatura mínima"}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          <b>Temperatura máxima:</b>{" "}
          {userData.Preferences?.temp_val_max ?? "No hay temperatura máxima"}
        </span>
        <div className="mt-4 flex md:mt-6">
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            See User details
          </a>
        </div>
      </div>
    </div>
  );
};
