import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@mui/material'

function Authenticator() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  async function handleMetamaskClick() {
    const hasMetamask = window.ethereum?.isMetaMask

    if (!hasMetamask) {
      window.open('https://metamask.io/', '_blank').focus()

      return
    }

    setLoading(true)

    const accountAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' })

    await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] })

    setLoading(false)
    dispatch({ type: 'SET_ACCOUNT_ADDRESSES', payload: accountAddresses })

    console.log('accountAddresses', accountAddresses)
  }

  return (
    <div className="x4">
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={(
          <img
            src="/images/metamask-logo.png"
            alt="Metamask"
            width={32}
            className="mr-1"
          />
        )}
        onClick={handleMetamaskClick}
        disabled={loading}
      >
        Sign in with Metamask
      </Button>
    </div>
  )
}

export default Authenticator
