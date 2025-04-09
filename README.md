<p align="center"><a href="https://github.com/VadimMalykhin/binance-icons"><img src="https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/.github/assets/header.svg" alt="◆ BINANCE ICONS"></a></p>

# ◆ TRADEXAI BINANCE ICONS

The Crypto/currency icons listed on <a href="https://bit.ly/3qEmuJp">Binance</a> exchange.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#live-demo)
- [Resources](#resources)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)
- [License](#license)

## Installation

### Package

```shell
npm install tradexai-binance-icons
```

### Content Delivery Network (CDN)

```
https://cdn.jsdelivr.net/gh/vadimmalykhin/binance-icons/manifest.json
```

```
https://cdn.jsdelivr.net/gh/vadimmalykhin/binance-icons/crypto/btc.svg
https://cdn.jsdelivr.net/gh/vadimmalykhin/binance-icons/crypto/eth.svg
https://cdn.jsdelivr.net/gh/vadimmalykhin/binance-icons/crypto/bnb.svg
...
```

### Zip Archive

```shell
https://github.com/VadimMalykhin/binance-icons/archive/refs/heads/main.zip
```

## Usage

### Node.js

**JavaScript**

```js
const { binanceCryptoIcons, binanceEtfIcons, binanceCurrencyIcons } = require('tradexai-binance-icons')

// Check if icon exists
const hasBtc = binanceCryptoIcons.has('btc')

// Get icon data
const btcIcon = binanceCryptoIcons.get('btc')
console.log(btcIcon.name) // Bitcoin
console.log(btcIcon.symbol) // btc
console.log(btcIcon.svg) // SVG string content

// Get all available icon symbols
const allCryptoSymbols = binanceCryptoIcons.getAllSymbols()
```

**TypeScript**

```ts
import { binanceCryptoIcons, binanceEtfIcons, binanceCurrencyIcons } from 'tradexai-binance-icons'

// Check if icon exists
const hasBtc = binanceCryptoIcons.has('btc')

// Get icon data
const btcIcon = binanceCryptoIcons.get('btc')
console.log(btcIcon?.name) // Bitcoin
console.log(btcIcon?.symbol) // btc
console.log(btcIcon?.svg) // SVG string content

// Get all available icon symbols
const allCryptoSymbols = binanceCryptoIcons.getAllSymbols()
```

### Zip Archive

Use the `manifest.json` file to resolve all available icons.

## Live demo

- [Website](https://vadimmalykhin.github.io/binance-icons/)
- [Preview](https://github.com/VadimMalykhin/binance-icons/blob/main/PREVIEW.md)

## Resources

- [Figma](https://www.figma.com/community/file/1055487423124551755)
- [NPM](https://www.npmjs.com/package/tradexai-binance-icons)

## Contributing

Contributions are more than welcome, if you are interested please take a look to the [Contributing Guidelines](https://github.com/VadimMalykhin/binance-icons/blob/main/.github/CONTRIBUTING.md).

## Disclaimer

All trademarks, logos and brand names are the property of their respective owners.

## License

[MIT](https://github.com/VadimMalykhin/binance-icons/blob/main/LICENSE)
