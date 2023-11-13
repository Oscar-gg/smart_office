import { api } from "~/utils/api";
import ValidImage from "../general/ValidImage";

export const UserCard = ({ id }: { id: string }) => {
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
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-end px-4 pt-4"></div>
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
        <span className="text-md text-gray-600 dark:text-gray-400 mt-3">
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
