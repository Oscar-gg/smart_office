import { api } from "~/utils/api";

const headers = ["Code", "Message", "User", "Date"];

export const LogTable = () => {
  const { data: logs, isLoading } = api.log.getLogs.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!logs || logs.length === 0) {
    return <div>Logs not found</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full border-4 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {headers[0]}
            </th>
            <th scope="col" className="px-6 py-3">
              {headers[1]}
            </th>
            <th scope="col" className="px-6 py-3">
              {headers[2]}
            </th>
            <th scope="col" className="px-6 py-3">
              {headers[3]}
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              key={log.id_log}
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {log.code}
              </th>
              <td className="px-6 py-4">{log.message}</td>
              <td className="px-6 py-4">{log.user?.name ?? "No user"}</td>
              <td className="px-6 py-4">
              {log.createdAt.toLocaleTimeString()}, {log.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
          {/* <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};
