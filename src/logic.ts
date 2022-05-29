export interface IRecord {
  name: string;
  score: number;
  date: Date;
}

export const fetchScoresNormalized = (data: IRecord[]) => {
  const newData = data
    .sort((a, b) => {
      return b.score - a.score;
    })
    .slice(0, 15); //only show top 15
  const scoreList = newData.map(el => {
    return {
      name: el.name,
      score: el.score,
    };
  });
  return scoreList;
};
