import { LoginLayout } from "../layout/LoginLayout";
import { LogoVertical } from "../components/LogoVertical";
import { InputWidthFull } from "../components/InputWidthFull";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";
import { TextLink } from "../components/TextLink";

export const LoginEmailPassword = () => {
  return (
    <LoginLayout>
      <LogoVertical />

      <InputWidthFull
        divClass="hp_mgnB12"
        spanClass="el_txt__bold"
        spanText="メールアドレス"
        inputType="email"
        inputName=""
      />

      <InputWidthFull
        divClass="hp_mgnB40"
        spanClass="el_txt__bold"
        spanText="パスワード"
        inputType="text"
        inputName=""
      />

      <SubmitButton
        buttonText="ログイン"
      />

      <BackButton
        buttonLink="/"
        buttonClass="hp_mgnB60"
        buttonText="QRコード読み込みに戻る"
      />

      <TextLink
        linkTo="/loginPasswordForget"
        linkText="パスワードを忘れた場合はこちら"
      />
    </LoginLayout>
  );
};
