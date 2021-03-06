import React, { useState, useEffect} from 'react';

export default function Pomodoro() {
	const [minutes, setMinutes] = useState(25)
	const [seconds, setSeconds] = useState(0)
	const [isActive, setIsActive] = useState(false)
	const [isReset, setIsReset] = useState(false)
	const [displayMessage, setDisplayMessage] = useState(false)

	useEffect(() => {
		if (isReset) {
			setIsActive(false)
			setSeconds(0)
			setMinutes(25)
		}

		if (isActive) {

			let interval = setInterval(() => {
				clearInterval(interval)

				if (seconds === 0) {
					if (minutes !== 0) {
						setSeconds(59)
						setMinutes(minutes - 1)
					} else {						
						let minutes = displayMessage ? 24 : 4
						let seconds = 59

						setSeconds(seconds)
						setMinutes(minutes)
						setDisplayMessage(!displayMessage)
					}
				} else {
					setSeconds(seconds - 1)
				}
			}, 1000);
		}
	}, [isActive, seconds, isReset]);

	const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
	const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

	return (
		<div className="pomodoro">
			<div className="message">
				{displayMessage && <div className="message">Break time!<br></br> New session starts in:</div>}
				{!displayMessage && <div>Focus time</div>}
			</div>

			<div className="timer">
				{timerMinutes}:{timerSeconds}
			</div>

			<div className="buttons">
				<button onClick={ () => {
						setIsActive(!isActive);
						if (isReset === true) setIsReset(false)
						} } className="start">
					{isActive ? "Pause" : "Start"}
				</button>
				<button onClick={ () => setIsReset(!isReset) } className="reset">Reset</button>
			</div>

		</div>
	);
}
