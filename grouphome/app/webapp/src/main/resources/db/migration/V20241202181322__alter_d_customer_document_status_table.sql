ALTER TABLE `d_customer_document_status`
    CHANGE COLUMN `trialImportantExperience` `trial_important_experience` JSON COMMENT '体験重要事項説明書',
    CHANGE COLUMN `usageContract` `usage_contract` JSON COMMENT '利用契約',
    CHANGE COLUMN `importantExperience` `important_experience` JSON COMMENT '重要事項説明書';
