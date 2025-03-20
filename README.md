# kucoin-python
Python SDK (sync and async) for Kucoin with Rest and WS capabilities.

You can check Kucoin's docs here: [Docs](https://ccxt.com)


You can check the SDK docs here: [SDK](https://docs.ccxt.com/#/exchanges/kucoin)

*This package derives from CCXT and allows you to call pretty much every endpoint by either using the unified CCXT API or calling the endpoints directly*

## Installation

```
pip install kucoin-api
```

## Usage

### Async

```Python
from kucoin_api import KucoinAsync

async def main():
    instance = KucoinAsync({})
    order = await instance.create_order(__EXAMPLE_SYMBOL__, "limit", "buy", 1, 100000)
```

### Sync

```Python
from kucoin_api import KucoinSync

def main():
    instance = KucoinSync({})
    order =  instance.create_order(__EXAMPLE_SYMBOL__, "limit", "buy", 1, 100000)
```

### Websockets

```Python
from kucoin_api import KucoinWs

async def main():
    instance = KucoinWs({})
    while True:
        orders = await instance.watch_orders(__EXAMPLE_SYMBOL__)
```

