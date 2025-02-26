import { LoginLayout } from "../layout/LoginLayout"
import { LogoVertical } from "../components/LogoVertical"
import { InputWidthFull } from "../components/InputWidthFull";
import { SubmitButton } from "../components/SubmitButton";

export const LoginPasswordForget = () => {
  return (
    <LoginLayout>
      <LogoVertical />

      <p className="el_txt__bold hp_mgnB40">登録済みのメールアドレスにパスワード再設定メールを送ります</p>

      <InputWidthFull
        divClass="hp_mgnB40"
        spanClass="el_txt__bold"
        spanText="メールアドレス"
        inputType="text"
        inputName=""
      />

      <SubmitButton
        buttonText="ログイン"
      />
    </LoginLayout>
  )
}
