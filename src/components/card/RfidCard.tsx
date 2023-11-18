import { api } from "~/utils/api";

import { useRef, useState } from "react";
import Select from "react-select";
import { ModalInner } from "../general/modal";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const RfidCard = ({ id }: { id: string }) => {
  const { data: rfidData, isLoading } = api.rfid.getRFIDById.useQuery({
    id: id,
  });

  const { data: rfidUsers } = api.user.getPossibleRFIDUsers.useQuery({
    idRfid: id,
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const options = rfidUsers?.map((rfidUser) => ({
    value: rfidUser.id,
    label: rfidUser.email,
  }));

  const mutation = api.rfid.updateRFIDOwner.useMutation({
    onSuccess: (data) => {
      alert(data);
    },
  });

  const [newUser, setNewUser] = useState<string>("");

  if (isLoading) {
    return (
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <div>Loading...</div>
      </div>
    );
  } else if (!rfidData) {
    return (
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <div>RFID not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <dialog className="rounded-md" ref={dialogRef}>
        <ModalInner title="Detalles del RFID" modalRef={dialogRef}>
          <div className="flex flex-col">
            {rfidData.user ? (
              <>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Nombre de usuario: {rfidData.user.name}
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Contacto: {rfidData.user.email ?? "Sin contacto"}
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Rol: {rfidData.user.role ?? "Sin rol"}
                </p>
              </>
            ) : (
              <p> El RFID seleccionado no tiene usuario asignado.</p>
            )}
          </div>
        </ModalInner>
      </dialog>

      <div className="mb-2 flex items-center justify-between">
        <AiOutlineInfoCircle
          onClick={handleClick}
          className="text-gray-500 ml-auto"
          size={25}
        />
      </div>

      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        ID: {rfidData.id_RFID}
      </h5>

      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Activo: {rfidData.active ? "Si" : "No"}
      </p>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Detecciones: {rfidData.detections}
      </p>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Última modificación: {rfidData.updatedAt.toLocaleTimeString()}
      </p>
      {options && (
        <>
          <h4>Seleccionar usuario:</h4>
          <Select
            className="mb-3"
            onChange={(event) => {
              setNewUser(event?.value ?? "");
            }}
            options={options}
            placeholder="Seleccione un usuario de la lista"
            isClearable={true}
          />
          <button
            className="w-fit rounded-md bg-green-300 p-2"
            onClick={() =>
              mutation.mutate({
                id: id,
                id_user: newUser,
              })
            }
          >
            Modificar
          </button>
        </>
      )}
    </div>
  );
};
