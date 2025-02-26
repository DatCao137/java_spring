import { useState } from 'react';
import NoticeCss from './noticeCss'

export default function Notice() {
  const [isVisible, setIsVisible] = useState(true);

  const noticeClose = () => {
    setIsVisible(false);
  }

  return (
    <>
      <style>
        <NoticeCss />
      </style>
      {isVisible && (
        <div className="bl_notice">
          <p className="bl_noticeText">2024年7月24日(水) 01:00〜05:00の間でシステムメンテナンスを実施いたします。</p>
          <button className="bl_noticeButton" onClick={noticeClose}>閉じる</button>
        </div>
      )}
    </>
  )
}
