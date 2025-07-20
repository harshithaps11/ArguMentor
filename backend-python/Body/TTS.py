import pygame
import random
import asyncio
import edge_tts
import os
from dotenv import dotenv_values

env_vars = dotenv_values(".env")

AssistantVoice = "en-CA-LiamNeural"

async def TextToSpeechAudioFile(text) -> None:
    # file_path = r"C:\Users\kadam\Documents\Cybro-AI\Data\data.mp3"
    # if os.path.exists(file_path):
    #     os.remove(file_path)

    communicate = edge_tts.Communicate(text, AssistantVoice, pitch='+5Hz', rate="+13%")
    await communicate.save(r"data.mp3")

def TTS(Text, func=lambda r=None:True):
    while True:

        try:

            asyncio.run(TextToSpeechAudioFile(Text))

            pygame.mixer.init()

            pygame.mixer.music.load(r"/home/shadow-scripter/Documents/Documents/Tech-Intelligence/AI-Debater/data.mp3")

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

if __name__ == "__main__":
    
    TextToSpeech("""Honorable chair, esteemed judges, and fellow debaters, I stand before you today to present a case that challenges the notion that the United Nations Charter (UCC) is better for the development of India. As we embark on this debate, I'd like to pose a question to my opponents: have they considered the historical context of the UCC and its limitations in addressing the unique needs of a rapidly developing nation like India?

Sir, as we delve into the world of international law, it's essential to acknowledge the Trustee Council's role in shaping the UCC. However, as per the United Nations Digital Library System, in 1945, the representative of India expressed concerns about the lack of detailed information on the UCC's implications for developing nations. (1) This raises a crucial question: can a framework designed in the mid-20th century truly cater to the complexities of modern India?

Furthermore, the Economic and Social Council's 1974 report highlights the importance of better nutrition and economic development. (2) Yet, the UCC's emphasis on state sovereignty may hinder India's ability to address pressing issues like poverty and inequality. In fact, the Security Council's 1978 resolution on economic development underscores the need for a more nuanced approach, one that prioritizes the needs of developing nations. (3)

Now, I'd like to address a blunder that my opponents might make. They might argue that the UCC provides a framework for international cooperation, which is essential for India's development. However, this overlooks the fact that the UCC's emphasis on state sovereignty can lead to a lack of accountability and hinder effective cooperation. It's akin to saying that a car's engine is the only thing that matters, while ignoring the importance of a well-designed transmission system.

In conclusion, as we navigate the complexities of India's development, we must consider the limitations of the UCC. We need a framework that prioritizes the needs of developing nations, one that acknowledges the importance of international cooperation and accountability. I urge my opponents to reconsider their stance and join me in exploring alternative solutions that truly benefit India's development.
 """)


