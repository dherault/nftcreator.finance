import { useState } from 'react'
import { ethers } from 'ethers'

import { Button, Container, FormControl, FormHelperText, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const defaultBlockchain = '0x4'
const blockchainToMetadata = {
  '0x1': {
    name: 'Ethereum',
    currency: 'ETH',
    logo: '/images/ethereum-logo-small.png',
    description: 'Ethereum is the largest blockchain supporting NFTs. It is the default blockchain we recommend for this application.',
  },
  '0x4': {
    name: 'Ethereum Rinkeby Test Network',
    currency: 'ETH',
    logo: '/images/ethereum-logo-small.png',
    description: 'The Rinkeby Test Network should be used for testing purposes only.',
  },
}

function Home() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [blockchain, setBlockchain] = useState(defaultBlockchain)
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [balance, setBalance] = useState(null)

  async function handleBlockchainChange(event) {
    const nextBlockchain = event.target.value

    setBlockchain(nextBlockchain)

    await handleBlockchainOrAccountChange(nextBlockchain)
  }

  async function handleMetamaskClick() {
    const hasMetamask = window.ethereum?.isMetaMask

    if (!hasMetamask) {
      window.open('https://metamask.io/', '_blank').focus()

      return
    }

    setLoading(true)

    const accountAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const nextSelectedAccountAddress = accountAddresses[0]

    setAccounts(accountAddresses)
    setSelectedAccount(nextSelectedAccountAddress)

    await handleBlockchainOrAccountChange(null, nextSelectedAccountAddress)

    setLoading(false)

    // console.log('x', accountAddresses, balance)
  }

  async function handleBlockchainOrAccountChange(nextBlockchain, nextSelectedAccount) {
    await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: nextBlockchain || blockchain }] })

    const nextProvider = new ethers.providers.Web3Provider(window.ethereum)
    const nextBalance = await nextProvider.getBalance(nextSelectedAccount || selectedAccount)

    setProvider(nextProvider)
    setBalance(ethers.utils.formatEther(nextBalance))
  }

  function renderSignInButtons() {
    return (
      <div className="ml-1 x41">
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
          <FormHelperText>
            Carefully select which account the NFT will belong to. If uncertain pick the first one.
          </FormHelperText>
        </FormControl>
        {/* <div className="ml-2 pt-1h x41">
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
        </div> */}
      </div>
    )
  }

  return (
    <Container
      maxWidth="md"
      className="mt-4"
    >
      {/*
        LOGO AND TITLE
      */}
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
      {/*
        CONTENT
      */}
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
      {/*
        ACCOUNT
      */}
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
      {/*
        BLOCKCHAIN
      */}
      {!!selectedAccount && (
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
              onChange={handleBlockchainChange}
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
      )}
      {/*
        BALANCE
      */}
      {!!selectedAccount && (
        <section className="mt-2 x11">
          <Typography
            variant="h6"
            color="gradient2"
            className="pt-1h"
            style={{ width: 128 }}
          >
            Balance:
          </Typography>
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
              {blockchainToMetadata[blockchain].currency} {balance}
            </Typography>
          </div>
        </section>
      )}
    </Container>
  )
}

export default Home
