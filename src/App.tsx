import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 36px 48px;
  box-sizing: border-box;
`;

function App() {
  return (
    <Wrapper>
      <Routes>
        {routes.map((route) => (
          <Route {...route} />
        ))}
      </Routes>
    </Wrapper>
  );
}

export default App;
