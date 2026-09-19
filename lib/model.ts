import { CAPEX, FIXED_COSTS, LINES, LOAN, SEASONALITY, loanPayment } from "./data";

export type Volumes = Record<string, number>;

export function computeModel(volumes?: Volumes, loanMonths = LOAN.months, annualRate = LOAN.annualRate) {
  const lines = LINES.map((l) => {
    const volume = volumes?.[l.id] ?? l.volume;
    const revenue = volume * l.price;
    const direct = revenue * l.costRate;
    return { ...l, volume, revenue, direct, margin: revenue - direct };
  });
  const revenue = lines.reduce((s, l) => s + l.revenue, 0);
  const direct = lines.reduce((s, l) => s + l.direct, 0);
  const fixed = FIXED_COSTS.reduce((s, c) => s + c.amount, 0);
  const capex = CAPEX.reduce((s, c) => s + c.amount, 0);
  const payment = loanPayment(LOAN.principal, annualRate, loanMonths);
  const paymentsInYear = Math.min(loanMonths, 12);
  const loanPaidInYear = payment * paymentsInYear;
  // Interest actually paid during the 12 months (amortisation schedule).
  let balance = LOAN.principal;
  let interest = 0;
  for (let i = 0; i < paymentsInYear; i++) {
    const int = balance * (annualRate / 12);
    interest += int;
    balance -= payment - int;
  }
  const principalPaid = loanPaidInYear - interest;
  const profit = revenue - direct - fixed - capex - interest;
  const startCash = LOAN.principal + LOAN.ownFunds;
  const cashEnd = startCash + profit - principalPaid;
  const loanTotal = payment * loanMonths;
  const monthly = SEASONALITY.map((w) => w * revenue);
  return { lines, revenue, direct, fixed, capex, interest, payment, principalPaid, loanPaidInYear, loanTotal, balanceEnd: Math.max(0, balance), profit, cashEnd, startCash, monthly };
}
