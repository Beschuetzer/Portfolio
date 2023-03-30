type CloseButtonProps = {
    classname?: string;
    onClick: () => void;
}

export const CloseButton = ({
    classname = 'button',
    onClick = () => null,
}: CloseButtonProps) => {
  return (
    <div onClick={onClick} className={classname}>
        <div className={`${classname}--close-left` }/>
        <div className={`${classname}--close-right` }/>
    </div>
  )
}