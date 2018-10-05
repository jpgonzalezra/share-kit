![Share Kit](https://github.com/hellobloom/share-kit/blob/master/images/logo.png)

# Share Kit

Easily allow your users to share their verified personal information directly with your application by scanning a QR code.

- [Share Kit](#share-kit)
  - [Installation](#installation)
  - [Request](#request)
    - [Usage](#usage)
      - [React](#react)
      - [Plain](#plain)
      - [RequestData](#requestdata)
      - [Options](#options)
  - [Response](#response)
    - [ResponseData](#responsedata)
    - [VerifiedData](#verifieddata)
    - [Attestation](#attestation)
    - [Proof](#proof)
  - [Receive](#receive)
    - [1. Perform Merkle Proof](#1-perform-merkle-proof)
    - [2. Recover Ethereum address from signature](#2-recover-ethereum-address-from-signature)
    - [3. Retrieve BloomID for recovered address](#3-retrieve-bloomid-for-recovered-address)
    - [4. Retrieve dataHash and attestation ID from attestation in specified transaction](#4-retrieve-datahash-and-attestation-id-from-attestation-in-specified-transaction)
    - [5. Confirm attestation status](#5-confirm-attestation-status)

## Installation

```
yarn add @bloomprotocol/share-kit
```

## Request

First you have to request data from the user.

### Usage

#### React

```typescript
import * as React from 'react'
import {RequestQRCode, RequestData} from '@bloomprotocol/share-kit'

const MyComponent: React.SFC = props => {
  const requestData: RequestData = {...}
  return <RequestQRCode requestData={requestData} size={200} />
}
```

#### Plain

```typescript
import {createRequestQRCode, removeRequestQRCode, RequestData} from '@bloomprotocol/share-kit'

const requestData: RequestData = {...}
const options = {
  size: 200,
}

const requestQRCodeId = createRequestQRCode(requestData, window.querySelector('#my-container'), options)

// Some time later
removeRequestQRCode(requestQRCodeId)
```

<h3 id="request-types">Types</h3>

#### RequestData

Data to be rendered into the RequestQRCode.

| Name                   | Description                                                        | Type     |
| ---------------------- | ------------------------------------------------------------------ | -------- |
| action                 |                                                                    | `Action` |
| token                  | Unique string to identify this data request                        | `string` |
| url                    | The API endpoint to POST the `ResponseData` to                     | `string` |
| org_logo_url           | A url of the logo to display to the user when requesting data      | `string` |
| org_name               | The name of the organization requesting data                       | `string` |
| types                  | The type of attestions required and the amount needed              | `Types`  |
| org_usage_policy_url   | The url of the usage policy for the organization requesting data   | `string` |
| org_privacy_policy_url | The url of the privacy policy for the organization requesting data | `string` |

<h4 id="request-example">Example</h4>

```ts
{
  action: Action.attestation,
  token: '0x8f31e48a585fd12ba58e70e03292cac712cbae39bc7eb980ec189aa88e24d043',
  url: 'https://bloom.co/api/receiveData',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['full-name', 'phone', 'email'],
}
```

![Sample QR](https://github.com/hellobloom/share-kit/blob/master/images/sampleQR.png)

#### Options

Display options for the RequestQRCode.

| Name     | Description                          | Type                               | Default   |
| -------- | ------------------------------------ | ---------------------------------- | --------- |
| size     | The height and width of the QR code. | `number`                           | `128`     |
| bgColor  | The background color of the QR code. | `string`                           | `#fff`    |
| fgColor  | The foreground color of the QR code. | `string`                           | `#6067f1` |
| renderAs | What the QR code should render as.   | <code>"svg" &#124; "canvas"</code> | `svg`     |

## Response

When the user allows access you get a response back.

<h3 id="response-types">Types</h3>

#### ResponseData

This is the shape of the object that will be POSTed to the provided URL

| Name      | Description                                 | Type           |
| --------- | ------------------------------------------- | -------------- |
| bloom_id  | The user's BloomID                          | `number`       |
| token     | Unique string to identify this data request | `string`       |
| signature | Request body signed by the Bloom app wallet | `string`       |
| data      | Array of VerifiedData objects               | `VerifiedData` |

#### VerifiedData

Data associated with the attestation

| Name     | Description                                                        | Type          |
| -------- | ------------------------------------------------------------------ | ------------- |
| tx       | The Ethereum transaction corresponding to the attestation          | `string`      |
| stage    | The Ethereum network name on which the tx can be found             | `string`      |
| rootHash | Root hash of the data merkle tree emitted by the attestation event | `string`      |
| target   | Root hash of the data merkle tree emitted by the attestation event | `Attestation` |
| proof    | Array of hashes needed to perform the merkle proof                 | `Proof`       |

#### Attestation

Format of target attestation data

| Name     | Description                                                      | Type     |
| -------- | ---------------------------------------------------------------- | -------- |
| type     | String identifying the type of attestation                       | `string` |
| provider | Optional identifier of the service used to verify this data      | `string` |
| data     | Stringified plaintext representation of the verified data        | `string` |
| nonce    | Unique hex string used to obfuscate the hashed form of this data | `string` |
| version  | Semantic version used to keep track of attestation data formats  | `string` |

#### Proof

Format of proof object used to perform merkle proof

| Name     | Description                                                  | Type     |
| -------- | ------------------------------------------------------------ | -------- |
| position | `left` or `right` indicating position of hash in merkle tree | `string` |
| data     | Hex string of node hash                                      | `string` |

<h4 id="response-example">Example</h4>

```json
{
  "bloom_id": 299,
  "token": "a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf",
  "signature": "0x4ee64886332a9d4fb480dfea0308264c1b56eb8293792d47696f6df2f1c36e1836deab53c46954fdcf0dc1f7ff7a6e7f6ac83039b597cc0f99192d1e8455b11b1b"
  "data": [
    {
      "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
      "stage": "mainnet",
      "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
      "target": {
        "type": "phone",
        "data": "+16195550587",
        "nonce": "c3877038-79a9-477d-8037-9826032e6af5",
        "version": "1.0.0"
      },
      "proof": [
        {
          "position": "right",
          "data": "0x662a74ce03d761ab066d0fc8306f474534fa5fdb087ad88baf067caefe1c026f"
        },
        {
          "position": "right",
          "data": "0xdb7d23746b0e8cbb81762bdce521cee4abdd4232bd63f017d136f24a751d0a5b"
        }
      ]
    },
    {
      "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
      "stage": "mainnet",
      "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
      "target": {
        "type": "email",
        "data": "test@bloom.co",
        "nonce": "b3877038-79a9-477d-8037-9826032e6af4",
        "version": "1.0.0"
      },
      "proof": [
        {
          "position": "left",
          "data": "0x2b81050468ea28d94e5db2ee6ae59e3cf03ab6f2da8c5f79c10e4d982af86844"
        }
      ]
    },
    {
      "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
      "stage": "mainnet",
      "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
      "target": {
        "type": "full-name",
        "data": "John Bloom",
        "nonce": "c3877038-79a9-477d-8037-9826032e6af5",
        "version": "1.0.0"
      },
      "proof": [
        {
          "position": "left",
          "data": "0x07b51789d6bbe5cb084c502b03168adafbbb58ad5fff2af9f612b2b9cf54c31f"
        },
        {
          "position": "right",
          "data": "0xdb7d23746b0e8cbb81762bdce521cee4abdd4232bd63f017d136f24a751d0a5b"
        }
      ]
    }
  ]
}
```

## Receive

The endpoint specified in the QR code should be configured to accept data in the format shown in [ResponseData](#responsedata).

The recipient can perform several verifications to ensure the data and attestation are valid.

### 1. Perform Merkle Proof

Verify that the plaintext data belongs to the merkle tree with the specified rootHash.

```javascript
import {verifyProof} from @bloomprotocol/share-kit
const verified = verifyproof(responseData)

if (verified) {
  console.log('success')
} else {
  console.log('failed to verify merkle proof')
}
```

### 2. Recover Ethereum address from signature

Recover the Ethereum address that signed the request body.

### 3. Retrieve BloomID for recovered address

Read the BloomID for the recovered address using Bloom's Account Registry contract.

```javascript
// Web3
const accountRegistry = AccountRegistry.at('[address of registry contract]')
const BloomID = accountRegistry.accountIdForAddress.call(address)
```

### 4. Retrieve dataHash and attestation ID from attestation in specified transaction

Read the event logs from the attestation that occured in the specified transaction hash. Confirm the dataHash emitted in the attestation event matches the root hash.

### 5. Confirm attestation status

Read the attestation status from attestation repo. Confirm the attestation exists and has not been revoked. An attestation with a non-zero `completedAt` should be considered valid.

```javascript
// Web3
  const attestationRepo = AttestationRepo.at("[address of attestation repo contract]")
  const attestationId = 0 ... // increments for each attestation. Retrieve from attestation event

  const recoveredAttestation = await attestationRepo.readAttestation.call(BloomID, 0)

  const [
    attesterId,
    completedAt,
    stakeValue,
    expiresAt
  ] = recoveredAttestation;

  if (completedAt > 0)
```
