block link(block(transation(validation+broadcoat)))
utxo
    1. unique
    2. in transaction output list
    3. value
    4. optional
transaction(tx)
    1. reference number of the current transaction
    2. reference to one or more input utxo
    3. reference to one or more output utxo newly generated by the current transaction.
    4. total input amount and output amout.

1. validation of transactions
2. gathering transaction for a block
3. broadcasting valid transactions & blocks
4. consensus on next block creation
5. chaining blocks

roles of participant
miner
    1. verify transactions
    2. broadcast transctions
    3. compete to create a block
    4. reach consensus by validating block
    5. broadcast new block
    6. confirm tranctions