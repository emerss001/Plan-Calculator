interface CalculePlanProps {
    phones: number;
    computers: number;
    smartTvs: number;
    tvBox: number;
    others: number;
    gamer: boolean;
}

export const calculeOfPlan = ({ computers, gamer, others, phones, smartTvs, tvBox }: CalculePlanProps) => {
    let weightTotal = phones * 0.8 + computers * 0.5 + smartTvs * 0.4 + tvBox * 0.6 + others * 0.1;

    if (gamer) weightTotal = weightTotal * 2;

    return weightTotal;
};
