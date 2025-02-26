function NoticeCss() {
  return (
    <>
{`
.bl_notice {
  display: grid;
  grid-template-columns: 1fr 3.5em;
  gap: 20px;
  margin-bottom: 40px;
  padding: 1em 1.25em 1em 3.25em;
  background: #FFF3DE url(/img/icon_notice.svg) left 1.5em center / 1.25em auto no-repeat;
  border: 1px solid #FFB839;
  border-radius: 8px;
}

.bl_noticeText {
  line-height: 1.4em;
}

.bl_noticeButton {
  font-weight: bold;
  transition: opacity .25s;
}

@media (hover :hover) {
  .bl_noticeButton:hover {
    opacity: 0.7;
  }
}
`}
  </>
  )
}

export default NoticeCss
