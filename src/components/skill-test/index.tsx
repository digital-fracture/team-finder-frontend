import "./styles.scss";

interface ISkillTestProps {
  name: string;
  link: string;
  score: number | null;
  maxScore: number;
}

const SkillTest = ({ name, link, score, maxScore }: ISkillTestProps) => {
  return (
    <div className="skill-test-wrapper">
      <span className="skill-test-title">{name}</span>

      {score === null ? (
        <a href={link} className="link-button" target="_blank">
          Пройти
        </a>
      ) : (
        <span className="skill-test-score">
          Уровень {score ?? 0}/{maxScore}
        </span>
      )}
    </div>
  );
};

export default SkillTest;
