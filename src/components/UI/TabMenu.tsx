import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { tab } from "../../types/tabs-types";

const TabMenu: React.FC<{ tabs: tab[] }> = ({ tabs }) => {
  return (
    <Tabs isFitted variant="enclosed-colored" width="100%" padding="10px">
      <TabList mb="1em" background="white">
        {tabs.map((tab) => <Tab key={tab.id}
          _selected={{ color: "white", bg: "teal.500" }}
          borderTopRadius="10px"
        >{tab.name}</Tab>)}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => <TabPanel key={tab.id}>
       {tab.element}
        </TabPanel>)}        
      </TabPanels>
    </Tabs>
  );
};

export default TabMenu;
