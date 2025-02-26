import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Tab as TabPlan } from './tabs/plan/Tab';


type ArgsData = {
    tgtId: string|null
}

function SupportPlanDetailTabs({tgtId}: ArgsData) {
    return (
        <Tabs>
            <TabList>
                <Tab>支援計画</Tab>
                <Tab>担当者会議録</Tab>
            </TabList>
            <TabPanel><TabPlan tgtId={tgtId}/></TabPanel>
        </Tabs>
    )
}

export { SupportPlanDetailTabs }