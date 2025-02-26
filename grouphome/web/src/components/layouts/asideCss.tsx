function AsideCss() {
  return (
    <>
{`
aside {
  background-color: #fff;
  box-shadow: 3px 0 3px #00000005;
}

aside:has(.bl_asideLogo.close) {
  width: 65px;
}

aside:has(.bl_asideLogo.close) + div {
  padding-left: 65px;
}

nav {
  overflow-y: scroll;
  overscroll-behavior: none;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
  padding-bottom: 50px;
}

nav::-webkit-scrollbar {
  display: none;
}

.bl_asideLogo {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  &.close {
    width: 39px;
  }
  & img {
    display: block;
    width: 190px;
    max-width: none;
    margin: 0 auto;
  }
}

.bl_asideMenu {
  overflow-x: hidden;
  & > li {
    overflow: hidden;
    &.hasChildren {
      padding-bottom: 10px;
    }
    & > a,
    & > div > a {
      display: flex;
      align-items: center;
      padding: 20px 0 10px 20px;
      & img {
        display: inline-block;
        width: 1.5em;
        margin-right: 0.75em;
        opacity: 0.475;
        filter: grayscale(100%) brightness(0%);
      }
      & span {
        flex: 1;
      }
    }
    & > a {
      padding: 20px 0 20px 20px;
    }
    & > a.active {
      color: #EE887A;
      font-weight: bold;
    }
    &:has(a.active) img {
      opacity: 1 !important;
      filter: none !important;
    }
  }
  & .bl_asideMenuItem {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    & a {
      flex: 1;
    }
  }
}

nav:has(.bl_asideLogo.close) .bl_asideMenu span {
  display: none;
}

.bl_asideMenuAccordion {
  display: block;
  width: 3em;
  height: calc(40px + 1.5em);
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    top: 5px;
    right: 1em;
    width: 1em;
    height: 100%;
    background: transparent url(/img/icon_menuArrow.svg) center center / 0.75em auto no-repeat;
    transition: transform .2s;
  }
  &.open::after {
    transform: rotate(180deg);
  }
}

.bl_asideMenuChildren {
  position: relative;
  transform: translateY(-100%);
  z-index: 1;
  visibility: hidden;
  transition: transform .25s, visibility .25s;
  & a {
    display: block;
    margin-top: calc(-20px - 1.5em);
    padding: 10px 0 10px calc(20px + 2.125em);
    color: #858585;
    transition: margin-top .25s;
    &.active {
      background-color: #F9F6F6;
      font-weight: bold;
    }
  }
}

nav:has(.bl_asideLogo.close) .bl_asideMenuChildren {
  display: none;
}

.bl_asideMenuItem_office + .bl_asideMenuChildren a.active {
  color: #EE887A;
}

.bl_asideMenuItem_customerManagement + .bl_asideMenuChildren a.active {
  color: #F2A51C;
}

.bl_asideMenuItem_facility + .bl_asideMenuChildren a.active {
  color: #8DB909;
}

.bl_asideMenuItem_shift + .bl_asideMenuChildren a.active {
  color: #6CA579;
}

.bl_asideMenuItem_customerRequest + .bl_asideMenuChildren a.active {
  color: #5CBEB3;
}

.bl_asideMenuItem_nhio + .bl_asideMenuChildren a.active {
  color: #9E83B0;
}

.bl_asideMenuItem:has(.open) + .bl_asideMenuChildren {
  visibility: visible;
  transform: translateY(0);
  & a {
    margin-top: 0;
  }
}

@media (hover :hover) {
  .bl_asideMenu a:hover {
    font-weight: bold;
  }

  .bl_asideMenu li:hover img {
    opacity: 1 !important;
    filter: none !important;
  }

  .bl_asideMenuChildren a:hover {
    background-color: #F9F6F6;
  }

  .bl_asideMenu > li > a:hover,
  .bl_asideMenuItem_office + .bl_asideMenuChildren a:hover {
    color: #EE887A;
  }

  .bl_asideMenuItem_customerManagement + .bl_asideMenuChildren a:hover {
    color: #F2A51C;
  }

  .bl_asideMenuItem_facility + .bl_asideMenuChildren a:hover {
    color: #8DB909;
  }

  .bl_asideMenuItem_shift + .bl_asideMenuChildren a:hover {
    color: #6CA579;
  }

  .bl_asideMenuItem_customerRequest + .bl_asideMenuChildren a:hover {
    color: #5CBEB3;
  }

  .bl_asideMenuItem_nhio + .bl_asideMenuChildren a:hover {
    color: #9E83B0;
  }
}
`}
  </>
  )
}

export default AsideCss
