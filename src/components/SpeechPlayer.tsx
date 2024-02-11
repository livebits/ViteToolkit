import { useEffect, useState } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { IoIosCloudUpload } from "react-icons/io";
import "../styles/Speech.css";
import axios from "axios";
import useSpeech from "../hooks/useSpeech";

const SpeechPlayer: React.FC = () => {
    const [content, setContent] = useState<string>("");
    const { playing, voices, selectedVoice, setSelectedVoice, handlePlaying } = useSpeech(content)

    const handleLoad = () => {
        axios.get("https://baconipsum.com/api/?type=meat-and-filler")
            .then((response) => {
                setContent(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        // load content text from web
        axios.get("https://baconipsum.com/api/?type=meat-and-filler")
            .then((response) => {
                setContent(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const handleSelectVoice = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = voices.find(v => v.name === event.target.value)
        if (selected) {
            setSelectedVoice(selected);
        }     
    }

    return (
        <div className="player">
            <div className="content">
                <p>
                    {content}
                </p>
            </div>
            <div className="toolbar">
                <button className="play" onClick={handlePlaying}>
                    {playing ? <FaPauseCircle style={{ width: '100%', height: '100%' }} /> : <FaPlayCircle />}
                </button>
                <div className="voices">
                    <select onChange={handleSelectVoice}>
                        {
                            voices.map((voice) => {
                                return <option
                                    key={voice.name}
                                    value={voice.name}
                                    defaultValue={selectedVoice === voice ? voice.name : ""}
                                >
                                    {voice.name}
                                </option>
                            })
                        }
                    </select>
                </div>
                <button className="load" onClick={handleLoad}>
                    <IoIosCloudUpload />
                </button>
            </div>
        </div>
    )
}

export default SpeechPlayer;