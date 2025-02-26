import { QrLayout } from '../layout/QrLayout';
import { LogoVertical } from "../components/LogoVertical";
import { TextLink } from '../components/TextLink';

export const LoginQrReading = () => {
  return (
    <QrLayout>
      <section className="un_qrScan">
        <LogoVertical />

        <p className="el_txt__bold el_txt__center">QRコードをかざしてください</p>

        <div className="un_qrScanArea">
          <img src="/img/qr_frame.svg" alt="" />
          {/* 読み取りエラー時に表示 */}
          {/* <span className="un_qrScanError">QRコードが読み取れません<br />メールアドレスで<br />ログインしてください</span> */}
        </div>

        <TextLink
          linkTo="/loginEmailPassword"
          linkText={<>メールアドレスとパスワードで<span>ログインする場合はこちら</span></>}
        />
      </section>
    </QrLayout>
  )
}
