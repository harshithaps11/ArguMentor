# ArguMentor FastAPI Backend

This backend powers all AI, debate logic, and speech processing for ArguMentor.

## 🚀 Getting Started

### 1. Install dependencies

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Run the FastAPI server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Example API Usage

- **Generate Random Motion**
  ```bash
  curl http://localhost:8000/generate-motion
  ```

- **Text-to-Speech**
  ```bash
  curl -X POST http://localhost:8000/tts -H "Content-Type: application/json" -d '{"text": "Hello, world!"}'
  ```

- **Speech-to-Text**
  ```bash
  curl -X POST http://localhost:8000/stt -F "audio=@path/to/audio.wav"
  ```

- **POI Generation**
  ```bash
  curl -X POST http://localhost:8000/generate-poi -H "Content-Type: application/json" -d '{"motion": "This House Would...", "side": "Opposition"}'
  ```

- **Start Debate Thread**
  ```bash
  curl -X POST http://localhost:8000/start-debate -H "Content-Type: application/json" -d '{"motion": "...", "format": "Asian Parliamentary"}'
  ```

## 📚 Endpoints

- `/generate-motion` - Get a random debate motion
- `/tts` - Text-to-speech
- `/stt` - Speech-to-text
- `/generate-poi` - Generate POI questions
- `/start-debate` - Start a debate thread

## 🛠️ Notes

- All AI, debate, and speech logic is implemented here.
- See `requirements.txt` for dependencies.
