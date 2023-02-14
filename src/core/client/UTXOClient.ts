import {BaseChainClient as Client} from './BaseChainClient'
import {standardFeeRates} from './feeRates'
import {calcFeesAsync} from './fees'
import {Fee, FeeRate, FeeRates, Fees, FeesWithRates, FeeType} from './types'
import {baseAmount} from "../utils";

export abstract class UTXOClient extends Client {
    protected abstract getSuggestedFeeRate(): Promise<FeeRate>
    protected abstract calcFee(feeRate: FeeRate, memo?: string): Promise<Fee>

    async getFeesWithRates(memo?: string): Promise<FeesWithRates> {
        const rates = await this.getFeeRates()
        return {
            fees: await calcFeesAsync(rates, this.calcFee.bind(this), memo),
            rates,
        }
    }

    async getFees(memo?: string): Promise<Fees> {
        try {
            const { fees } = await this.getFeesWithRates(memo)
            return fees
        } catch (error) {
            const fees = await this.getFeeRateFromHermeschain()
            const feeResult: Fees = {
                type: FeeType.FlatFee,
                average: baseAmount(fees),
                fast: baseAmount(fees),
                fastest: baseAmount(fees)
            }
            return feeResult
        }
    }

    /**
     * @deprecated Use getFees(memo) instead
     */
    async getFeesWithMemo(memo: string): Promise<Fees> {
        const { fees } = await this.getFeesWithRates(memo)
        return fees
    }

    async getFeeRates(): Promise<FeeRates> {
        const feeRate: FeeRate = await (async () => {
            // try {
            //     return await this.getFeeRateFromHermeschain()
            // } catch (error) {
            //     console.warn(`Rate lookup via Hermeschain failed: ${error}`)
            // }
            return await this.getSuggestedFeeRate()
        })()

        return standardFeeRates(feeRate)
    }
}