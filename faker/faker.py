# pip install faker

import json
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()

def generate_fake_session_times():
    # Generar una fecha y hora ficticia para sessionStart
    session_start = fake.date_time_this_year()

    # Generar una duración aleatoria para la sesión (entre 1 y 5 horas)
    session_duration = timedelta(hours=random.randint(1, 5))

    # Calcular sessionEnd asegurándonos de que no sea anterior a sessionStart
    session_end = session_start + session_duration

    return {
        "sessionStart": session_start.isoformat(),
        "sessionEnd": session_end.isoformat()
    }

def generate_fake_temperaturePref():
    tempMin = round(random.uniform(18.0, 20.5),2)
    tempExtra = round(random.uniform(2.0, 4.5),2)
    tempMax = tempMin + tempExtra

    return{
        "temp_val_min": tempMin,
        "temp_val_max": tempMax
    }

def get_fake_rfid_data(usuario):
    data = {
        "id_RFID": fake.uuid4(),
        "user": usuario,
        "active": fake.boolean(),
        "detections": random.randint(1, 10)
        # updatedAt se queda vacio
    }
    return data

def get_fake_sesion_data(usuario):
    session_times = generate_fake_session_times()

    data = {
        "id_sesion": fake.uuid4(),
        "id_user": usuario,
        "sessionStart": session_times["sessionStart"],
        "sessionEnd": session_times["sessionEnd"]
    }

    return data

def get_fake_preferences_data(usuario):
    preferencias = generate_fake_temperaturePref()
    data = {
        "id_user": usuario,
        "temp_val_min": preferencias["temp_val_min"],
        "temp_val_max": preferencias["temp_val_max"]  
    }
    return data

def get_fake_temperature_data(sesion):
    data = {
        "id_temperature": fake.uuid4(),
        "temp_registered": round(random.uniform(18.0, 25.5),2),
        "id_sesion": sesion
    }
    return data

def get_fake_lightConsumption_data(sesion):
    statusLight = ["Encendido", "Apagado"]
    status = random.choice(statusLight)
    
    data = {
        "id_light": fake.uuid4(),
        "id_sesion": sesion,
        "lightAfter": status
    }
    return data
  
def get_fake_movement_data():
    incidente = generate_fake_session_times()    
    data = {
        "id_movement": fake.uuid4(),
        "triggerTime": incidente["sessionEnd"],
        "duringSession": fake.boolean()
    }
    return data

def get_fake_WorkingTime_data(sesion):
    data = {
        "id_time": fake.uuid4(),
        "worktime": round(random.uniform(0.0, 2.0),2),
        "id_sesion": sesion
    }
    return data
    

def main():
    # Generar datos ficticios para RFID
    fake_rfid_data = get_fake_rfid_data("Oscar")

    # Generar datos ficticios para sesiones
    fake_sesion_data = get_fake_sesion_data("Oscar")

    # Generar datos ficticios para Preferences
    fake_preferences_data = get_fake_preferences_data("Oscar")

    # Generar datos ficticios para Temperature
    fake_temperature_data = get_fake_temperature_data("0bd5d7cb-6f06-45f4-920e-85caf8ea8d53")

    # Generar datos ficticios para LightConsumption
    fake_lightConsumption_data = get_fake_lightConsumption_data("0bd5d7cb-6f06-45f4-920e-85caf8ea8d53")

    # Generar datos ficticios para Movement
    fake_movement_data = get_fake_movement_data()

    # Generar datos ficticios para WorkingTime
    fake_WorkingTime_data = get_fake_WorkingTime_data("0bd5d7cb-6f06-45f4-920e-85caf8ea8d53")


    # Combinar los datos ficticios
    combined_data = {
        "RFID": fake_rfid_data,
        "Sesion": fake_sesion_data,
        "Preferences": fake_preferences_data,
        "Temperature": fake_temperature_data,
        "LightConsumption": fake_lightConsumption_data,
        "Movement": fake_movement_data,
        "WorkingTime": fake_WorkingTime_data 
        }

    # Convertir el diccionario combinado a formato JSON
    json_data = json.dumps(combined_data, indent=2)

    # Imprimir el resultado
    print(json_data)


main()