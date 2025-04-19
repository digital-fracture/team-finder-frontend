import "./styles.scss";
import ISkill from "../../contracts/api/types/skill";

interface ITeamParticipantProps {
  name: string;
  isLead: boolean;
  scores: ISkill[];
}

const TeamParticipant = ({ name, isLead, scores }: ITeamParticipantProps) => {
  return (
    <div className="team-participant-wrapper">
      <span className={"team-partcipant-title" + (isLead ? " team-lead" : "")}>
        {name}
      </span>

      <div className="team-participant-skills">
        {scores
          .toSorted((a, b) => (b.level && a.level ? b.level - a.level : 0))
          .slice(0, 1)
          .map((skill) => (
            <div className="team-participant-skill" key={skill.name}>
              {skill.name} ({skill.level} ур.)
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamParticipant;
