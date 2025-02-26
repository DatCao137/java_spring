function HomeCss() {
  return (
    <>
{`
.bl_cardUnit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 40px 24px;
}

.bl_card {
  padding: 24px 32px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.bl_cardTitle {
  padding-top: 1.8em;
  background-position: center top;
  background-repeat: no-repeat;
  backgournd-size: 1.5em auto;
  font-size: 1.25em;
  font-weight: bold;
  text-align: center;
}

.bl_cardTitle_office {
  background-image: url(/img/icon_office.svg);
  color: #EE887A;
}

.bl_cardTitle_customerManagement {
  background-image: url(/img/icon_customerManagement.svg);
  color: #F2A51C;
}

.bl_cardTitle_facility {
  background-image: url(/img/icon_facility.svg);
  color: #8DB909;
}

.bl_cardTitle_shift {
  background-image: url(/img/icon_shift.svg);
  color: #6CA579;
}

.bl_cardTitle_customerRequest {
  background-image: url(/img/icon_customerRequest.svg);
  color: #5CBEB3;
}

.bl_cardTitle_nhio {
  background-image: url(/img/icon_nhio.svg);
  color: #9E83B0;
}

.bl_cardLink {
  padding: 0.25em 0;
}

.bl_cardLink li:not(:last-child) {
  border-bottom: 1px solid #EDEDED;
}

.bl_cardLink a {
  position: relative;
  display: block;
  padding: 1em 1.5em 1em 0.5em;
  transiton: background-color .25s;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0.5em;
    transform: translateY(-50%) rotate(-90deg);
    width: 0.75em;
    height: 0.75em;
    background: transparent url(/img/icon_menuArrow.svg) center center / 0.75em auto no-repeat;
  }
}

@media (hover :hover) {
  .bl_cardLink_office a:hover {
    background-color: #FCEDEB;
  }

  .bl_cardLink_customerManagement a:hover {
    background-color: #FFF6E2;
  }

  .bl_cardLink_facility a:hover {
    background-color: #F2F7E1;
  }

  .bl_cardLink_shift a:hover {
    background-color: #E9F2EB;
  }

  .bl_cardLink_customerRequest a:hover {
    background-color: #E7F5F4;
  }

  .bl_cardLink_nhio a:hover {
    background-color: #EFE8F3;
  }
}
`}
  </>
  )
}

export default HomeCss
