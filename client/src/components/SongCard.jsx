import React,{useEffect, useState} from 'react'
import { convert } from '../helpers/time';

export default function SongCard({song,index,setCurrentSongIndex,currentSongIndex,percentProgress}) {
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio())
  const [duration,setDuration] = useState("00:00")
  const [title,setTitle] = useState("Loading...")

  useEffect(() => {
    audio.src = song.path;
    audio.load()
    audio.addEventListener("loadedmetadata",(e) => {
      setDuration(convert(e.target.duration))
      //setTitle()
      setTitle(song.file)
    })
  },[])

  useEffect(() => {
    if(currentSongIndex === index){
      setIsCurrentlyPlaying(true)
    } else {
      setIsCurrentlyPlaying(false)
    }

  },[currentSongIndex])

  const playSong = () => {
    setCurrentSongIndex(index)
  }

  return (
    <div className={`songcard ${isCurrentlyPlaying ? "songcard-playing" : ""}`} onClick={() => playSong()}>
      <div className='songcard__progress' style={isCurrentlyPlaying ?  {width:`${percentProgress}%`} :  null}>
      </div>
      <div className='songcard__title'>{title}</div>
      <div className='songcard__time'>{duration}</div>
    </div>
  )
}
