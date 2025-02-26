import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { InquiryDetailSales } from './tabs/sales/InquiryDetailSales';
import { InquiryDetailProfile } from './tabs/profile/InquiryDetailProfile';
import { InquiryDetailHearing } from './tabs/hearing/InquiryDetailHearing';


type ArgsData = {
    tgtId: string|null
}

function InquiryDetailTab({tgtId}: ArgsData) {
    return (
        <Tabs>
            <TabList>
                <Tab>営業ツール</Tab>
                <Tab>本人プロフィール</Tab>
                <Tab>ヒアリング内容</Tab>
            </TabList>
            <TabPanel><InquiryDetailSales tgtId={tgtId}/></TabPanel>
            <TabPanel><InquiryDetailProfile tgtId={tgtId}/></TabPanel>
            <TabPanel><InquiryDetailHearing tgtId={tgtId}/></TabPanel>
        </Tabs>
    )
}

export { InquiryDetailTab }