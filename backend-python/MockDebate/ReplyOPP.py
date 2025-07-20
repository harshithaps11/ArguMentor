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

def Speech_Gen(Motion):
    # time =  int(input("enter the time of the motion : "))
    side = "Opposition"
    latest_context = fetch_latest_info(Motion)

    system_prompt = f"""
    You are a professional debate speechwriter. Write a 3 minute rebuttal speech on the motion: "{Motion}" and the speaker is on the side: "{side}".

    START WITH THE MOST RECENT INFORMATION:
    {latest_context}
    Act as a real-life competitive debater, experienced in Model UNs and national-level debate tournaments.
Your task is to generate a rebuttal speech, not an opening speech. The speech must:

Be 2–3 minutes long (approx. 350–450 words).

Use simple and human-friendly language that is easy to pronounce, natural sounding, and not AI-like.

Be written in a tone that reflects confident, experienced debating, similar to how a real high-school or college debater speaks.

Follow the format and style of a typical MUN or debate sample speech: conversational, punchy, sarcastic where appropriate, clear transitions, emotionally engaging, and backed with reasoning.

Directly rebut expected points made by the opponent by assuming their likely claims (such as idealistic, vague, or hypocritical statements).

Provide clear logic and step-by-step reasoning to prove why those points are flawed.

Use real-world examples, including:

Articles from the United Nations (especially UN Charter, UNHRC, UNGA, ICJ, etc.)

Case studies, country-specific incidents, reports, or reliable websites.

Legal articles, global policy papers, or proven statistical data if needed.

Use factual blunders made by the opposing side (if provided), and don’t just mention them — explain why they are logically invalid.

Include subtle, intelligent roasts or sarcastic comments that make your argument stronger and expose hypocrisy — but keep it classy and debate-appropriate.

End the speech with a strong reaffirmation of your side of the motion, showing clearly why the opponent’s argument does not hold ground.

Never say "my opponent mentioned that..." — instead, phrase it as "the opposing side might argue..." or "one might claim that..."

Avoid generic phrases like “I believe”, “we should all agree”, or “this is important.”
Be specific, assertive, factual, and logically superior — as if you're speaking in front of experienced judges in a national-level debate.


Below is the sample speech, now generate this rebuttal speech as same as the format of the sample speech. make it human language like th esample speech which has been provided to you below


2) Addressing Human trafficking in migrant worker populations

Sir around 70% of all trafficking victims are women and girls.
trafficking in persons has obviously become a major issue and the concerning part about this is many countries have worsening scores in trafficking as per the Organized crime index.

Another surprising issue since we're emphasising on women protection is that Finding number 11 of the UNODC's global report on trafficking in persons 2022 highlighted that women are far more likely to be prosecuted than men.

We obviously support convicting the guilty but why such an imbalance?

Sir regarding prevention of trafficking in persons the solutions are very simple

Firstly for countries with a lot of trafficking incidents, fast track courts should be set up that only hear cases of trafficking in order to expedite the conviction or the release and so that the victim is brought to justice as soon as possible.

Secondly, as I highlighted earlier, we need legislative updates in some member states and in others, we need a major improvement of the executive since the legislature is useless if the executive and judiciary does not work.

To truly assess the damage done every year, member states must carry out thorough surveys and to some extent collaborate with NGOs in order to provide rehabilitation and humanitarian aid to victims.

Even the Joy Ezeilo emphasis in the Special Rapporteur report stated that trafficked persons have a right to an effective remedy for recovery from the ordeal of trafficking and it is an essential component.



Now i want the same format as the sample speech like sir or other words in human laguage 
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
    print(speech)

if __name__ == "__main__":
    Motion = input("enter the motion : ")
    Speech_Gen(Motion)


        