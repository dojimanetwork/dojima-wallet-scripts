#!/bin/bash

MSG_COMPILED_OUTPUTFILE=src/core/hermes/types/proto/MsgCompiled.js
MSG_COMPILED_TYPES_OUTPUTFILE=src/core/hermes/types/proto/MsgCompiled.d.ts


TMP_DIR=$(mktemp -d)

tput setaf 2; echo "Checking out https://github.com/dojimanetwork/hermes  to $TMP_DIR";tput sgr0
(cd $TMP_DIR && git clone https://github.com/dojimanetwork/hermes)

# Generate msgs
tput setaf 2; echo "Generating $MSG_COMPILED_OUTPUTFILE";tput sgr0
yarn run pbjs -w commonjs  -t static-module $TMP_DIR/hermes/third_party/proto/gogoproto/gogo.proto $TMP_DIR/hermes/proto/hermes/common/common.proto $TMP_DIR/hermes/proto/hermes/hermes/v1beta1/types/msg_deposit.proto $TMP_DIR/hermes/proto/hermes/hermes/v1beta1/types/msg_send.proto $TMP_DIR/hermes/third_party/proto/cosmos/base/v1beta1/coin.proto -o $MSG_COMPILED_OUTPUTFILE

tput setaf 2; echo "Generating $MSG_COMPILED_TYPES_OUTPUTFILE";tput sgr0
yarn run pbts  $MSG_COMPILED_OUTPUTFILE -o $MSG_COMPILED_TYPES_OUTPUTFILE

tput setaf 2; echo "Removing $TMP_DIR/hermes";tput sgr0
rm -rf $TMP_DIR