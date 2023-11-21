import styled from "styled-components";

export const NavbarDiv = styled.div`
  width: ${({ close }) => (close ? "95vw" : "85vw")};
  margin-left: ${({ close }) => (close ? "5vw" : "15vw")};
  padding:0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  position: fixed;
  background-color : white;
  z-index : 99;
  top: 0;
  @media(max-width : 1700px){
    padding:0 25px;
  }
  @media(max-width : 1450px){
    padding:0 20px;
  }
  @media(max-width : 1100px){
    width: 100vw !important;
    margin-left: 0vw !important;
  }

  h2 {
    font-size: 18px;
    color: #2f4362;
    font-weight: 700;

    @media (max-width: 1700px) {
      font-size: 17px;
    }
    @media (max-width: 1450px) {
      font-size: 16px;
    }
  }

  .notification {
    background: #f9f9f9;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    img {
      height: 18px;
      align-self: center;
      @media (max-width: 1700px) {
        height: 16px;
      }
      @media (max-width: 1450px) {
        height: 15px;
      }
    }

    .student {
      display: flex;
      align-items: center;
      gap: 6px;
    }
 
  }
`;
