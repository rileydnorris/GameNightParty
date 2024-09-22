import { FamilyFeudTemplate } from "./FamilyFeudTemplate";

export default interface FamilyFeudGame {
  teamOneId: string;
  teamTwoId: string;
  teamOneScore: number;
  teamTwoScore: number;
  game: FamilyFeudTemplate;
}
