import type { PrismaClient } from "@prisma/client";

import { endWorkTime, getSessionLight, startWorkTime } from "~/utils/aws";

// Utility functions to interact with sessions

export const isSessionActive = async ({ db }: { db: PrismaClient }) => {
  const lastSession = await db.sesion.findFirst({
    orderBy: { sesionStart: "desc" },
  });

  if (lastSession == null) return false;

  if (lastSession.sesionEnd == null) return true;

  return false;
};

export const startSession = async ({
  db,
  id_user,
}: {
  db: PrismaClient;
  id_user: string;
}) => {
  const activeSession = await isSessionActive({ db });
  if (activeSession) return false;

  try {
    await db.sesion.create({
      data: {
        id_user,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

export const getActiveSessionId = async ({ db }: { db: PrismaClient }) => {
  const lastSession = await db.sesion.findFirst({
    orderBy: { sesionStart: "desc" },
  });

  if (lastSession && lastSession?.sesionEnd == null)
    return lastSession.id_sesion;

  return null;
};

export const endSession = async ({
  db,
  id_user,
}: {
  db: PrismaClient;
  id_user: string;
}) => {
  const lastSession = await db.sesion.findFirst({
    orderBy: { sesionStart: "desc" },
  });

  if (lastSession == null || lastSession.sesionEnd !== null) return false;

  if (lastSession.id_user === id_user) {
    try {
      await db.sesion.update({
        where: {
          id_sesion: lastSession.id_sesion,
        },
        data: {
          sesionEnd: new Date(),
        },
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  } else {
    return false;
  }
};

export const endSessionById = async ({
  db,
  id_session,
}: {
  db: PrismaClient;
  id_session: string;
}) => {
  const session = await db.sesion.findUnique({
    where: {
      id_sesion: id_session,
    },
  });

  if (session == null || session.sesionEnd !== null) return false;

  try {
    await db.sesion.update({
      where: {
        id_sesion: session.id_sesion,
      },
      data: {
        sesionEnd: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const setSessionWorkTime = async ({
  db,
  id_sesion,
  workTime,
}: {
  db: PrismaClient;
  id_sesion: string;
  workTime: number;
}) => {
  try {
    await db.sesion.update({
      where: {
        id_sesion,
      },
      data: {
        WorkingTime: {
          create: {
            workTime,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

export const isRfidActive = async ({
  db,
  idRFID,
}: {
  db: PrismaClient;
  idRFID: string;
}) => {
  if (!(await isSessionActive({ db }))) {
    return "No hay sesion activa";
  }
  const lastSession = await db.sesion.findFirst({
    orderBy: { sesionStart: "desc" },
    include: {
      user: {
        include: {
          rfid: true,
        },
      },
    },
  });
  return lastSession?.user.rfid?.id_RFID === idRFID;
};

// Handle the logic for when a new detection has been detected
// Returns true if the servo should open, else returns a string with the error
export const onRfidDetection = async ({
  db,
  idRFID,
  userId,
}: {
  db: PrismaClient;
  idRFID: string;
  userId: string;
}) => {
  const activeSession = await isSessionActive({ db });

  // If a session is actie, only close it if the readed rfid is the same as the one that started the session
  if (activeSession) {
    const isRfid = await isRfidActive({
      idRFID,
      db,
    });

    // End session if the rfid is active
    if (typeof isRfid === "boolean" && isRfid) {
      const sessionId = await getActiveSessionId({ db });
      if (sessionId) {
        await endSessionById({ db, id_session: sessionId });
        await endWorkTime({ db, id_session: sessionId });
        await getSessionLight({ db, id_session: sessionId });
        return true;
      } else {
        console.log("Error: session id not found");
        return "No se encontró el id de la sesión.";
      }
    } else {
      return "Ya hay una sesión activa.";
    }
  } else {
    // Start a new session if there is no active session
    if (await startSession({ db, id_user: userId })) return true;
    // Restart the work time timer
    await startWorkTime({ db });

    return "Hubo un error al iniciar la sesión.";
  }
};
