

type ProgressBarType = {
    progressValue: string
}
export const ProgressBar =({progressValue}: ProgressBarType) => {
    return(
        <div className="flex flex-col text-center content-center flex-wrap mb-1">
            <span className="text-success">{progressValue}%</span>
            <progress className="progress progress-success w-56" value={progressValue} max="100"></progress>
        {/* <div className="radial-progress" style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }} role="progressbar">(progressValue)</div> */}
        </div>
    )
}