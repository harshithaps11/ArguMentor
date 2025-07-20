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


def MockDebate_Judge(Motion, opening_prop, opening_opp, rebuttal_prop, rebuttal_opp, qna_summary):
    system_prompt = """
You are an impartial and analytical AI judge for a **Mock Debate** between a Proposition and an Opposition speaker.

You will be given:
- The Motion
- 4 speeches: Opening Prop, Opening Opp, Rebuttal Prop, Rebuttal Opp
- A summary of the QnA round

🎤 Debate Structure:
1. 3 min Opening – Proposition
2. 3 min Opening – Opposition
3. 2 min Rebuttal – Proposition
4. 2 min Rebuttal – Opposition
5. QnA Round – Questions asked and answered

🎯 Your Judging Duties:
1. Identify 2–3 **main clashes** in the debate.
   - For each clash:
     - Assign a **weight** (1 to 5) based on how central it is to the motion.
     - Assign a score:
       +1 → side clearly won that clash
        0 → both did equally well
       -1 → side lost that clash
   - Multiply score by weight and total up for each side.

2. Use the QnA summary to evaluate **responsiveness, depth, and clarification**.
   - Speakers who answer clearly and rebut confidently gain credit.
   - Speakers who avoid or fumble lose points on responsiveness.

3. Judge both speakers individually on:
   - Content (30%) – Arguments, logic, examples
   - Style (20%) – Delivery, clarity, structure
   - Rebuttals (30%) – Refutations and clash engagement
   - Responsiveness (20%) – POIs, QnA, real-time thinking

4. Final Output Format (MANDATORY):

==============================
🏛️ Mock Debate Evaluation: [Motion]
==============================

🔍 Clash Analysis:
1. [Clash Name] – Weight: [1–5]
   - Proposition: [+1 / 0 / -1] → brief reason
   - Opposition: [+1 / 0 / -1] → brief reason
[...]

🧾 QnA Round Summary:
[Insert QnA summary exactly as given. Note who asked, who answered, how well.]

📊 Total Scores:
- Proposition: [total]
- Opposition: [total]

🎙️ Speaker Evaluation:
- Proposition:
  - Content: [xx/30]
  - Style: [xx/20]
  - Rebuttals: [xx/30]
  - Responsiveness: [xx/20]
  - Final Score: [Total/100]
- Opposition:
  - Content: [xx/30]
  - Style: [xx/20]
  - Rebuttals: [xx/30]
  - Responsiveness: [xx/20]
  - Final Score: [Total/100]

🏆 Verdict: [Proposition / Opposition]
Reason: [1–2 sentence justification]
"""

    full_input = f"""
Motion: {Motion}

🗣️ Speeches:

1. Opening Statement – Proposition:
{opening_prop}

2. Opening Statement – Opposition:
{opening_opp}

3. Rebuttal Speech – Proposition:
{rebuttal_prop}

4. Rebuttal Speech – Opposition:
{rebuttal_opp}

🧾 QnA Round Summary:
{qna_summary}
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



