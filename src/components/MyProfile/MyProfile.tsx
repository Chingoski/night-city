import {Flex,} from "@chakra-ui/react";

import { tab } from "../../types/tabs-types";

import TabMenu from "../UI/TabMenu";
import PersonalInformation from "./PersonalInformation";
import PasswordChange from "./PasswordChange";

function MyProfile() {
  const tabs:tab[] =[
    {id:1, name: 'Personal Information', element: <PersonalInformation/>},
    {id:2, name: 'Change Password', element: <PasswordChange/>}
  ]
  return (
    <Flex
      width="100%"
      height="100%"
      flexDirection="column"
      justifyContent="flex-start"
    >
    <TabMenu tabs={tabs}/>
    </Flex>
  );
}

export default MyProfile;
