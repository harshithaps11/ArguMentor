import os
import re
# from fpdf import FPDF
from rich.console import Console
from webscout import Llama3Mitril, exceptions
# from webscout import LLAMA
from webscout import Sambanova
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QLineEdit, QPushButton, QListWidget, QListWidgetItem, QVBoxLayout, QWidget, QHBoxLayout, QTextEdit, QScrollArea
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QColor, QFont, QTextCursor
# import fitz  # PyMuPDFimport os
from rich.console import Console
from webscout import Sambanova, GoogleSearch
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QLineEdit, QPushButton, QListWidget, QListWidgetItem, QVBoxLayout, QWidget, QHBoxLayout, QTextEdit, QScrollArea
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QColor, QFont, QTextCursor

console = Console()

import asyncio
import os
import threading  
import edge_tts
import pygame
import random

VOICE = "en-AU-WilliamNeural"
BUFFER_SIZE = 1024

def remove_file(file_path):
    max_attempts = 3
    attempts = 0
    while attempts < max_attempts:
        try:
            with open(file_path, "wb"):
                pass  
            os.remove(file_path)
            break
        except Exception as e:
            print(f"Error removing file: {e}")
            attempts += 1

async def generate_tts(TEXT, output_file):
    try:
        cm_txt = edge_tts.Communicate(TEXT, VOICE)
        await cm_txt.save(output_file)
    except Exception as e:
        print(f"\033[91mError during TTS generation: {e}\033[0m")  

def play_audio(file_path):
    pygame.mixer.init()
    pygame.mixer.music.load(file_path)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():
        continue
    pygame.mixer.quit()

def TTS(TEXT, func=lambda r=None:True):
    output_file = "output.mp3"
    tts_thread = threading.Thread(target=lambda: asyncio.run(generate_tts(TEXT, output_file)))
    tts_thread.start()
    tts_thread.join()  

    if os.path.exists(output_file):
        play_thread = threading.Thread(target=play_audio, args=(output_file,))
        play_thread.start()
        play_thread.join()

    remove_file(output_file)

def TextToSpeech(Text, func=lambda r=None:True):
    Data = str(Text).split(".")

    responses = [
            "The rest of the result has been printed to the chat screen, kindly check it out sir.",
            "The rest of the text is now on the chat screen, sir, please check it.",
            "You can see the rest of the text on the chat screen, sir.",
            "The remaining part of the text is now on the chat screen, sir.",
            "Sir, you'll find more text on the chat screen for you to see.",
            "The rest of the answer is now on the chat screen, sir.",
            "Sir, please look at the chat screen, the rest of the answer is there.",
            "You'll find the complete answer on the chat screen, sir.",
            "The next part of the text is on the chat screen, sir.",
            "Sir, please check the chat screen for more information.",
            "There's more text on the chat screen for you, sir.",
            "Sir, take a look at the chat screen for additional text.",
            "You'll find more to read on the chat screen, sir.",
            "Sir, check the chat screen for the rest of the text.",
            "The chat screen has the rest of the text, sir.",
            "There's more to see on the chat screen, sir, please look.",
            "Sir, the chat screen holds the continuation of the text.",
            "You'll find the complete answer on the chat screen, kindly check it out sir.",
            "Please review the chat screen for the rest of the text, sir.",
            "Sir, look at the chat screen for the complete answer."
        ]
    #

    
    TTS(Text.replace("*", ""), func)

BASE_SAVE_DIR = os.getcwd()

def fetch_latest_info(motion):
    """
    Fetch recent, real-world facts on the motion using GoogleSearch from webscout.
    """
    console.print(f"[bold cyan]Fetching latest facts for:[/bold cyan] {motion}")

    try:
        google = GoogleSearch(timeout=10, proxies=None, verify=True)
        text_results = google.text(
            keywords=motion + " site:un.org OR site:amnesty.org OR site:bbc.com OR site:guardian.com OR site:humanrightswatch.org",
            region="us",
            safesearch="moderate",
            max_results=5
        )

        if not text_results:
            return "No recent information available."

        facts = ""
        for result in text_results[:3]:
            facts += f"\nTitle: {result.title}\nSummary: {result.description[:300]}\nSource: {result.url}\n---\n"
        return facts.strip()
    except Exception as e:
        console.print(f"[bold red]Error during web search:[/bold red] {e}")
        return "Could not fetch the latest facts due to an error."

def Speech_Gen(Motion, information, role):
    # time =  int(input("enter the time of the motion : "))
    # side = "Opposition"
    latest_context = fetch_latest_info(Motion)
    information = str(information)

    system_prompt = f"""
    You are an experienced debate adjudicator giving direct feedback to a speaker after a competitive debate round.

You will be given:

The role the speaker played (e.g. Prime Minister, Leader of Opposition, Whip, Reply).

The motion of the debate.

The full content of the speaker's speech.

Your feedback should be detailed, constructive, and structured in the following format — addressing the speaker directly using "you".

1. How did you speak?
Evaluate the speaker’s delivery, structure, clarity, logical flow, tone, and confidence. Highlight what you think they did well and where they struggled. Use direct language like:
“You maintained good structure but your tone was a bit rushed…” or
“Your delivery was strong and persuasive…”

2. What points did you miss?
Critically analyze the content in relation to the motion and the speaker's role. Identify key arguments, rebuttals, or responsibilities the speaker should have covered, but didn’t. Say things like:
“You missed engaging with the core values clash in this motion…” or
“As a Whip speaker, you didn’t crystallize the clash clearly…”

3. Suggestions for improvement
Offer specific, actionable tips that the speaker can apply in future debates. Keep the tone constructive and personal:
“Next time, try prioritizing your arguments more clearly…”
“Work on handling POIs more confidently…”

Be fair, realistic, and speak as though you're giving helpful post-round oral adjudication.

Inputs:

Speaker Role: {role}

Motion: {Motion}

Speech Content: {information}

Now generate your feedback directly to the speaker.


    

    """

    LLAMA3_client_model_1 = Sambanova(
        is_conversation=True,
        timeout=1000000,
        max_tokens=8028,
        intro=system_prompt,
        system_prompt=system_prompt,
        model='Meta-Llama-3.1-8B-Instruct',
        api_key="8bb1f2ae-f908-42cb-878e-cafacb8fb893"
    )

    speech = LLAMA3_client_model_1.chat(Motion)
    speech = speech.replace("**", "")
    speech = speech.replace("*","")
    print(speech)
    TTS(speech)

if __name__ == "__main__":
    Motion = input("enter the motion : ")
    Speech_Gen(Motion, """Today, I rise firmly in proposition of the motion that One Nation, One Election is good for India.

Let me begin with a simple truth — elections are the lifeblood of democracy, but too many elections, too frequently, drain our resources, disrupt governance, and polarize society. India, as the world’s largest democracy, holds elections almost every few months — to Parliament, state assemblies, municipalities, and more. The constant cycle of elections leads to what we call “governance paralysis” — where leaders focus more on winning votes than working for the people.

One Nation, One Election would mean holding simultaneous elections to Lok Sabha and state assemblies. This would drastically reduce public expenditure, which currently runs into thousands of crores per election cycle, spent on security, logistics, and manpower.

Moreover, frequent use of Model Code of Conduct stalls policy implementation across states. Unified elections would allow governments to focus fully on governance, not just vote banks.

It will also strengthen national unity — giving citizens across the country a shared democratic experience, instead of fragmented mandates.

To conclude, this reform is not just about efficiency — it’s about empowering democracy itself. Let’s act decisively. Let’s make democracy work better.

Thank you.

""", role="Prime Minister")

