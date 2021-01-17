import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
`;

export const Grid = styled.tbody`
    border: 1px solid #b4b4ff;
    display: table;
`;

export const Row = styled.tr`
    display: flex;
    flex-wrap: wrap;
`;

export const Col = styled.td`
    border: 1px solid #b4b4ff;
    background-color: ${(props) => props.color};
    padding: 1rem;
    flex: ${(props) => props.size};

    &:hover {
        background-color: aliceblue;
    }
`;