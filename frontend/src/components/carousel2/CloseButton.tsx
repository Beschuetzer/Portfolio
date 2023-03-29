type CloseButtonProps = {
    classname?: string;
    onClose: () => void;
}

export const CloseButton = ({
    classname = 'close-button',
    onClose = () => null,
}: CloseButtonProps) => {
  return (
    <div onClick={onClose} className={classname}>
        <div className={`${classname}-left` }/>
        <div className={`${classname}-right` }/>
    </div>
  )
}