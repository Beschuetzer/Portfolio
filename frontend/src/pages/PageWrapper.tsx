export interface PageWrapperProps {
    children: any;
    className?: string;
    pageName: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
    children,
    className,
    pageName
}) => {
    return (
        <div className={`${pageName} page-wrapper ${className}`}>
            {children}
        </div>
    )
}

export default PageWrapper;