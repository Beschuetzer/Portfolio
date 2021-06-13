import React from 'react'

interface WithUpdateOnUrlChangeProps {

}

const withUpdateOnUrlChange = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (
    class WithUpdateOnUrlChange extends React.Component<P & WithUpdateOnUrlChangeProps> {


      render() {
        const {...props} = this.props
        return (
          <WrappedComponent {...props as P} />
        )
      }
    }
  )
  
}

export default withUpdateOnUrlChange