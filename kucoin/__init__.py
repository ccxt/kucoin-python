import sys
import kucoin.ccxt as ccxt_module
sys.modules['ccxt'] = ccxt_module

from kucoin.ccxt import kucoin as KucoinSync
from kucoin.ccxt.async_support.kucoin import kucoin as KucoinAsync
from kucoin.ccxt.pro.kucoin import kucoin as KucoinWs
