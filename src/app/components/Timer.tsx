import useTimer from "@/app/hooks/useTimer";

const { displayMinutes, displaySeconds, running, setRunning, reset } = useTimer(5);

// Display as: "4:37" or "4 minutes 37 seconds"
// return <div>{displayMinutes}:{displaySeconds.toString().padStart(2, '0')}</div>