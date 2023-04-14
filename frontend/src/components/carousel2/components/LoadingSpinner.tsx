
type LoadingSpinnerProps = {
    description?: string;
	show?: boolean;
}

export const LoadingSpinner = ({
    description = '',
	show = false,
}: LoadingSpinnerProps) => {
    if (!show) return null;
	return (
		<div className="lds-roller-container">
			{description ? <h2>Loading '{description}'</h2> : null }
			<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		</div>
	);
}