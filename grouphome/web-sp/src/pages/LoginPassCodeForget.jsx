import { SubmitButton } from "../components/SubmitButton"
import { LogoVertical } from "../components/LogoVertical"
import { LoginLayout } from "../layout/LoginLayout"
import { InputPassCode } from '../components/InputPassCode';

export const LoginPassCodeForget = () => {
  return (
    <LoginLayout>
      <LogoVertical />

      <p className="el_txt__bold hp_mgnB40">登録済みメールアドレスにワンタイムパスコードを送りました</p>

      <InputPassCode
        divClass="hp_mgnB40"
        spanText="ワンタイムパスコード"
      />

      <SubmitButton 
        buttonText="ログイン"
      />
    </LoginLayout>
  );
};
