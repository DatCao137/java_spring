import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

export interface TabItem {
    label: React.ReactNode;
    value: string;
    content: React.ReactNode;
}

interface CommonTabsProps {
    tabs: TabItem[];
    defaultValue: string;
    className?: string;
    headerClassName?: string;
}

const CommonTabs: React.FC<CommonTabsProps> = ({ tabs, defaultValue, className, headerClassName }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    useEffect(() => {
        setActiveTab(defaultValue);
    }, [defaultValue]);

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className={className}>
            <TabsList>
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className={headerClassName}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export { CommonTabs };