import { useState } from 'react'

import { Button, Container, FormControl, FormHelperText, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const blockchainToMetadata = {
  '0x1': {
    name: 'Ethereum',
    currency: 'ETH',
    logo: '/images/ethereum-logo-small.png',
    description: 'Ethereum is the largest blockchain supporting NFTs. It is the default blockchain we recommend for this application.',
  },
}

function Home() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [blockchain, setBlockchain] = useState('0x1')
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)

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
    setAccounts(accountAddresses)
    setSelectedAccount(accountAddresses[0])

    console.log('accountAddresses', accountAddresses)
  }

  function renderSignInButtons() {
    return (
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
    )
  }

  function renderAccountSelection() {
    return (
      <div className="ml-1 x11 flex-grow">
        <FormControl className="flex-grow">
          <Select
            fullWidth
            value={selectedAccount}
            onChange={e => setSelectedAccount(e.target.value)}
            color="primary"
          >
            {accounts.map(accountAddress => (
              <MenuItem
                key={accountAddress}
                value={accountAddress}
              >
                {accountAddress}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText className="x41">
            Carefully select which account the NFT will belong to.
            <div className="pt-0h">
              <Tooltip title="Pick one with enough funds, or if uncertain the first one.">
                <HelpOutlineIcon
                  className="ml-1"
                  fontSize="tiny"
                />
              </Tooltip>
            </div>
          </FormHelperText>
        </FormControl>
        <div className="ml-2 pt-1h x41">
          <img
            src={blockchainToMetadata[blockchain].logo}
            alt={blockchainToMetadata[blockchain].name}
            width={16}
          />
          <Typography
            variant="h6"
            className="ml-1"
          >
            {blockchainToMetadata[blockchain].currency} 12.0000000987645638
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <Container
      maxWidth="md"
      className="mt-4"
    >
      <div className="x41">
        <img
          src="/images/logo.png"
          alt="NFT Creator logo"
          width={64 + 12}
        />
        <Typography
          variant="h1"
          color="gradient1"
          className="ml-2"
        >
          NFT Creator
        </Typography>
      </div>
      <section className="mt-2 x41">
        <Typography>
          Welcome! Here you can create a <strong>Non-Fungible Token</strong> on the Ethereum blockchains. This process is called <strong>minting</strong>.
        </Typography>
      </section>
      <section className="mt-6 x11">
        <Typography
          variant="h6"
          color="gradient2"
          className="pt-1h"
          style={{ width: 128 }}
        >
          What to mint:
        </Typography>
        <FormControl className="ml-1 flex-grow">
          <TextField
            placeholder="https://example.com/art.png"
            multiline
            maxRows={4}
            value={content}
            onChange={event => setContent(event.target.value)}
          />
          <FormHelperText>
            It can be an URL pointing to some art file, an idea description, or anything else
          </FormHelperText>
        </FormControl>
      </section>
      <section className="mt-2 x11">
        <Typography
          variant="h6"
          color="gradient1"
          className="pt-1h"
          style={{ width: 128 }}
        >
          Blockchain:
        </Typography>
        <FormControl className="ml-1 flex-grow">
          <Select
            value={blockchain}
            onChange={e => setBlockchain(e.target.value)}
            color="primary"
            fullWidth
          >
            {Object.keys(blockchainToMetadata).map(blockchainId => (
              <MenuItem
                key={blockchainId}
                value={blockchainId}
              >
                {blockchainToMetadata[blockchainId].name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {blockchainToMetadata[blockchain].description}
          </FormHelperText>
        </FormControl>
      </section>
      <section className="mt-2 x11">
        <Typography
          variant="h6"
          color="gradient2"
          className="pt-1h"
          style={{ width: 128 }}
        >
          Account:
        </Typography>
        {selectedAccount ? renderAccountSelection() : renderSignInButtons()}
      </section>
    </Container>
  )
}

export default Home
