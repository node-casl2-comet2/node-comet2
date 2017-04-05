## node-comet2

[![Build Status](https://travis-ci.org/node-casl2-comet2/node-comet2.svg?branch=master)](https://travis-ci.org/node-casl2-comet2/node-comet2)
[![Coverage Status](https://coveralls.io/repos/github/node-casl2-comet2/node-comet2/badge.svg?branch=master)](https://coveralls.io/github/node-casl2-comet2/node-comet2?branch=master)

node-comet2はCOMET2のCLIツールです。

[![node-comet2 demo](https://asciinema.org/a/111024.png)](https://asciinema.org/a/111024)

## Install
1. [Node.js](https://nodejs.org/ja/)をインストール
1. `$ npm install -g @maxfield/node-comet2`
1. 以上


## Usage
```bash
# ヘルプを表示します
$ node-comet2 --help

# プログラムを実行します。
$ node-comet2 -r source.com

# 対話モードでプログラムを実行します
$ node-comet2 -i source.com

# オプション付きでプログラムを実行します
$ node-casl2 -r --useGR8AsSP source.com
```


## Interactive Mode

|  コマンド | 説明 |
|  ------ | ------ |
|  s | 命令を1つ実行します(ステップ実行)。 |
|  q | プログラムの実行を終了します。 |
|  r | 対話モードを終了してプログラムを実行します。 |
|  h | 対話モードのヘルプを表示します。 |


## COMET2 Options

|  オプション | 説明 |
|  ------ | ------ |
|  --useGR8AsSP | GR8をスタックポインタとして使用します。 |
|  --allowSelfModifying | 自己書き換えを許可します。 |


## Author
[Maxfield Walker](https://github.com/MaxfieldWalker)

## License
MIT
