import { gql, DocumentNode } from "@apollo/client";

export const SkillsQuery : DocumentNode = gql`
  query Skills($onlyType: String){
    skills(onlyType: $onlyType){
      name
      value
      type
    }
  }
`

export interface SkillsQueryVariables{
  onlyType?: string
} 

export interface SkillQueryResponse{
  skills: ISkill[]
}