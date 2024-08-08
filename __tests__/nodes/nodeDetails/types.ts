export type ObserveChainObject = {
    "chain": string,
    "height": number
}

export type BondProviderObject = {
    "bond_address": string,
    "bond": string
}

export type NodeAddressObject = {
    "node_address": string,
    "status": string,
    "pub_key_set": {
        "secp256k1": string,
        "ed25519": string
    },
    "validator_cons_pub_key": string,
    "bond": string,
    "active_block_height": number,
    "bond_address": string,
    "status_since": number,
    "signer_membership": Array<any>,
    "requested_to_leave": boolean,
    "forced_to_leave": boolean,
    "leave_height": number,
    "ip_address": string,
    "version": string,
    "slash_points": number,
    "jail": {
        "node_address": string
    },
    "current_award": string,
    "observe_chains": Array<ObserveChainObject> | null,
    "preflight_status": {
        "status": string,
        "reason": string,
        "code": number
    },
    "bond_providers": {
        "node_address": string,
        "node_operator_fee": string,
        "providers": Array<BondProviderObject>,
    }
}