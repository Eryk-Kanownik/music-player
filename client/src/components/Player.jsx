import React,{useState,useRef, useEffect} from 'react'

function Player({currentSongIndex, setCurrentSongIndex, songs, setPercentProgress}) {
    const [playerState,setPlayerState] = useState({
        title:"Loading...",
        isPlaying:false,
        repeat:false,
        volume:100,
        currentSrc:"",
        duration:100,
        repeat:"Off"
    })
    
    const [currentTime, setCurrentTime] = useState(0);
    
    const audioRef = useRef(null)
    const timelineRef = useRef(null);
    const volumeRef = useRef(null);

    useEffect(() => {
        if(!localStorage.getItem("saved-volume")){
            localStorage.setItem("saved-volume","100")
        } else {
            setPlayerState({...playerState,volume: parseInt(localStorage.getItem("saved-volume"))})
            audioRef.current.volume = parseInt(localStorage.getItem("saved-volume")) / 100;
            volumeRef.current.value = localStorage.getItem("saved-volume")
        }
    },[])

    useEffect(() => {
        if(songs.length > 0){
            audioRef.current.src = songs[currentSongIndex].path;
            audioRef.current.load()
            if(playerState.isPlaying){
                audioRef.current.play()
            }
        }
    },[currentSongIndex])

    const switchPlayPause = () => {
        if(playerState.isPlaying === true){
            pause()
        } else {
            play()
        }
    }

    const play = () => {
        setPlayerState({
            ...playerState,
            isPlaying:true
        })
        audioRef.current.play()
    }

    const pause = () => {
        setPlayerState({
            ...playerState,
            isPlaying:false
        })
        audioRef.current.pause()
    }

    const next = () => {
        if(currentSongIndex === songs.length - 1){
            setCurrentSongIndex(0)
        } else {
            setCurrentSongIndex(prev => prev + 1)
        }    
    }

    const prev = () => {
        if(currentSongIndex === 0){
            setCurrentSongIndex(songs.length - 1)
        } else {
            setCurrentSongIndex(prev => prev - 1)
        }    
    }

    const volume = (e) => {
        audioRef.current.volume = e.target.value / 100;
        setPlayerState({
            ...playerState,
            volume:e.target.value
        })
        localStorage.setItem("saved-volume",e.target.value)
    }

    const repeat = () => {
        if(playerState.repeat === "Off"){
            setPlayerState({...playerState, repeat:"On"})
        } else if(playerState.repeat === "On"){
            setPlayerState({...playerState, repeat:"Off"})
        }
    }
 
    const changeDuration = (e) => {
        audioRef.current.currentTime = e.target.value
        setCurrentTime(e.target.value)
    }
 
    const onEnded = (e) => {
        if(playerState.repeat === "On"){
            e.target.currentTime = 0;
            e.target.load()
            e.target.play();
        } else {
            next()
        }
    }

    const onTimeUpdate = (e) => {
        setCurrentTime(Math.floor(e.target.currentTime))
        let percent = (e.target.currentTime / playerState.duration) * 100
        setPercentProgress(percent);
        timelineRef.current.value = e.target.currentTime;
    }

    const onLoadedMetadata = (e) => {
        setPlayerState({...playerState,title:songs[currentSongIndex].file,duration:e.target.duration})
    }

  return (
    <div className='player'>
        <audio ref={audioRef}
            onLoadedMetadata = {(e) => onLoadedMetadata(e)}
            onTimeUpdate={(e) => onTimeUpdate(e)}
            onEnded={(e) => {onEnded(e)}}
        ></audio>
        <input className='player__timeline' onChange={(e) => {changeDuration(e)}} type="range" ref={timelineRef} min={0} max={playerState.duration} defaultValue={currentTime}/>
        <div className='player__songname'><h3>{playerState.title}</h3></div>
        <div className='player__controls'>
            <button className='player__controls__repeat btn' onClick={() => repeat()}>Repeat-{playerState.repeat}</button>
            <button className='player__controls__prev btn' onClick={() => prev()}>Prev</button>
            <button className='player__controls__play btn' onClick={() => switchPlayPause()}>{playerState.isPlaying ? "Pause" : "Play"}</button>
            <button className='player__controls__next btn' onClick={() => next()}>Next</button>
            <input className='player__controls__volume' type='range' ref={volumeRef} min={0} max={100} defaultValue={playerState.volume} onChange={(e) => volume(e)}/>
        </div>
    </div>
  )
}

export default Player