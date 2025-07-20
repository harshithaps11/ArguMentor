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

def Speech_Gen(Motion, pm, ol, dpm, dlo, gw, ow, committee_summary):
    system_prompt = """
You are an impartial, logical, and reductionist AI Judge in a 3v3 Asian Parliamentary debate round.

You will be provided with:
- The motion
- The six speeches (PM, OL, DPM, DLO, GW, OW)
- A committee summary (listing POIs asked, responses, dodges, interruptions, and notable strategic moves)

Your responsibilities include:

1. Read all six speeches.
2. Use the committee summary to adjust credit based on POIs, dodges, good interjections, or mishandling.
3. Identify and analyse 3–5 **major clashes** in the debate. For each:
   - Assign a **weight** (1–5) based on relevance to the motion.
   - Assign scores: +1 (won), 0 (tie), -1 (lost)
4. Sum weighted clash scores for:
   - Government (PM + DPM + GW)
   - Opposition (OL + DLO + OW)

5. Evaluate individual speakers based on:
   - Content (30%)
   - Style (20%)
   - Strategy (30%)
   - Responsiveness (20%, including POIs & interactivity)

6. Rank speakers from 1 (best) to 6 (worst) with score out of 100.

7. Output all results in this format:

==============================
🏛️ Debate Evaluation: [Motion]
==============================

🧾 Committee Summary:
[Insert committee summary exactly as given]

🔍 Clash Analysis:
1. [Clash] – Weight: [1–5]
   - Government: [+1/0/-1] → brief reason
   - Opposition: [+1/0/-1] → brief reason
[...]

📊 Weighted Team Scores:
- Government: [Score]
- Opposition: [Score]

🎙️ Speaker Rankings:
1. [Name] – [Score/100] – [One-line reason]
2. ...
6. [Name] – [Score/100] – [One-line reason]

🏆 Verdict: [Government / Opposition]
Reason: [1–2 line justification]
"""

    full_input = f"""
Motion: {Motion}

🗣️ Speeches:

1. Prime Minister (PM):
{pm}

2. Opposition Leader (OL):
{ol}

3. Deputy Prime Minister (DPM):
{dpm}

4. Deputy Leader of Opposition (DLO):
{dlo}

5. Government Whip (GW):
{gw}

6. Opposition Whip (OW):
{ow}

🧾 Committee Summary:
{committee_summary}
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

    speech = LLAMA3_client_model_1.chat(full_input)
    speech = speech.replace("**", "").replace("*", "")
    print(speech)

pm = """Ladies and gentlemen, esteemed judges, and fellow debaters, today we gather to discuss a pressing issue that has been affecting our youth, our society, and our world at large. The motion before us is clear: This House believes that TikTok has done more harm than good. As the Prime Minister, I stand before you today to argue that TikTok's negative impacts far outweigh its benefits.
In the past decade, social media has become an integral part of our lives. With the rise of TikTok, we have seen a new era of entertainment, creativity, and self-expression. However, beneath the surface of its seemingly harmless short videos, lies a plethora of problems that threaten our very well-being.
Firstly, let us talk about the issue of addiction. TikTok's algorithm is designed to keep users hooked, with endless scrolls and notifications that activate our brain's reward system. This has led to a generation of young people who are spending hours on end mindlessly scrolling through their feeds, sacrificing their mental and physical health in the process. A study by the Pew Research Center found that 54% of teens aged 13-17 say they spend too much time on their phones, and TikTok is a significant contributor to this problem.
Secondly, TikTok has become a breeding ground for cyberbullying, hate speech, and online harassment. The platform's anonymity and lack of effective moderation have created an environment where users feel emboldened to spew hatred and vitriol. A report by the Anti-Defamation League found that 59% of teens have experienced online harassment, with TikTok being one of the main culprits.
Furthermore, TikTok has been accused of perpetuating harmful beauty standards, promoting unrealistic expectations of beauty and body image. The constant barrage of filtered and airbrushed images has led to a rise in body dissatisfaction, low self-esteem, and eating disorders among young people. A study by the National Eating Disorders Association found that 69% of girls in elementary school reported that magazine pictures influenced their idea of the ideal body shape.
In addition, TikTok's data collection practices have raised serious concerns about privacy and national security. The app's Chinese ownership and lack of transparency have led to allegations of data harvesting and censorship. A report by the Committee on Foreign Investment in the United States found that TikTok's parent company, ByteDance, has ties to the Chinese Communist Party, raising fears about the potential misuse of user data.
Now, some may argue that TikTok has created opportunities for self-expression, creativity, and community building. While this is true, I would argue that these benefits are vastly outweighed by the harm that the platform has caused. We must not be swayed by the flashy videos and catchy tunes; instead, we must look at the bigger picture and acknowledge the damage that TikTok has inflicted on our society.
In conclusion, ladies and gentlemen, the evidence is clear: TikTok has done more harm than good. As the Prime Minister, I urge you to consider the long-term consequences of this platform and join me in calling for a reevaluation of its role in our lives. We must take a stand against the harm that TikTok has caused and work towards creating a safer, healthier, and more responsible online environment. Thank you."""

ol = """Ladies and gentlemen, honorable judges, and fellow debaters,
Today, we gather to discuss a pressing issue that has been on everyone's mind for quite some time now. The rise of TikTok has been nothing short of phenomenal, but I stand before you today to argue that this phenomenon has done more harm than good.
Let's set the context right from the beginning. TikTok, with its short-form videos and catchy music, has become an integral part of our daily lives. But beneath the surface of its entertaining facade lies a web of issues that cannot be ignored.
First and foremost, TikTok has become a breeding ground for misinformation. The platform's algorithm, which prioritizes engagement over fact-checking, has led to the proliferation of fake news and conspiracy theories. This is particularly concerning in today's age, where the spread of misinformation can have devastating consequences.
Moreover, TikTok's impact on mental health cannot be overstated. The constant pressure to present a perfect online persona, coupled with the fear of missing out, has led to a rise in anxiety and depression among its users. The platform's emphasis on physical appearance and material possessions has created unrealistic expectations, contributing to a culture of superficiality.
Furthermore, TikTok has become a hotbed for cyberbullying and online harassment. The anonymity of the internet, combined with the ease of creating multiple accounts, has made it a haven for trolls and bullies. The lack of adequate moderation and reporting mechanisms has made it difficult for victims to seek justice.
In addition, TikTok's data privacy concerns are a major cause for concern. The app's Chinese ownership has raised questions about data security and the potential for government interference. The collection of user data, including location information and search history, has serious implications for individual privacy and national security.
Now, some might argue that TikTok has also done some good. It has provided a platform for creators to showcase their talents and connect with a global audience. However, I would counter that these benefits are far outweighed by the harm it has caused.
In conclusion, ladies and gentlemen, I urge you to consider the broader implications of TikTok's rise to fame. While it may have provided entertainment and connectivity, its negative consequences cannot be ignored. It is our responsibility to acknowledge these issues and work towards creating a safer, more responsible online environment.
Thank you.
"""

dpm = """TikTok, a social media giant, has taken the world by storm. With over a billion active users, it has become an integral part of our daily lives. But, I stand here today to argue that TikTok has done more harm than good.
Let's start with the most obvious issue - mental health. TikTok's algorithm is designed to keep users hooked, and it does so by promoting content that is often unrealistic, unattainable, and downright toxic. The constant stream of perfect bodies, flawless makeup, and seemingly perfect lives creates unrealistic expectations, leading to a rise in anxiety, depression, and low self-esteem among its users.
Moreover, TikTok's short-form video format makes it easy for misinformation to spread like wildfire. With no fact-checking mechanisms in place, users are left to navigate a sea of false information, conspiracy theories, and harmful ideologies. This has led to a proliferation of hate speech, discrimination, and xenophobia, all of which have devastating real-world consequences.
But, you may argue, TikTok has also been a platform for self-expression, creativity, and community-building. And, to some extent, that is true. However, I would counter that these benefits are vastly outweighed by the harms. For every talented creator who has found success on TikTok, there are countless others who have been bullied, harassed, or exploited on the platform.
Furthermore, TikTok's ownership by a Chinese company raises serious concerns about data privacy and national security. The Chinese government has a history of using technology to surveil and control its citizens, and it is naive to think that TikTok is immune to these practices. Our personal data, our online behaviors, and our very thoughts are being harvested and used to manipulate us, often for nefarious purposes.
Now, some of you may be thinking, "But what about the economic benefits? TikTok has created jobs, stimulated creativity, and provided a platform for businesses to reach new customers." And, yes, that is true. However, I would argue that these benefits are short-term and superficial. The long-term costs to our mental health, our democracy, and our very way of life far outweigh any temporary economic gains.
In conclusion, TikTok has done more harm than good. It has created a culture of toxicity, misinformation, and exploitation, all while posing a significant threat to our national security and data privacy. As we move forward, it is our responsibility to critically examine the role that social media plays in our lives and to demand better from the companies that shape our online experiences. We must recognize the harm that TikTok has caused and work towards creating a safer, more responsible, and more equitable online environment for all."""

dlo = """Ladies and gentlemen, honorable judges, and fellow debaters,
Today, we gather to discuss a pressing issue that has been on everyone's mind for quite some time now. The rise of TikTok has been nothing short of phenomenal, but I stand before you today to argue that this phenomenon has done more harm than good.
Let's set the context right from the beginning. TikTok, with its short-form videos and catchy music, has become an integral part of our daily lives. But beneath the surface of its entertaining facade lies a web of issues that cannot be ignored.
First and foremost, TikTok has become a breeding ground for misinformation. The platform's algorithm, which prioritizes engagement over fact-checking, has led to the proliferation of fake news and conspiracy theories. This is particularly concerning in today's age, where the spread of misinformation can have devastating consequences.
Moreover, TikTok's impact on mental health cannot be overstated. The constant pressure to present a perfect online persona, coupled with the fear of missing out, has led to a rise in anxiety and depression among its users. The platform's emphasis on physical appearance and material possessions has created unrealistic expectations, contributing to a culture of superficiality.
Furthermore, TikTok has become a hotbed for cyberbullying and online harassment. The anonymity of the internet, combined with the ease of creating multiple accounts, has made it a haven for trolls and bullies. The lack of adequate moderation and reporting mechanisms has made it difficult for victims to seek justice.
In addition, TikTok's data privacy concerns are a major cause for concern. The app's Chinese ownership has raised questions about data security and the potential for government interference. The collection of user data, including location information and search history, has serious implications for individual privacy and national security.
Now, some might argue that TikTok has also done some good. It has provided a platform for creators to showcase their talents and connect with a global audience. However, I would counter that these benefits are far outweighed by the harm it has caused.
In conclusion, ladies and gentlemen, I urge you to consider the broader implications of TikTok's rise to fame. While it may have provided entertainment and connectivity, its negative consequences cannot be ignored. It is our responsibility to acknowledge these issues and work towards creating a safer, more responsible online environment.
Thank you.
"""

gw = """Today, we gather to discuss the impact of TikTok on our society, and I stand firmly on the proposition that TikTok has done more harm than good. As we navigate the digital landscape, it's essential to acknowledge the detrimental effects of this social media giant.
TikTok's algorithm is designed to be addictive, exploiting human psychology to keep users engaged for hours on end. This has led to a significant decline in attention span, with many young people struggling to focus on tasks that require more than a few minutes of concentration. The consequences are far-reaching, affecting not only academic performance but also mental health and overall well-being.
Furthermore, TikTok has become a breeding ground for misinformation and disinformation. The platform's short-form videos make it easy to spread false or misleading information, often without consequences. This has serious implications for our democracy, as people are increasingly relying on social media for news and information. The lack of accountability and fact-checking mechanisms on TikTok has created a perfect storm for the spread of misinformation.
In addition, TikTok has been criticized for its handling of user data. The app collects an alarming amount of personal information, including location data, search history, and biometric data. This raises serious concerns about privacy and surveillance, particularly in light of TikTok's close ties to the Chinese government.
Moreover, TikTok's impact on the creative industry is also worth noting. The platform's emphasis on short-form, low-production-value content has led to a devaluation of creative work. Many artists and creators are struggling to make a living due to the platform's exploitative business model, which prioritizes clicks and views over fair compensation.
Now, some may argue that TikTok has done some good, providing a platform for self-expression and creativity. However, I counter that these benefits are far outweighed by the harm caused by the platform's addictive nature, misinformation, privacy concerns, and exploitation of creative labor.
In conclusion, as we weigh the benefits and drawbacks of TikTok, it's clear that the harm caused by this platform far outweighs any potential benefits. As the Government Whip, I urge this house to recognize the detrimental impact of TikTok on our society and to take action to mitigate its effects. We must prioritize the well-being of our citizens, our democracy, and our creative industries. The time to act is now."""

ow = """Ladies and gentlemen, honorable judges, and fellow debaters, today we gather to discuss a pressing issue that has been plaguing our society for far too long. The motion before us, "This House believes that TikTok has done more harm than good," is a stark reminder of the consequences of our actions, or rather, our inactions. As the Opposition Whip, it is my duty to present to you the harsh realities of TikTok's impact on our world.
In recent years, TikTok has become an integral part of our daily lives. With over a billion active users, it is undeniable that the platform has revolutionized the way we consume and interact with content. However, beneath the surface of its entertaining videos and catchy hashtags lies a sinister truth. TikTok has been criticized for its lack of transparency, its algorithms that promote harmful content, and its blatant disregard for user privacy.
But, you may ask, what's the harm in a few funny videos and lip-syncing teenagers? The answer lies in the fact that TikTok has become a breeding ground for misinformation, hate speech, and cyberbullying. The platform's lack of effective moderation has allowed harmful content to spread like wildfire, often with devastating consequences. We've seen cases of teenagers taking their own lives due to online harassment, and we've witnessed the spread of conspiracy theories that have led to real-world harm.
Furthermore, TikTok's algorithms are designed to keep users engaged for as long as possible, often at the expense of their mental health. The constant stream of notifications, the endless scrolling, and the pressure to present a perfect online persona have all been linked to increased anxiety, depression, and loneliness. And let's not forget the impact on our attention span, as we've seen a significant decline in critical thinking and deep reading skills.
But, what about the economic benefits, you may ask? Doesn't TikTok provide a platform for creators to earn a living and for businesses to reach new customers? While this is true, we must not ignore the fact that TikTok's business model is built on the exploitation of its users. The platform collects vast amounts of data, which it then sells to advertisers, often without the users' knowledge or consent. This has led to a culture of surveillance capitalism, where our personal data is seen as a commodity to be bought and sold.
In conclusion, ladies and gentlemen, the harm caused by TikTok far outweighs any benefits it may provide. It is our duty to recognize the harm and take action to mitigate it. We must demand greater transparency from tech companies, we must push for stronger regulations, and we must educate ourselves and our children about the dangers of social media. The time for complacency is over; the time for action is now. We must stand together and say, "Enough is enough." TikTok has done more harm than good, and it's time we took back control."""


if __name__ == "__main__":
    Speech_Gen(Motion="thbt tiktok has done more harm than good", pm=pm, ol=ol, dpm=dpm, dlo=dlo, gw=gw, ow=ow)

    
