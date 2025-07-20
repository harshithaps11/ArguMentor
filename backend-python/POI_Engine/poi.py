from groq import Groq
from json import load, dump
import datetime
from dotenv import dotenv_values

env_vars = dotenv_values(".env")

Username = env_vars.get("UserName")
Assistant = env_vars.get("AssistantName")
GroqAPIKey = env_vars.get("GROQ_API_KEY")

client = Groq(api_key=GroqAPIKey)

messages = []
Motion = input("Enter the Motion : ")
Side = input("Enter the Side for questions : ")

System = f"""I am debating on the side of: {Side}
The motion is: {Motion}

Now generate exactly **6 high-quality debate questions** that I can ask to the opposing side.

These questions must:
- Be written in fluent, bold, natural human language – like a skilled debater speaking.
- Use real-world facts, statistics, UN articles, constitutional references, or international case studies.
- Expose the contradictions, weaknesses, or hypocrisies in the opposition’s argument.
- Contain smart sarcasm or indirect roasting if possible — but remain respectful and intellectually sharp.
- Do **not** provide any answers or explanations. Only give me 6 **distinct, numbered** questions – nothing more.
#Use verified real-world facts, UN reports, international case studies, historical failures/successes, official data, and global examples.

I want at least 1 fact per question which can be used for point of information/question for the side of motion either be propositon or opposition.
I want Un artciles, facts, case studies, acts etc which can be used in the question and it has to be in the question.

Tone: Elite-level MUN orator. Direct. Assertive. Fact-based. Clean.
Output format: Just 6 questions, numbered 1 to 6. No intros, no conclusions.

Tone: Smart. Bold. Human. Intellectually savage.
Audience: MUN judges, national-level debaters, and public-speaking champions.
Bonus: If possible, link questions to specific UN Articles (like Article 51, Article 1 of the UN Charter, etc.), human rights conventions, or international treaties to boost credibility.
***
"""

SystemChatbot = [
    {"role" : "system", "content" : System}
]

try:
    with open(r"/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater/Data/poi.json", "r") as f:
        messages = load(f)

except FileNotFoundError:
    with open(r"/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater/Data/poi.json", "w") as f:
        dump([], f)

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
    lines = Answer.strip().split("\n")
    questions_only = [line for line in lines if line.strip().startswith(tuple("123456789"))]
    return "\n".join(questions_only[:6])  # Enforce only first 6 numbered questions

def Chatbot(Motion):
    """This Function sends the user's query to the chatbot and returns the AI's response."""

    try:
        with open(r"/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater/Data/poi.json", "r") as f:
            messages = load(f)

        messages.append({"role" : "user", "content" : f"{Motion}"})

        completion = client.chat.completions.create(
            model = "llama3-70b-8192",#Large Language Model Meta AI
            messages=SystemChatbot + [{"role" : "system", "content" : RealtimeInformation()}] + messages,
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

        with open(r"/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater/Data/poi.json", "w") as f:
            dump(messages, f, indent=4)

        return AnswerModifier(Answer)
    


    except Exception as e:
        print(f"Error : {e}")

        with  open(r"/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater/Data/poi.json", "w") as f:
            dump(messages, f, indent=4)

        return Chatbot(Motion=Motion)
    
if __name__ == "__main__":
    # while True:
 
        print(f"{Assistant} : {Chatbot(Motion)}")

