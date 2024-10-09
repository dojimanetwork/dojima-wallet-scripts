import axios from "axios";
import { formatDistanceStrict } from "date-fns";

// Replace API and RPC with the actual endpoints
// const API = "https://api-h4s.dojima.network";
const RPC = "https://rpc-h4s.dojima.network";

async function getHermesLatestHeight() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api-h4s.dojima.network/cosmos/base/tendermint/v1beta1/blocks/latest",
    headers: {
      accept: "application/json",
    },
  };
  let result: string;
  const req = await axios.request(config);
  if (req.status === 200) {
    const jsonResp: BaseHermesApiLatestBlockResultType = req.data;
    console.log("jsonResp : ", jsonResp);
    result = jsonResp.block.header.height;
  } else {
    // console.log(error);
    result = `Failed to get data, ${req.status}`;
  }

  return result;
}

async function getMimirResponse() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api-h4s.dojima.network/hermeschain/hermset",
    headers: {
      accept: "application/json",
    },
  };
  const req = await axios.request(config);
  if (req.status === 200) {
    const jsonResp = req.data;
    console.log("mimirResp : ", jsonResp);
    return jsonResp;
  } else {
    console.log(req);
    //   result = `Failed to get data, ${req.status}`;
  }
}

async function getConstantsResponse() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api-h4s.dojima.network/hermeschain/constants",
    headers: {
      accept: "application/json",
    },
  };
  const req = await axios.request(config);
  if (req.status === 200) {
    const jsonResp = req.data;
    console.log("constsResp : ", jsonResp);
    return jsonResp;
  } else {
    console.log(req);
    //   result = `Failed to get data, ${req.status}`;
  }
}

async function getVaultsResponse() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api-h4s.dojima.network/hermeschain/vaults/fortuna",
    headers: {
      accept: "application/json",
    },
  };
  const req = await axios.request(config);
  if (req.status === 200) {
    const jsonResp = req.data;
    console.log("vaultsResp : ", jsonResp);
    return jsonResp;
  } else {
    console.log(req);
    //   result = `Failed to get data, ${req.status}`;
  }
}

// async function getValuesForChurnCalculations() {
//   try {
//     let THOR_HEIGHT = 1500313;
//     // const THOR_HEIGHT = 1000000; // Example block height, replace this with actual logic to get THOR height.
//     const LATEST_HEIGHT = await getHermesLatestHeight();
//     if (LATEST_HEIGHT && !LATEST_HEIGHT.includes("Failed")) {
//       THOR_HEIGHT = Number(LATEST_HEIGHT);
//     }
//     // Fetch data from the API
//     // const [mimirResponse, constantsResponse, vaultsResponse] =
//     //   await Promise.all([
//     //     axios.get(`${API}/hermeschain/hermset`),
//     //     axios.get(`${API}/hermeschain/constants`),
//     //     axios.get(`${API}/hermeschain/vaults/fortuna`),
//     //   ]);

//     const mimirResponse = await getMimirResponse();
//     const constantsResponse = await getConstantsResponse();
//     const vaultsResponse = await getVaultsResponse();

//     // const MIMIR = mimirResponse.data;
//     // const CONSTANTS = constantsResponse.data;
//     // const VAULTS = vaultsResponse.data;

//     const MIMIR = mimirResponse;
//     const CONSTANTS = constantsResponse;
//     const VAULTS = vaultsResponse;

//     // const CHURN_MIGRATE_ROUNDS = CONSTANTS.int_64_values.ChurnMigrateRounds;
//     const CHURN_MIGRATE_ROUNDS = 5;
//     let FUND_MIGRATION_INTERVAL = MIMIR.FUNDMIGRATIONINTERVAL ? MIMIR.FUNDMIGRATIONINTERVAL : null;
//     let CHURN_INTERVAL = MIMIR.CHURNINTERVAL;

//     // Fallback to constants if MIMIR values are null
//     if (FUND_MIGRATION_INTERVAL === null) {
//       FUND_MIGRATION_INTERVAL = CONSTANTS.int_64_values.FundMigrationInterval;
//     }
//     if (CHURN_INTERVAL === null) {
//       CHURN_INTERVAL = CONSTANTS.int_64_values.ChurnInterval;
//     }

//     // Calculate churn start (max block height from vaults)
//     const CHURN_START = Math.max(
//       ...VAULTS.map((vault: any) => vault.block_height)
//     );

//     // Check if any vault is in 'RetiringVault' status
//     const CHURNING = VAULTS.some(
//       (vault: any) => vault.status === "RetiringVault"
//     );
//     let START_ETA = "";

//     if (!CHURNING) {
//       // Set churn height to last churn plus interval
//       const newChurnStart = CHURN_START + CHURN_INTERVAL;

//       // Calculate start churn ETA
//       const pastBlock = await axios.get(
//         `${RPC}/block?height=${THOR_HEIGHT + THOR_HEIGHT - newChurnStart}`
//       );
//       const pastTime = new Date(
//         pastBlock.data.result.block.header.time
//       ).getTime();
//       const now = Date.now();
//     //   const secondsLeft = now - pastTime;
//     //   const daysLeft = Math.floor(secondsLeft / 86400);
//       START_ETA = formatDistanceStrict(new Date(pastTime), new Date(now), {
//         addSuffix: false,
//       });
//     } else {
//       START_ETA = "in progress";
//     }

//     // Calculate churn finish ETA
//     const CHURN_FINISH =
//       CHURN_START + (CHURN_MIGRATE_ROUNDS + 1) * FUND_MIGRATION_INTERVAL + 1;
//     const BLOCKS_LEFT = CHURN_FINISH - THOR_HEIGHT;

//     let FINISH_ETA = "";

//     if (BLOCKS_LEFT < 0) {
//       FINISH_ETA =
//         "final migration pending - check for stuck migration or insolvency";
//     } else {
//       const pastBlock = await axios.get(
//         `${RPC}/block?height=${THOR_HEIGHT - BLOCKS_LEFT}`
//       );
//       const pastTime = new Date(
//         pastBlock.data.result.block.header.time
//       ).getTime();
//       const now = Date.now();
//     //   const secondsLeft = now - pastTime;
//     //   const daysLeft = Math.floor(secondsLeft / 86400);
//       FINISH_ETA = formatDistanceStrict(new Date(pastTime), new Date(now), {
//         addSuffix: false,
//       });
//     }

//     console.log(
//       "\n\nCHURN ESTIMATES - failed keygens, halted chains, and stuck migrations not considered\n"
//     );
//     console.log(`    Churn Interval: ${CHURN_INTERVAL}`);
//     console.log(`Migration Interval: ${FUND_MIGRATION_INTERVAL}`);
//     console.log(
//       `  Migration Rounds: ${CHURN_MIGRATE_ROUNDS} (plus one additional round expected for dust)\n`
//     );
//     console.log(`      Start Height: ${CHURN_START}`);
//     console.log(`   ETA Churn Start: ${START_ETA}\n`);
//     console.log(`     Finish Height: ${CHURN_FINISH}`);
//     console.log(`  ETA Churn Finish: ${FINISH_ETA}`);
//   } catch (error) {
//     console.error("Error fetching churn data:", error);
//   }
// }

async function getValuesForChurnCalculations() {
  try {
    let THOR_HEIGHT = 1500313; // Placeholder, replace with actual logic to get block height.
    const LATEST_HEIGHT = await getHermesLatestHeight();
    if (LATEST_HEIGHT && !LATEST_HEIGHT.includes("Failed")) {
      THOR_HEIGHT = Number(LATEST_HEIGHT);
    }

    // Fetch MIMIR, constants, and vaults data
    const mimirResponse = await getMimirResponse();
    const constantsResponse = await getConstantsResponse();
    const vaultsResponse = await getVaultsResponse();

    const MIMIR = mimirResponse;
    const CONSTANTS = constantsResponse;
    const VAULTS = vaultsResponse;

    const CHURN_MIGRATE_ROUNDS = 5;
    let FUND_MIGRATION_INTERVAL =
      MIMIR.FUNDMIGRATIONINTERVAL ||
      CONSTANTS.int_64_values.FundMigrationInterval;
    let CHURN_INTERVAL =
      MIMIR.CHURNINTERVAL || CONSTANTS.int_64_values.ChurnInterval;

    // Calculate churn start (max block height from vaults)
    const CHURN_START = Math.max(
      ...VAULTS.map((vault: any) => vault.block_height)
    );

    // Check if vault is in 'RetiringVault' status
    const CHURNING = VAULTS.some(
      (vault: any) => vault.status === "RetiringVault"
    );
    let START_ETA = "";

    if (!CHURNING) {
      const newChurnStart = CHURN_START + CHURN_INTERVAL;

      // Calculate start churn ETA
      const pastBlock = await axios.get(
        `${RPC}/block?height=${THOR_HEIGHT + THOR_HEIGHT - newChurnStart}`
      );
      const pastTime = new Date(
        pastBlock.data.result.block.header.time
      ).getTime();
      const now = Date.now();
      START_ETA = formatDistanceStrict(new Date(pastTime), new Date(now), {
        addSuffix: false,
      });
    } else {
      START_ETA = "in progress";
    }

    // Calculate churn finish ETA
    const CHURN_FINISH =
      CHURN_START + (CHURN_MIGRATE_ROUNDS + 1) * FUND_MIGRATION_INTERVAL + 1;
    const BLOCKS_LEFT = CHURN_FINISH - THOR_HEIGHT;

    let FINISH_ETA = "";

    if (BLOCKS_LEFT < 0) {
      FINISH_ETA =
        "final migration pending - check for stuck migration or insolvency";
    } else {
      const pastBlock = await axios.get(
        `${RPC}/block?height=${THOR_HEIGHT - BLOCKS_LEFT}`
      );
      const pastTime = new Date(
        pastBlock.data.result.block.header.time
      ).getTime();
      const now = Date.now();
      FINISH_ETA = formatDistanceStrict(new Date(pastTime), new Date(now), {
        addSuffix: false,
      });
    }

    // Display Churn Time and Churn status
    const CHURN_TIME_LEFT = (CHURN_INTERVAL - (THOR_HEIGHT - CHURN_START)) * 6; // Assuming each block takes 6 seconds
    const CHURN_TIME_DISPLAY = formatDistanceStrict(
      new Date(),
      new Date(Date.now() + CHURN_TIME_LEFT * 1000),
      { addSuffix: true }
    );

    console.log(
      "\n\nCHURN ESTIMATES - failed keygens, halted chains, and stuck migrations not considered\n"
    );
    console.log(`    Churn Interval: ${CHURN_INTERVAL}`);
    console.log(`Migration Interval: ${FUND_MIGRATION_INTERVAL}`);
    console.log(
      `  Migration Rounds: ${CHURN_MIGRATE_ROUNDS} (plus one additional round expected for dust)\n`
    );
    console.log(`      Start Height: ${CHURN_START}`);
    console.log(`   ETA Churn Start: ${START_ETA}\n`);
    console.log(`     Finish Height: ${CHURN_FINISH}`);
    console.log(`  ETA Churn Finish: ${FINISH_ETA}`);
    console.log(`  Time until next Churn: ${CHURN_TIME_DISPLAY}`);
    console.log(`      Current Height: ${THOR_HEIGHT}`);
  } catch (error) {
    console.error("Error fetching churn data:", error);
  }
}

// Call the function
getValuesForChurnCalculations();

export type BaseHermesApiLatestBlockResultType = {
  block_id: {
    hash: string;
    part_set_header: {
      total: number;
      hash: string;
    };
  };
  block: {
    header: {
      version: {
        block: string;
        app: string;
      };
      chain_id: string;
      height: string;
      time: string;
      last_block_id: {
        hash: string;
        part_set_header: {
          total: number;
          hash: string;
        };
      };
      last_commit_hash: string;
      data_hash: string;
      validators_hash: string;
      next_validators_hash: string;
      consensus_hash: string;
      app_hash: string;
      last_results_hash: string;
      evidence_hash: string;
      proposer_address: string;
    };
    data: {
      txs: [string];
    };
    evidence: {
      evidence: [
        {
          duplicate_vote_evidence: {
            vote_a: {
              type: string;
              height: string;
              round: number;
              block_id: {
                hash: string;
                part_set_header: {
                  total: number;
                  hash: string;
                };
              };
              timestamp: string;
              validator_address: string;
              validator_index: number;
              signature: string;
            };
            vote_b: {
              type: string;
              height: string;
              round: number;
              block_id: {
                hash: string;
                part_set_header: {
                  total: number;
                  hash: string;
                };
              };
              timestamp: string;
              validator_address: string;
              validator_index: number;
              signature: string;
            };
            total_voting_power: string;
            validator_power: string;
            timestamp: string;
          };
          light_client_attack_evidence: {
            conflicting_block: {
              signed_header: {
                header: {
                  version: {
                    block: string;
                    app: string;
                  };
                  chain_id: string;
                  height: string;
                  time: string;
                  last_block_id: {
                    hash: string;
                    part_set_header: {
                      total: number;
                      hash: string;
                    };
                  };
                  last_commit_hash: string;
                  data_hash: string;
                  validators_hash: string;
                  next_validators_hash: string;
                  consensus_hash: string;
                  app_hash: string;
                  last_results_hash: string;
                  evidence_hash: string;
                  proposer_address: string;
                };
                commit: {
                  height: string;
                  round: number;
                  block_id: {
                    hash: string;
                    part_set_header: {
                      total: number;
                      hash: string;
                    };
                  };
                  signatures: [
                    {
                      block_id_flag: string;
                      validator_address: string;
                      timestamp: string;
                      signature: string;
                    }
                  ];
                };
              };
              validator_set: {
                validators: [
                  {
                    address: string;
                    pub_key: {
                      ed25519: string;
                      secp256k1: string;
                    };
                    voting_power: string;
                    proposer_priority: string;
                  }
                ];
                proposer: {
                  address: string;
                  pub_key: {
                    ed25519: string;
                    secp256k1: string;
                  };
                  voting_power: string;
                  proposer_priority: string;
                };
                total_voting_power: string;
              };
            };
            common_height: string;
            byzantine_validators: [
              {
                address: string;
                pub_key: {
                  ed25519: string;
                  secp256k1: string;
                };
                voting_power: string;
                proposer_priority: string;
              }
            ];
            total_voting_power: string;
            timestamp: string;
          };
        }
      ];
    };
    last_commit: {
      height: string;
      round: number;
      block_id: {
        hash: string;
        part_set_header: {
          total: number;
          hash: string;
        };
      };
      signatures: [
        {
          block_id_flag: string;
          validator_address: string;
          timestamp: string;
          signature: string;
        }
      ];
    };
  };
};
