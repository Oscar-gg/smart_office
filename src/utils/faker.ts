import type { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

interface SessionTimes {
  sesionStart: Date;
  sesionEnd: Date;
}

interface TemperaturePref {
  temp_val_min: number;
  temp_val_max: number;
}

interface RFIDData {
  id_RFID: string;
  user: string;
  active: boolean;
  detections: number;
}

interface SessionData {
  id_sesion: string;
  id_user: string;
  sesionStart: Date;
  sesionEnd: Date;
}

interface PreferencesData {
  id_user: string;
  temp_val_min: number;
  temp_val_max: number;
}

interface TemperatureData {
  id_temperature: string;
  temp_registered: number;
  id_sesion: string;
}

interface LightConsumptionData {
  id_light: string;
  id_sesion: string;
  lightAfter: string;
}

interface MovementData {
  id_movement: string;
  triggerTime: Date;
  duringSession: boolean;
}

interface WorkingTimeData {
  id_time: string;
  workTime: number;
  id_sesion: string;
}

interface CombinedData {
  Sesion: SessionData;
  Temperature: TemperatureData;
  LightConsumption: LightConsumptionData;
  WorkingTime: WorkingTimeData;
}

function generateFakeSessionTimes(sessionEnd: Date): SessionTimes {
  const session_duration_minutes = faker.number.int({
    min: 10,
    max: 240,
  });

  const sessionStart = new Date(
    sessionEnd.getTime() - session_duration_minutes * 1000 * 60,
  );

  return {
    sesionStart: sessionStart,
    sesionEnd: sessionEnd,
  };
}

function generateFakeTemperaturePref(): TemperaturePref {
  const tempMin = faker.number.float({
    min: 18.0,
    max: 20.5,
    precision: 0.01,
  });
  const tempExtra = faker.number.float({
    min: 2.0,
    max: 4.5,
    precision: 0.01,
  });
  const tempMax = tempMin + tempExtra;

  return {
    temp_val_min: tempMin,
    temp_val_max: tempMax,
  };
}

function getFakeSesionData(usuario: string, time: Date): SessionData {
  const gapInterval = faker.number.int({ min: 5, max: 30 });
  const newTime = new Date(time.getTime() - gapInterval * 1000 * 60);
  const sessionTimes = generateFakeSessionTimes(newTime);

  return {
    id_sesion: faker.string.uuid(),
    id_user: usuario,
    sesionStart: sessionTimes.sesionStart,
    sesionEnd: sessionTimes.sesionEnd,
  };
}

function getFakePreferencesData(usuario: string): PreferencesData {
  const preferences = generateFakeTemperaturePref();

  return {
    id_user: usuario,
    temp_val_min: preferences.temp_val_min,
    temp_val_max: preferences.temp_val_max,
  };
}

function getFakeTemperatureData(sesion: string): TemperatureData {
  return {
    id_temperature: faker.string.uuid(),
    temp_registered: faker.number.float({
      min: 18.0,
      max: 25.5,
      precision: 0.01,
    }),
    id_sesion: sesion,
  };
}

function getFakeLightConsumptionData(sesion: string): LightConsumptionData {
  const statusLight = ["Encendido", "Apagado"];
  const status = faker.helpers.arrayElement(statusLight);

  return {
    id_light: faker.string.uuid(),
    id_sesion: sesion,
    lightAfter: status,
  };
}

function getFakeMovementData(time: Date): MovementData {
  return {
    id_movement: faker.string.uuid(),
    triggerTime: time,
    duringSession: true,
  };
}

function getFakeWorkingTimeData(sesion: string): WorkingTimeData {
  return {
    id_time: faker.string.uuid(),
    workTime: faker.number.float({ min: 0.0, max: 2.0, precision: 0.01 }),
    id_sesion: sesion,
  };
}

// function main() {
//   const usuario = "Oscar";
//   const fakeRFIDData = getFakeRFIDData(usuario);
//   const fakeSesionData = getFakeSesionData(usuario);
//   const fakePreferencesData = getFakePreferencesData(usuario);
//   const fakeTemperatureData = getFakeTemperatureData(
//     "0bd5d7cb-6f06-45f4-920e-85caf8ea8d53",
//   );
//   const fakeLightConsumptionData = getFakeLightConsumptionData(
//     "0bd5d7cb-6f06-45f4-920e-85caf8ea8d53",
//   );
//   const fakeMovementData = getFakeMovementData();
//   const fakeWorkingTimeData = getFakeWorkingTimeData(
//     "0bd5d7cb-6f06-45f4-920e-85caf8ea8d53",
//   );

//   const combinedData: CombinedData = {
//     Sesion: fakeSesionData,
//     Temperature: fakeTemperatureData,
//     LightConsumption: fakeLightConsumptionData,
//     Movement: fakeMovementData,
//     WorkingTime: fakeWorkingTimeData,
//   };

//   const jsonData = JSON.stringify(combinedData, null, 2);

//   console.log(jsonData);
// }

// For each user, add "sessionCount" sessions
// Sessions are added to the start of the session list, that is, in the past. To avoid having overlapping sessions or sessions in the future.
export const generateData = async ({
  sessionCount,
  db,
}: {
  sessionCount: number;
  db: PrismaClient;
}) => {
  const users = await db.user.findMany({
    select: {
      id: true,
    },
  });

  for (let i = 0; i < users?.length; i++) {
    const user = users[i];
    if (!user) continue;

    let lastSessionStart = (
      await db.sesion.findFirst({
        where: {
          id_user: user.id,
        },
        orderBy: {
          sesionStart: "asc",
        },
        select: {
          sesionStart: true,
        },
      })
    )?.sesionStart;

    lastSessionStart = lastSessionStart ?? new Date();

    for (let j = 0; j < sessionCount; j++) {
      const fakeSesionData = getFakeSesionData(user.id, lastSessionStart);
      lastSessionStart = fakeSesionData.sesionStart;

      const hasTempPref = await db.preferences.findUnique({
        where: {
          id_user: user.id,
        },
      });

      // Add preferences if user doesn't have them
      if (!hasTempPref) {
        const fakePreferencesData = getFakePreferencesData(user.id);
        await db.preferences.create({
          data: fakePreferencesData,
        });
      }

      const fakeTemperatureData = getFakeTemperatureData(
        fakeSesionData.id_sesion,
      );
      const fakeLightConsumptionData = getFakeLightConsumptionData(
        fakeSesionData.id_sesion,
      );
      const fakeWorkingTimeData = getFakeWorkingTimeData(
        fakeSesionData.id_sesion,
      );

      const combinedData: CombinedData = {
        Sesion: fakeSesionData,
        Temperature: fakeTemperatureData,
        LightConsumption: fakeLightConsumptionData,
        WorkingTime: fakeWorkingTimeData,
      };

      // Perform operations in a transaction to avoid partial data
      await db.$transaction(async (prisma) => {
        await prisma.sesion.create({
          data: combinedData.Sesion,
        });

        await prisma.workingTime.create({
          data: combinedData.WorkingTime,
        });

        await prisma.lightConsumption.create({
          data: combinedData.LightConsumption,
        });

        // Generate temperatures within the session duration
        const sessionStart = new Date(fakeSesionData.sesionStart);
        const sessionEnd = new Date(fakeSesionData.sesionEnd);

        let currentTime = sessionStart;

        const tempInterval = 1000 * 60 * 5; // 5 minutes 

        while (currentTime < sessionEnd) {
          const fakeTemperatureData = getFakeTemperatureData(
            fakeSesionData.id_sesion,
          );

          await prisma.temperature.create({
            data: { ...fakeTemperatureData, createdAt: currentTime },
          });

          currentTime = new Date(currentTime.getTime() + tempInterval);
        }

        currentTime = sessionStart;

        while (currentTime < sessionEnd) {
          const fakeMovementData = getFakeMovementData(currentTime);

          await prisma.movement.create({
            data: fakeMovementData,
          });

          // Generate a random increment between 5 and 10 minutes
          const movementStep =
            1000 * 60 * faker.number.int({ min: 5, max: 10 });

          currentTime = new Date(currentTime.getTime() + movementStep);
        }
      }, {
        timeout: 60000 // 1 minute
      });
    }
  }
};
