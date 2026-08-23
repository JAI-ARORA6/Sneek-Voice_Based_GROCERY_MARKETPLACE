// Voice Recognition & Text-To-Speech (TTS) Service Wrapper

class VoiceService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.hasRecognition = !!SpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    this.synth = window.speechSynthesis || null;
    this.isListening = false;
    this.currentLanguage = 'en-US';
    this.muted = false;

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.currentLanguage;
    }
  }

  setLanguage(langCode) {
    this.currentLanguage = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
    }
  }

  setMuted(isMuted) {
    this.muted = isMuted;
    if (isMuted && this.synth) {
      this.synth.cancel();
    }
  }

  startListening(onResult, onError, onEnd, onInterim) {
    if (!this.hasRecognition) {
      if (onError) onError('SPEECH_NOT_SUPPORTED');
      return false;
    }

    if (this.isListening) {
      this.stopListening();
    }

    try {
      this.recognition.lang = this.currentLanguage;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (interimTranscript && onInterim) {
          onInterim(interimTranscript);
        }

        if (finalTranscript && onResult) {
          onResult(finalTranscript);
        }
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        if (onError) onError(event.error || 'SPEECH_ERROR');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err) {
      this.isListening = false;
      if (onError) onError(err.message);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        // ignore stop errors
      }
      this.isListening = false;
    }
  }

  speak(text) {
    if (this.muted || !this.synth || !text) return;
    try {
      this.synth.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.currentLanguage;
      
      const voices = this.synth.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find(v => v.lang === this.currentLanguage || v.lang.startsWith(this.currentLanguage.split('-')[0]));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('TTS execution error:', e);
    }
  }
}

export const voiceService = new VoiceService();
