import styled from "styled-components";

export const SideBarContainer = styled.div`
  position: fixed;
  height: 100vh;
  background-color: #fff;
  padding: ${({ close }) => (close ? "20px" : " 0px 15px 40px")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // transition: all 0.8s ease;
  width: ${({ close }) => (close ? "5vw" : "15vw")};
  border-right: 2px solid #f8f8f8;

  @media (max-width: 1700px) {
    padding: ${({ close }) => (close ? "15px" : " 0px 15px 30px")};
  }
  @media (max-width: 1450px) {
    padding: ${({ close }) => (close ? "15px" : " 0px 10px 25px")};
  }
  @media (max-width: 1300px) {
    padding: ${({ close }) => (close ? "10px" : " 0px 10px 20px")};
  }

  .sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 40px;
    @media (max-width: 1700px) {
      gap: 30px;
    }
    @media (max-width: 1450px) {
      gap: 25px;
      padding-top: 10px;
    }
  }
  .icon-list {
    display: flex;
    align-items: center;
    justify-content: ${({ close }) => (close ? "center" : "flex-start")};
    gap: 10px;
    padding-left: ${({ close }) => (close ? "0" : "30px")};

    @media (max-width: 1700px) {
      padding-left: ${({ close }) => (close ? "0" : "25px")};
    }
    @media (max-width: 1450px) {
      padding-left: ${({ close }) => (close ? "0" : "20px")};
    }

    img {
      height: 15px;
      display: flex;
      align-items: center;
    }
    .icon-name {
      display: ${({ close }) => (close ? "none" : "block")};
      color: #7d8fb3;
      font-size: 12px;
      font-weight:700;
    }
  }
`;

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 1700px) {
    gap: 25px;
  }
  @media (max-width: 1450px) {
    gap: 20px;
  }
  .logo {
    width:100%;
    height:10vh;
    border-bottom:2px solid #f8f8f8;
    display:flex;
    justify-content:center;
    align-items:center;
    img {
      height: ${({ close }) => (close ? "20px" : "30px")};
      @media (max-width: 1450px) {
        height: ${({ close }) => (close ? "20px" : "25px")};
      }
    }
    .profile-navigation {
      width: 100%;
    }
  }
`;

export const ProfileData = styled.div`
  width: 100%;
  border: 2px solid #f8f8f8;
  padding: 15px;
  border-radius: 10px;
  display: ${({ close }) => (close ? "none" : "flex")};
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1450px) {
    padding: 10px;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;

      @media (max-width: 1450px) {
        width: 35px;
        height: 35px;
      }
    }
    p {
      color: #7d8fb3;
      font-size: 14px;
      font-weight: 600;

      @media (max-width: 1700px) {
        font-size: 13px;
      }
      @media (max-width: 1450px) {
        font-size: 12px;
      }
    }
  }
  .levels {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    .level {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 5px;
      img {
        height: 20px;
        @media (max-width: 1450px) {
          height: 15px;
        }
      }
      p {
        font-size: 10px;
        color: #7d8fb3;
        font-weight: 500;
      }
    }
  }
`;

export const ProfileImg = styled.div`
  display: ${({ close }) => (close ? "flex" : "none")};
  align-items: center;
  justify-content:center;
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`;

export const SideBarButton = styled.div`
  position: fixed;
  display: grid;
  place-content: center;
  top: 50%;
  right: ${({ close }) => (close ? "95vw" : "85vw")};
  width: 30px;
  height: 30px;
  background-color: #f8f8f8;
  border-radius: 50%;
  z-index: 999999;
  transform: translate(50%, -50%)
    ${({ close }) => (close ? "rotate(-180deg)" : "rotate(0deg)")};
  cursor: pointer;

  @media (max-width: 1450px) {
    width: 25px;
    height: 25px;
  }
`;
