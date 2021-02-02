import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
`;

export const BoardGrid = styled.div`
   height: ${props => props.size || '100%'};
   width: ${props => props.size || '100%'};
   border-right: 1px solid;
   border-bottom: 1px solid;
   box-sizing: border-box;
   ${props => props.gridPosition || '' }
   margin-top: 10px;
   display: grid;
   grid-template-columns: repeat(10, 1fr);
   grid-template-rows: repeat(10, 1fr);

   @media (max-width: 768px) {
       max-width: 100%;
   }
`;

export const Square = styled.div`
  border-top: 1px solid;
  border-left: 1px solid;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: aliceblue;
  }
`;
