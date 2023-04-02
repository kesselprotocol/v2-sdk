import { ChainId, Token, Pair, TokenAmount, WAVAX, Price } from '../src'

describe('Pair', () => {
  const TEST2 = new Token(ChainId.FUJI, '', 18, 'TEST2', 'Test Coin')
  const TEST = new Token(ChainId.FUJI, '', 18, 'TEST2', 'Test2 Coin')

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(
        () => new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(WAVAX[ChainId.FUJI], '100'), ChainId.FUJI)
      ).toThrow('CHAIN_IDS')
    })
  })

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      //expect(Pair.getAddress(TEST2, TEST)).toEqual('')
      expect(Pair.getAddress(TEST2, TEST, ChainId.AVALANCHE)).toEqual('')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST, '100'), ChainId.FUJI).token0).toEqual(TEST)
      expect(new Pair(new TokenAmount(TEST, '100'), new TokenAmount(TEST2, '100'), ChainId.FUJI).token0).toEqual(TEST)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST, '100'), ChainId.FUJI).token1).toEqual(TEST2)
      expect(new Pair(new TokenAmount(TEST, '100'), new TokenAmount(TEST2, '100'), ChainId.FUJI).token1).toEqual(TEST2)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST, '101'), ChainId.FUJI).reserve0).toEqual(
        new TokenAmount(TEST, '101')
      )
      expect(new Pair(new TokenAmount(TEST, '101'), new TokenAmount(TEST2, '100'), ChainId.FUJI).reserve0).toEqual(
        new TokenAmount(TEST, '101')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST, '101'), ChainId.FUJI).reserve1).toEqual(
        new TokenAmount(TEST2, '100')
      )
      expect(new Pair(new TokenAmount(TEST, '101'), new TokenAmount(TEST2, '100'), ChainId.FUJI).reserve1).toEqual(
        new TokenAmount(TEST2, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(TEST2, '101'), new TokenAmount(TEST, '100'), ChainId.FUJI).token0Price).toEqual(
        new Price(TEST, TEST2, '100', '101')
      )
      expect(new Pair(new TokenAmount(TEST, '100'), new TokenAmount(TEST2, '101'), ChainId.FUJI).token0Price).toEqual(
        new Price(TEST, TEST2, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(TEST2, '101'), new TokenAmount(TEST, '100'), ChainId.FUJI).token1Price).toEqual(
        new Price(TEST2, TEST, '101', '100')
      )
      expect(new Pair(new TokenAmount(TEST, '100'), new TokenAmount(TEST2, '101'), ChainId.FUJI).token1Price).toEqual(
        new Price(TEST2, TEST, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(TEST2, '101'), new TokenAmount(TEST, '100'), ChainId.FUJI)
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(TEST, TEST2)).toEqual(pair.token0Price)
      expect(pair.priceOf(TEST2, TEST)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WAVAX[ChainId.FUJI], TEST)).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(
        new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST, '101'), ChainId.FUJI).reserveOfToken(TEST2)
      ).toEqual(new TokenAmount(TEST2, '100'))
      expect(
        new Pair(new TokenAmount(TEST, '101'), new TokenAmount(TEST2, '100'), ChainId.FUJI).reserveOfToken(TEST2)
      ).toEqual(new TokenAmount(TEST2, '100'))
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(TEST, '101'), new TokenAmount(TEST2, '100'), ChainId.FUJI).reserveOfToken(
          WAVAX[ChainId.FUJI]
        )
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST, '100'), ChainId.FUJI).chainId).toEqual(
        ChainId.FUJI
      )
      expect(new Pair(new TokenAmount(TEST, '100'), new TokenAmount(TEST2, '100'), ChainId.FUJI).chainId).toEqual(
        ChainId.FUJI
      )
    })
  })
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST, '100'), ChainId.FUJI).involvesToken(TEST2)).toEqual(
      true
    )
    expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST, '100'), ChainId.FUJI).involvesToken(TEST)).toEqual(
      true
    )
    expect(
      new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST, '100'), ChainId.FUJI).involvesToken(
        WAVAX[ChainId.FUJI]
      )
    ).toEqual(false)
  })
})
