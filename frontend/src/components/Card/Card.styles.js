import styled from "styled-components"

const CardContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  width: 300px;
`

const CardTitle = styled.h2`
  font-size: 18px;
  color: #333;
`

const Instructions = styled.p`
  color: #666;
  font-size: 14px;
  white-space: pre-wrap;
`

const IngredientList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Ingredient = styled.li`
  font-size: 14px;
  color: #444;
  &:before {
    content: "•";
    margin-right: 8px;
    color: #0077ff;
  }
`
