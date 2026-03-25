import Decimal from 'decimal.js-light';

/** Monthly payment (PMT) for a fixed-rate loan */
export function pmt(principal: number, annualRate: number, years: number): number {
  const P = new Decimal(principal);
  const monthlyRate = new Decimal(annualRate).div(100).div(12);
  const n = new Decimal(years).times(12);
  if (monthlyRate.isZero()) {
    return P.div(n).toDecimalPlaces(2).toNumber();
  }
  const onePlusR = monthlyRate.plus(1);
  const onePlusRtoN = onePlusR.toPower(n.toNumber());
  const numerator = P.times(monthlyRate).times(onePlusRtoN);
  const denominator = onePlusRtoN.minus(1);
  return numerator.div(denominator).toDecimalPlaces(2).toNumber();
}

/** Future value with regular contributions: FV = PV*(1+r/n)^(nt) + PMT*[((1+r/n)^(nt)-1)/(r/n)] */
export function fv(presentValue: number, monthlyContribution: number, annualRate: number, years: number): number {
  const PV = new Decimal(presentValue);
  const PMT = new Decimal(monthlyContribution);
  const monthlyRate = new Decimal(annualRate).div(100).div(12);
  const n = new Decimal(years).times(12);
  if (monthlyRate.isZero()) {
    return PV.plus(PMT.times(n)).toDecimalPlaces(2).toNumber();
  }
  const onePlusR = monthlyRate.plus(1);
  const compounded = onePlusR.toPower(n.toNumber());
  const pvFuture = PV.times(compounded);
  const annuityFactor = compounded.minus(1).div(monthlyRate);
  const pmtFuture = PMT.times(annuityFactor);
  return pvFuture.plus(pmtFuture).toDecimalPlaces(2).toNumber();
}

/** Present value of a future amount */
export function pv(futureValue: number, annualRate: number, years: number): number {
  const FV = new Decimal(futureValue);
  const monthlyRate = new Decimal(annualRate).div(100).div(12);
  const n = new Decimal(years).times(12);
  if (monthlyRate.isZero()) {
    return FV.toDecimalPlaces(2).toNumber();
  }
  const onePlusR = monthlyRate.plus(1);
  const compounded = onePlusR.toPower(n.toNumber());
  return FV.div(compounded).toDecimalPlaces(2).toNumber();
}

/** Round to 2 decimal places (cents) */
export function toCents(value: number): number {
  return new Decimal(value).toDecimalPlaces(2).toNumber();
}

/** Create a Decimal instance for chained operations */
export function decimal(value: number | string): Decimal {
  return new Decimal(value);
}
