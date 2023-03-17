import { gql, DocumentNode } from "@apollo/client";
import { ISkill } from "@ammarahmedca/types";

export const SKILLS_QUERY: DocumentNode = gql`
  query Skills($onlyType: String) {
    skills(onlyType: $onlyType) {
      name
      value
      type
    }
  }
`;

export namespace SkillsQuery {
  export interface Response {
    skills: ISkill[];
  }

  export interface Variables {
    onlyType?: string;
  }
}
