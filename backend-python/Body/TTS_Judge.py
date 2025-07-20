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

  
    TTS(Text, func)


if __name__ == "__main__":


    TextToSpeech("""Honorable chair, esteemed judges, and fellow debaters, I stand before you today to present a case that challenges the notion that the United Nations Charter (UCC) is better for the development of India. As we embark on this debate, I'd like to pose a question to my opponents: have they considered the historical context of the UCC and its limitations in addressing the unique needs of a rapidly developing nation like India?

Sir, as we delve into the world of international law, it's essential to acknowledge the Trustee Council's role in shaping the UCC. However, as per the United Nations Digital Library System, in 1945, the representative of India expressed concerns about the lack of detailed information on the UCC's implications for developing nations. (1) This raises a crucial question: can a framework designed in the mid-20th century truly cater to the complexities of modern India?

Furthermore, the Economic and Social Council's 1974 report highlights the importance of better nutrition and economic development. (2) Yet, the UCC's emphasis on state sovereignty may hinder India's ability to address pressing issues like poverty and inequality. In fact, the Security Council's 1978 resolution on economic development underscores the need for a more nuanced approach, one that prioritizes the needs of developing nations. (3)

Now, I'd like to address a blunder that my opponents might make. They might argue that the UCC provides a framework for international cooperation, which is essential for India's development. However, this overlooks the fact that the UCC's emphasis on state sovereignty can lead to a lack of accountability and hinder effective cooperation. It's akin to saying that a car's engine is the only thing that matters, while ignoring the importance of a well-designed transmission system.

In conclusion, as we navigate the complexities of India's development, we must consider the limitations of the UCC. We need a framework that prioritizes the needs of developing nations, one that acknowledges the importance of international cooperation and accountability. I urge my opponents to reconsider their stance and join me in exploring alternative solutions that truly benefit India's development.
 """)

                