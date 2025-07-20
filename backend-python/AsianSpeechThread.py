import sys
import os
import re  

sys.path.append("/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater")

import Asain_Par.PrimeMinister as PrimeMinister
import Asain_Par.DPM as DPM
import Asain_Par.GovtWhip as GovtWhip
import Asain_Par.OppositionLeader as OppositionLeader
import Asain_Par.DLO as DLO
import Asain_Par.OppWhip as OppWhip

OUTPUT_FOLDER = r"/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater/Data/AsianParliamentary/"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

motion = input("Enter the motion: ")

roles = {
    "01_PrimeMinister.txt": PrimeMinister,
    "02_DeputyPrimeMinister.txt": DPM,
    "03_GovernmentWhip.txt": GovtWhip,
    "04_LeaderOfOpposition.txt": OppositionLeader,
    "05_DeputyLeaderOfOpposition.txt": DLO,
    "06_OppositionWhip.txt": OppWhip,
}

def clean_speech(text):
    text = re.sub(r"Here is a.*?speech.*?:", "", text, flags=re.IGNORECASE)
    text = re.sub(r"(?i)Minute\s*\d+\s*", "", text)
    text = re.sub(r"(?i)Note:\s*.*", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()

for filename, module in roles.items():
    try:
        print(f"[+] Generating speech for: {filename}")
        raw_speech = module.generate(motion)
        speech = clean_speech(raw_speech)
        with open(os.path.join(OUTPUT_FOLDER, filename), "w", encoding="utf-8") as f:
            f.write(speech)
        print(f"✅ Saved: {filename}")
    except Exception as e:
        print(f"❌ Failed for {filename}: {e}")


