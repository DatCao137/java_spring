import { SubmitButton } from "../components/SubmitButton"
import { LogoVertical } from "../components/LogoVertical"
import { LoginLayout } from "../layout/LoginLayout"
import { InputPassCode } from '../components/InputPassCode';
import { TextLink } from '../components/TextLink';

export const LoginPassCode = () => {
  return (
    <LoginLayout>
      <LogoVertical />

      <p className="el_txt__bold hp_mgnB40">4桁のパスコードを決めてください</p>

      <InputPassCode
        divClass="hp_mgnB40"
        spanText="パスコード"
      />

      <SubmitButton 
        buttonClass="hp_mgnB60"
        buttonText="ログイン"
      />

      <TextLink
        linkTo="/loginPassCodeForget"
        linkText="パスコードを忘れた場合はこちら"
      />
    </LoginLayout>
  );
};
