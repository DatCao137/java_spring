import { SubmitButton } from "../components/SubmitButton"
import { LogoVertical } from "../components/LogoVertical"
import { LoginLayout } from "../layout/LoginLayout"
import { InputPassCode } from '../components/InputPassCode';

export const LoginFirstTimePassCode = () => {
  return (
    <LoginLayout>
      <LogoVertical />

      <p className="el_txt__bold hp_mgnB40">4桁のパスコードを決めてください</p>

      <InputPassCode
        divClass="hp_mgnB12"
        spanText="パスコード"
      />

      <InputPassCode
        divClass="hp_mgnB40"
        spanText="もう一度入力してください"
      />

      <SubmitButton 
        buttonText="ログイン"
      />
    </LoginLayout>
  );
};
