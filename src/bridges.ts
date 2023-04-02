export interface Bridge {
  id: string
  name: string
  logo: string
  aggregator_address: string
  affiliate: string
  fee: number
}

export interface BridgePartner {
  name: string
  logo: string
}

export const BRIDGES: Bridge[] = []

export const BRIDGE_PARTNERS: BridgePartner[] = [
]
