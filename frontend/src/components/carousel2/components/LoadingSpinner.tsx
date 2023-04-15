import { ReactNode } from "react";

type LoadingSpinnerProps = {
	description?: string;
	show?: boolean;
	type?: 'spinner' | 'ring'
}

export const LoadingSpinner = ({
	description = '',
	show = false,
	type = 'ring',
}: LoadingSpinnerProps) => {

	function renderContent(content: ReactNode | ReactNode[]) {
		if (!show) return null;
		switch (type) {
			case "spinner":
				return (
					<div className="lds-roller-container">
						{content}
						<div className="lds-roller">
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
						</div>
					</div>
				);
			case "ring":
				return (
					<>
						{content}
						<div className="lds-ring">
							<div />
							<div />
							<div />
							<div />
						</div>
					</>
				);
		}
	}

	return renderContent((
		<div className="loading-container">
			{description ? <h2>Loading '{description}'</h2> : null}
		</div>
	))
}