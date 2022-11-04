import { gql, DocumentNode } from "@apollo/client";

export const SkillDataVariableQuery : DocumentNode = gql`
  query SkillData($type: String!){
    SkillData(type: $type){
      name
      value
      type
    }
  }
`

export interface SkillDataVariables{
  type: string
} 