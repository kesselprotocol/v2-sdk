export enum ChainId {
  FUJI = 43113,
  AVALANCHE = 43114
}

export enum StakingType {
  LEGACY = 'LEGACY',
  SAR_POSITIONS = 'SAR_POSITIONS'
}

interface StakingContract {
  address: string
  active: boolean
  reward_token: string
  type: StakingType
}

export enum AirdropType {
  LEGACY = 'LEGACY',
  MERKLE = 'MERKLE',
  MERKLE_TO_STAKING = 'MERKLE_TO_STAKING',
  MERKLE_TO_STAKING_COMPLIANT = 'MERKLE_TO_STAKING_COMPLIANT'
}

interface AirdropContract {
  address: string
  active: boolean
  type: AirdropType
}

interface AirdropContractTitled extends AirdropContract {
  title: string
}

export enum ChefType {
  MINI_CHEF = 'MINI_CHEF',
  MINI_CHEF_V2 = 'MINI_CHEF_V2',
  DECENTRUM_CHEF = 'DECENTRUM_CHEF'
}

interface ChefContract {
  address: string
  active: boolean
  type: ChefType
  compoundPoolIdForNonDctrFarm?: number // this is compound pool id for non-dctr farm
}

export enum NetworkType {
  EVM = 'EVM'
}

export interface BridgeChain extends Omit<Chain, 'chain_id'> {
  chain_id?: number | string
  network_type?: NetworkType
  meta_data?: {
    [key: string]: any
  }
}

export interface Chain {
  id: string
  name: string
  chain_id?: number
  mainnet: boolean
  evm: boolean
  decentrum_is_live: boolean
  tracked_by_debank: boolean
  supported_by_gelato: boolean
  supported_by_twap: boolean
  rpc_uri: string
  subgraph?: {
    exchange?: string
    blocks?: string
    minichef?: string
    decentrumchef?: string
  }
  symbol: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls?: string[]
  dctr_symbol?: string
  logo?: string
  coingecko_id?: string
  debank_decentrum_id?: string
  contracts?: {
    dctr: string
    factory: string
    router: string
    router_daas?: string
    wrapped_native_token: string
    local_multisig?: string
    community_treasury?: string
    treasury_vester?: string
    mini_chef?: ChefContract
    timelock?: string
    migrator?: string
    airdrop?: AirdropContract
    specialAirdrops?: AirdropContractTitled[]
    foundation_multisig?: string
    joint_multisig?: string
    revenue_distributor?: string
    governor?: string
    fee_collector?: string
    multicall: string
    staking?: StakingContract[]
  }
}

export const AVALANCHE_MAINNET: Chain = {
  id: 'avalanche_mainnet',
  chain_id: ChainId.AVALANCHE,
  name: 'Avalanche',
  symbol: 'AVAX',
  dctr_symbol: 'DCTR',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/decentrumapp/v2-sdk/master/src/images/chains/avax.png',
  decentrum_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: true,
  supported_by_twap: true,
  rpc_uri: 'https://api.avax.network/ext/bc/C/rpc',
  subgraph: {
    exchange: 'https://api.thegraph.com/subgraphs/name/decentrumapp/exchange',
    blocks: '',
    minichef: ''
  },
  coingecko_id: 'avalanche',
  debank_decentrum_id: 'avax_decentrum',
  contracts: {
    dctr: '',
    factory: '',
    router: '',
    router_daas: '',
    wrapped_native_token: '',
    local_multisig: '',
    community_treasury: '',
    treasury_vester: '',
    mini_chef: {
      address: '',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    airdrop: {
      address: '',
      active: false,
      type: AirdropType.LEGACY
    },
    timelock: '',
    governor: '',
    migrator: '',
    multicall: '',
    staking: [
      {
        address: '',
        active: true,
        reward_token: '',
        type: StakingType.LEGACY
      }
    ]
  },
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  blockExplorerUrls: ['https://snowtrace.io']
}

export const AVALANCHE_FUJI: Chain = {
  id: 'avalanche_fuji',
  chain_id: 43113,
  name: 'Avalanche Fuji',
  symbol: 'AVAX',
  png_symbol: 'fujiDCTR',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/decentrumapp/sdk/master/src/images/chains/avax.png',
  decentrum_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: true,
  supported_by_twap: false,
  rpc_uri: 'https://api.avax-test.network/ext/bc/C/rpc',
  contracts: {
    dctr: '',
    factory: '',
    router: '',
    router_daas: '',
    wrapped_native_token: '',
    timelock: '',
    mini_chef: {
      address: '',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    community_treasury: '',
    airdrop: {
      address: '',
      active: false,
      type: AirdropType.LEGACY
    },
    treasury_vester: '',
    revenue_distributor: '',
    fee_collector: '',
    multicall: '',
    staking: [
      {
        address: '',
        active: true,
        reward_token: '',
        type: StakingType.LEGACY
      }
    ]
  },
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.snowtrace.io']
}

export const CHAINS: { [chainId in ChainId]: Chain } = {
  [ChainId.FUJI]: AVALANCHE_FUJI,
  [ChainId.AVALANCHE]: AVALANCHE_MAINNET
}

export const ALL_CHAINS: Chain[] = [
  AVALANCHE_MAINNET,
  AVALANCHE_FUJI
]
