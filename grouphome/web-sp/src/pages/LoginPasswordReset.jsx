import { LoginLayout } from "../layout/LoginLayout"
import { LogoVertical } from "../components/LogoVertical"
import { LinkButton } from '../components/LinkButton';

export const LoginPasswordReset = () => {
  return (
    <LoginLayout>
      <LogoVertical />

      <p className="el_txt__bold el_txt__center hp_mgnB40">メールを送信しました</p>

      <LinkButton
        buttonLink="/loginEmailPassword"
        buttonText="ログイン画面に戻る"
      />
    </LoginLayout>
  )
}
