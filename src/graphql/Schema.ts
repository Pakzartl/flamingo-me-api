import { gql } from "apollo-server-express"; //will create a schema
const Schemas = gql`
  type User {
    user_id: ID!
    email: String
    full_name: String
    username: String
    mobile_number: String
    user_role: String
    email_token: String
  }
  
  #handle user commands
  type Query {
    getAllUser: [User]
    getUserByEmail(email: String!): User
  }
`;

export default Schemas;
//export this Schema so we can use it in our project