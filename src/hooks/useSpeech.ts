import { useEffect, useState } from "react";


const useSpeech = (content: string) => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

    const utterance = new SpeechSynthesisUtterance(content);    

    utterance.onpause = () => {        
        setPlaying(false);
    }

    utterance.onend = () => {
        setPlaying(false);
    }

    utterance.onresume = () => {
        setPlaying(true);
    }

    utterance.onstart = () => {
        setPlaying(true);
    }

    useEffect(() => {
        const voices = speechSynthesis.getVoices();
        setVoices(voices);
    }, [])


    // play speech
    const handlePlaying = () => {
        if (!playing) {            
            utterance.voice = selectedVoice;
            speechSynthesis.speak(utterance);
            setPlaying(true);
            
        } else {
            speechSynthesis.pause()
            setPlaying(false);
        }
    }

    

    return {playing, voices, selectedVoice, setSelectedVoice, handlePlaying};
}

export default useSpeech;