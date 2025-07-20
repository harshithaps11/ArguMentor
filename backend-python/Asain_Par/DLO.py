prompt = """Asian Parliamentary
Asian Parliamentary (AP) debate is a three-on-three format modeled after parliamentary systems, particularly from the Commonwealth. It is widely used in Asia, especially in school and university circuits. AP debates involve two teams: the Government (Proposition) and the Opposition, each with three speakers. Teams alternate giving speeches, and Points of Information (POIs) are allowed during unprotected time.
Teams:
In the Asian Parliamentary format, each debate features:
-Two teams: Government (also called the Proposition) and Opposition.
-Each team has three speakers, resulting in six debaters in total.
-Teams are assigned sides before the debate begins and must defend their position regardless of personal belief.

Team Structure
Speaker Order:
-Prime Minister (Gov)
-Leader of the Opposition
-Deputy Prime Minister
-Deputy Leader of the Opposition
-Government Whip
-Opposition Whip
(Sometimes, a 7th Reply Speech is allowed (usually 4 minutes, one per side, given by the first or last speaker)
Speaker Roles:
Government (Proposition):
Prime Minister (PM):
-Defines the motion and sets the debate’s scope.
-Clarifies key terms.
-Presents the team’s case and outlines main arguments (usually 2-3).
-May introduce a model or policy if required by the motion.


Deputy Prime Minister (DPM):
-Rebuilds and strengthens PM’s case.
-Refutes the Leader of Opposition’s arguments.
-May introduce additional arguments (usually 1-2).
-Ensures cohesion and consistency.


Government Whip (GW):
-Provides holistic rebuttal to all opposition arguments.
-Summarizes and reinforces the government’s case.
-Does not introduce new arguments.
-Frames the debate and emphasizes key clashes.

Opposition:
Leader of Opposition (LO):
-Responds directly to PM’s definitions and arguments.
-May offer counter-definitions if necessary.
-Presents the opposition’s main case and key arguments (usually 2-3).


Deputy Leader of Opposition (DLO):
-Defends LO’s case and rebuts DPM.
-May introduce new arguments (1-2).
-Maintains logical consistency.

Opposition Whip (OW):
-Provides a complete summary of the debate from the opposition’s perspective.
-Rebuts all remaining government arguments.
-Does not present new arguments.
-Frames the round and emphasizes key points of the clash.

Speech Timings:
-Middle School: 5 minutes per speaker
-High School: 5 minutes per speaker.
-Reply Speech (if used): 4 minutes.
-Protected Time: First and last minute (no POIs).
Structure of a Speech:
Introduction
-Set the tone and present the team’s stance.
-Clarify definitions and give a roadmap of the speech.

Rebuttal
-Address and dismantle previous opposing arguments.
-Group related ideas and provide logical responses.

Constructive Arguments
-Present new material if the speaker is allowed to do so.
-Use structured format (Claim → Reasoning → Impact).
-Ensure argument alignment with the team line.


Comparison and Weighing
-Highlight clashes in the debate.
-Compare ideas and explain why your side is more impactful or valid.
-Weigh based on scale, harm, benefit, probability, and reversibility.


Conclusion
-Summarize your team’s strongest points.
-Reinforce how your team wins the debate.
-End with a clear and confident closing statement.


Structure of an Argument:
Claim
-The main point being made.
E.g., “Social media fosters civic engagement.”

Mechanism / Reasoning
-How and why the claim holds.
-Use logical reasoning, theories, or processes.
E.g., “Platforms allow easy access to political content and engagement.”

Impact
-The significance or consequences of the claim.
-Tie to real-world outcomes or debate values.
E.g., “This increases political participation, especially among youth.”


Weighing
-Explain why this argument matters more than others.
-Use metrics like scale, urgency, and affected stakeholders.

Examples
-Support with real-world data, analogies, or case studies.



POIs (Points of Information):
-Can be accepted or declined by the speaker.
-Strategic to accept 1-2 POIs for speaker engagement scores.

Winning the Round:
Asian Parliamentary debate uses a win/lose system:
-One winning team and one losing team per round.
-Judging is based on:
-Strength and clarity of arguments.
-Responsiveness to opposing content.
-Structure, logic, and weighing.


Style and engagement.
Speaker scores (often out of 100) also contribute to:
-Breaking ties in team rankings.
-Determining Best Speaker awards.

Key Strategies:
-Set clear definitions (PM and LO).
-Always engage with the opposition—rebut effectively.
-Maintain consistent team lines and logical flow.
-Weigh arguments in your favor and compare the impact.
-Whips should summarize and reinforce the winning narrative.
-Be strategic with POIs—offer good ones, and handle them well.
.
"""

import os
import re
# from fpdf import FPDF
from rich.console import Console
# from webscout import LLAMA
from webscout import Sambanova
# import fitz  # PyMuPDFimport os
from webscout import Sambanova, GoogleSearch

console = Console()

BASE_SAVE_DIR = os.getcwd()

from groq import Groq
from json import load, dump
import datetime
from dotenv import dotenv_values

env_vars = dotenv_values(".env")

Username = env_vars.get("UserName")
Assistant = env_vars.get("AssistantName")
GroqAPIKey = env_vars.get("GROQ")

client = Groq(api_key=GroqAPIKey)

messages = []

def RealtimeInformation():
    current_date_time = datetime.datetime.now()
    day = current_date_time.strftime("%A")
    date = current_date_time.strftime("%d")
    month = current_date_time.strftime("%B")
    year = current_date_time.strftime("%Y")
    hour = current_date_time.strftime("%H")
    minute = current_date_time.strftime("%M")
    second = current_date_time.strftime("%S")

    data = f"Please use this real-time information if needed, \n"
    data += f"Day : {day}\nDate : {date}\nMonth : {month}\nYear : {year}\n"
    data += f"Hour : {hour}\nMinute : {minute}\nSecond : {second}.\n"

    return data

def AnswerModifier(Answer):
    lines = Answer.split("\n")
    non_empty_lines = [line for line in lines if line.strip()]
    modified_answer = "\n".join(non_empty_lines)
    return modified_answer

import pygame
import random
import asyncio
import edge_tts
import os
from dotenv import dotenv_values

env_vars = dotenv_values(".env")

AssistantVoice = "en-GB-RyanNeural"

async def TextToSpeechAudioFile(text) -> None:
    # file_path = r"C:\Users\kadam\Documents\Cybro-AI\Data\data.mp3"
    # if os.path.exists(file_path):
    #     os.remove(file_path)

    communicate = edge_tts.Communicate(text, AssistantVoice, pitch='+5Hz', rate="+13%")
    await communicate.save(r"/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater/Data/DOL.mp3")

def TTS(Text, func=lambda r=None:True):
    while True:

        try:

            asyncio.run(TextToSpeechAudioFile(Text))

            pygame.mixer.init()

            pygame.mixer.music.load(r"/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater/Data/DOL.mp3")

            pygame.mixer.music.play()

            while pygame.mixer.music.get_busy():
                if func() == False:
                    break

                pygame.time.Clock().tick(10)

            return True
        
        except Exception as e:
            print(f"Error in TTS : {e}")

        finally:
            try:

                func(False)
                pygame.mixer.music.stop()
                pygame.mixer.quit()
            
            except Exception as e:
                print(f"Error in TTS : {e}")

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
    #explain me everything about AI 
    #

    
    TTS(Text, func)

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
    # role_trial = input("Enter the role of the speaker (1-Prime Minister (Gov), 2-Leader of the Opposition, 3-Deputy Prime Minister, 4-Deputy Leader of the Opposition, 5-Government Whip, 6-Opposition Whip): ")

    role = "Deputy Leader of Opposition"

    print("Selected role:", role)

    latest_context = fetch_latest_info(Motion)

    system_prompt = f"""
You are a professional debate speechwriter and expert in Asian Parliamentary Debate format. Write a 7 -minute opening speech on the motion: "{Motion}" for the speaker on the side: "{side}".

this is the asain parliamentary debate format : {prompt}

You Are {role}

your main objectives are Deputy Leader of Opposition (DLO):
-Defends LO’s case and rebuts DPM.
-May introduce new arguments (1-2).
-Maintains logical consistency.
generate the speech based on your role and check the asain parliamentry format about what does your role speak about and then generate the speech in human way not ai generated of 7 mins

and in the speech never mention about that what do i need to speak as opposition leader, just generate the speech related to the topic about how would the {role} would speak.

Use the following guidelines strictly:

1. FORMAT & STYLE:
    - The entire speech must be written in the **same tone, structure, and human-style language** as the sample speech provided by the user.
    - Use simple, easy-to-pronounce words and avoid overly academic or robotic phrasing.
    - Prioritize clarity, conviction, and rhythm – like an actual human debater would.

2. STRUCTURE:
    - Start with a powerful **hook** that grabs attention.
    - Clearly state your **stance** on the motion right after the hook.
    - Follow all key elements of a good AP opening speech:
        • Context/Framing
        • Stakeholders
        • Problem Statement
        • Mechanism (if Gov)
        • Burden (if Opp)
        • Arguments with logic
        • World impacts and examples

3. FACTUAL ROASTING:
    - Indirectly roast the opposing bench using **real-world examples** such as:
        • Articles from the United Nations
        • Reports by global organizations (e.g. WHO, Amnesty, Human Rights Watch)
        • Case studies and verified news headlines
    - Go beyond naming the fact — **explain its logic** and how it contradicts the opposition’s likely stance.

4. BLUNDER ANALYSIS:
    - Mention known **blunders** (policy failures, contradictions, hypocrisies) of the opposing side, and **expose them logically** to the Chair.
    - Do not make it personal — make it persuasive.

5. TONE:
    - Confident, factual, and indirect in your takedown of the opponent.
    - Avoid AI-sounding lines — focus on debate-style transitions, persuasive techniques, and natural delivery.
    - End with a sharp reiteration of your stance and why your side is the **only viable choice** for today’s house.

6. DELIVERY:
    - Speech must match the flow and sentence structure of the human-written sample speech shared by the user.
    - No robotic formatting or generic expressions.

START WITH THE MOST RECENT CONTEXT AVAILABLE:
see the {prompt} and according to that generate the speech, like see all of the rules etc and then generate a 7 minute speech


make a proper 7 minute speech, i dont want any speech less than the specific time but proper 7 minute speech

{latest_context}

Write the speech now.

Generate a 7 minute speech


Now this is a sample speech

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


i want a proper 7 minute speech on this topic, no 1 or 2 minute speeches but 7 minute speech

and this is the most important part ***there should be no mentions of the facts which u have taken after the speech is generated ***

and this is the most important part, just generate the speech, i dont want any starting like, 
here is your 7 minute speech as deputy leader of the opposition or phrases like (Sir, pause for emphasis) in middle of the speech

i just want a proper 7 minute speech and that's it, no extra data required.

    """

    try:
        # with open(r"/home/shadow-scripter/Documents/Documents/Cybro-AI/Data/Chatlog.json", "r") as f:
        #     messages = load(f)

        messages.append({"role" : "user", "content" : f"{system_prompt}"})

        completion = client.chat.completions.create(
            model = "llama3-70b-8192",#Large Language Model Meta AI
            messages= [{"role" : "system", "content" : RealtimeInformation()}] + messages,
            max_tokens=1024,
            temperature=0.7,#Accuracy
            top_p=1,
            stream=True,
            stop=None
        )

        Answer = ""

        for chunk in completion:
            if chunk.choices[0].delta.content:
                Answer += chunk.choices[0].delta.content

        Answer = Answer.replace("</s>", "")

        messages.append({"role" : "assistant", "content" : Answer})

        # with open(r"/home/shadow-scripter/Documents/Documents/Cybro-AI/Data/Chatlog.json", "w") as f:
        #     dump(messages, f, indent=4)

        Answer = AnswerModifier(Answer=Answer)
        Answer = Answer.replace("**", "")
        Answer = Answer.replace("*","")

        return Answer
    


    except Exception as e:
        print(f"Error : {e}")

        with  open(r"/home/shadow-scripter/Documents/Documents/Cybro-AI/Data/Chatlog.json", "w") as f:
            dump(messages, f, indent=4)

        # return Chatbot(Motion)

def generate(motion):
    return Speech_Gen(motion)

if __name__ == "__main__":
    # TTS("Helo sir my name is Jarvis AI ")
    Motion = input("enter the motion : ")
    a = Speech_Gen(Motion+"Generate 7 minute speech")
    print(a)
    # TTS(a)
    

    