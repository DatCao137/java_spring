import { NavLink } from 'react-router-dom';
import HomeCss from './homeCss'

export default function Home() {
  return (
    <>
    <style>
      <HomeCss />
    </style>
    <div className="bl_cardUnit">
      <div className="bl_card">
        <h1 className="bl_cardTitle bl_cardTitle_office">事業所管理</h1>
        <ul className="bl_cardLink bl_cardLink_office">
          <li>
            <NavLink to="/app/office">
              事業所情報
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/home">
              ホーム情報
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/staff">
              職員管理
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/docManage">
              文書管理
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              問合わせ管理（通知機能-通知先設定）
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              人事情報連携
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="bl_card">
        <h1 className="bl_cardTitle bl_cardTitle_customerManagement">利用者管理</h1>
        <ul className="bl_cardLink bl_cardLink_customerManagement">
          <li>
            <NavLink to="">
              申し込み
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              入居者情報管理
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              支援計画等
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="bl_card">
        <h1 className="bl_cardTitle bl_cardTitle_facility">施設業務</h1>
        <ul className="bl_cardLink bl_cardLink_facility">
          <li>
            <NavLink to="">
              支援記録
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              預かり金管理
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              施設運営管理
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              クレーム情報
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              イベント管理
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="bl_card">
        <h1 className="bl_cardTitle bl_cardTitle_shift">シフト管理</h1>
        <ul className="bl_cardLink bl_cardLink_shift">
          <li>
            <NavLink to="">
              シフト計画管理
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              シフト作成
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              勤怠管理
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              要件人数チェック
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="bl_card">
        <h1 className="bl_cardTitle bl_cardTitle_customerRequest">利用者請求</h1>
        <ul className="bl_cardLink bl_cardLink_customerRequest">
          <li>
            <NavLink to="">
              水道光熱費集計
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              食費集計
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              個別請求額集計
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              請求書出力
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="bl_card">
        <h1 className="bl_cardTitle bl_cardTitle_nhio">国保連請求</h1>
        <ul className="bl_cardLink bl_cardLink_nhio">
          <li>
            <NavLink to="">
              個人情報連携
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              在籍集計
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              請求データ作成
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}
