import { Button } from '@/components/ui/button';
import styled from 'styled-components';

export const Footer = styled.div`
    display: flow-root;
    margin-top: 20px;
`;
export const Left = styled.div`
    float:Left;
`
export const Right = styled.div`
    float:Right;
`

export const ClearButton = styled(Button)`
    width: 40px;
    background-color: #5F96F1;
    font-size: 0.75em; 
    margin-right: 5px;
`;

export const CancelButton = styled(Button)`
    width: 80px;
    background-color: #9e9c9c;
    font-size: 0.75em; 
    margin-right: 5px;
`;

export const OKButton = styled(Button)`
    width: 50px;
    background-color: #EE887A;
    font-size: 0.75em;
`;

function TableFilterCss() {
    return (
        <>
            {`
.table-fillter-container {
    position: relative;
    display: inline-block;
}

.table-fillter-area {
    z-index: 1000;
    width: 250px;
}

.table-fillter-area input {
    margin: 5px;
}

.table-fillter-area .filter-datepicker-range .filter-custom-input {
    padding-left: 0rem !important;
    padding-right: 0rem !important;
}

.table-filter-input {
    width: 100%;
}
.table-filter-range {
    width: 100px
}
.table-filter-date-range {
    width: 110px
}

.table-fillter-area .filter-datepicker-range .filter-custom-input {
    padding-left: 0rem !important;
    padding-right: 0rem !important;
}
`}
        </>
    )
}

export { TableFilterCss }
