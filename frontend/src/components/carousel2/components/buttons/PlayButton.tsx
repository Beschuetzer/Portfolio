type PlayButtonProps = {
    classname?: string;
    onClick: () => void;
}

export const PlayButton = ({
    classname = 'button',
    onClick = () => null,
}: PlayButtonProps) => {
  return (
    <div onClick={onClick} className={classname}>
        <div className={`${classname}--play-triangle` }/>
    </div>
  )
}