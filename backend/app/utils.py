# backend/app/utils.py

import csv
from .models import PowerPlant

def parse_csv_and_normalize(filepath: str):
    plants = []

    with open(filepath, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            try:
                # Extract and clean fields from GEN23 format
                plant_name = row.get("PNAME", "").strip()
                state = row.get("PSTATEABB", "").strip().upper()
                net_gen_raw = row.get("GENNTAN", "0").replace(",", "").replace('"', '').strip()
                net_generation_mwh = float(net_gen_raw) if net_gen_raw not in (None, '', 'NA') else 0.0

                plant = PowerPlant(
                    plant_name=plant_name,
                    state=state,
                    net_generation_mwh=net_generation_mwh
                )
                plants.append(plant)
            except Exception as e:
                # Optionally log the error and row for debugging
                continue  # Log in production

    return plants
